#!/bin/bash
set -e


domain="gluru-dev.gluu.org"
data_path="./data/certbot"
email="will@gluu.org" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits
image=gluru-nginx-certbot
username=gluufederation
volume_args="-v $(pwd)/data/certbot/conf:/etc/letsencrypt -v $(pwd)/data/certbot/www:/var/www/certbot"

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domain. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi


if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Starting $image"
docker run -p 80:80 -td --name $image --rm $volume_args $username/$image

echo "### Requesting Let's Encrypt certificate for $domain ..."
domain_args="-d $domain"

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi
docker run -ti --rm $volume_args certbot/certbot certonly --webroot -w /var/www/certbot $staging_arg $email_arg --agree-tos $domain_args

echo "### Shutting down $image"
docker stop $image
