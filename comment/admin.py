from django.contrib import admin

from comment.models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'comment',
        'kind',
        'target',
        'created',
    )
    list_filter = [
        'kind',
    ]
    search_fields = [
        'user',
        'comment',
        'kind',
        'target',
        'created',
    ]
