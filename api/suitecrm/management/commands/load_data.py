import logging

from django.core.management.base import BaseCommand, CommandError

from suitecrm import utils as u


class Command(BaseCommand):
    help = 'Loads all account and contact data from SuiteCRM'

    def handle(self, *args, **options):
        logger = logging.Logger('django')
        u.load_all_accounts()
        u.load_all_contacts()
        u.sync_account_with_companies()

        logger.info('Accounts Loaded successfully')
