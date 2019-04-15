import json

import requests
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from guru.utils import generate_hash
from profiles import models as m
from profiles import serializers as s


class UserViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = s.UserSerializer

    def get_queryset(self):
        return m.User.objects.all()

    def list(self, request):
        page = self.paginate_queryset(self.get_queryset())

        serializer = s.UserSerializer(
            page,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        pass

    @action(detail=False, methods=['GET'])
    def me(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        if request.method == 'POST':
            serializer = self.serializer_class(
                instance=request.user,
                data=request.data
            )
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                # task = AsyncTask(
                #     user.sync_data
                # )
                # task.run()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['GET'], url_path='edit-profile')
    def edit_profile(self, request, *args, **kwargs):
        update_profile_endpoint = '{}/user-profile/'.format(
            settings.GLUU_USER_APP_FRONTEND
        )
        return Response(
            {'results': update_profile_endpoint},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['GET'])
    def staffs(self, request, *args, **kwargs):
        staffs = m.User.objects.filter(is_staff=True)
        serializer = s.ShortUserSerializer(staffs, many=True)
        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['GET'])
    def companies(self, request, *args, **kwargs):
        companies = m.Membership.objects.filter(user=request.user)
        serializer = s.UserMembershipSerializer(companies, many=True)
        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )
