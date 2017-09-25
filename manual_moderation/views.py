from django.shortcuts import render
from django.views.generic import TemplateView,View

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")



class Home_Page(TemplateView) :
    template_name = 'pages/home.html'



class Image_moderation(TemplateView) :
    template_name = 'pages/manual_image_observation_table.html'