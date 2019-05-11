from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

from guru.models import TimestampedModel
from billing import constants as c


class Account(TimestampedModel):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    company = models.OneToOneField(
        'profiles.Company',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    plan = models.CharField(
        _('support plan'),
        max_length=25,
        choices=c.GURU_PLAN_CHOICES,
        default=c.COMMUNITY
    )

    name = models.CharField(
        _('name'),
        max_length=255
    )

    idp_uuid = models.TextField(
        _('idp uuid')
    )
