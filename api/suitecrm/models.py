from django.db import models
from django.utils.translation import ugettext_lazy as _

from billing import constants as bc


class Configuration(models.Model):

    host = models.URLField(
        _('host'),
        blank=True
    )
    client_id = models.TextField(
        _('client id'),
        blank=True
    )
    client_secret = models.TextField(
        _('client secret'),
        blank=True
    )
    access_token = models.TextField(
        _('access token'),
        blank=True
    )
    access_token_expiry = models.DateTimeField(
        _('access token expiry date'),
        blank=True,
        null=True
    )
    created_on = models.DateTimeField(
        _('created on'),
        auto_now_add=True
    )
    last_update = models.DateTimeField(
        _('last login'),
        auto_now=True
    )

    @classmethod
    def load(cls):
        """Always fetch object with pk 1. Create it if it doesn't exist"""
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def save(self, *args, **kwargs):
        """Override save method by overriding pk value with 1"""
        self.pk = 1
        super(Configuration, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Make it impossible to delete object"""
        pass


class CrmAccount(models.Model):
    crm_id = models.CharField(
        _('crm id'),
        max_length=150,
        unique=True
    )
    name = models.CharField(
        _('name'),
        max_length=150
    )
    address = models.ForeignKey(
        'profiles.Address',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    website = models.URLField(
        _('website'),
        blank=True
    )
    plan = models.CharField(
        _('support plan'),
        max_length=25,
        choices=bc.GURU_PLAN_CHOICES,
        default=bc.COMMUNITY
    )

    def __str__(self):
        return '{} - {}'.format(
            self.name, self.crm_id
        )


class CrmContact(models.Model):
    crm_id = models.CharField(
        _('crm id'),
        max_length=150,
        unique=True
    )
    account = models.ForeignKey(
        CrmAccount,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    first_name = models.CharField(
        _('crm id'),
        max_length=150
    )
    last_name = models.CharField(
        _('crm id'),
        max_length=150
    )
    address = models.ForeignKey(
        'profiles.Address',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    def __str__(self):
        return '{} {} - {}'.format(
            self.first_name, self.last_name,
            self.crm_id
        )


class CrmEmail(models.Model):
    contact = models.ForeignKey(
        CrmContact,
        on_delete=models.CASCADE,
        related_name='emails'
    )
    email = models.EmailField(
        _('crm id'),
        unique=True
    )

    def __str__(self):
        return '{} - {}'.format(
            self.email, str(self.contact)
        )
