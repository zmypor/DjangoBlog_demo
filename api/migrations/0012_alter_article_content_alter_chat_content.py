# Generated by Django 5.1 on 2024-09-12 03:29

import markdownx.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_meg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=markdownx.models.MarkdownxField(default=111),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='chat',
            name='content',
            field=markdownx.models.MarkdownxField(default=111),
            preserve_default=False,
        ),
    ]
