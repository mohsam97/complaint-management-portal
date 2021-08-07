from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view

from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
def me(request):
    """
    returns the user that logged in
    """
    if request.method == 'GET':
        if not request.user.is_anonymous:
            serializer = UserSerializer(request.user, many=False)
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def user_creation(request):
    """
    creates a new user
    """
    if request.method == 'POST':
        user = User()
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.instance.set_password(request.data["password"])
            serializer.instance.first_name = request.data["firstName"]
            serializer.instance.last_name = request.data["lastName"]
            serializer.instance.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
