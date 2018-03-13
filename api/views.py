from rest_framework import viewsets, generics
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from account.models import User
from activity.models import Activity
from api.serializers import UserSerializer, UserUpdateSerializer, DeckSerializer, ActivitySerializer
from deck.models import Deck


class StandardPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    pagination_class = StandardPagination
    serializer_class = UserSerializer
    lookup_field = 'username'
    http_method_names = ('get', 'post',)


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    pagination_class = StandardPagination
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
    filter_fields = ('user', 'kind', 'arena',)

    def get_queryset(self):
        queryset = super(DeckViewSet, self).get_queryset()
        user = self.request.query_params.get('user', None)

        if user is not None:
            queryset = queryset.filter(user__username=user)

        return queryset


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_fields = ('issuer', 'kind',)
    http_method_names = ('get',)
    pagination_class = StandardPagination

    def get_queryset(self):
        queryset = super(ActivityViewSet, self).get_queryset()
        issuer = self.request.query_params.get('issuer', None)

        if issuer is not None:
            queryset = queryset.filter(issuer__username=issuer)

        return queryset
