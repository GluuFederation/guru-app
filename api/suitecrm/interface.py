from datetime import timedelta
import json

from django.utils import timezone
import requests

from suitecrm import models
from suitecrm import exceptions as e


def get_access_token():
    config = models.Configuration.load()
    if config.access_token and config.access_token_expiry > timezone.now():
        return config.access_token

    client_id = config.client_id
    client_secret = config.client_secret
    host = config.host

    if not client_id or not client_secret or not host:
        raise e.SuiteCrmError('Invalid suitecrm configuration')

    auth_string = '{}:{}'.format(
        client_id, client_secret
    )

    headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    url = '{}/Api/access_token'.format(host)

    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }

    r = requests.post(url, headers=headers, data=json.dumps(data))

    if r.status_code == 200:
        response = r.json()
        config.access_token = response['access_token']
        config.access_token_expiry = (
            timezone.now() + timedelta(seconds=response['expires_in'])
        )
        config.save()
        return config.access_token

    raise e.SuiteCrmError('Error getting access token\n' + r.text)


def get_auth_headers():
    token = get_access_token()
    headers = {
        'Authorization': 'Bearer {}'.format(token),
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    return headers


def get_accounts(name):
    config = models.Configuration.load()
    host = config.host

    headers = get_auth_headers()
    url = (
        '{0}/Api/V8/module/Accounts/?filter'
        '[name][eq]={1}&fields[Account]=name'
    ).format(host, name)

    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        response = r.json()
        data = response['data']
        return [
            {'id': item['id'], 'name': item['name']}
            for item in data
        ]

    raise e.SuiteCrmError('Error getting accounts from CRM\n' + r.text)


def get_account(account_id):
    config = models.Configuration.load()
    host = config.host

    headers = get_auth_headers()
    url = (
        '{0}/Api/V8/module/Accounts/{1}/'
    ).format(host, account_id)

    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        response = r.json()
        return response['data']

    if r.status_code == 400 or r.status_code == 404:
        raise e.ObjectNotFoundError(
            'Account with ID {} not found'.format(account_id)
        )

    raise e.SuiteCrmError(
        'Error getting account - {} from CRM \n{}'.format(
            account_id, r.text
        )
    )


def get_email_id(email):
    config = models.Configuration.load()
    host = config.host

    headers = get_auth_headers()
    url = (
        '{0}/Api/V8/module/EmailAddresses/?filter'
        '[email_address][eq]={1}'
    ).format(host, email)

    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        response = r.json()
        data = response['data']
        if data:
            return data.get('id', '')

        return ''

    raise e.SuiteCrmError(
        'Error getting email - {} from CRM\n{}'.format(email, r.text)
    )


def check_contact_email(contact_id, email):
    config = models.Configuration.load()
    host = config.host

    if not email:
        return False

    headers = get_auth_headers()
    url = (
        '{0}/Api/V8/module/Contacts/{1}'
    ).format(host, contact_id)

    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        response = r.json()
        data = response['data']
        if data.get('email', '') == email:
            return True

        if data.get('email1', '') == email:
            return True

        if data.get('email2', '') == email:
            return True

        return False

    raise e.SuiteCrmError(
        'Error getting contact - {} from CRM\n{}'.format(contact_id, r.text)
    )


def check_account_email(account_id, email):
    config = models.Configuration.load()
    host = config.host

    # email_id = get_email_id(email)
    # if not email_id:
    #     return False

    headers = get_auth_headers()
    url = (
        '{0}/Api/V8/module/Accounts/{1}/relationships/contacts/'
    ).format(host, account_id)

    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        response = r.json()
        data = response['data']
        for contact in data:
            if check_contact_email(contact['id'], email):
                return True

        return False

    raise e.SuiteCrmError(
        'Error getting account - {} from CRM\n{}'.format(account_id, r.text)
    )


def get_all_accounts_by_page(page_number, page_size=500):
    config = models.Configuration.load()
    host = config.host

    headers = get_auth_headers()
    params = {
        'page[size]': page_size,
        'page[number]': page_number,
        'fields[Accounts]': 'name,website'
    }
    url = (
        '{0}/Api/V8/module/Accounts/'
    ).format(host)

    r = requests.get(url, params=params, headers=headers)

    if r.status_code == 200:
        return r.json()

    raise e.SuiteCrmError(
        'Error getting accounts from CRM\n' + r.text
    )


def get_account_by_email(email):
    page_number = 1
    total_pages = 1
    domain = ''
    email_parts = email.split('@')
    if len(email_parts) > 1:
        domain = email_parts[1]

    if not domain:
        return None

    while page_number <= total_pages:
        response = get_all_accounts_by_page(page_number)
        total_pages = response.get('meta', {}).get('total-pages', 1)
        data = response.get('data', [])

        for item in data:
            website = item.get('attributes', {}).get('website', '')
            print(website)
            if domain in website:
                return item.get('id')

        page_number += 1
