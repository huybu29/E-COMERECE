from django.shortcuts import render
from rest_framework import viewsets
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from cart.models import Cart,CartItem
from rest_framework.response import Response
# Create your views her
from rest_framework.response import Response
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    def perform_create(self, serializer):
        user=self.request.user
        order= Order.objects.get_or_create(user=user)
        cart, _ = Cart.objects.get_or_create(user=user)
        cartItem = CartItem.objects.filter(cart=cart)
        if not cartItem.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        else:
            order = Order.objects.create(user=user)
            for item in cartItem.all():
                OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
            cartItem.all().delete()
            return Response({'message': 'Order created successfully', 'order_id': order.id}, status=201)