from django.shortcuts import render
from royale_plus.settings import VERSION


def index(request):
    return render(request, 'index.html', {'version': VERSION})
