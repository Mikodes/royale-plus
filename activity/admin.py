from django.contrib import admin

from activity.models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = (
        'issuer',
        'kind',
        'content',
        'created',
    )
    list_filter = [
        'issuer',
        'kind',
        'created',
    ]
