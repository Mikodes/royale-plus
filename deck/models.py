from django.db import models

from account.models import User


class DeckKind:
    NONE = 0
    CYCLE = 1
    SPELL_BAIT = 2
    BEATDOWN = 3
    SPAWNER = 4
    THREE_CROWNS = 5
    CONTROL = 6
    SIEGE = 7


class Deck(models.Model):
    DECK_KIND_CHOICES = (
        (DeckKind.NONE, 'None'),
        (DeckKind.CYCLE, 'Cycle'),
        (DeckKind.SPELL_BAIT, 'Spell Bait'),
        (DeckKind.BEATDOWN, 'Beatdown'),
        (DeckKind.SPAWNER, 'Spawner'),
        (DeckKind.THREE_CROWNS, 'Three Crowns'),
        (DeckKind.CONTROL, 'Control'),
        (DeckKind.SIEGE, 'Siege'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, null=False)
    cards = models.CharField(max_length=200, blank=False, null=False)
    kind = models.IntegerField(choices=DECK_KIND_CHOICES)
    avg_elixir = models.FloatField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return f'{self.name} ({self.avg_elixir})'

    class Meta:
        verbose_name = 'Deck'
        verbose_name_plural = 'Decks'
        ordering = ['-id']
