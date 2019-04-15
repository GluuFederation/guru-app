from rest_framework import permissions
from info.models import UserRole


class IsVisitor(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_authenticated


class IsCompanyAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.company == obj


class IsCompanyUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj in request.user.companies


class IsStaffOrSelf(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.id == request.user.id


class CompanyCustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser if view.action in ['create'] else\
            request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        staff_permission = False

        if request.user.is_staff:
            staff_role = UserRole.objects.get(name='staff')
            staff_permission = request.method in permissions.SAFE_METHODS or\
                staff_role.has_permission(
                    app_name='profiles',
                    model_name='Company',
                    action=view.action
                )

        membership = request.user.membership_set.filter(
            company=obj
        ).first()

        membership_permission = membership and membership.role and (
            request.method in permissions.SAFE_METHODS or
            membership.role.has_permission(
                app_name='profiles',
                model_name='Company',
                action=view.action
            )
        )
        return view.action in ['accept_invite'] or staff_permission or\
            membership_permission
