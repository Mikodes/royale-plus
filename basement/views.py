from django.shortcuts import render
from royale_plus.settings import VERSION, PRODUCTION


def index(request):
    return render(request, 'index.html', {
        'version': VERSION,
        'production': PRODUCTION
    })
