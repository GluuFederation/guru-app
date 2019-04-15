from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import ugettext_lazy as _


class Configuration(models.Model):
    """
    Configuration Singleton that holds all information needed
    to connect to an oxd server or a an op_host.
    """

    op_host = models.CharField(
        _('op host'),
        max_length=255,
        blank=True
    )
    oxd_host = models.CharField(
        _('oxd host'),
        max_length=255,
        blank=True
    )
    oxd_id = models.CharField(
        _('oxd id'),
        max_length=255,
        blank=True
    )
    authorization_redirect_uri = models.URLField(
        _('authorization redirect uri'),
        blank=True
    )
    post_logout_redirect_uri = models.URLField(
        _('post logout redirect uri'),
        blank=True
    )
    client_name = models.CharField(
        _('client name'),
        max_length=255,
        blank=True
    )
    client_id = models.CharField(
        _('client id'),
        max_length=255,
        blank=True
    )
    client_secret = models.CharField(
        _('client secret'),
        max_length=255,
        blank=True
    )
    scope = ArrayField(
        models.CharField(max_length=255),
        blank=True
    )
    grant_types = ArrayField(
        models.CharField(max_length=255),
        blank=True
    )
    protection_access_token = models.CharField(
        _('protection access token'),
        max_length=255,
        blank=True
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

    @property
    def created_on_str(self):
        """String format for JSON display of created_on field"""
        return self.created_on.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    @property
    def last_update_str(self):
        """String format for JSON display of last_update field"""
        return self.last_update.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    def save(self, *args, **kwargs):
        """Override save method by overriding pk value with 1"""
        self.pk = 1
        super(Configuration, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Make it impossible to delete object"""
        pass

    def get_request_data(self, params=None):
        """
        Serialize object details in dict for easy conversion to JSON.

        Args:
            params: extra parameters to be included in the dict.

        Returns:
            dict to be converted to JSON.
        """

        data = {
            'authorization_redirect_uri': self.authorization_redirect_uri,
            'op_host': self.op_host,
            'post_logout_redirect_uri': self.post_logout_redirect_uri,
            'grant_types': self.grant_types,
            'scope': self.scope,
            'client_name': self.client_name,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'oxd_id': self.oxd_id,
            'protection_access_token': self.protection_access_token
        }

        if params:
            for (key, value) in params.items():
                data[key] = value

        return data

    def update_from_response(self, data=None):
        """
        Deserialize JSON response from server and save to singelton.

        Args:
            data: JSON response from server.
        """

        if type(data) == dict:
            self.op_host = data.get('op_host', self.op_host)
            self.oxd_id = data.get('oxd_id', self.oxd_id)
            self.authorization_redirect_uri = data.get(
                'authorization_redirect_uri', self.authorization_redirect_uri
            )
            self.post_logout_redirect_uri = data.get(
                'post_logout_redirect_uri', self.post_logout_redirect_uri
            )
            self.client_name = data.get('client_name', self.client_name)
            self.client_id = data.get('client_id', self.client_id)
            self.client_secret = data.get('client_secret', self.client_secret)
            self.scope = data.get('scope', ' '.join(self.scope)).split(' ')
            self.grant_types = data.get(
                'grant_types',
                ' '.join(self.grant_types)
            ).split(' ')
            self.protection_access_token = data.get(
                'access_token', self.protection_access_token
            )
            self.save()


class LoginState(models.Model):
    """Keep login state to make confirm request came from server."""

    state = models.TextField(
        _('state'),
        blank=True
    )
    nonce = models.TextField(
        _('state'),
        blank=True
    )
    created_on = models.DateTimeField(
        _('created on'),
        auto_now_add=True
    )


class LogoutState(models.Model):
    """Keep logout state to make confirm request came from server."""

    state = models.TextField(
        _('state'),
        blank=True
    )
    created_on = models.DateTimeField(
        _('created on'),
        auto_now_add=True
    )
