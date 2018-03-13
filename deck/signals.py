from django.db.models.signals import post_save
from django.dispatch import receiver

from deck.models import Deck, DeckArena
from activity.models import Activity, ActivityKind


@receiver(post_save, sender=Deck)
def create_user(sender, instance, created, **kwargs):
    if created:
        arena: str = dict(Deck.DECK_ARENA_CHOICES).get(instance.arena)
        ave: float = instance.avg_elixir

        Activity.objects.create(
            issuer=instance.user.username,
            issued=instance.id,
            content=f'built a {ave} elixir deck for {arena}',
            kind=ActivityKind.DECK,
        )

        total_decks: int = Deck.objects.filter(user=instance.user).count()

        if total_decks % 10 == 0:
            Activity.objects.create(
                issuer=instance.user.username,
                content=f'now has {total_decks} decks in total',
                kind=ActivityKind.UPDATE,
            )
