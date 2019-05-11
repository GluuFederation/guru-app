from rest_framework import serializers

from billing import models as m


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.Account
        fields = [
            'id', 'user', 'company', 'plan'
        ]
