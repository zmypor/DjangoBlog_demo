from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, CommentViewSet,ChatViewSet,TagsViewSet,ArticlesAndChatsView,AboutDetail,MegViewSet,FriendViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'friends', FriendViewSet)
router.register(r'chats',ChatViewSet)
router.register(r'tags',TagsViewSet)
router.register(r'meg',MegViewSet,basename='meg')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/articles-and-chats/', ArticlesAndChatsView.as_view(), name='articles-and-chats'),
    path('api/about/', AboutDetail.as_view(),name='about-detail'),
  
]