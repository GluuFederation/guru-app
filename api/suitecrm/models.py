from django.db import models
from django.utils.translation import ugettext_lazy as _


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
