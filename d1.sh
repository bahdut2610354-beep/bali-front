#!/bin/bash
# Read-only discovery of the Django backend layout (prints a short summary).
clear
echo "== services"; systemctl list-units --type=service --state=running --no-pager --no-legend | awk '{print $1}' | grep -Ev '^(systemd|dbus|cron|ssh|getty|serial|polkit|rsyslog|snapd|udisks|unattended|user@|networkd|multipathd|ModemManager|qemu|chrony|irqbalance|fwupd|packagekit)' | tr '\n' ' '; echo
echo "== docker"; (command -v docker >/dev/null && docker ps --format '{{.Names}} {{.Image}}' 2>/dev/null) | head
echo "== manage.py"; find / -name manage.py -not -path '*/site-packages/*' -not -path '/proc/*' 2>/dev/null | head -5
echo "== nginx"; ls /etc/nginx/sites-enabled 2>/dev/null | tr '\n' ' '; echo
D=$(dirname "$(find / -name manage.py -not -path '*/site-packages/*' -not -path '/proc/*' 2>/dev/null | head -1)")
echo "== project dir: $D"; ls "$D" | tr '\n' ' '; echo
echo "== delivery app files"; ls "$D"/apps/delivery "$D"/delivery 2>/dev/null | tr '\n' ' '; echo
grep -rn "ENGINE" "$D" --include=settings*.py 2>/dev/null | head -3
grep -rln "DATABASE_URL\|POSTGRES" "$D" --include=*.py 2>/dev/null | head -3
ls -a "$D" | grep -i env
(cd "$D" && git log --oneline -1 2>/dev/null && git remote -v 2>/dev/null | head -1)
