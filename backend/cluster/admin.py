from django.contrib import admin
from .models import *

class StudyTimeAdmin(admin.ModelAdmin):
    model = StudyTime
    list_display = ['user', 'minutes', 'date']
    list_filter = ['user', 'minutes', 'date']
    fields = ['user', 'minutes', 'date']

    search_fields = ['user', 'minutes', 'date']
    ordering = ['user', 'minutes', 'date']
    filter_horizontal = ()

class TestMarksAdmin(admin.ModelAdmin):
    model = TestMarks
    list_display = ['user', 'marks']
    list_filter = ['user', 'marks']
    fields = ['user', 'marks']

    search_fields = ['user', 'marks']
    ordering = ['user', 'marks']
    filter_horizontal = ()


admin.site.register(StudyTime, StudyTimeAdmin)
admin.site.register(TestMarks, TestMarksAdmin)
