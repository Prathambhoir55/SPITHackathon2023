from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.authtoken.models import Token
from .serializers import *
from django.contrib.auth import authenticate,login
from rest_framework.response import Response
from rest_framework import status,permissions
from datetime import datetime
# Create your views here.

class UserRegisterAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer
    
    def post(self,request,*args,**kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"token":token.key, "email": user.email}, status=status.HTTP_201_CREATED)


class LoginAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
	
    def post(self,request,*args,**kwargs ):
        email = request.data.get('email',None)
        password = request.data.get('password',None)
        user = authenticate(email = email, password = password)
        if user :
            login(request,user)
            serializer = self.serializer_class(user)
            token = Token.objects.get(user=user)
            return Response({"token":token.key, "email": user.email},status = status.HTTP_200_OK)
        else:   
            return Response('Invalid Credentials',status = status.HTTP_404_NOT_FOUND)

    
class UserGetAPI(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user = User.objects.get(id = request.user.id)
            serializer = self.serializer_class(user)
        except:
            return Response("User not found", status= status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        data = request.data
        serializer = self.serializer_class(data=data)
        user = serializer.update(request.data, user)
        return Response(request.data, status = status.HTTP_200_OK)


class ClusteredUsersGETAPI(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.filter(cluster = self.request.user.cluster)
        return queryset

class UserStreakAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = StreakSerializer

    def get_object(self, pk):
        return User.objects.get(pk=pk)

    def patch(self, request, pk):
        testmodel_object = self.get_object(pk)
        serializer = StreakSerializer(testmodel_object, data=request.data, partial=True)
        if serializer.is_valid():
            # dates in string format
            str_d1 = testmodel_object.last_log
            str_d2 = serializer.data

            # convert string to date object
            d1 = datetime.strptime(str_d1, "'%d-%m-%Y'")
            d2 = datetime.strptime(str_d2, "'%d-%m-%Y'")

            # difference between dates in timedelta
            delta = d2 - d1
            print(f'Difference is {delta.days} days')
            testmodel_object.last_log = serializer.data
            if delta==1:
                testmodel_object.streak += 1
            elif delta==0:
                pass
            else:
                testmodel_object.streak = 0
        return Response(code=201, streak=testmodel_object.streak)
