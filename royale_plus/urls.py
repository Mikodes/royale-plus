from django.conf.urls import url, include
from django.contrib import admin

from api.urls import router

urlpatterns = (
    url(r'^admin/', admin.site.urls),
    url(r'^crapi/', include('crapi.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^', include('basement.urls')),
)
