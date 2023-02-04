from rest_framework import serializers
from .models import *

class StudyTimeSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)

    class Meta:
        model = StudyTime
        fields = ['user', 'minutes', 'date']

    def create(self, validated_data, user):
        StudyTime.objects.create(user = user, **validated_data)
        return validated_data


class StudyTimeGETSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyTime
        fields = ['minutes', 'date']


class TestMarksPOSTSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)

    class Meta:
        model = TestMarks
        fields = ['user', 'marks']

    def create(self, validated_data, user):
        TestMarks.objects.create(user = user, **validated_data)
        return validated_data


class TestMarksGETSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestMarks
        fields = ['marks']