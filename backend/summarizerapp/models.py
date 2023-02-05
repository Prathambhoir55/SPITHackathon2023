from django.db import models

# Create your models here.
class MCQGenerator(models.Model):
    name = 'summarizerapp'
    file = models.FileField(upload_to='')
    summary = models.CharField(max_length=200)
    pdf_name = models.CharField(max_length=200)
