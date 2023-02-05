from django.shortcuts import render
from summarizerapp.serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from .openaitest import *
import PyPDF2

# Create your views here.
class SummarizerOpenaiAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = MCQGeneratorSerializer

    def post(self, request):
        serializer= self.serializer_class(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
        path = str(instance.file.path)
        pdfFileObj = open(path, 'rb')
        pdfReader = PyPDF2.PdfReader(pdfFileObj)
        text =''
        for i in range(len(pdfReader.pages)):
            pageObj = pdfReader.pages[i]
            text = text + pageObj.extract_text()
        pdfFileObj.close()
        print(text)
        prompt1 = f"Summarize the following in 200 words: \n{text}"
        prompt2 = f""
        summary = generate_desc(prompt1)
        return JsonResponse({"summary": summary}, status= status.HTTP_200_OK)