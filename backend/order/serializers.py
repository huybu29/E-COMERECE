from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Order, OrderItem
class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    order = serializers.HyperlinkedRelatedField(
        view_name='order-detail',
        queryset=Order.objects.all()
    )
    
    class Meta:
        model = OrderItem
        fields = ['url', 'id', 'order', 'product', 'quantity', ]
        read_only_fields = ['id']
class OrderSerializer(serializers.HyperlinkedModelSerializer):


    class Meta:
        model = Order
        fields = ['url', 'id', 'user',  'order_date']
        read_only_fields = ['id',  'order_date']

 