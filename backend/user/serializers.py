from django.contrib.auth.models import User
from rest_framework import serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']  # Make id read-only
        def create(self, validated_data):
            """
            Create a new user instance.
            """
            return User.objects.create_user(**validated_data)