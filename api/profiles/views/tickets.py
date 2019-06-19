from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from profiles import serializers as s
from profiles import models as m


class UserAccessList(APIView):
    serializer_class = s.ShortUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return m.User.objects.none()

        if user.is_staff:
            return m.User.objects.all()

        companies = user.companies.values_list('id')
        if companies:
            return m.User.objects.filter(
                membership_set__company_id__in=companies
            )

        return m.User.objects.none()

    def get(self, request):
        q = request.query_params.get('q', '')
        users = m.User.objects.none()

        if q:
            names = q.split(' ')
            first_name = names[0]
            last_name = ''
            if len(names) > 1:
                last_name = names[1]
            queryset = self.get_queryset()
            users = queryset.filter(
                Q(first_name__contains=first_name) |
                Q(email=q)
            )

            if last_name:
                users = users.filter(last_name=last_name)[:20]

        serializer = self.serializer_class(users, many=True)
        return Response({
            'results': serializer.data
        }, status=status.HTTP_200_OK)


class CompanyAccessList(APIView):
    serializer_class = s.ShortCompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return m.Company.objects.none()

        if user.is_staff:
            return m.Company.objects.all()

        return user.companies.all()

    def get(self, request):
        q = request.query_params.get('q', '')
        companies = m.Company.objects.none()

        if q:
            queryset = self.get_queryset()
            companies = queryset.filter(
                name__contains=q
            )

        serializer = self.serializer_class(companies, many=True)
        return Response({
            'results': serializer.data
        }, status=status.HTTP_200_OK)