import json

import requests

from oxd.uma import obtain_rpt, get_resource_ticket
from oxd.models import Configuration
from oxd import exceptions as e


def create_user(user, password, is_active=False):
    """
    Create SCIM user from django user object.

    :param user: django user object.
    :param password: clear text password.
    :param is_active: bool to determine whether user is active or not.
    :returns JSON response from SCIM endpoint (dict).
    """

    config = Configuration.load()
    url = '{}/identity/restv1/scim/v2/Users'.format(
        config.op_host
    )

    ticket = get_resource_ticket(url)
    rpt = obtain_rpt(ticket)

    if not rpt or not rpt.get('access_token'):
        raise e.InvalidRpt('Could not get rpt from ticket {}'.format(ticket))

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {}'.format(rpt.get('access_token'))
    }
    data = {
        'schemas': ['urn:ietf:params:scim:schemas:core:2.0:User'],
        'userName': user.email,
        'name': {
            'givenName': user.first_name,
            'familyName': user.last_name
        },
        'displayName': u'{}{}'.format(user.first_name, user.last_name),
        'password': password,
        'emails': [
            {'value': user.email, 'primary': True, 'type': 'Work'}
        ],
        'timezone': user.timezone
    }

    if is_active:
        data['active'] = True

    if user.phone_number:
        data['phoneNumbers'] = [
            {
                'value': user.phone_number,
                'primary': True,
                'type': 'Work'
            }
        ]

    r = requests.post(url, data=json.dumps(data), headers=headers)

    if 200 <= r.status_code < 300:
        return r.json()
    elif r.status_code == 409:
        response = r.json()
        if response.get('scimType') == 'uniqueness':
            raise e.ScimUserAlreadyExists()

    raise e.ScimError(
        'Unexpected SCIM response while creating user {}: {}'.format(
            user.email, r.text
        )
    )


def activate_user(user):
    """
    Activate SCIM user based on django user object.

    :param user: django user object.
    :returns JSON response from SCIM endpoint (dict).
    """

    config = Configuration.load()
    url = '{}/identity/restv1/scim/v2/Users/{}'.format(
        config.op_host, user.idp_uuid
    )

    ticket = get_resource_ticket(url)
    rpt = obtain_rpt(ticket)

    if not rpt or not rpt.get('access_token'):
        raise e.InvalidRpt('Could not get rpt from ticket {}'.format(ticket))

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {}'.format(rpt.get('access_token'))
    }
    data = {
        'schemas': ['urn:ietf:params:scim:schemas:core:2.0:User'],
        'id': user.idp_uuid,
        'active': True
    }

    r = requests.put(url, data=json.dumps(data), headers=headers)

    if 200 <= r.status_code < 300:
        return r.json()

    raise e.ScimError(
        'Unexpected SCIM response while activating a user {} - {} \n\n {}'
        .format(
            user.email, user.idp_uuid, r.text
        )
    )


def update_user(user):
    """
    Update SCIM user from django user object.

    :param user: django user object.
    :returns JSON response from SCIM endpoint (dict).
    """

    config = Configuration.load()
    url = '{}/identity/restv1/scim/v2/Users/{}'.format(
        config.op_host, user.idp_uuid
    )

    ticket = get_resource_ticket(url)
    rpt = obtain_rpt(ticket)

    if not rpt or not rpt.get('access_token'):
        raise e.InvalidRpt('Could not get rpt from ticket {}'.format(ticket))

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {}'.format(rpt.get('access_token'))
    }
    data = {
        'schemas': ['urn:ietf:params:scim:schemas:core:2.0:User'],
        'id': user.idp_uuid,
        'name': {
            'givenName': user.first_name,
            'familyName': user.last_name
        },
        'displayName': u'{}{}'.format(user.first_name, user.last_name),
        'phoneNumbers': [
            {
                'value': user.phone_number,
                'primary': True,
                'type': 'Work'
            }
        ],
        'timezone': user.timezone
    }

    if user.phone_number:
        data['phoneNumbers'] = [
            {
                'value': user.phone_number,
                'primary': True,
                'type': 'Work'
            }
        ]

    r = requests.put(url, data=json.dumps(data), headers=headers)

    if 200 <= r.status_code < 300:
        return r.json()

    raise e.ScimError(
        'Unexpected SCIM response while activating a user {} - {} \n\n {}'
        .format(
            user.email, user.idp_uuid, r.text
        )
    )


def email_exists(email):
    """
    Check if email exists in IDP.

    :param email: email to be checked.
    :return: bool to determine is email exists.
    """

    config = Configuration.load()
    url = '{}/identity/restv1/scim/v2/Users/'.format(
        config.op_host
    )

    ticket = get_resource_ticket(url)
    rpt = obtain_rpt(ticket)

    if not rpt or not rpt.get('access_token'):
        raise e.InvalidRpt('Could not get rpt from ticket {}'.format(ticket))

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {}'.format(rpt.get('access_token'))
    }
    params = {
        'filter': 'userName co "{}"'.format(email)
    }

    r = requests.get(url, params=params, headers=headers)

    if 200 <= r.status_code < 300:
        response = r.json()
        total_results = response.get('totalResults')
        if total_results:
            return True
        else:
            return False

    raise e.ScimError(
        'Unexpected SCIM response while checking if email - {} exists \n\n {}'
        .format(
            email, r.text
        )
    )


def get_user(idp_uuid):
    """
    Get user data from IDP with UUID

    :param idp_uuid: INUM on IDP
    :return: A dictionary containing the user's details
    """
    config = Configuration.load()
    url = '{}/identity/restv1/scim/v2/Users/{}'.format(
        config.op_host, idp_uuid
    )

    ticket = get_resource_ticket(url)
    rpt = obtain_rpt(ticket)

    if not rpt or not rpt.get('access_token'):
        raise e.InvalidRpt('Could not get rpt from ticket {}'.format(ticket))

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {}'.format(rpt.get('access_token'))
    }

    r = requests.get(url, headers=headers)

    if 200 <= r.status_code < 300:
        response = r.json()
        return response

    raise e.ScimError(
        'Unexpected SCIM response while getting details of user - {} \n\n {}'
        .format(
            idp_uuid, r.text
        )
    )
