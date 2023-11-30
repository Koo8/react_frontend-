from .views import  ArticleViewSets, UserViewSets
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# auto-create token provided with username + password
from rest_framework.authtoken import views


""" Router + ViewSets is the best way for views"""

router = DefaultRouter()
router.register('articles', viewset=ArticleViewSets, basename="articles")
router.register('user', UserViewSets, 'user')


urlpatterns = [
    path('api/', include(router.urls)),
    path('auth_token/', views.obtain_auth_token) # create token view by DRF # only for "POST"

    # path('articles', ArticleList.as_view()),
    # path('articles/<int:id>', ArticleDetails.as_view()),
]