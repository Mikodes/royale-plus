from django.db import models
from django.utils.timesince import timesince

from account.models import User


class CommentKind:
    PAGE = 0
    USER = 1
    DECK = 2


class Comment(models.Model):
    """
    Kind could be Page (home page), User (user's wall) or a deck
    Object is the target id/key that the comment is made for (None for pages)
    """
    COMMENT_KIND_CHOICES = (
        (CommentKind.PAGE, 'Page'),
        (CommentKind.USER, 'User'),
        (CommentKind.DECK, 'Deck'),
    )

    user = models.ForeignKey(User)
    comment = models.TextField(max_length=1000)
    kind = models.IntegerField(choices=COMMENT_KIND_CHOICES)
    object = models.CharField(max_length=100, null=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    @property
    def created_since(self):
        return timesince(self.created)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
        ordering = ['-id']
