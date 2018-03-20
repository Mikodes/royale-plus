from django.test import TestCase

from account.models import User
from deck.models import Deck, DeckKind, DeckArena


class DeckTestCase(TestCase):
    def setUp(self):
        user: User = User.objects.create(
            username='Amir',
            email='amir@savandbros.com',
            password='wow tricky password',
        )
        self.deck = Deck.objects.create(
            user=user,
            cards='witch witch witch witch witch witch witch witch ',
            avg_elixir='5.0',
            kind=DeckKind.NONE,
            arena=DeckArena.ALL
        )

    def test_deck_methods(self):
        self.assertTrue(self.deck.all_modes)
        self.deck.mode_1v1 = False
        self.assertFalse(self.deck.all_modes)
