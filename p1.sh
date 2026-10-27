#!/bin/bash
# Delivery fix for TROPICAL BIKES backend:
#  1) backup code + database
#  2) add DeliveryZone.base_price_idr (exact rupiah price)
#  3) detect zone by center/radius when a zone has no polygon
#  4) use the exact IDR price in bootstrap and booking totals
#  5) set Ubud = 200000, Bukit = 100000 and a center for Bukit
set -e
clear
D=/var/www/django/bali_rent
B=/root/backup-delivery-20261027
cd $D
mkdir -p $B
echo "[1] backup"
tar czf $B/code.tgz --exclude=venv --exclude=media --exclude=__pycache__ -C $D .
sudo -u postgres pg_dumpall | gzip > $B/db.sql.gz
ls -la $B | tail -2

echo "[2] patch files"
venv/bin/python - <<'PY'
import re, sys
def patch(path, fn):
    s = open(path).read()
    n = fn(s)
    if n == s:
        sys.exit(f"no change in {path}")
    open(path, 'w').write(n)
    print("patched", path)

# models: new field
def m(s):
    anchor = "    price_per_km_usd = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))\n"
    assert s.count(anchor) == 1, "models anchor"
    assert "base_price_idr" not in s
    return s.replace(anchor, anchor + "    base_price_idr = models.PositiveIntegerField(\n        null=True,\n        blank=True,\n        help_text='Exact delivery price in IDR (overrides the USD conversion when set).',\n    )\n")
patch('delivery/models.py', m)

# services: radius fallback + IDR price
def sv(s):
    old = "    return None, Decimal('0.00')\n"
    assert s.count(old) == 1, "select_zone anchor"
    new = ("    # Fallback for zones without a polygon: nearest zone whose center/radius contains the point.\n"
           "    best = None\n"
           "    for zone in active_zones:\n"
           "        if zone.polygon or zone.center_lat is None or zone.center_lng is None:\n"
           "            continue\n"
           "        dist = haversine_distance(lat, lng, zone.center_lat, zone.center_lng)\n"
           "        if dist <= (zone.radius_km or 0) and (best is None or dist < best[1]):\n"
           "            best = (zone, dist)\n"
           "    if best:\n"
           "        return best[0], Decimal('0.00')\n"
           "\n" + old)
    s = s.replace(old, new)
    a2 = "            'is_within_zone': True,\n"
    assert s.count(a2) == 1, "result anchor"
    s = s.replace(a2, a2 + "            'price_idr': zone_price_idr(zone),\n")
    s += ("\n\ndef zone_price_idr(zone):\n"
          "    \"\"\"Exact IDR delivery price for a zone, or None when only a USD price is set.\"\"\"\n"
          "    if zone.is_free:\n"
          "        return 0\n"
          "    if zone.base_price_idr:\n"
          "        return int(zone.base_price_idr)\n"
          "    return None\n")
    return s
patch('delivery/services.py', sv)

# pricing: prefer exact IDR delivery price
def pr(s):
    pat = re.compile(r"^( +)delivery_price_idr = int\(\(delivery_price \* ADMIN_IDR_RATE\)[^\n]*\n", re.M)
    found = pat.findall(s)
    assert len(found) == 1, f"pricing anchor {len(found)}"
    def rep(mo):
        ind = mo.group(1)
        line = mo.group(0)
        return (f"{ind}delivery_price_idr = None\n"
                f"{ind}if delivery_lat is not None and delivery_lng is not None:\n"
                f"{ind}    _delivery_info = calculate_delivery_price(delivery_lat, delivery_lng)\n"
                f"{ind}    if _delivery_info.get('price_idr') is not None:\n"
                f"{ind}        delivery_price_idr = int(_delivery_info['price_idr'])\n"
                f"{ind}if delivery_price_idr is None:\n"
                + line.replace(ind, ind + "    ", 1))
    return pat.sub(rep, s)
patch('pricing/services.py', pr)

# bootstrap: exact IDR fee
def pv(s):
    pat = re.compile(r'"deliveryFeeIDR": (usd_to_idr\(zone\.base_price_usd if not zone\.is_free else Decimal\("0\.00"\)\)),')
    assert len(pat.findall(s)) == 1, "public_views anchor"
    return pat.sub(lambda mo: '"deliveryFeeIDR": (0 if zone.is_free else int(zone.base_price_idr)) if (zone.is_free or zone.base_price_idr) else ' + mo.group(1) + ',', s)
patch('bali_rent/public_views.py', pv)
PY

echo "[3] migrate"
venv/bin/python manage.py makemigrations delivery --name zone_base_price_idr
venv/bin/python manage.py migrate delivery
venv/bin/python manage.py check

echo "[4] data"
venv/bin/python manage.py shell -c "
from delivery.models import DeliveryZone as Z
Z.objects.filter(id=4).update(base_price_idr=200000)
Z.objects.filter(id=5).update(base_price_idr=100000, center_lat=-8.80, center_lng=115.17, radius_km=11)
from delivery.services import calculate_delivery_price as c
for n,la,ln in [('Canggu',-8.648,115.138),('Kuta',-8.72,115.17),('Ubud',-8.507,115.262),('NusaDua',-8.80,115.23),('Uluwatu',-8.829,115.085),('Far',-8.2,115.1)]:
    r=c(la,ln); print(n, r['zone'], r['price'], r.get('price_idr'))
"

echo "[5] restart"
systemctl restart gunicorn
sleep 3
systemctl is-active gunicorn
echo "ALL DONE"
