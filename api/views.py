from django.shortcuts import render
from django.http import HttpResponse
from django.db import transaction
from django.db.models import Q
from rest_framework import viewsets,generics,status
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article, Comment,Chat,About,Meg,Friend,Tag
from .serializers import ArticleSerializer, CommentSerializer,ChatSerializer,AboutSerializer,MegSerializer,TagSerializer,FriendSerializer
from itertools import chain
from operator import attrgetter
def main(request):
    return HttpResponse("hello")


#自定义分页功能
class ArticlePagination(PageNumberPagination):
    page_size = 5  # 默认每页显示的文章数
    page_size_query_param = 'limit'
    max_page_size = 10

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        article = self.get_object()
        comment_data = request.data.get('newComment')
        if not comment_data:
            return Response({"detail": "No comments data provided."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CommentSerializer(data=comment_data)
        if serializer.is_valid():
            comment = serializer.save()
            article.comments.add(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ChatPagination(PageNumberPagination):
    page_size = 5  # 默认每页显示的文章数
    page_size_query_param = 'limit'
    max_page_size = 10

class ChatViewSet(viewsets.ModelViewSet):
    queryset=Chat.objects.all()
    serializer_class=ChatSerializer
    pagination_class=ChatPagination
    
    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        chat = self.get_object()
        comment_data = request.data.get('newComment')
        if not comment_data:
            return Response({"detail": "No comments data provided."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CommentSerializer(data=comment_data)
        if serializer.is_valid():
            comment = serializer.save()
            chat.comments.add(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CombinedPagination(PageNumberPagination):
    page_size=8
    page_size_query_param='limit'
    max_page_size=10

class ArticlesAndChatsView(APIView):
    pagination_class = CombinedPagination

    def get(self, request, *args, **kwargs):
        return self._get_combined_response(request)

    def post(self, request, *args, **kwargs):
        query = request.query_params.get('q', '')
        # 打印查询参数
        print(f"Query: {query}")
        return self._get_combined_response(request, query)

    def _get_combined_response(self, request, query=''):
        if query:
            articles = Article.objects.filter(
                Q(title__icontains=query) | 
                Q(content__icontains=query) | 
                Q(tags__name__icontains=query)
            ).distinct()

            chats = Chat.objects.filter(content__icontains=query).distinct()
            # 打印查询结果
            
        else:
            articles = Article.objects.all()
            chats = Chat.objects.all()

        combined = sorted(
            chain(articles, chats),
            key=attrgetter('timestamp'),
            reverse=True
        )

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(combined, request)

        result = []
        for item in page:
            if isinstance(item, Article):
                result.append({
                    'type': 'article',
                    'data': ArticleSerializer(item).data
                })
            elif isinstance(item, Chat):
                result.append({
                    'type': 'chat',
                    'data': ChatSerializer(item).data
                })
        # 打印最终结果
        
        return paginator.get_paginated_response(result)

class AboutDetail(generics.RetrieveAPIView):
    serializer_class=AboutSerializer
    def get_object(self):
        return About.objects.first()
class MegViewSet(viewsets.ModelViewSet):
    serializer_class = MegSerializer

    #理解
    def get_queryset(self):
        # filter 过滤器 如果meg 存在 就返回第一个 不存在 返回none
        return Meg.objects.filter(pk=Meg.objects.first().pk) if Meg.objects.exists() else Meg.objects.none()

    def list(self, request, *args, **kwargs):
        #获取查询集
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"detail": "No Meg object found."}, status=status.HTTP_404_NOT_FOUND)
        #存在 调用过滤器 并发送serializer.data
        serializer = self.get_serializer(queryset.first())
        return Response(serializer.data)
    @action(detail=False, methods=['post'])
    def add_comment(self, request):
        #始终返回第一个
        meg = Meg.objects.first()
        if not meg:
            return Response({"detail": "No Meg object found."}, status=status.HTTP_404_NOT_FOUND)
        #获取新添加的comment
        comment_data = request.data.get('newComment')
        if not comment_data:
            return Response({"detail": "No comments data provided."}, status=status.HTTP_400_BAD_REQUEST)
        #将新增的comment 调用过滤器
        serializer = CommentSerializer(data=comment_data)
        if serializer.is_valid():
            #保存comment
            comment = serializer.save()
            #添加comment
            meg.comments.add(comment)
            serializer=self.get_serializer(meg)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
class TagsViewSet(viewsets.ModelViewSet):
    queryset=Tag.objects.all()
    serializer_class=TagSerializer
#用途：用于处理单个对象的检索操作。
#功能：只提供 GET 方法，用于获取单个对象的详细信息。
#使用场景：当你只需要提供一个只读的单个对象的详细视图时使用。
#viewsets.ModelViewSet
#用途：用于处理一组对象的所有常见操作（CRUD：创建、读取、更新、删除）。
#功能：提供 list、create、retrieve、update、partial_update 和 destroy 等方法。
#使用场景：当你需要为一个模型提供完整的 CRUD 操作时使用。