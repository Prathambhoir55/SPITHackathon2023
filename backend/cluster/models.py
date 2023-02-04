from django.db import models
from accounts.models import User

# Create your models here.
class StudyTime(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    minutes = models.IntegerField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)


class TestMarks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    marks = models.CharField(max_length=100, blank=True)
