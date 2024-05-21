from django.contrib import admin
from django.urls import path, include

from pollapp.views import csrf_token_view, login_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pollapp.urls')),
    path('api/login/', login_view, name='login'),
    path('api/csrf/', csrf_token_view, name='csrf'),
]
