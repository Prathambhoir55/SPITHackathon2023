from django.urls import path
from . import views

urlpatterns = [
    path('doubts/', views.DoubtsOpenaiAPI.as_view(), name = 'doubts'),
]