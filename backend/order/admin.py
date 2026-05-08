from django.contrib import admin
from .models import Order, OrderItem
# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'order_date')
    search_fields = ('user__username',)  # Assuming you have a user field in your Order model
    list_filter = ('order_date',)
admin.site.register(Order, OrderAdmin)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity')
    search_fields = ('order__user__username', 'product__name')  # Assuming you have a product field in your OrderItem model
    list_filter = ('order__order_date',)
admin.site.register(OrderItem, OrderItemAdmin)