from rest_framework import serializers
from .models import Cart, CartItem
from product.serializers import ProductSerializer
from product.models import Product
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['url', 'id', 'user', 'created_at', ]
        read_only_fields = ['id', 'created_at', ]
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
        source='product'
    )

    class Meta:
        model = CartItem
        fields = ['url', 'id', 'cart', 'product', 'product_id', 'quantity']
        read_only_fields = ['id', 'price', 'cart']
