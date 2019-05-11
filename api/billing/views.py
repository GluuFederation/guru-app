from django.db.models import Q
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from guru import viewsets
from billing import serializers as s
from billing import models as m


class AccountViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = s.AccountSerializer
    model = m.Account
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return self.model.objects.none()

        if user.is_staff:
            return self.model.objects.all()

        company = user.company_set.filter(
            membership__is_primary=True
        ).first()

        return self.model.objects.filter(
            Q(user=user) | Q(company=company)
        )
