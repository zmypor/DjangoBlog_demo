from django.db import models
from django.utils import timezone
from mdeditor.fields import MDTextField
from taggit.managers import TaggableManager
from taggit.models import TagBase, GenericTaggedItemBase
from django.utils.translation import gettext_lazy as _

class Tag(TagBase):
    pass

class TaggedWhatever(GenericTaggedItemBase):
    tag = models.ForeignKey(
        Tag,
        related_name="%(app_label)s_%(class)s_items",
        on_delete=models.CASCADE,
    )

class Comment(models.Model):
    author = models.CharField(max_length=100)
    date = models.DateField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=50, default='')
    avatar = models.CharField(max_length=100, default='')
    timestamp = models.DateTimeField(default=timezone.now)

class Article(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100, default='', blank=True)
    date = models.DateField(blank=True, null=True)
    content = MDTextField()
    tags = TaggableManager(through=TaggedWhatever)
    summary = models.TextField(default='', blank=True)
    cover_image = models.URLField(blank=True, null=True)
    reading_time = models.CharField(max_length=50, blank=True, null=True)
    comments = models.ManyToManyField(Comment, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title

class Chat(models.Model):
    author = models.CharField(max_length=100, default='', blank=True)
    date = models.DateField(blank=True, null=True)
    content = MDTextField()
    comments = models.ManyToManyField(Comment, blank=True)
    cover_image = models.URLField(blank=True, null=True)
    reading_time = models.CharField(max_length=50, blank=True, null=True)
    timestamp = models.DateTimeField(default=timezone.now)

class About(models.Model):
    title = models.CharField(max_length=100)
    content = MDTextField()

    def __str__(self):
        return self.title

class Meg(models.Model):
    comments = models.ManyToManyField(Comment, blank=True)

class Friend(models.Model):
    name = models.CharField(_("Name"), max_length=100, blank=False)
    url = models.URLField(_("URL"), max_length=200)
    avatar = models.URLField(_("Avatar"), max_length=200, default='', blank=True)