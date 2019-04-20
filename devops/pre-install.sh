#!/usr/bin/env bash

APP_USER=gluu

# Install docker
yum check-update
curl -fsSL https://get.docker.com/ | sh

systemctl start docker

curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

# Install nano
yum install -y nano

adduser $APP_USER
usermod -aG wheel $APP_USER
usermod -aG docker $APP_USER
