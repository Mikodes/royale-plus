from django.test import TestCase

from account.models import User, Follow


class UserTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='Amir',
            email='amir@pureawesomeness.com',
            password='wow tricky password',
        )

    def test_is_profile_completed(self):
        self.assertFalse(self.user.is_profile_completed)

        self.user.nationality = 'IRAN'
        self.user.about = 'The meaning of Pure Awesomeness.'
        self.user.picture = 'http://picture-url-here.com'

        self.assertTrue(self.user.is_profile_completed)

    def test_user_default_values(self):
        self.assertFalse(self.user.is_admin)
        self.assertFalse(self.user.is_staff)
        self.assertTrue(self.user.is_active)


class FollowTestCase(TestCase):
    amir: User
    clone: User

    def setUp(self):
        self.amir = User.objects.create(
            username='Amir',
            email='amir@pureawesomeness.com',
            password='wow tricky password',
        )
        self.clone = User.objects.create(
            username='AmirClone',
            email='amirclone@pureawesomeness.com',
            password='wow tricky password by amir clone'
        )

    def test_user_follow(self):
        # Make Amir follow Amir Clone
        follow: Follow = Follow.objects.create(user=self.amir, following=self.clone)

        self.assertEqual(str(follow), 'Amir follows AmirClone')
