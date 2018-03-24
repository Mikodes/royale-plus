from django.contrib import admin

from tournament.models import Tournament


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'prize',
        'created',
    )
    search_fields = (
        'name',
        'prize',
        'created',
    )
