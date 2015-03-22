#!/bin/sh

#includes lsb functions
. /lib/lsb/init-functions

# Start cron for needed regular logrotate
CRON=`which cron`
log_daemon_msg "Starting ${CRON}"
$CRON

# Start Node app with pm2
log_daemon_msg "Starting Node App"
sudo -i -u rsm-data pm2 start /srv/ride-share-market-app/pm2-production.json --no-daemon
