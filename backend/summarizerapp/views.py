from django.shortcuts import render
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from .mcqapi import *
from backend.settings import MEDIA_ROOT
# Create your views here.

class MCQGeneratorAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = MCQGeneratorSerializer

    def post(self, request):
        content = request.data
        serializer= self.serializer_class(data=content)
        if serializer.is_valid():
            instance = serializer.save()
        path = str(instance.file.path)
        all_answers, all_questions, all_choices = final_api(f"{path}")

        print(all_answers)
        print(all_questions)
        print(all_choices)
        return JsonResponse({"message":path}, status=status.HTTP_200_OK)

class TextSummarizerAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = MCQGeneratorSerializer

    def post(self, request):
        content = request.data
        serializer= self.serializer_class(data=content)
        if serializer.is_valid():
            instance = serializer.save()
        path = str(instance.file.path)
        text = summarizerTool(f"{path}")
        return JsonResponse({"message":"success", "text":text}, status=status.HTTP_200_OK)

