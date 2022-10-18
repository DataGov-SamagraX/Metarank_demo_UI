from django.urls import path
from . import views

urlpatterns = [
    path('rank', views.rank),
    path('interact', views.interact),
]