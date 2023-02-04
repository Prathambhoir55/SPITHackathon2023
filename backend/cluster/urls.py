from django.urls import path
from . import views

urlpatterns = [
    path('studytime/', views.StudyTimeAPI.as_view(), name = 'studytime'),
    path('getstudytime/', views.StudyTimeGETAPI.as_view(), name = 'getstudytime'),
    path('testmarks/', views.TestMarksPOSTAPI.as_view(), name = 'testmarks'),
    path('gettestmarks/', views.TestMarksGETAPI.as_view(), name = 'gettestmarks'),
]