from django.urls import path
from . import views

urlpatterns = [
    path('summary/', views.SummarizerOpenaiAPI.as_view(), name = 'summary'),
    #path('getsummary/', views.GetSummaryAPI.as_view(), name='getsummary')
]