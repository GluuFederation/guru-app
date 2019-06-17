from django.apps import apps
from django.db.models import Q
from django.urls import reverse
from django.utils.http import urlencode

from guru.utils import get_base_url


def generate_ticket_link(ticket_slug, subscribe=None):
    ticket_url = reverse('tickets:ticket-detail', kwargs={'slug': ticket_slug})

    if subscribe is not None:
        query_kwargs = {
            'subscribe': subscribe
        }
        ticket_url = '{}?{}'.format(ticket_url, urlencode(query_kwargs))

    return '{}{}'.format(get_base_url(), ticket_url)


def get_tickets_query(user):
    if user.is_authenticated:
        if user.is_superuser:
            return Q()

        if user.is_staff:
            user_role_model = apps.get_model('info', 'UserRole')
            staff_role = user_role_model.objects.get(name='staff')

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
        user_role_model = apps.get_model('info', 'UserRole')
        staff_role = user_role_model.objects.get(name='staff')

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
