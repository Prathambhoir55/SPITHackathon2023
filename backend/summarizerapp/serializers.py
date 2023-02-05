from rest_framework import serializers
from .models import *

class MCQGeneratorSerializer(serializers.ModelSerializer):

    class Meta:
        model = MCQGenerator
        fields = ['file', 'pdf_name']


class SummarySerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True)
    summary = serializers.CharField(read_only=True)

    class Meta:
        model = MCQGenerator
        fields = ['file', 'summary', 'pdf_name']

    def create(self, data):
        return MCQGenerator.objects.create(**data)

    def update(self, instance, summary, cards):
        instance.summary = summary
        instance.save()
        for card in cards:
            Cards.objects.create(pdf=instance, question = card['question'], answer = card['answer'])


class CardsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cards
        fields = ['pdf', 'question', 'answer']

class SummaryGETSerializer(serializers.ModelSerializer):

    class Meta:
        model = MCQGenerator
        fields = ['file', 'summary', 'pdf_name']
