from django.apps import apps


def create_sample_tickets():
    ticket_model = apps.get_model('tickets', 'Ticket')
    user_model = apps.get_model('profiles', 'User')
    category_model = apps.get_model('info', 'TicketCategory')
    issue_model = apps.get_model('info', 'TicketIssueType')
    status_model = apps.get_model('info', 'TicketStatus')

    creator = user_model.objects.get(pk=1)
    category = category_model.objects.get(slug='customization')
    issue = issue_model.objects.get(slug='minor-issue')
    status = status_model.objects.get(slug='new')

    ticket1 = ticket_model.objects.create(
        title='Test ticket 1',
        body='This is the body. <b> This is bold </b>',
        created_by=creator,
        category=category,
        issue_type=issue,
        status=status,
        gluu_server='3.1.6',
        os='CentOS',
        os_version='7',
    )
