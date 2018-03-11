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
    """
    Issuer is usually the user (cause of activity)
    Issued is the primary key of the manipulated object
    """
    kind = models.IntegerField(choices=ACTIVITY_KIND_CHOICES)
    issuer = models.ForeignKey(User, on_delete=models.CASCADE)
    issued = models.CharField(max_length=100, default=None, blank=True, null=True)
    content = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now=True, editable=False, db_index=True)

    @property
    def created_since(self):
        return timesince(self.created)

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'
