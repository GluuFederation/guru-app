import hmac
import binascii
import hashlib
from django.db.models import Q
from django.urls import reverse
from django.conf import settings
from django.contrib.sites.models import Site
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.utils.http import urlencode
from django.utils.six import text_type

from info.models import UserRole


def get_base_url():
    site = Site.objects.get_current()

    return '{}://{}'.format(settings.PROTOCOL, site.domain)


def generate_ticket_link(ticket_slug, subscribe=None):
    ticket_url = reverse('tickets:ticket-detail', kwargs={'slug': ticket_slug})

    if subscribe is not None:
        query_kwargs = {
            'subscribe': subscribe
        }
        ticket_url = '{}?{}'.format(ticket_url, urlencode(query_kwargs))

    return '{}{}'.format(get_base_url(), ticket_url)


def send_mail(
        subject_template, email_template, context, to_email,
        html_template=None, from_email=settings.EMAIL_FROM, attachments=None):

    subject = loader.render_to_string(subject_template, context)
    subject = ''.join(subject.splitlines())
    body = loader.render_to_string(email_template, context)

    if not isinstance(to_email, list):
        to_email = [to_email]

    e_message = EmailMultiAlternatives(
        subject,
        body,
        from_email,
        to_email
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


def get_tickets_query(user):
    if user.is_authenticated:
        if user.is_superuser:
            return Q()

        if user.is_staff:
            staff_role = UserRole.objects.get(name='staff')

            if staff_role.has_permission(
                app_name='tickets',
                model_name='Ticket',
                action='list'
            ):
                return Q()

        queries = Q(company_association=None)
        companies = user.companies
        for company in companies:
            role = user.membership_set.filter(company=company).first().role

            if role.has_permission(
                app_name='tickets',
                model_name='Ticket',
                action='list'
            ):
                queries |= Q(company_association=company)

        return queries

    return Q(company_association=None, is_private=False)


def get_ticket_creatable_companies(user):
    if user.is_superuser:
        return Q()

    if user.is_staff:
        staff_role = UserRole.objects.get(name='staff')

        if staff_role.has_permission(
            app_name='tickets',
            model_name='Ticket',
            action='create'
        ):
            return Q()

    queries = Q(pk=0)

    for company in user.companies:
        role = user.membership_set.filter(company=company).first().role

        if role.has_permission(
            app_name='tickets',
            model_name='Ticket',
            action='create'
        ):
            queries |= Q(pk=company.id)

    return queries
