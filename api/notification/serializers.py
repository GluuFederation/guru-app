from rest_framework import serializers
from notification import models as m
from info.models import TicketCategory, TicketIssueType


class NotificationSettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.NotificationSetting
        fields = [
            'category', 'issue_type'
        ]

    def validate_category(self, id_list):
        for category_id in id_list:
            if not TicketCategory.objects.filter(pk=category_id).exists():
                raise serializers.ValidationError(
                    'Invalid category id'
                )
        return id_list

    def validate_issue_type(self, id_list):
        for type_id in id_list:
            if not TicketIssueType.objects.filter(pk=type_id).exists():
                raise serializers.ValidationError(
                    'Invalid type id'
                )
        return id_list
