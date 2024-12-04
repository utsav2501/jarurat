from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Worker, Job,WorkerProfile,Bookmark,JobApplication

@admin.register(Worker)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'location', 'skills')

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'budget', 'location')

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
     list_display = ('id', 'user_id', 'job')

@admin.register(WorkerProfile)
class WorkerProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'skills', 'location', 'availability', 'hourly_rate', 'bio')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'job', 'worker', 'applied_at')
