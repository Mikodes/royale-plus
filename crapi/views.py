import json
from typing import Dict

import requests
from django.http import HttpResponse


class Crapi:
    HEADERS: Dict[str, str] = {'auth': "7ac3988c0e114b7d9e3199aea91672b43790709b2a254a11b913e657ce0238be"}

    @staticmethod
    def get_url(endpoint: str) -> str:
        return f"http://api.cr-api.com/{endpoint}"

    def call(self, endpoint: str, get: str, is_json: bool):
        url = self.get_url(endpoint) + "?" + get
        response = requests.get(url, headers=self.HEADERS)

        if is_json and response.status_code == 200:
            return json.dumps(response.json())

        return response


def index(request):
    response = Crapi().call("version", get="", is_json=False)
    return HttpResponse(response, content_type="application/json")


def clan(request):
    get = request.GET.urlencode()
    response = Crapi().call("clan/2Y2C9RCJ", get=get, is_json=True)
    return HttpResponse(response, content_type="application/json")


def member(request, tag):
    get = request.GET.urlencode()
    response = Crapi().call("player/" + tag, get=get, is_json=True)
    return HttpResponse(response, content_type="application/json")
