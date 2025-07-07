from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Order, OrderItem
from product.serializers import ProductSerializer
class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['url', 'id', 'order', 'product', 'quantity', ]
        read_only_fields = ['id','order']
class OrderSerializer(serializers.HyperlinkedModelSerializer):


    class Meta:
        model = Order
        fields = ['url', 'id', 'user',  'order_date']
        read_only_fields = ['id',  'order_date']

 