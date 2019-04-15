from django.contrib import admin
from info import models as m


@admin.register(m.GluuProduct)
class GluuProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'version', 'os')


@admin.register(m.TicketIssueType)
class TicketIssueTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'priority')


@admin.register(m.TicketCategory)
class TicketCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')


@admin.register(m.TicketStatus)
class TicketStatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')


@admin.register(m.UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(m.Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'app_name', 'model_name', 'actions', 'description')
