from django.urls import path
from .views import WorkerList, JobList, JobDetail,signin,signup, WorkerProfileViewSet,WorkerDetail,BookmarkList,BookmarkDetail, ApplyForJobView
from . import views

worker_profile_list = WorkerProfileViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

worker_profile_detail = WorkerProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('workers/', WorkerList.as_view(), name='worker-list'),
    path('workers/<int:pk>/', WorkerDetail.as_view(), name='worker-detail'),
    path('worker-profiles/', worker_profile_list, name='worker-profile-list'),
    path('worker-profiles/<int:pk>/', worker_profile_detail, name='worker-profile-detail'),
    path('jobs/', JobList.as_view(), name='job-list'),
    path('jobs/<int:pk>/', JobDetail.as_view(), name='job-detail'),
    path('bookmarks/', BookmarkList.as_view(), name='bookmark-list'),
    path('bookmarks/<int:pk>/', BookmarkDetail.as_view(), name='bookmark-detail'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('google-login/', views.google_login, name='google_login'),
    path('logout/', views.logout_view, name='logout'),
    path('jobs/<int:job_id>/apply/', ApplyForJobView.as_view(), name='apply_for_job'),
    #path('jobs/', JobCreateView.as_view(), name='job-create'),

]
