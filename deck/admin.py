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
        'created',
    )
    list_filter = [
        'user',
        'type',
        'created',
    ]
    search_fields = [
        'name',
    ]
