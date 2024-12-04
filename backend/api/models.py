from django.db import models
from django.contrib.auth.models import User

class Worker(models.Model):
    name = models.CharField(max_length=100)
    skills = models.TextField()
    location = models.CharField(max_length=100)
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    #created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    #created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    #created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

   


class Bookmark(models.Model):
     user_id = models.IntegerField()  # Replace with ForeignKey(User) if user authentication is implemented
     job = models.ForeignKey(Job, on_delete=models.CASCADE)

     def __str__(self):
         return f"Bookmark for Job {self.job.id} by User {self.user_id}"

class WorkerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skills = models.TextField()
    location = models.CharField(max_length=255)
    availability = models.CharField(max_length=50)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    worker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')  # Assuming workers are users
    #cover_letter = models.TextField(blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'worker')  