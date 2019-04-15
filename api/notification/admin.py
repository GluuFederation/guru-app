from django import forms
from django.contrib import admin
from notification.models import SMSContact, ResponseTime


@admin.register(SMSContact)
class SMSContactAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'number', 'is_active', 'created_on'
    )


class ResponseTimeAdminForm(forms.ModelForm):

    SUPPORT_PLAN = (
        ('', 'Select a plan'),
        ('basic', 'Basic'),
        ('partner', 'Partner'),
        ('premium', 'Premium'),
        ('enterprise', 'Enterprise'),
    )

    ISSUE_TYPE = (
        ('', 'Select issue type'),
        ('outage', 'Outage'),
        ('impaired', 'Impaired'),
        ('pre_production', 'Pre Production'),
        ('minor', 'Minor'),
        ('new_development', 'New Development'),
    )

    support_plan = forms.ChoiceField(choices=SUPPORT_PLAN)
    issue_type = forms.ChoiceField(choices=ISSUE_TYPE)

    class Meta:
        model = ResponseTime
        fields = '__all__'


@admin.register(ResponseTime)
class ResponseTimeAdmin(admin.ModelAdmin):
    list_display = (
        'support_plan', 'issue_type', 'response_time'
    )
    form = ResponseTimeAdminForm
