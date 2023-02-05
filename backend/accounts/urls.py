from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegisterAPI.as_view(), name = 'registration'),
    path('streak/', views.UserStreakAPI.as_view(), name = 'streak'),
    path('login/', views.LoginAPI.as_view(), name = 'login'),
    path('user/', views.UserGetAPI.as_view(), name = 'user-data'),
    path('clustered-users/', views.ClusteredUsersGETAPI.as_view(), name = 'clustered-users'),
]