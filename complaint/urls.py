from django.urls import path

from complaint.views import user_complaints, complaint_creation

urlpatterns = [
    path('api/complaints', user_complaints),
    path('api/createcomplaint', complaint_creation),
]
