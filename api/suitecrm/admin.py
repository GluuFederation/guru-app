from django.contrib import admin

from suitecrm.models import Configuration, CrmAccount, CrmContact, CrmEmail


class CrmEmailInline(admin.StackedInline):
    model = CrmEmail
    extra = 0
    fields = ['email']


class CrmContactAdmin(admin.ModelAdmin):
    inlines = [CrmEmailInline]


admin.site.register(Configuration)
admin.site.register(CrmAccount)
admin.site.register(CrmEmail)
admin.site.register(CrmContact, CrmContactAdmin)
