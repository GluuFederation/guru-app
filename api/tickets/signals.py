import re
from django.dispatch import receiver
from django.db.models.signals import post_save
from fieldsignals import pre_save_changed

from tickets.models import Ticket, Answer
from notification.notifications import (
    notify_new_ticket, notify_ticket_assigned, notify_ticket_reopened,
    notify_new_answer, notify_tagged_staff_member
)
from profiles.models import User


@receiver(post_save, sender=Ticket)
def ticket_saved(sender, instance, created, **kwargs):
    if not created:
        return

    notify_new_ticket(instance)


@receiver(
    pre_save_changed, sender=Ticket,
    fields=[
        'assignee', 'status', 'is_deleted', 'issue_type',
        'title', 'body', 'created_for'
    ]
)
def ticket_fields_monitor(sender, instance, changed_fields=None, **kwargs):
    context = {}
    updated_by = (
        instance.updated_by if instance.updated_by else instance.created_by
    )

    for field, (old, new) in changed_fields.items():
        context[field.name] = (old, new)
        instance.history.create(
            changed_by=updated_by,
            changed_field=field.name,
            before_value=old,
            after_value=new
        )

    if 'assignee' in context:
        notify_ticket_assigned(instance, updated_by)

    if 'status' in context and context['status'][0] == 'close':
        notify_ticket_reopened(instance, updated_by)


@receiver(post_save, sender=Answer)
def answer_saved(sender, instance, created, **kwargs):

    instance.ticket.response_no += 1
    instance.ticket.save()

    if not created:
        return

    # Create Ticket History
    instance.ticket.history.create(
        changed_by=instance.created_by,
        changed_field='answer',
        after_value=instance.body[:30]
    )

    notify_new_answer(instance)

    to_emails = []
    tagged_users = re.findall(r'@[\w\.-]+', instance.body)
    for tagged_user in tagged_users:
        name = tagged_user.replace('@', '').split('.')
        emails = User.objects.filter(
            first_name__icontains=name[0],
            last_name__icontains=name[1]
        ).values_list('email', flat=True)

        to_emails += list(emails)

    notify_tagged_staff_member(instance, to_emails)


@receiver(pre_save_changed, sender=Answer, fields=['is_deleted', 'body'])
def answer_fields_monitor(sender, instance, changed_fields=None, **kwargs):
    updated_by = (
        instance.updated_by if instance.updated_by else instance.created_by
    )

    for field, (old, new) in changed_fields.items():
        instance.ticket.history.create(
            changed_by=updated_by,
            changed_field='answer' if field.name == 'body' else field.name,
            before_value=old if field.name == 'is_deleted' else old[:30],
            after_value=new if field.name == 'is_deleted' else new[:30],
        )
