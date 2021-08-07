from django.urls import path

from complaint.views import user_complaints, complaint_creation, complaint_update_status

urlpatterns = [
    path('api/complaints', user_complaints),
    path('api/createcomplaint', complaint_creation),
    path('api/updatecomplaint/<id>', complaint_update_status),
]
