#!/bin/bash

set -e

APP_USER=gluu
DEPLOY_DIR=/home/${APP_USER}/app
LOG_DIR=/home/${APP_USER}/logs

# Make sure user is app user
if [ "$(whoami)" != "$APP_USER" ]; then
    echo "Script must be run as user: $APP_USER"
    exit -1
fi

echo "Changing directory to ${DEPLOY_DIR}"
cd ${DEPLOY_DIR}
echo "Currently in $(pwd)"
echo

DATE_STRING=$(date +%F)
echo "Saving logs for $DATE_STRING"
docker-compose logs >> ${LOG_DIR}/${DATE_STRING}.log
echo "Saved logs"

echo "Bringing Docker Compose down"
docker-compose down
echo "Brought Docker Compose down"
echo

echo "Pulling latest immages"
docker-compose pull
echo "Pulled latest images"
echo

echo "Setting File Permissions"
sudo chown -R ${APP_USER} data
echo "Set File Permissions"
echo

echo "Bringing Docker Compose up"
docker-compose up -d --force-recreate
echo "Docker Compose is up"
echo

echo "Prune system"
docker system prune -f
echo "Pruned system"
echo

echo ""
echo ""
echo ""
echo "Deploy successful"
