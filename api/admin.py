from django.contrib import admin
from .models import Article, Comment, About, Meg, Friend,Tag # 导入模型


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date', 'timestamp')
    search_fields = ('title', 'author')
    list_filter = ('date', 'author')
    

class CommentAdmin(admin.ModelAdmin):
    list_display = ('date', 'content', 'author')

class AboutAdmin(admin.ModelAdmin):
    list_display = ('title', 'content')

class FriendAdmin(admin.ModelAdmin):
    list_display = ('name',)  # 将字符串更改为元组

# 注册模型
admin.site.register(Article, ArticleAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(About, AboutAdmin)
admin.site.register(Meg)
admin.site.register(Friend, FriendAdmin)
admin.site.register(Tag)