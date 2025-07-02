from django.contrib import admin
from .models import Cart, CartItem
# Register your models here.
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', )
    search_fields = ('user__username',) # Assuming you have a user field in your Cart model
   
admin.site.register(Cart, CartAdmin)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity',)
    search_fields = ('cart__user__username', 'product__name')  # Assuming you have a product field in your CartItem model
    
admin.site.register(CartItem, CartItemAdmin)