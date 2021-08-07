from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view

from .models import Complaint
from .serializers import ComplaintSerializer
from rest_framework.response import Response


@api_view(['GET'])
def user_complaints(request):
    """
    Returns complaints for the user that is logged in
    """
    if request.method == 'GET':
        if not request.user.is_anonymous:
            if request.user.is_admin:
                complaints = Complaint.objects.all()
            else:
                complaints = Complaint.objects.filter(complained_by=request.user)
            serializer = ComplaintSerializer(complaints, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def complaint_creation(request):
    """
    Create a new complaint for the user that is logged in
    """
    if request.method == 'POST':
        if not request.user.is_anonymous:
            complaint = Complaint(complained_by=request.user)
            request.data["complained_by"] = request.user.id
            serializer = ComplaintSerializer(complaint, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def complaint_update_status(request, id):
    """
    Updates complaint status
    """
    if request.method == 'PUT':
        if not request.user.is_anonymous:
            complaint = Complaint.objects.get(id=id)
            request.data["date"] = complaint.date
            request.data["description"] = complaint.description
            serializer = ComplaintSerializer(complaint, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
