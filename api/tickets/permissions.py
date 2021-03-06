from django.shortcuts import get_object_or_404
from rest_framework import permissions
from profiles.models import UserRole
from tickets.models import Ticket


class TicketCustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS or\
            request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        auth = request.user.is_authenticated
        if request.user.is_superuser:
            return True

        action = 'retrieve'\
            if request.method in permissions.SAFE_METHODS else view.action

        if auth and request.user.is_gluu_staff:
            staff_role = UserRole.objects.get(name='staff')
            return staff_role.has_permission(
                app_name='tickets',
                model_name='Ticket',
                action=action
            )

        company = obj.company_association
        if company is None:
            return request.method in permissions.SAFE_METHODS or\
                request.user == obj.created_by

        if not request.user.is_authenticated:
            return False

        membership = company.membership_set.filter(user=request.user).first()

        return membership and membership.role and\
            membership.role.has_permission(
                app_name='tickets',
                model_name='Ticket',
                action=action
            )


class TicketItemCustomPermission(permissions.BasePermission):
    item_model = 'Answer'

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS or\
            request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        item_model = self.item_model
        if request.user.is_superuser:
            return True

        if request.user.is_gluu_staff:
            staff_role = UserRole.objects.get(name='staff')
            model_name = 'Ticket' if view.action == 'retrieve' else item_model
            return staff_role.has_permission(
                app_name='tickets',
                model_name=model_name,
                action=view.action
            )

        if obj.ticket.company_association is None:
            return request.method in permissions.SAFE_METHODS or\
                request.user == obj.created_by

        membership = None
        if request.user.is_authenticated:
            membership = request.user.membership_set.filter(
                company=obj.ticket.company_association
            ).first()

        model_name = 'Ticket' if view.action == 'retrieve' else item_model

        return membership and membership.role and\
            membership.role.has_permission(
                app_name='tickets',
                model_name=model_name,
                action=view.action
            )


class AnswerCustomPermission(TicketItemCustomPermission):
    pass


class TicketProductCustomPermission(TicketItemCustomPermission):
    item_model = 'TicketProduct'


class TicketAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        kwargs = request.parser_context.get('kwargs')
        ticket_slug = kwargs.get('ticket_slug', None)
        ticket = get_object_or_404(Ticket, slug=ticket_slug)
        company = ticket.company_association

        if company is None:
            return True

        if request.user.is_superuser:
            return True

        if request.user.is_gluu_staff:
            staff_role = UserRole.objects.get(name='staff')
            return staff_role.has_permission(
                app_name='tickets',
                model_name='Ticket',
                action='retrieve'
            )

        membership = company.membership_set.filter(user=request.user).first()
        return membership and membership.role and\
            membership.role.has_permission(
                app_name='tickets',
                model_name='Ticket',
                action='retrieve'
            )
