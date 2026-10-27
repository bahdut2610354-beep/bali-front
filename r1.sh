#!/bin/bash
# Rollback for p1.sh: restore code from backup and remove the new column.
set -e
D=/var/www/django/bali_rent
B=/root/backup-delivery-20261027
cd $D
venv/bin/python manage.py migrate delivery $(ls delivery/migrations | grep -v zone.base.price.idr | grep -E '^[0-9]{4}' | sort | tail -1 | cut -d. -f1)
tar xzf $B/code.tgz -C $D
rm -f delivery/migrations/*zone_base_price_idr*
systemctl restart gunicorn
systemctl is-active gunicorn
echo ROLLED BACK
