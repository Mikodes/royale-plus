from django.db import models

from account.models import User

DECK_KIND_CHOICES = (
    (0, 'None'),
    (1, 'Cycle'),
    (2, 'Spell Bait'),
    (3, 'Beatdown'),
    (4, 'Spawner'),
    (5, 'Three Crowns'),
    (6, 'Control'),
    (7, 'Siege'),
)


class Deck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, null=False)
    cards = models.CharField(max_length=200, blank=False, null=False)
    kind = models.IntegerField(choices=DECK_KIND_CHOICES)
    avg_elixir = models.FloatField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return f"{self.name} ({DECK_KIND_CHOICES[self.kind][1]} - {self.avg_elixir})"

    class Meta:
        verbose_name = 'Deck'
        verbose_name_plural = 'Decks'
