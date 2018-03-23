from django.db.models.signals import post_save
from django.dispatch import receiver

from account.models import User, Follow
from activity.models import Activity, ActivityKind
from royale_plus.settings import FOLLOW_USER


@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    if created:
        Activity.objects.create(
            issuer=instance.username,
            content='joined Royale Plus',
            kind=ActivityKind.USER,
        )

        # Follow the user
        user_to_follow: User = User.objects.get(id=FOLLOW_USER)

        if user_to_follow:
            Follow.objects.create(user=instance, following=user_to_follow)
