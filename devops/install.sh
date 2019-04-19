#!/usr/bin/env bash

APP_USER=gluu

# Make sure user is app user
if [ "$(whoami)" != "$APP_USER" ]; then
    echo "Script must be run as user: $APP_USER"
    exit -1
fi

# Setup SSH
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys


mkdir -p /home/${APP_USER}/app/secrets /home/${APP_USER}/logs
touch /home/${APP_USER}/app/secrets/postgres.env
touch /home/${APP_USER}/app/secrets/api.env
