from django.apps import apps
from django.core.validators import URLValidator, EmailValidator
from django.core.exceptions import ValidationError
from django_countries.fields import Country

from suitecrm import interface as si
from billing import constants as c


def load_all_accounts():
    page_number = 1
    total_pages = 1
    validate_url = URLValidator()
    crm_account_model = apps.get_model('suitecrm', 'CrmAccount')
    address_model = apps.get_model('profiles', 'Address')

    while page_number <= total_pages:
        response = si.get_all_accounts_by_page(page_number)
        total_pages = response.get('meta', {}).get('total-pages', 1)
        data = response.get('data', [])

        for item in data:
            account_id = item.get('id')
            attr = item.get('attributes', {})
            website = attr.get('website', '')
            name = attr.get('name', '')
            support_plan = attr.get('support_plan_c', '')
            line_1 = attr.get('billing_address_street', '')
            line_2 = attr.get('billing_address_street_2', '')
            city = attr.get('billing_address_city', '')
            state = attr.get('billing_address_state', '')
            zip_code = attr.get('billing_address_postalcode', '')
            country = attr.get('billing_address_country', '')[:2]

            if not account_id:
                continue

            if not support_plan:
                support_plan = 'community'
            elif not support_plan == 'partner':
                support_plan = 'vip-' + support_plan

            account, _ = crm_account_model.objects.get_or_create(
                crm_id=account_id
            )
            account.name = name
            account.plan = support_plan

            has_address = (
                bool(line_1) or bool(line_2) or bool(city) or bool(state) or
                bool(zip_code) or bool(country)
            )

            if has_address:
                if account.address:
                    address = account.address
                    address.line_1 = line_1
                    address.line_2 = line_2
                    address.city = city
                    address.state = state
                    address.country = Country(code=country)
                    address.save()
                else:
                    address, _ = address_model.objects.get_or_create(
                        line_1=line_1,
                        line_2=line_2,
                        city=city,
                        state=state,
                        zip_code=zip_code,
                        country=Country(code=country)
                    )
                    account.address = address

            try:
                validate_url(website)
                account.website = website
            except ValidationError:
                pass

            account.save()

        page_number += 1


def load_all_contacts():
    page_number = 1
    total_pages = 1
    validate_email = EmailValidator()
    crm_contact_model = apps.get_model('suitecrm', 'CrmContact')
    crm_account_model = apps.get_model('suitecrm', 'CrmAccount')
    crm_email_model = apps.get_model('suitecrm', 'CrmEmail')
    address_model = apps.get_model('profiles', 'Address')

    while page_number <= total_pages:
        response = si.get_all_contacts_by_page(page_number)
        total_pages = response.get('meta', {}).get('total-pages', 1)
        data = response.get('data', [])

        for item in data:
            contact_id = item.get('id')
            attr = item.get('attributes', {})
            first_name = attr.get('first_name', '')
            last_name = attr.get('last_name', '')
            line_1 = attr.get('primary_address_street', '')
            line_2 = attr.get('primary_address_street_2', '')
            city = attr.get('primary_address_city', '')
            state = attr.get('primary_address_state', '')
            zip_code = attr.get('primary_address_postalcode', '')
            country = attr.get('primary_address_country', '')[:2]
            email_1 = attr.get('email1', '')
            email_2 = attr.get('email2', '')
            account_id = attr.get('account_id', '')

            if not contact_id or not account_id:
                continue

            try:
                account = crm_account_model.objects.get(
                    crm_id=account_id
                )
            except crm_account_model.DoesNotExist:
                continue

            contact, _ = crm_contact_model.objects.get_or_create(
                crm_id=contact_id
            )
            contact.first_name = first_name
            contact.last_name = last_name
            contact.account = account

            has_address = (
                bool(line_1) or bool(line_2) or bool(city) or bool(state) or
                bool(zip_code) or bool(country)
            )

            if has_address:
                if contact.address:
                    address = contact.address
                    address.line_1 = line_1
                    address.line_2 = line_2
                    address.city = city
                    address.state = state
                    address.country = Country(code=country)
                    address.save()
                else:
                    address, _ = address_model.objects.get_or_create(
                        line_1=line_1,
                        line_2=line_2,
                        city=city,
                        state=state,
                        zip_code=zip_code,
                        country=Country(code=country)
                    )
                    contact.address = address

            contact.save()

            try:
                validate_email(email_1)
                crm_email_model.objects.get_or_create(
                    contact=contact,
                    email=email_1
                )
            except ValidationError:
                pass

            try:
                validate_email(email_2)
                crm_email_model.objects.get_or_create(
                    contact=contact,
                    email=email_2
                )
            except ValidationError:
                pass

        page_number += 1


def sync_account_with_companies():
    crm_account_model = apps.get_model('suitecrm', 'CrmAccount')
    company_model = apps.get_model('profiles', 'Company')
    vip_plans = [
        c.ENTERPRISE,
        c.PARTNER,
        c.PREMIUM,
        c.STANDARD,
        c.VIP
    ]

    for company in company_model.objects.all():
        if company.crm_id:
            continue

        crm_companies = crm_account_model.objects.filter(
            name=company.name
        )
        is_vip_company = company.plan in vip_plans
        if crm_companies.count() == 1 and is_vip_company:
            crm_company = crm_companies[0]
            company.website = crm_company.website
            company.crm_id = crm_company.crm_id
            company.plan = crm_company.plan
            company.save()

    for crm_company in crm_account_model.objects.filter(
        plan__in=vip_plans
    ):
        try:
            company_model.objects.get(crm_id=crm_company.crm_id)
        except company_model.DoesNotExist:
            company_model.objects.create(
                name=crm_company.name,
                crm_id=crm_company.crm_id,
                website=crm_company.website,
                plan=crm_company.plan,
                address=crm_company.address
            )
