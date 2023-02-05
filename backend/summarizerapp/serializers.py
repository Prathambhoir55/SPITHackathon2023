from rest_framework import serializers
from .models import *

class MCQGeneratorSerializer(serializers.ModelSerializer):

    class Meta:
        model = MCQGenerator
        fields = ['file']