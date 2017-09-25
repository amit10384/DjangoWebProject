from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    url(r'^home$', csrf_exempt(views.Home_Page.as_view()) , name='home_page'),
    url(r'^image_validate$', csrf_exempt(views.Image_moderation.as_view()) , name='image validation'),
]