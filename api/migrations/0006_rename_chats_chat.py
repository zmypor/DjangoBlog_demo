# Generated by Django 5.1 on 2024-08-21 06:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_chats'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Chats',
            new_name='Chat',
        ),
    ]
