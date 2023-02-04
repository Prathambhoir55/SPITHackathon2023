from django.shortcuts import render
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from rest_framework.generics import GenericAPIView, ListAPIView
from .utils import *
# Create your views here.

class StudyTimeGETAPI(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudyTimeGETSerializer

    def get_queryset(self):
        objs = StudyTime.objects.filter(user = self.request.user)
        return objs


class StudyTimeAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudyTimeSerializer

    def post(self, request):
        user = User.objects.get(id = request.user.id)
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            valid_data = serializer.create(serializer.validated_data, user)
            print(len(list(User.objects.all())))
            if len(list(User.objects.all())) >2:
                cluster = cluster_data(request)
            return JsonResponse({"message": "success", "data": valid_data, "cluster":cluster}, status= status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message":"data not valid"}, status=status.HTTP_400_BAD_REQUEST)


class TestMarksPOSTAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TestMarksPOSTSerializer

    def post(self, request):
        user = User.objects.get(id = request.user.id)
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            valid_data = serializer.create(serializer.validated_data, user)
            if User.objects.all().count() >1:
                cluster = cluster_data(request)
            return JsonResponse({"message": "success", "data": valid_data, "cluster":cluster}, status= status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message":"data not valid"}, status=status.HTTP_400_BAD_REQUEST)


class TestMarksGETAPI(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TestMarksGETSerializer

    def get_queryset(self):
        objs = TestMarks.objects.filter(user = self.request.user)
        return objs