from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from .views import ProtectedResourceView
router=DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
urlpatterns = [
    path('', include(router.urls)),
    path('protected-resource/', ProtectedResourceView.as_view(), name='protected-resource'),
]
