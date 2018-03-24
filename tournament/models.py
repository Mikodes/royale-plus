from django.db import models
from django.utils.timesince import timesince

from account.models import User


class TournamentStatus:
    READY = 1
    START = 2
    CLOSE = 3


class Tournament(models.Model):
    TOURNAMENT_STATUS_CHOICES = (
        (TournamentStatus.READY, 'Ready'),
        (TournamentStatus.START, 'Start'),
        (TournamentStatus.CLOSE, 'Close'),
    )

    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.IntegerField(choices=TOURNAMENT_STATUS_CHOICES, default=TournamentStatus.READY)
    prize = models.IntegerField(default=100)
    users = models.ManyToManyField(User, related_name='Participants')
    created = models.DateTimeField(auto_now_add=True, editable=False)

    @property
    def get_created_since(self):
        return timesince(self.created)

    def __str__(self):
        return f'{self.name} ({self.get_status_display()})'

    class Meta:
        verbose_name = 'Tournament'
        verbose_name_plural = 'Tournaments'
        ordering = ('-id',)
