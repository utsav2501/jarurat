from rest_framework import generics, filters,viewsets, permissions
from rest_framework.response import Response
from .models import Worker, Job, WorkerProfile,Bookmark, JobApplication
from .serializers import WorkerSerializer, JobSerializer, WorkerProfileSerializer,BookmarkSerializer
from .serializers import JobApplicationSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes

#logout

from django.contrib.auth import logout
from django.http import JsonResponse

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Successfully logged out.'}, status=200)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)

# Standard signup
@api_view(['POST'])
def signup(request):
    data = request.data
    if User.objects.filter(email=data['email']).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
    return Response({'message': 'User created successfully'})

# Standard signin
@api_view(['POST'])
def signin(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# Google login
@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), "756444366733-qpto08a8r9cpd0gf1vvhsdr6droka55a.apps.googleusercontent.com")
        email = id_info['email']
        user, created = User.objects.get_or_create(email=email, defaults={'username': email.split('@')[0]})
        if created:
            user.set_unusable_password()
            user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class WorkerList(generics.ListCreateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['location', 'skills', 'name']  # Enable search by location, skills, or name


class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    #permission_classes = [IsAuthenticated]

    filter_backends = [filters.SearchFilter]
    search_fields = ['location', 'title']  # Enable search by location or title


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class WorkerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class WorkerProfileViewSet(viewsets.ModelViewSet):
    queryset = WorkerProfile.objects.all()
    serializer_class = WorkerProfileSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkerProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookmarkList(generics.ListCreateAPIView):
     serializer_class = BookmarkSerializer

     def get_queryset(self):
         user_id = self.request.query_params.get('user_id', None)
         return Bookmark.objects.filter(user_id=user_id) if user_id else Bookmark.objects.none()


class BookmarkDetail(generics.DestroyAPIView):
     queryset = Bookmark.objects.all()
     serializer_class = BookmarkSerializer


# views.py

# from .models import Job
# from .serializers import JobSerializer
# from rest_framework.permissions import IsAuthenticated

# class JobCreateView(generics.CreateAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)

class ApplyForJobView(generics.CreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        job_id = self.kwargs['job_id']  # Assuming the job ID is passed in the URL
        serializer.save(worker=self.request.user, job_id=job_id)

@api_view(['POST'])
#@permission_classes([IsAuthenticated])  # Only authenticated users can apply
def apply_for_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)

        # Check if the user has already applied for the job
        if Application.objects.filter(job=job, worker=request.user).exists():
            return Response({'error': 'You have already applied for this job.'}, status=400)

        # Create a new application
        Application.objects.create(job=job, worker=request.user)
        return Response({'message': 'Successfully applied for the job!'})

    except Job.DoesNotExist:
        return Response({'error': 'Job not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)