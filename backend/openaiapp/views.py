from django.shortcuts import render
from summarizerapp.serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from .openaitest import *
import PyPDF2
import re

# Create your views here.
class SummarizerOpenaiAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SummarySerializer

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
        prompt1 = f"Summarize the following in 200 words: \n{text}"
        summary = generate_desc(prompt1)
        prompt2 = f"Form 5 questions with correct answer: \n{text}"
        cards = generate_desc(prompt2)
        pattern1 = r"[Q][0-9]\."
        split_text = re.split(pattern1, cards)
        pattern2 = r"[A][0-9]\."
        list1 = []
        for i in split_text:
            pair = re.split(pattern2, i)
            list1.append({"question":pair[0], "answer": pair[-1]})
        self.serializer_class.update(request.data, instance, summary, list1[1:])
        objs = MCQGenerator.objects.all()
        return JsonResponse({"summary": summary, "cards": list1[1:]}, status= status.HTTP_200_OK)

class SummaryGETAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SummaryGETSerializer

    def get(self, request):
        queryset = MCQGenerator.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        dict1 = {}
        data = serializer.data
        for query in queryset:
            card = Cards.objects.filter(pdf = query)
            serializer1 = CardsSerializer(card, many = True)
            dict1[query.pdf_name] = serializer1.data
        return JsonResponse({"summary": data, "card":dict1}, status= status.HTTP_200_OK, safe=False)

