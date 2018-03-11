from django.shortcuts import render

from royale_plus.settings import VERSION, PRODUCTION, STATIC_URL


def index(request):
    return render(request, 'index.html', {
        'version': VERSION,
        'v': f'?v={VERSION}',
        'static_url': STATIC_URL,
        'production': PRODUCTION,
    })
