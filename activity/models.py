from django.db import models
from django.utils.timesince import timesince

from account.models import User

ACTIVITY_KIND_CHOICES = (
    (0, 'None'),
    (1, 'Update'),
    (2, 'User'),
    (3, 'Deck'),
)


class Activity(models.Model):
    kind = models.IntegerField(choices=ACTIVITY_KIND_CHOICES)
    issuer = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now=True, editable=False, db_index=True)

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'

    @property
    def created_since(self):
        return timesince(self.created)
