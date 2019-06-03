from django.db.models import Q
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError

from guru import viewsets
from billing import serializers as s
from billing import models as m
from billing import constants as c
from profiles import models as pm
from suitecrm import interface as i


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

    @action(methods=['POST'], detail=False)
    def connect(self, request):
        account_id = request.data.get('account_id', '')

        if not account_id:
            raise ValidationError('Invalid account')

        email = request.user.email

        if i.check_account_email(account_id, email):
            try:
                account = m.Account.objects.get(crm_id=account_id)
                if (account.plan in [c.COMMUNITY, c.CORE] or
                        not account.company):
                    raise ValidationError('Unable to join account')

                company = account.company

            except m.Account.DoesNotExist:
                crm_account = i.get_account(account_id)
                company = pm.Company.objects.get

        raise ValidationError('Account does not contain user')
