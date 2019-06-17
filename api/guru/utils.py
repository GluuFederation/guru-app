import hmac
import binascii
import hashlib

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.utils.six import text_type

from info.models import UserRole


def get_base_url():
    site = Site.objects.get_current()
    return '{}://{}'.format(settings.PROTOCOL, site.domain)


def send_mail(
        subject_template, email_template, context, to_email,
        html_template=None, from_email=settings.EMAIL_FROM, attachments=None):

    subject = loader.render_to_string(subject_template, context)
    subject = ''.join(subject.splitlines())
    body = loader.render_to_string(email_template, context)

    if not isinstance(to_email, list):
        to_email = [to_email]

    if settings.LIVE_TEST_EMAIL:
        e_message = EmailMultiAlternatives(
            subject, body, from_email, settings.TEST_EMAIL_RECIPIENTS
        )
    else:
        e_message = EmailMultiAlternatives(
            subject, body, from_email, to_email
        )

    if html_template is not None:
        html_email = loader.render_to_string(html_template, context)
        e_message.attach_alternative(html_email, 'text/html')

    if attachments:
        for attachment in attachments:
            e_message.attach(
                attachment.get('filename', 'Download'),
                attachment['content'],
                attachment.get('type', 'application/pdf')
            )

    e_message.send()


def generate_hash(string):
    if not isinstance(string, (str, text_type)):
        string = str(string)

    return hmac.new(
        binascii.unhexlify(settings.HEX_KEY),
        string.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
