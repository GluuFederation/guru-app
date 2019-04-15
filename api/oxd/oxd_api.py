import json
import requests

from oxd.models import Configuration
from oxd import exceptions as e


def make_unprotected_call(path, params=None):
    """
    Make a call to the oxd server without passing PAT.

    :param path: path on oxd-server.
    :param params: extra params to be added to Configuration params.
    """

    config = Configuration.load()
    headers = {
        'Content-Type': 'application/json'
    }
    data = config.get_request_data(params)
    url = '{0}/{1}'.format(config.oxd_host, path)
    return requests.post(url, data=json.dumps(data), headers=headers)


def get_client_token_object():
    """
    Get client's PAT JSON from oxd server.

    :returns Response dict when successful, error text on failure.
    """

    r = make_unprotected_call('get-client-token')
    if r.status_code == 200:
        response = r.json()
        if response.get('status') == 'ok':
            config = Configuration.load()
            config.update_from_response(response['data'])
            return response['data']

    return r.text


def get_client_token():
    """
    Get PAT string from PAT JSON.

    :returns access_token string.
    """

    data = get_client_token_object()
    if data is None or type(data) != dict:
        raise e.InvalidAccessTokenError(
            'Error getting client token - {}'.format(data)
        )
    return data['access_token']


def introspect_access_token():
    """
    Check PAT to introspect expiry date and validity.

    :returns Response dict.
    """

    config = Configuration.load()
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'oxd_id': config.oxd_id,
        'access_token': config.protection_access_token
    }
    url = '{}/get-client-token'.format(config.oxd_host)
    r = requests.post(url, data=json.dumps(data), headers=headers)

    if r.status_code == 200:
        response = r.json()
        if response.get('status') == 'ok':
            return response['data']

    raise e.OxdError(
        'Unable to introspect access token - {}'.format(r.text)
    )


def make_protected_call(path, params=None):
    """
    Make a call to the oxd server passing PAT.
    First get client's token and then pass it to call.

    :param path: path on oxd-server.
    :param params: extra params to be added to Configuration params.
    """

    pat = get_client_token()
    config = Configuration.load()
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {}'.format(pat)
    }
    data = config.get_request_data(params)
    url = '{0}/{1}'.format(config.oxd_host, path)
    return requests.post(url, data=json.dumps(data), headers=headers)


def get_authorization_url():
    """
    Get authorization url from oxd server.

    :returns Authorization url string.
    """

    r = make_protected_call('get-authorization-url')
    if r.status_code == 200:
        response = r.json()
        if response.get('status') == 'ok':
            return response['data']['authorization_url']

    raise e.OxdError(
        'Unable to get authorization url - {}'.format(r.text)
    )


def get_logout_url():
    """
    Get logout url from oxd server.

    :returns Logout url string.
    """

    r = make_protected_call('get-logout-uri')
    if r.status_code == 200:
        response = r.json()
        return response['url']

    raise e.OxdError(
        'Unable to get logout url - {}'.format(r.text)
    )


def uma_rs_protect(resources):
    """
    UMA protect resources.

    :param resources: resources to be protected.

    :returns Response dict.
    """

    params = {'resources': resources}
    r = make_protected_call('get-logout-uri', params=params)
    if r.status_code == 200:
        response = r.json()
        return response['status']

    raise e.OxdError(
        'Unable to protect resources {0} - {1}'.format(
            resources, r.text
        )
    )


def obtain_rpt(ticket):
    """
    Obtain RPT from oxd server.

    :param ticket: Ticket from protected resource endpoint.

    :returns Response dict.
    """

    params = {
        'ticket': ticket
    }
    r = make_protected_call('uma-rp-get-rpt', params=params)
    if r.status_code == 200:
        response = r.json()
        if response.get('status') == 'ok':
            return response['data']

    raise e.OxdError(
        'Unable to get authorization url - {}'.format(r.text)
    )
