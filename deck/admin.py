from django.contrib import admin

from deck.models import Deck


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'user',
        'type',
        'cards',
        'avg_elixir',
        'date_created',
    )
    list_filter = [
        'user',
        'type',
        'date_created',
    ]
    search_fields = [
        'name',
    ]
