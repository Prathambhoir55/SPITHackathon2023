from django.urls import path
from . import views

urlpatterns = [
    path('mcq/', views.MCQGeneratorAPI.as_view(), name = 'mcq'),
    path('text/', views.MCQGeneratorAPI.as_view(), name = 'text'),
]