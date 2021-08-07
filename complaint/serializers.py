from rest_framework import serializers
from complaint.models import Complaint


class ComplaintSerializer(serializers.ModelSerializer):
    complained_by = serializers.StringRelatedField(many=False)

    class Meta:
        model = Complaint
        fields = "__all__"
