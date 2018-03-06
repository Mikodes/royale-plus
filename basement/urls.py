from django.conf.urls import url
from basement import views

urlpatterns = [
    url(r'^$', views.index),
]
