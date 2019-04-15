from django import forms
from django.contrib.postgres.forms import SimpleArrayField

from oxd.models import Configuration


class ConfigurationForm(forms.ModelForm):
    """
    Form for editing of Configuration singleton.

    Edit scope and grant type arrays properly.
    """

    scope = SimpleArrayField(
        forms.CharField(max_length=255),
        required=False
    )
    grant_types = SimpleArrayField(
        forms.CharField(max_length=255),
        required=False
    )

    class Meta:
        model = Configuration
        fields = [
            'op_host', 'oxd_host', 'oxd_id', 'authorization_redirect_uri',
            'post_logout_redirect_uri', 'client_name', 'client_id',
            'client_secret', 'scope', 'grant_types', 'protection_access_token'
        ]
