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


class DeckArena:
    ALL = 0
    TRAINING_CAMP = 1
    GOBLIN_STADIUM = 2
    BONE_PIT = 3
    BARBARIAN_BOWL = 4
    PEKKAS_PLAYHOUSE = 5
    SPELL_VALLEY = 6
    BUILDERS_WORKSHOP = 7
    ROYAL_ARENA = 8
    FROZEN_PEAK = 9
    JUNGLE_ARENA = 10
    HOG_MOUNTAIN = 11
    ELECTRO_VALLEY = 12
    LEGENDARY_ARENA = 13


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
    DECK_ARENA_CHOICES = (
        (DeckArena.ALL, 'All Arenas'),
        (DeckArena.TRAINING_CAMP, 'Training Camp'),
        (DeckArena.GOBLIN_STADIUM, 'Goblin Stadium'),
        (DeckArena.BONE_PIT, 'Bone Pit'),
        (DeckArena.BARBARIAN_BOWL, 'Barbarian Bowl'),
        (DeckArena.PEKKAS_PLAYHOUSE, 'P.E.K.K.A.\'s Playhouse'),
        (DeckArena.SPELL_VALLEY, 'Spell Valley'),
        (DeckArena.BUILDERS_WORKSHOP, 'Builders Workshop'),
        (DeckArena.ROYAL_ARENA, 'Royal Arena'),
        (DeckArena.FROZEN_PEAK, 'Frozen Peak'),
        (DeckArena.JUNGLE_ARENA, 'Jungle Arena'),
        (DeckArena.HOG_MOUNTAIN, 'Hog Mountain'),
        (DeckArena.ELECTRO_VALLEY, 'Electro Valley'),
        (DeckArena.LEGENDARY_ARENA, 'Legendary Arena'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, null=False)
    cards = models.CharField(max_length=200, blank=False, null=False)
    avg_elixir = models.FloatField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)

    kind = models.IntegerField(choices=DECK_KIND_CHOICES)
    arena = models.IntegerField(choices=DECK_ARENA_CHOICES)

    mode_1v1 = models.BooleanField(default=True)
    mode_2v2 = models.BooleanField(default=True)
    mode_2x = models.BooleanField(default=True)
    mode_3x = models.BooleanField(default=True)

    @property
    def all_modes(self):
        return all([self.mode_1v1, self.mode_2v2, self.mode_2x, self.mode_3x])

    def __str__(self):
        return f'{self.name} ({self.avg_elixir})'

    class Meta:
        verbose_name = 'Deck'
        verbose_name_plural = 'Decks'
        ordering = ['-id']
