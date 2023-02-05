from django.shortcuts import render
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from .doubtstest import *
import PyPDF2

# Create your views here.
class DoubtsOpenaiAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DoubtSerializer

    def post(self, request):
        serializer= self.serializer_class(data=request.data)
        if serializer.is_valid():
            response = generate_desc(request.data['text'])
        return JsonResponse({"response": response}, status= status.HTTP_200_OK)