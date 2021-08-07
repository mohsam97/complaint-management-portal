from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view

from .models import User, Test
from .serializers import UserSerializer, TestSerializer
from rest_framework.response import Response


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TestListCreate(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
def me(request):
    if request.method == 'GET':
        if not request.user.is_anonymous:
            serializer = UserSerializer(request.user, many=False)
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def user_creation(request):
    if request.method == 'POST':
        user = User()
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.instance.set_password(request.data["password"])
            serializer.instance.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
