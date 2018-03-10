from rest_framework import viewsets, generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from api.serializers import UserSerializer, UserUpdateSerializer, DeckSerializer
from account.models import User
from deck.models import Deck


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    http_method_names = ('get', 'post',)


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request: Request) -> Response:
        user = request.user

        serializer = UserUpdateSerializer(
            instance=user,
            data=request.data
        )

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)

        serializer.save()
        return Response(data=serializer.data)


class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    filter_fields = ('user', 'type',)
    order_fields = ('avg_elixir',)

    def get_queryset(self):
        queryset = Deck.objects.all()
        user = self.request.query_params.get('user', None)

        if user is not None:
            queryset = queryset.filter(user=User.objects.get(username=user))


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_fields = ('issuer', 'kind',)
    http_method_names = ('get',)

    def get_queryset(self):
        queryset = super(ActivityViewSet, self).get_queryset()
        issuer = self.request.query_params.get('issuer', None)

        if issuer is not None:
            queryset = queryset.filter(issuer__username=issuer)

        return queryset.order_by('id')
