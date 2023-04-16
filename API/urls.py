from django.urls import path, include
from rest_framework import routers
from .views import MovieViewSet, RatingViewSet, UserViewSet

router = routers.DefaultRouter()
router.register("movies", MovieViewSet)
router.register("ratings", RatingViewSet)
router.register("user", UserViewSet)
# router.register('auth',ObtainAuthToken)
urlpatterns = [
    path("", include(router.urls)),
]
