from .models import *

def max_data(user):
    studytime_objs = StudyTime.objects.filter(user = user)
    marks_objs = TestMarks.objects.filter(user = user)

    if marks_objs is not None:
        marks_list = []
        for obj in marks_objs:
            marks_list.append(float(obj.marks))

    if studytime_objs is not None:
        studytime_list = []
        for obj in studytime_objs:
            studytime_list.append(obj.minutes)

    total_time = sum(studytime_list)
    total_marks = sum(marks_list)

    return total_marks, total_time

def form_data():
    users = User.objects.all()
    marks_list = []
    studytime_list = []
    for user in users:
        marks, time = max_data(user)
