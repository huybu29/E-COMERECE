from rest_framework import serializers
from .models import Cart, CartItem
from product.serializers import ProductSerializer
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['url', 'id', 'user', 'created_at', ]
        read_only_fields = ['id', 'created_at', ]
class CartItemSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True, source='product.id')
    class Meta:
        model = CartItem
        fields = ['url','id', 'cart', 'product',  'product_id', 'quantity']
        read_only_fields = ['id', 'price']  # Price can be calculated based on product price