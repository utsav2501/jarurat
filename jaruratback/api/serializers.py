from rest_framework import serializers
from .models import Worker, Job, WorkerProfile,Bookmark, JobApplication

class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
     class Meta:
         model = Bookmark
         fields = '__all__'

class WorkerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerProfile
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'worker', 'applied_at']
        read_only_fields = ['id', 'applied_at']