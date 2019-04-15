from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import (
    Ticket, TicketHistory, Answer
)


class TicketsHistoryInlineAdmin(admin.StackedInline):
    model = TicketHistory
    extra = 0

    fieldsets = (
        (_('Base'), {'fields': (
            ('changed_by', 'changed_field'),
            ('before_value', 'after_value'))}),
    )

    def has_add_permission(self, request, obj=None):
        return False


class AnswerInlineAdmin(admin.StackedInline):
    model = Answer
    extra = 0
    list_display = ('created_by', 'created_at', 'is_deleted')

    fieldsets = (
        (_('Base'), {'fields': (
            ('created_by', 'body'),
            ('is_deleted'))}),
    )

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'slug', 'title', 'status', 'issue_type', 'created_by',
        'assignee', 'updated_by', 'category', 'created_on', 'updated_on'
    )

    search_fields = (
        'status', 'title', 'body'
    )

    list_filter = (
        'category', 'issue_type', 'status', 'is_deleted', 'is_private'
    )

    list_display_links = ['title', ]

    fieldsets = (
        (_('Base'), {
            'fields': (
                ('title'),
                ('body'),
                ('status', 'issue_type', 'category'),
                ('created_by', 'created_for', 'company_association'),
                ('updated_by'),
                ('assignee')
            )
        }),
        (_('Installation Info'), {
            'fields': (
                ('os'),
                ('os_version'),
                ('gluu_server')
            )
        }),
        (_('Status'), {
            'fields': ('is_deleted', 'is_private'),
        })
    )

    inlines = [AnswerInlineAdmin, TicketsHistoryInlineAdmin]

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(TicketHistory)
class TicketHistoryAdmin(admin.ModelAdmin):
    list_display = (
        'ticket', 'changed_by', 'changed_field', 'created_on'
    )

    search_fields = ('ticket', 'chaged_field')

    list_display_links = ['ticket', ]

    readonly_fields = (
        'ticket', 'changed_by', 'changed_field',
        'before_value', 'after_value'
    )

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'ticket', 'created_by', 'created_on',
        'updated_on', 'is_deleted'
    )

    search_fields = ('body',)

    list_filter = ('is_deleted', )

    # list_display_links = ['ticket', ]

    fieldsets = (
        (_('Base'), {'fields': (
            ('body'),
            ('ticket',),
            ('created_by'))}),
        ('Status', {
            'fields': (('is_deleted',),)
        }),
    )

    ordering = ['-id']

    def has_add_permission(self, request, obj=None):
        return False
