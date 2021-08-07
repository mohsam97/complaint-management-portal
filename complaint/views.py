from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view

from .models import Complaint
from .serializers import ComplaintSerializer
from rest_framework.response import Response


@api_view(['GET'])
def user_complaints(request):
    if request.method == 'GET':
        if not request.user.is_anonymous:
            complaints = Complaint.objects.filter(complained_by=request.user)
            serializer = ComplaintSerializer(complaints, many=True)
        else:
            complaints = Complaint.objects.all()
            serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def complaint_creation(request):
    if request.method == 'POST':
        print(request.user)
        if not request.user.is_anonymous:
            complaint = Complaint(complained_by=request.user)
            request.data["complained_by"] = request.user.id
            serializer = ComplaintSerializer(complaint, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            from user.models import User
            complaint = Complaint(complained_by=User.objects.first())
            serializer = ComplaintSerializer(complaint, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
