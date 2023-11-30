from django.shortcuts import render, HttpResponse
from .models import Article
from django.contrib.auth.models import User
from .serializers import ArticleSerializer, UserSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication


class UserViewSets(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # permission_classes = [IsAuthenticated] # NOT NEEDED
    # authentication_classes = [TokenAuthentication] #NOT NEEDED

#class-based view is the best. DRY

""" BEST CODE: viewsets.ModelViewSet + router when all the minxins are needed"""
class ArticleViewSets(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # add auth (for react frontend, fetch needs to add "Authorization": 'Token whatevertokenfromadminauthsection' in its headers)
    permission_classes = [IsAuthenticatedOrReadOnly] 
    authentication_classes = [TokenAuthentication] # if remove this, POST is possible in server url,with this only get is ok.

""" **** **** SECOND BEST CODE - combine viewsets + minxins with router, best if not all minxins are needed **** **** """
# class ArticleViewSets(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     print("reading")
#     permission_classes = [IsAuthenticatedOrReadOnly]



""" BELOW CODE ARE NOT USED """
""" use generic.concrete-classes - mixins are built in  """
""" All the codes needed for APIView are organized by mixins for DRY code """
# class ArticleList(GenericAPIView , mixins.ListModelMixin, mixins.CreateModelMixin):
class ArticleList(generics.ListCreateAPIView):

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
    # get method
    def get(self, request):
        # ** when use APIView parent class**
        # articles = Article.objects.all()
        # return Response(ArticleSerializer(articles, many=True).data, status=status.HTTP_200_OK)

        # ** When use ListCreateAPIView or mixins **
        return self.list(request)
    
    # post method
    def post(self, request):
        # ** When use APIView **
        # reversed_serializer = ArticleSerializer(data=request.data)
        # if reversed_serializer.is_valid():
        #     reversed_serializer.save()
        #     return Response(reversed_serializer.data, status=status.HTTP_201_CREATED)
        # return Response(reversed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # **  When use ListCreateAPIView  or minxins **
        return self.create(request)


class ArticleDetails(generics.RetrieveUpdateDestroyAPIView):
    

    # def get_article(self, id):
    #     try:
    #         return Article.objects.get(id=id)
    #     except Article.DoesNotExist:
    #         return Http404 # this is an error type accepted by APIView
    
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'id'
        
    def get(self, request, id):
        # ** When use APIView **
        # article = self.get_article(id=id)
        # return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)

        # ** When use generic concrete class or mixins **
        return self.retrieve(request, id)
    
    def put(self, request, id):
        # ** APIView **
        # article = self.get_article(id=id)
        # reversed_serializer = ArticleSerializer(article, data=request.data)
        # if reversed_serializer.is_valid():
        #     reversed_serializer.save()
        #     return Response(reversed_serializer.data, status=status.HTTP_201_CREATED)
        # return Response(reversed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return self.update(request, id)
    
    def delete(self, request, id):
        # ** APIView **
        # article = self.get_article(id=id)
        # article.delete()
        # return Response(status=status.HTTP_204_NO_CONTENT)

        return self.destroy(request, id)




""" for postman testing add this annotation"""
# @csrf_exempt

"""
# function-based view
@api_view(["GET", "POST"])
def general_articles(request):
    if request.method == "GET":
        articles = Article.objects.all()
        # serialize articles
        serializer = ArticleSerializer(articles, many=True)
        
        return Response(serializer.data)
    
    elif request.method == "POST":
        # python_data = JSONParser().parse(request)
        reversed_serializer = ArticleSerializer(data=request.data) 
        if reversed_serializer.is_valid():
            reversed_serializer.save()
            return Response(reversed_serializer.data, status=status.HTTP_201_CREATED)
    return Response(reversed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# @csrf_exempt

@api_view(['GET', 'PUT', 'DELETE'])
def single_article(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # except AttributeError:
    #     return " triggered AttributeError"
    
    # serialize the article
    if request.method == "GET":
        serializer = ArticleSerializer(article)
        return Response(serializer.data) 
    
    elif request.method == "PUT":
        # data = JSONParser().parse(request)
        seria_lizer = ArticleSerializer(article, data=request.data)
        if seria_lizer.is_valid():
            seria_lizer.save()
            return Response(seria_lizer.data, status=status.HTTP_201_CREATED)
        return Response(seria_lizer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
"""