from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.forms import UserCreationForm

from profiles.models import User, Company, Invitation, Membership


class GluuUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email',)


@admin.register(User)
class GluuUserAdmin(UserAdmin):
    list_display = (
        'id', 'email', 'first_name',
        'last_name', 'is_staff', 'is_active'
    )
    ordering = ('-id',)
    search_fields = ('email',)
    readonly_fields = ('created_on',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            'Personal info',
            {
                'fields': (
                    'first_name', 'last_name', 'phone_number', 'timezone'
                )
            }
        ),
        ('Permissions', {'fields': ('is_staff', 'is_verified')}),
        (
            'Additional Info',
            {'fields': ('is_active', 'date_joined', 'idp_uuid')}
        ),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    filter_horizontal = ()
    list_filter = ()
    add_form = GluuUserCreationForm


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    pass


@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'email', 'role', 'company', 'invited_by'
    )


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    pass


admin.site.unregister(Group)
