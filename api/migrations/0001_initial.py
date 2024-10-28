# Generated by Django 5.1 on 2024-08-17 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=100)),
                ('data', models.DateField()),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(default='', max_length=100)),
                ('date', models.DateField()),
                ('content', models.TextField()),
                ('tags', models.JSONField()),
                ('summary', models.TextField(default='')),
                ('cover_image', models.URLField()),
                ('reading_time', models.CharField(max_length=50)),
                ('comments', models.ManyToManyField(to='api.comment')),
            ],
        ),
    ]
