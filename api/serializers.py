from rest_framework import serializers

from account.models import User
from activity.models import Activity
from deck.models import Deck


class UserSerializer(serializers.ModelSerializer):
    decks_count = serializers.ReadOnlyField(source='deck_set.count')

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
            'decks_count',
            'last_login',
            'joined',
            'is_active',
            'is_admin',
            'is_whatsapp',
            'member',
            'about',
            'picture',
            'link',
            'nationality',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data: dict):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
        )


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'about',
            'picture',
            'member',
            'email',
            'link',
            'nationality',
        ]


class DeckSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Deck
        fields = '__all__'

    def create(self, validated_data: dict):
        return Deck.objects.create(
            user=self.context['request'].user,
            name=validated_data['name'],
            cards=validated_data['cards'],
            type=validated_data['type'],
            avg_elixir=validated_data['avg_elixir'],
        )


class ActivitySerializer(serializers.ModelSerializer):
    issuer = serializers.StringRelatedField()

    class Meta:
        model = Activity
        fields = '__all__'


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
