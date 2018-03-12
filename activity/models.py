from django.db import models
from django.utils.timesince import timesince

from account.models import User


class ActivityKind:
    NONE = 0
    UPDATE = 1
    USER = 2
    DECK = 3


class Activity(models.Model):
    """
    Issuer is usually the user (cause of activity)
    Issued is the primary key of the manipulated object
    """
    ACTIVITY_KIND_CHOICES = (
        (ActivityKind.NONE, 'None'),
        (ActivityKind.UPDATE, 'Update'),
        (ActivityKind.USER, 'User'),
        (ActivityKind.DECK, 'Deck'),
    )

    kind = models.IntegerField(choices=ACTIVITY_KIND_CHOICES)
    issuer = models.CharField(max_length=100, default=None, blank=True, null=True)
    issued = models.CharField(max_length=100, default=None, blank=True, null=True)
    content = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now=True)

    @property
    def created_since(self):
        return timesince(self.created)

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'
        ordering = ['-id']
