from django.db import models

# Create your models here.
class MCQGenerator(models.Model):
    name = 'summarizerapp'
    file = models.FileField(upload_to='')
    summary = models.CharField(max_length=200, default = '')
    pdf_name = models.CharField(max_length=200, default='')


class Cards(models.Model):
    pdf = models.ForeignKey(MCQGenerator, on_delete=models.CASCADE)
    question = models.CharField(max_length=200, default = '')
    answer = models.CharField(max_length=200, default = '')
