# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-31 14:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_remove_user_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='picture',
            field=models.IntegerField(default=1),
        ),
    ]
