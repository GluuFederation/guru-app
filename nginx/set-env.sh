#!/bin/bash
set -e

# Remove default conf
rm /etc/nginx/conf.d/default.conf

# Copy environment conf
cp /nginx-conf/${ENVIRON}.conf /etc/nginx/conf.d/${ENVIRON}.conf

# Copy custom nginx if not default
if [ $ENVIRON != "certbot" ]; then
  cp /nginx-conf/nginx.conf /etc/nginx/nginx.conf
fi
