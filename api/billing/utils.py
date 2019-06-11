from django.apps import apps

from suitecrm import interface as i


def set_account_from_id(user, account_id):
    account_model = apps.get_model('billing', 'Account')
    company_model = apps.get_model('profiles', 'Company')
    address_model = apps.get_model('profiles', 'Address')
    membership_model = apps.get_model('profiles', 'Membership')

    crm_account = i.get_account(account_id)['attributes']

    support_plan = crm_account['support_plan_c'].lower()
    if not support_plan:
        support_plan = 'community'
    elif not support_plan == 'partner':
        support_plan = 'vip-' + support_plan

    address, _ = address_model.objects.get_or_create(
        line_1=crm_account['billing_address_street'],
        line_2=crm_account['billing_address_street_2'],
        city=crm_account['billing_address_city'],
        state=crm_account['billing_address_state'],
        zip_code=crm_account['billing_address_postalcode'],
        country=crm_account['billing_address_country'],
    )
    company, _ = company_model.objects.get_or_create(
        name=crm_account['name']
    )
    company.address = address
    company.save()
    membership_model.objects.create(
        company=company,
        user=user,
        is_primary=True
    )
    account = account_model.objects.create(
        company=company,
        plan=support_plan
    )

    return account
