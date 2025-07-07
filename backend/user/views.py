from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer

from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated  
from django.contrib.auth.models import User
# Create your views here.
class ProtectedResourceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello, {request.user.username}! This is protected data."})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
     # Ensure only admin users can access this view
    def get_queryset(self):
        # Optionally filter users based on some criteria
        return super().get_queryset().order_by('username')  # Example: order by username
@api_view(['GET'])
def api_root(request, format=None):
  return Response({
      'products': reverse('product-list', request=request, format=format),
      'users': reverse('user-list', request=request, format=format),
      'carts': reverse('cart-list', request=request, format=format),
      'cart-items': reverse('cartitem-list', request=request, format=format),
        'orders': reverse('order-list', request=request, format=format),
        'order-items': reverse('orderitem-list', request=request, format=format),
  })