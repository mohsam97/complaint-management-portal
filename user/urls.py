"""complaint_management_portal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

# Serializers define the API representation.
from user.models import User
from user.views import UserListCreate, TestListCreate, UserViewSet, post_collection, user_creation


# ViewSets define the view behavior.

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)


urlpatterns = [
    path('users/api', UserListCreate.as_view()),
    path('test/api', TestListCreate.as_view()),
    path('favicon.ico', TestListCreate.as_view()),
    path('api/user/<id>/', post_collection),
    path('api/createuser', user_creation),
]
