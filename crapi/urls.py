from django.conf.urls import url

from crapi import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^clan/$', views.clan, name="clan"),
    url(r'^member/(?P<tag>\w+)/$', views.member, name="member"),
]
