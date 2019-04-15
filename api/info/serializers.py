from rest_framework import serializers
from info import models as m


class GluuProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.GluuProduct
        fields = '__all__'


class TicketCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = m.TicketCategory
        fields = '__all__'


class TicketIssueTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.TicketIssueType
        fields = '__all__'


class TicketStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.TicketStatus
        fields = '__all__'


class UserRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.UserRole
        fields = [
            'name', 'permissions'
        ]


class PermissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.Permission
        fields = '__all__'
