import json
import logging

from django.core.management.base import BaseCommand
import requests

from oxd.models import Configuration


logger = logging.getLogger('django')


class Command(BaseCommand):
    """
    Setup oxd client from oxd configuration in oxd.Configuration model.
    """

    def handle(self, *args, **options):
        config = Configuration.load()
        data = config.get_request_data()
        headers = {
            'Content-Type': 'application/json'
        }
        r = requests.post(
            '{}/setup-client'.format(config.oxd_host),
            data=json.dumps(data),
            headers=headers
        )

        if 200 <= r.status_code < 300:
            response = r.json().get('data', {})
            config.update_from_response(response)

            logger.info('Setup client successfully')
        else:
            logger.error('Error setting up client {}'.format(r.text))
