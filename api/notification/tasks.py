from datetime import timedelta
from django.conf import settings
from django.utils import timezone
from twilio.rest import Client
from guru.utils import send_mail, generate_ticket_link
from notification.models import SMSContact
# from tickets.constants import NOTIFICATION_DELAY_TIME, SLA_MATRIX
from tickets.models import Ticket


def send_notification_by_email(context):
    subject_template = context['subject_template']
    email_template = context['email_template']
    html_template = context['html_template']
    email_context = context['context']
    to_email = context['to_email']

    send_mail(
        subject_template=subject_template,
        email_template=email_template,
        html_template=html_template,
        context=email_context,
        to_email=to_email
    )


def send_sms():
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    contacts = SMSContact.actives.all()
    if not len(contacts):
        return

    tickets = Ticket.actives.filter(
        issue_type__in=['outage', 'impaired'],
        status__in=['pending', 'inprogress', 'assigned', 'new'],
        is_notified=False,
    )

    for ticket in tickets:
        if len(ticket.answers.all()):
            continue

        issue_type = ticket.issue_type
        support_plan = 'Basic'
        # delay_time = NOTIFICATION_DELAY_TIME[issue_type][support_plan]
        delay_time = 30
        time_diff = timezone.now() - ticket.created_on

        if time_diff > timedelta(minutes=delay_time):

            text = """{} from {} has just opened a {} on Gluu support: {}
            Please respond ASAP.
            Thanks! - Gluu Team
            """.format(
                ticket.created_by.full_name, ticket.created_by.company_name,
                ticket.issue_type, generate_ticket_link(ticket.slug)
            )

            for contact in contacts:
                text = 'Hello ' + contact.name + ', ' + text
                message = client.messages.create(
                    to=contact.number,
                    from_="+1 707 229 1094",
                    body=text
                )

                if message.sid and not ticket.is_notified:
                    ticket.is_notified = True
                    ticket.save()


def email_reminder():
    tickets = Ticket.actives.filter(
        status__name__in=['assigned', 'new'],
    )

    for ticket in tickets:
        # if ticket.owned_by.is_basic:
        #     continue

        support_plan = 'Basic'
        # delay_time = SLA_MATRIX[support_plan][ticket.issue_type]
        delay_time = 30
        time_diff = timezone.now() - ticket.updated_on

        if time_diff > timedelta(minutes=delay_time):
            context = {
                'ticket': ticket,
                'ticket_link': generate_ticket_link(ticket.slug),
                'support_plan': support_plan
            }

            send_mail(
                subject_template='reminder/new_ticket_sub.txt',
                email_template='reminder/new_ticket.txt',
                html_template='reminder/new_ticket.html',
                context=context,
                to_email=settings.NOTIFICATIONS_RECIPIENT
            )
