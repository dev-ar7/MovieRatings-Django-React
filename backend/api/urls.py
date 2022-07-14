from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from .views import MoviesViewSet, RatingViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(
    'users', UserViewSet
)
router.register(
    'movies', MoviesViewSet
)
router.register(
    'ratings', RatingViewSet
)

urlpatterns = [
    path('', include(router.urls)),
]
