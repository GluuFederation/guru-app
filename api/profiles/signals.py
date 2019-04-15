from django.dispatch import receiver
from django.db.models.signals import post_save
from notification.notifications import notify_invite
from profiles.models import Invitation


@receiver(post_save, sender=Invitation)
def invitation_saved(sender, instance, created, **kwargs):
    if not created:
        return

    notify_invite(instance)
