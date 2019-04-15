import urllib
import requests
import base64

from oxd.models import Configuration, LoginState, LogoutState
from oxd import utils as u
from oxd import exceptions as e


def get_resource_ticket(url):
    """
    Get resource ticket from url.

    :param url: url of protected resource.
    :returns ticket string.
    """

    r = requests.get(url)
    auth_header = r.headers.get('WWW-Authenticate')
    if not auth_header:
        raise e.InvalidWwwAuthHeader('WWW-Authenticate not found in header')

    try:
        ticket_sections = auth_header.split('ticket=')
        ticket = ticket_sections[1].split('\',')[0]
    except IndexError:
        raise e.InvalidWwwAuthHeader(
            'WWW-Authenticate header formatted incorrectly'
        )

    return ticket


def obtain_rpt(ticket):
    """
    Get RPT from ticket.

    :param ticket: ticket obtained from protected url.
    :returns RPT JSON object (dict).
    """

    config = Configuration.load()
    data = {
        'ticket': ticket,
        'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
        'scope': 'read'
    }
    headers = get_auth_headers()
    url = '{}/oxauth/restv1/token'.format(config.op_host)
    r = requests.post(url, data=data, headers=headers)

    if r.status_code == 200:
        return r.json()

    raise e.UmaError(
        'Unable to obtain rpt for ticket {} \n\n {}'.format(
            ticket,
            r.text
        )
    )


def get_authorization_url():
    """
    Generates authorization url while saving state.

    :returns authorization url.
    """

    config = Configuration.load()
    nonce = u.generate_nonce(26)
    state = u.generate_nonce(26)
    LoginState.objects.create(
        nonce=nonce,
        state=state
    )

    params = {
        'response_type': 'code',
        'client_id': config.client_id,
        'redirect_uri': urllib.parse.quote(config.authorization_redirect_uri),
        'scope': ','.join(config.scope),
        'state': state,
        'nonce': nonce
    }

    return (
        '{op_host}/oxauth/restv1/authorize?response_type={response_type}'
        '&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}'
        '&state={state}&nonce={nonce}'
    ).format(
        op_host=config.op_host, **params
    )


def get_logout_url(id_token):
    """
    Generates logout url while saving state.
    :param id_token: ID token from login
    :returns Logout url string.
    """
    config = Configuration.load()
    state = u.generate_nonce(8)
    session_state = u.generate_nonce(8)
    LogoutState.objects.create(
        state=state
    )
    params = {
        'id_token_hint': id_token,
        'session_state': session_state,
        'post_logout_redirect_uri': config.post_logout_redirect_uri,
        'state': state,
    }

    return (
        '{op_host}/oxauth/restv1/end_session?id_token_hint={id_token_hint}'
        '&post_logout_redirect_uri={post_logout_redirect_uri}'
        '&state={state}&session_state={session_state}'
    ).format(
        op_host=config.op_host, **params
    )


def get_auth_headers():
    """
    Generate authorization headers by encoding client id and secret in base64.

    :returns authorization headers dict.
    """

    config = Configuration.load()
    auth_string = '{}:{}'.format(
        config.client_id,
        config.client_secret
    )

    headers = {
        'Authorization': 'Basic ' + str(
            base64.b64encode(bytes(auth_string, 'utf-8')).decode('utf-8')
        )
    }

    return headers


def get_token_from_callback(query_params):
    """
    Get access token from callback.

    :param query_params: query parameters from callback formatted as dict.
    :returns token JSON.
    """

    config = Configuration.load()
    state = query_params.get('state', '')
    code = query_params.get('code', '')

    if state and code and LoginState.objects.filter(state=state).exists():
        params = {
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': config.authorization_redirect_uri,
            'scope': ','.join(config.scope),
        }
        headers = get_auth_headers()
        url = '{}/oxauth/restv1/token'.format(config.op_host)
        r = requests.post(url, data=params, headers=headers)

        if r.status_code == 200:
            return r.json()

        raise e.UmaError(
            'Unable to get token from IDP \n\n {}'.format(
                r.text
            )
        )

    raise e.UmaError(
        'Callback URL not properly formatted \n\n {}'.format(
            query_params
        )
    )


def get_user_info(access_token):
    """
    Get user information from access token.

    :param access_token: access token from IDP.
    :returns user information JSON (dict).
    """

    config = Configuration.load()
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }
    url = '{}/oxauth/restv1/userinfo'.format(config.op_host)
    r = requests.get(url, headers=headers)

    if r.status_code == 200:
        return r.json()

    raise e.UmaError(
        'Unable to get user info. \n\n {}'.format(
            r.text
        )
    )
