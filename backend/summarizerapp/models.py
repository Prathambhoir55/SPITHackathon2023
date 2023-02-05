from django.db import models

# Create your models here.
class MCQGenerator(models.Model):
    name = 'summarizerapp'
    file = models.FileField(upload_to='')