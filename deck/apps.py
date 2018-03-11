from django.apps import AppConfig


class DeckConfig(AppConfig):
    name = 'deck'

    def ready(self):
        import deck.signals  # noqa
