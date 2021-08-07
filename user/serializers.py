from rest_framework import serializers
from user.models import User, Test


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'email', 'username', 'last_name', 'first_name', "is_admin", "password"]
        fields = "__all__"


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["id", "is_admin"]
