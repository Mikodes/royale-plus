from django.db.models.signals import post_save
from django.dispatch import receiver

from activity.models import Activity, ActivityKind
from comment.models import Comment, CommentKind


@receiver(post_save, sender=Comment)
def create_comment(sender, instance, created, **kwargs):
    # Commented on a user wall that is not self
    if created and instance.kind == CommentKind.USER and instance.user.username != instance.target:
        Activity.objects.create(
            issuer=instance.user.username,
            content=f'commented on {instance.target}\'s wall',
            kind=ActivityKind.USER,
        )
