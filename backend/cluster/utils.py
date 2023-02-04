from .models import *
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.metrics import silhouette_score

def max_data(user):
    print(user.email)
    studytime_objs = StudyTime.objects.filter(user = user)
    marks_objs = TestMarks.objects.filter(user = user)
    print(marks_objs.exists())

    if marks_objs.exists() and studytime_objs.exists():
        marks_list = []
        for obj in marks_objs:
            print(obj)
            if obj.marks == '':
                marks_list.append(0)
            else:
                marks_list.append(float(obj.marks))

        studytime_list = []
        for obj in studytime_objs:
            studytime_list.append(obj.minutes)

        print(studytime_list)
        print(marks_list)
        total_time = sum(studytime_list)
        total_marks = sum(marks_list)
        avg_marks = (total_marks/len(marks_list))
    else:
        total_marks=0
        avg_marks=0

    return total_marks, avg_marks

def cluster_data(request):
    users = User.objects.all()
    marks_list = []
    studytime_list = []
    user_list = []
    for user in users:
        if user.email == 'admin@admin.com':
            pass
        marks, time = max_data(user)
        marks_list.append(marks)
        studytime_list.append(time)
        user_list.append(user.id)
    df = pd.DataFrame(list(zip(marks_list, studytime_list)), columns =['marks', 'time'])
    
    # limit = 10
    # list1 = []
    # list2 = []
    # for k in range(2, limit+1):
    #     model = KMeans(n_clusters=k)
    #     model.fit(df)
    #     pred = model.predict(df)
    #     list1.append(silhouette_score(df, pred))
    #     list2.append(k)
    # print("list1 and list2:")
    # print(df)
    # print(list1)
    # print(list2)
    # best_score = (max(list1), list2[list1.index(max(list1))])
    kmeans = KMeans(n_clusters=2)
    kmeans.fit(df)
    for i in range(len(user_list)):
        user = User.objects.get(id=user_list[i])
        user.cluster = kmeans.labels_[i]
        user.save()
    return User.objects.get(id=request.user.id).cluster
    