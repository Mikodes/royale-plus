from django.core import validators
from django.db import models
from django.utils.timesince import timesince

from account.models import User


class TournamentStatus:
    READY = 0
    START = 1
    CLOSE = 2


class Tournament(models.Model):
    TOURNAMENT_STATUS_CHOICES = (
        (TournamentStatus.READY, 'Ready'),
        (TournamentStatus.START, 'Start'),
        (TournamentStatus.CLOSE, 'Close'),
    )

    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.IntegerField(choices=TOURNAMENT_STATUS_CHOICES, default=TournamentStatus.READY)
    prize = models.IntegerField(default=100, validators=[
        validators.MinValueValidator(10),
        validators.MaxValueValidator(1000),
    ])
    users = models.ManyToManyField(User, related_name='tournament_participant')
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


class TournamentMatch(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='matches')
    winner = models.ForeignKey(User, related_name='won_matches', null=True, blank=True)

    def __str__(self):
        return f'{self.tournament.name} match #{self.id}'

    class Meta:
        verbose_name = 'Tournament Match'
        verbose_name_plural = 'Tournament Matches'
        ordering = ('-id',)
