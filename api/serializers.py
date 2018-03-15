from rest_framework import serializers

from account.models import User
from activity.models import Activity
from comment.models import Comment
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
            'joined_since',
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
        fields = [
            'id',
            'user',
            'name',
            'cards',
            'avg_elixir',
            'kind',
            'arena',
            'all_modes',
            'mode_1v1',
            'mode_2v2',
            'mode_2x',
            'mode_3x',
            'created',
        ]
        extra_kwargs = {
            'user': {'read_only': True},
        }

    def create(self, validated_data: dict):
        validated_data['user'] = self.context['request'].user
        return super(DeckSerializer, self).create(validated_data)


class ActivitySerializer(serializers.ModelSerializer):
    issuer = serializers.StringRelatedField()

    class Meta:
        model = Activity
        fields = [
            'issuer',
            'issued',
            'kind',
            'content',
            'created_since'
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = [
            'user',
            'comment',
            'kind',
            'object',
            'created',
            'created_since'
        ]


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
