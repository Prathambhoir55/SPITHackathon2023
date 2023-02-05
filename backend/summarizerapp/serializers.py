from rest_framework import serializers
from .models import *

class MCQGeneratorSerializer(serializers.ModelSerializer):

    class Meta:
        model = MCQGenerator
        fields = ['file', 'pdf_name']


class SummarySerializer(serializers.ModelSerializer):
    file = serializers.CharField(write_only=True)
    summary = serializers.CharField(read_only=True)

    class Meta:
        model = MCQGenerator
        fields = ['file', 'summary', 'pdf_name']

    def create(data, summary, cards):
        MCQGenerator.objects.create(summary=summary, cards = cards)
