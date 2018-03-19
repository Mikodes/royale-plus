from unittest import TestCase

from django.test import Client


class ViewsTests(TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_index(self):
        # Issue a GET request.
        response = self.client.get('/')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        # Check context
        self.assertIsNotNone(response.context['version'])
        self.assertIsNotNone(response.context['v'])
        self.assertIsNotNone(response.context['static_url'])
        self.assertIsNotNone(response.context['production'])

    def test_appcache(self):
        # Issue a GET request.
        response = self.client.get('/manifest.appcache')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
