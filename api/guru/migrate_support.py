import json

from django.apps import apps
from django.utils import timezone

from billing import constants as c


def load_old_data(filename):
    data = []
    f = open(filename, 'r')
    data = json.load(f)
    f.close()

    company_model = apps.get_model('profiles', 'Company')
    user_model = apps.get_model('profiles', 'User')
    membership_model = apps.get_model('profiles', 'Membership')
    role_model = apps.get_model('info', 'UserRole')
    category_model = apps.get_model('info', 'TicketCategory')
    product_model = apps.get_model('info', 'GluuProduct')
    issue_model = apps.get_model('info', 'TicketIssueType')
    status_model = apps.get_model('info', 'TicketStatus')
    ticket_model = apps.get_model('tickets', 'Ticket')
    answer_model = apps.get_model('tickets', 'Answer')
    ticket_product_model = apps.get_model('tickets', 'TicketProduct')
    history_model = apps.get_model('tickets', 'TicketHistory')
    document_model = apps.get_model('tickets', 'Document')
    attachment_model = apps.get_model('tickets', 'Attachment')

    companies = {}
    users = {}
    tickets = {}

    for item in data:
        model = item.get('model', '').lower()
        if model == 'profiles.company':
            fields = item.get('fields', {})
            name = fields.get('name', '')
            created_on = fields.get('created', timezone.now())
            plan = fields.get('support_plan', '').lower()
            entitlements = fields.get('entitlements', '')
            support_hours = 0
            named_contacts = 0
            review_hours = 0
            try:
                entitlements = json.loads(entitlements)
                support_hours = entitlements.get('support_hours', 0)
                named_contacts = entitlements.get('named_contacts', 0)
                review_hours = entitlements.get('review_hours', 0)
            except ValueError:
                pass
            except KeyError:
                pass
            except AttributeError:
                pass

            if not name:
                continue

            try:
                company = company_model.objects.get(name=name)
                company.created_on = created_on
                company.plan = plan
                company.review_hours = review_hours
                company.named_contacts = named_contacts
                company.support_hours = support_hours
                company.save()
            except company_model.DoesNotExist:
                company = company_model.objects.create(
                    name=name,
                    created_on=created_on,
                    plan=plan,
                    support_hours=support_hours,
                    named_contacts=named_contacts,
                    review_hours=review_hours
                )

            companies[str(item.get('pk'))] = str(company.id)

        if model == 'profiles.userprofile':
            fields = item.get('fields', {})
            try:
                user = user_model.objects.create_user(
                    first_name=fields.get('first_name', ''),
                    last_name=fields.get('last_name', ''),
                    job_title=fields.get('job_title', ''),
                    phone_number=fields.get('mobile_number', ''),
                    email=fields.get('email', ''),
                    is_staff=fields.get('is_staff', ''),
                    is_active=fields.get('is_active', ''),
                    created_on=fields.get('date_joined', ''),
                    updated_on=fields.get('modified', ''),
                    idp_uuid=fields.get('idp_uuid', ''),
                    crm_id=fields.get('crm_uuid', ''),
                    timezone=fields.get('timezone', ''),
                    is_verified=True,
                )
            except ValueError:
                continue
            users[str(item.get('pk'))] = str(user.id)

            company_name = fields.get('company')
            crm_type = fields.get('crm_type')
            company_old_id = str(fields.get('company_association'))
            company_id = companies.get(company_old_id)
            try:
                company = company_model.objects.get(
                    pk=company_id
                )
                membership, _ = membership_model.objects.get_or_create(
                    user=user,
                    company=company
                )
                role = role_model.objects.get(name=crm_type)
                membership.role = role
                membership.is_primary = True
                membership.save()
            except role_model.DoesNotExist:
                pass
            except company_model.DoesNotExist:
                try:
                    company = company_model.objects.get(name=company_name)
                    membership, _ = membership_model.objects.get_or_create(
                        user=user,
                        company=company
                    )
                    role = role_model.objects.get(name='community')
                    membership.role = role
                    membership.is_primary = True
                    membership.save()
                except role_model.DoesNotExist:
                    pass
                except company_model.DoesNotExist:
                    pass

        if model == 'tickets.ticket':
            fields = item.get('fields', {})
            old_cat = fields.get('ticket_category', '')
            new_cat = ''
            if old_cat == 'OUTAGE':
                new_cat = 'outages'
            elif old_cat == 'IDNTY':
                new_cat = 'identity-management'
            elif old_cat == 'SSO':
                new_cat = 'sso'
            elif old_cat == 'MFA':
                new_cat = 'authentication'
            elif old_cat == 'ACCESS':
                new_cat = 'access-management'
            elif old_cat == 'CUSTOM':
                new_cat = 'customization'
            elif old_cat == 'FEATURE':
                new_cat = 'feature-request'
            elif old_cat == 'INSTALLATION':
                new_cat = 'installation'
            elif old_cat == 'UPGRADE':
                new_cat = 'upgrade'
            elif old_cat == 'MAINTENANCE':
                new_cat = 'maintenance'
            elif old_cat == 'OTHER':
                new_cat = 'other'
            elif old_cat == 'LOGOUT':
                new_cat = 'logout'
            else:
                new_cat = 'other'

            category = category_model.objects.get(slug=new_cat)

            old_status = fields.get('status', '')
            status = status_model.objects.get(slug=old_status)

            old_issue = fields.get('issue_type', '')
            new_issue = ''
            if old_issue == 'outage':
                new_issue = 'production-outage'
            elif old_issue == 'impaired':
                new_issue = 'production-impaired'
            elif old_issue == 'pre_production':
                new_issue = 'pre-production-issue'
            elif old_issue == 'minor':
                new_issue = 'minor-issue'
            elif old_issue == 'new_development':
                new_issue = 'new-development-issue'

            try:
                issue_type = issue_model.objects.get(slug=new_issue)
            except issue_model.DoesNotExist:
                issue_type = None

            created_by = user_model.objects.get(
                pk=users[str(fields.get('created_by'))]
            )
            try:
                created_for = user_model.objects.get(
                    pk=users.get(str(fields.get('created_for')))
                )
            except user_model.DoesNotExist:
                created_for = None

            try:
                company = company_model.objects.get(
                    pk=companies.get(
                        str(fields.get('company_association'))
                    )
                )
            except company_model.DoesNotExist:
                company = None

            try:
                modified_by = user_model.objects.get(
                    pk=users.get(str(fields.get('modified_by')))
                )
            except user_model.DoesNotExist:
                modified_by = None

            try:
                assigned_to = user_model.objects.get(
                    pk=users.get(str(fields.get('assigned_to')))
                )
            except user_model.DoesNotExist:
                assigned_to = None
            is_private = fields.get('is_private', False)
            is_deleted = fields.get('is_deleted', False)
            created_on = fields.get('date_added')
            updated_on = fields.get('date_modified')
            os = fields.get('os_name', '')
            os_version = fields.get('os_version', '')
            if os_version is None:
                os_version = ''
            gluu_server = fields.get('gluu_server_version')
            title = fields.get('title')
            body = fields.get('description')

            ticket = ticket_model.objects.create(
                title=title,
                body=body,
                created_by=created_by,
                created_for=created_for,
                company_association=company,
                updated_by=modified_by,
                assignee=assigned_to,
                category=category,
                status=status,
                issue_type=issue_type,
                gluu_server=gluu_server,
                os=os,
                os_version=os_version,
                is_private=is_private,
                is_deleted=is_deleted,
                created_on=created_on,
                updated_on=updated_on
            )
            tickets[str(item.get('pk'))] = str(ticket.id)

        if model == 'tickets.ticketproduct':
            fields = item.get('fields', {})
            ticket = ticket_model.objects.get(
                pk=tickets[str(fields.get('ticket'))]
            )
            old_product = fields.get('product')

            new_product = None
            if old_product == 'Oxd':
                new_product = product_model.objects.get(
                    name='OXD'
                )
            elif old_product == 'Super Gluu':
                new_product = product_model.objects.get(
                    name='Super Gluu'
                )
            elif old_product == 'Cluster':
                new_product = product_model.objects.get(
                    name='Cluster Manager'
                )
            elif old_product == 'Cred Manager':
                new_product = product_model.objects.get(
                    name='Cred Manager'
                )
            elif old_product == 'Gluu Gateway':
                new_product = product_model.objects.get(
                    name='Gluu Gateway'
                )
            elif old_product == 'Gluu Casa':
                new_product = product_model.objects.get(
                    name='Gluu Casa'
                )

            version = fields.get('product_version')
            os = fields.get('product_os_version')
            os_version = fields.get('product_os_version_name')
            ticket_product_model.objects.get_or_create(
                ticket=ticket,
                product=new_product,
                version=version,
                os=os,
                os_version=os_version,
            )

        if model == 'tickets.answer':
            fields = item.get('fields', {})
            ticket = ticket_model.objects.get(
                pk=tickets[str(fields.get('ticket'))]
            )
            created_by = user_model.objects.get(
                pk=users[str(fields.get('created_by'))]
            )
            body = fields.get('answer', '').replace('\x00', '')
            is_deleted = fields.get('is_deleted', False)
            answer_model.objects.create(
                ticket=ticket,
                body=body,
                created_by=created_by,
                is_deleted=is_deleted
            )

        if model == 'tickets.ticketalerts':
            fields = item.get('fields', {})
            try:
                ticket = ticket_model.objects.get(
                    pk=tickets[str(fields.get('ticket'))]
                )
                subscriber = user_model.objects.get(
                    pk=users[str(fields.get('user'))]
                )
                ticket.subscribers.add(subscriber)
                ticket.save()
            except user_model.DoesNotExist:
                print('Missing User in ', item)
            except KeyError:
                print('KeyError in ', item)
            except ticket_model.DoesNotExist:
                print('Missing ticket in ', item)

        if model == 'tickets.tickethistory':
            fields = item.get('fields', {})
            try:
                ticket = ticket_model.objects.get(
                    pk=tickets[str(fields.get('ticket'))]
                )
                changed_by = user_model.objects.get(
                    pk=users[str(fields.get('created_by'))]
                )
                changed_field = fields.get('field_name', '')
                before_value = fields.get('before_value', '')
                after_value = fields.get('after_value', '')
                created_on = fields.get('date_added')

                history_model.objects.create(
                    ticket=ticket,
                    changed_by=changed_by,
                    changed_field=changed_field,
                    before_value=before_value,
                    after_value=after_value,
                    created_on=created_on,
                )
            except KeyError:
                print('KeyError in ', item)
            except ticket_model.DoesNotExist:
                print('Missing ticket in ', item)
            except user_model.DoesNotExist:
                print('Missing user in ', item)
