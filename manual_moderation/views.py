from django.shortcuts import render
from django.views import View

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")



class Home_Page(View) :
    template_name = 'pages/home.html'

    def get(self, request):
        return