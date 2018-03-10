from django.contrib import admin

from deck.models import Deck


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'user',
        'kind',
        'cards',
        'avg_elixir',
        'created',
    )
    list_filter = [
        'user',
        'kind',
        'created',
    ]
    search_fields = [
        'name',
    ]
