from rest_framework import viewsets, status
from rest_framework.exceptions import (
    PermissionDenied, ValidationError, NotFound
)
from rest_framework.response import Response
from rest_framework.decorators import action
from tickets.utils import get_ticket_creatable_companies
from profiles import models as m
from profiles import serializers as s
from profiles import permissions as p


class CompanyViewSet(viewsets.ModelViewSet):

    permission_classes = (p.CompanyCustomPermission, )
    serializer_class = s.ShortCompanySerializer

    def get_queryset(self):
        return m.Company.objects.all()

    def create(self, request):
        serializer_data = request.data.get('company', {})
        serializer = self.serializer_class(
            data=serializer_data
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_201_CREATED
        )

    def list(self, request):
        queryset = self.get_queryset() if request.user.is_staff else\
            request.user.companies

        serializer = self.serializer_class(
            self.paginate_queryset(queryset),
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('company', {})
        serializer = self.serializer_class(
            serializer_instance,
            data=serializer_data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def retrieve(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer = self.serializer_class(
            serializer_instance,
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['GET'], url_path='ticket-createable')
    def ticket_creatable_companies(self, request):
        queryset = self.get_queryset().filter(
            get_ticket_creatable_companies(request.user)
        )

        serializer = self.serializer_class(
            queryset,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['GET'], url_path='users')
    def users(self, request, pk=None):
        serializer_instance = self.get_object()

        serializer = s.CompanySerializer(
            serializer_instance,
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['POST'])
    def invite(self, request, pk=None):
        company = self.get_object()
        serializer_data = request.data.get('invitation', {})

        email = serializer_data.get('email', None)
        try:
            invitation = m.Invitation.objects.get(
                email=email, company=company
            )
            msg = '{} already invited {} as {} in {}'.format(
                invitation.invited_by.email, email, invitation.role.name,
                company.name
            )
            raise ValidationError(msg)
        except m.Invitation.DoesNotExist:
            pass

        serializer = s.InvitationSerializer(
            data=serializer_data,
            context={
                'invited_by': request.user,
                'company': company
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'results': serializer.data},
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['POST'], url_path='accept-invite')
    def accept_invite(self, request, *args, **kwargs):
        company = self.get_object()
        activation_key = request.data.get('activation_key')

        try:
            invite = m.Invitation.objects.get(
                company=company,
                email=request.user.email,
                activation_key=activation_key
            )
        except m.Invitation.DoesNotExist:
            raise ValidationError('Invalid invite')

        if invite.is_accepted:
            raise ValidationError('You already accepted invitation')

        invite.accept(request.user)

        return Response({
            'results': 'Invite accepted successfully'
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'], url_path='revoke-invite')
    def revoke_invite(self, request, *args, **kwargs):
        company = self.get_object()
        invite_id = request.data.get('invite_id', None)

        if invite_id is None:
            raise ValidationError('Invite id is required')

        try:
            invite = m.Invitation.objects.get(
                id=invite_id, company=company
            )
            invite.delete()
        except m.Invitation.DoesNotExist:
            NotFound(detail='Such invitation does not exist')

        return Response({
            'results': 'Invite revoked successfully'
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'], url_path='remove-member')
    def remove_member(self, request, *args, **kwargs):
        company = self.get_object()
        user_id = request.data.get('user_id', None)
        if user_id is None:
            raise ValidationError('Invite id is required')

        try:
            user_id = int(user_id)
        except ValueError:
            raise ValidationError('Invalid user id')

        try:
            membership = m.Membership.objects.get(
                company=company,
                user__id=user_id
            )

            if membership.role.name == 'admin':
                raise ValidationError('Deleting company admin is prohibited')

            membership.delete()
        except m.Membership.DoesNotExist:
            raise NotFound('Such user does not exist')

        return Response({
            'results': 'User removed successfully'
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'], url_path='leave-company')
    def leave_company(self, request, *args, **kwargs):
        company = self.get_object()
        try:
            membership = m.Membership.objects.get(
                company=company,
                user=request.user
            )
            if membership.role.name == 'admin':
                raise ValidationError(
                    'You are admin of this company. Prohibited Operation'
                )
            else:
                membership.delete()
        except m.Membership.DoesNotExist:
            raise PermissionDenied('You are not member of this company')

        return Response({
            'results': 'User removed successfully'
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'], url_path='change-role')
    def change_role(self, request, *args, **kwargs):
        company = self.get_object()
        serializer_data = request.data.get('change_role', {})
        user_id = serializer_data.pop('user_id', None)

        try:
            user_id = int(user_id)
        except ValueError:
            raise ValidationError('Invalid user id')

        try:
            serializer_instance = m.Membership.objects.get(
                company=company, user__id=user_id
            )
            if serializer_instance.role.name == 'admin':
                raise ValidationError(
                    'Changing company admin role is prohibited'
                )
        except m.Membership.DoesNotExist:
            raise ValidationError('This user is not member of the company')

        serializer = s.ChangeRoleSerializer(
            serializer_instance,
            data=serializer_data
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def destroy(self, request, ticket_slug=None, pk=None):
        obj = self.get_object()
        obj.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
