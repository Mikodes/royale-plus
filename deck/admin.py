from django.contrib import admin

from deck.models import Deck


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'user',
        'kind',
        'arena',
        'cards',
        'avg_elixir',
        'created',
    )
    list_filter = [
        'user',
        'kind',
        'arena',
        'created',
    ]
    search_fields = [
        'name',
        'kind',
        'arena',
    ]
