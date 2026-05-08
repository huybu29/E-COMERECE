from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from .models import Cart,CartItem
from .serializers import CartSerializer, CartItemSerializer
from rest_framework.response import Response
from product.models import Product
from rest_framework import serializers
from rest_framework import status
# Create your views here.
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    def get_queryset(self):
        user = self.request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        return CartItem.objects.filter(cart=cart)

    def perform_create(self, serializer):
        """
        Override the create method to handle custom logic if needed.
        """
        user=self.request.user
        cart, _ = Cart.objects.get_or_create(user=user)
         
       
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        product = serializer.validated_data.get('product')
        quantity = serializer.validated_data.get('quantity', 1)
        
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            # If the item already exists, update the quantity
            cart_item.quantity += quantity
            cart_item.save()
            self._created_item = cart_item
        else:
            serializer=self.get_serializer(cart_item, data=serializer.validated_data)
            serializer.is_valid(raise_exception=True)
            cart_item = serializer.save()
        # You can add custom logic here before calling the parent class's create method
        return Response({
        'message': 'Cart item created or updated successfully',
        'cart_item': CartItemSerializer(self._created_item, context={'request': request}).data
    }, status=status.HTTP_201_CREATED)
