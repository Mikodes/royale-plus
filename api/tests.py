from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from account.models import User


class AccountTests(APITestCase):
    FORMAT: str = 'json'

    USER_DATA: dict = {
        'username': 'Amir',
        'email': 'amir@savandbros.com',
        'password': 'wow tricky password',
    }

    def test_user_signup(self):
        response = self.client.post(
            path=reverse('signup'),
            format=self.FORMAT,
            data=self.USER_DATA,
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

        user: dict = response.data

        self.assertEqual(user['username'], self.USER_DATA['username'])
        self.assertEqual(user['email'], self.USER_DATA['email'])
