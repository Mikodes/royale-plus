from django.db import models
from django.utils import timezone

from account.models import User

ACTIVITY_TYPE_CHOICES = (
    (0, 'None'),
    (1, 'Update'),
    (2, 'User'),
    (3, 'Deck'),
)


class Activity(models.Model):
    type = models.IntegerField(choices=ACTIVITY_TYPE_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    date_created = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'
        get_latest_by = 'date_created'
        ordering = ['-date_created', ]
