from django.urls import path
from . import views

urlpatterns = [
    path('summary/', views.SummarizerOpenaiAPI.as_view(), name = 'summary'),
]