from rest_framework import serializers
from .models import *

class DoubtSerializer(serializers.Serializer):
    text = serializers.CharField()
    class Meta:
        fields = ['text']
