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

    SIGNUP_RESPONSE: any

    def setUp(self):
        self.SIGNUP_RESPONSE = self.client.post(reverse('signup'), self.USER_DATA, format=self.FORMAT)

    def test_user_signup(self):
        response = self.SIGNUP_RESPONSE
        user: dict = response.data

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

        self.assertEqual(user['username'], self.USER_DATA['username'])
        self.assertEqual(user['email'], self.USER_DATA['email'])

    def test_user_list(self):
        response = self.client.get(reverse('user-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], User.objects.count())
        self.assertEqual(response.data['results'][0]['username'], self.USER_DATA['username'])

        self.assertNotIn('password', response.data['results'][0])
        self.assertNotIn('is_staff', response.data['results'][0])

