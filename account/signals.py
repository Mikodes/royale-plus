from django.db.models.signals import post_save
from django.dispatch import receiver

from account.models import User
from activity.models import Activity


@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    if created:
        Activity.objects.create(
            issuer=instance,
            content='joined Royale Plus',
            kind=2,
        )
