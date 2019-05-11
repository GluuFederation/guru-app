import base64
from datetime import timedelta

from django.utils import timezone
import requests

from suitecrm import models


def get_access_token():
    config = models.Configuration.load()
    if config.access_token and config.access_token_expiry > timezone.now():
        return config.access_token

    client_id = config.client_id
    client_secret = config.client_secret
    host = config.host

    if not client_id or not client_secret or not host:
        raise ValueError('Invalid suitecrm configuration')

    auth_string = '{}:{}'.format(
        client_id, client_secret
    )

    headers = {
        'Authorization': 'Basic ' + str(
            base64.b64encode(bytes(auth_string, 'utf-8')).decode('utf-8')
        ),
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    url = '{}/api/oauth/access_token'.format(host)

    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }

    r = requests.post(url, headers=headers, data=data)

    if r.status_code == 200:
        response = r.json()
        config.access_token = response['access_token']
        config.access_token_expiry = (
            timezone.now() + timedelta(seconds=response['expires_in'])
        )
        config.save()
        return config.access_token

    raise ValueError('Error getting access token')


def get_account(email):
    token = get_access_token()
    config = models.Configuration.load()
    host = config.host

    headers = {
        'Authorization': 'Bearer {}'.format(token),
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    url = (
        '{0}/api/v8/modules/Accounts?filter'
        '[Accounts.Contacts.first_name]=[[eq]]{1}'
    ).format(host, email)

    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        response = r.json()
        return response['data']

    raise ValueError('Error getting account from CRM')
