from typing import Optional

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.validators import ASCIIUsernameValidator, UnicodeUsernameValidator
from django.db import models
from django.utils import six, timezone


class UserManager(BaseUserManager):
    def create_user(self, username: str, password: Optional[str] = None, email=None):
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username: str, password: str):
        user = self.create_user(username=username, password=password)
        user.is_staff = True
        user.is_active = True
        user.save()

        return user


class User(AbstractBaseUser):
    username_validator = UnicodeUsernameValidator() if six.PY3 else ASCIIUsernameValidator()

    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[username_validator],
        error_messages={'unique': _("A user with that username already exists.")},
    )

    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    email = models.EmailField(max_length=254, unique=True)
    member = models.CharField(max_length=50, default=None, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_whatsapp = models.BooleanField(default=False)

    about = models.CharField(max_length=500, default=None, null=True, blank=True)
    picture = models.URLField(default=None, null=True, blank=True)
    link = models.URLField(default=None, null=True, blank=True)
    nationality = models.CharField(max_length=50, default=None, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def get_username(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        get_latest_by = "date_joined"
        ordering = ['-date_joined', ]