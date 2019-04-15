from rest_framework import viewsets, mixins, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from tickets.serializers import TicketSerializer
from info import models as m
from info import serializers as s
from info import permissions as p


class GetAllInfoView(APIView):
    def get(self, reqeust):
        products = m.GluuProduct.objects.all()
        issue_types = m.TicketIssueType.objects.all()
        categories = m.TicketCategory.objects.all()
        statuses = m.TicketStatus.objects.all()
        permissions = m.Permission.objects.all()
        user_roles = m.UserRole.objects.all()

        product_serializer = s.GluuProductSerializer(
            products,
            many=True
        )
        type_serializer = s.TicketIssueTypeSerializer(
            issue_types,
            many=True
        )
        category_serializer = s.TicketCategorySerializer(
            categories,
            many=True
        )
        status_serializer = s.TicketStatusSerializer(
            statuses,
            many=True
        )
        permission_serializer = s.PermissionSerializer(
            permissions,
            many=True
        )
        user_role_serializer = s.UserRoleSerializer(
            user_roles,
            many=True
        )

        return Response({
                'products': product_serializer.data,
                'types': type_serializer.data,
                'categories': category_serializer.data,
                'statuses': status_serializer.data,
                'permissions': permission_serializer.data,
                'user_roles': user_role_serializer.data
            },
            status=status.HTTP_200_OK
        )


class GluuProductViewSet(mixins.CreateModelMixin,
                         mixins.ListModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.DestroyModelMixin,
                         viewsets.GenericViewSet):
    serializer_class = s.GluuProductSerializer
    permission_classes = (p.IsSuperUserOrReadOnly, )

    def get_queryset(self):
        return m.GluuProduct.objects.all()

    def create(self, request):
        serializer_data = request.data.get('product', {})
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
        serializer_data = self.get_queryset()

        serializer = self.serializer_class(
            serializer_data,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('product', {})
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

    @action(detail=True, methods=['PUT'], url_path='add-info')
    def add_info(self, request, pk=None):
        product = self.get_object()
        data = request.data.get('product', {})
        os = data.get('os', None)
        version = data.get('version', None)

        if os is None and version is None:
            raise ValidationError('No data provided')

        if os is not None:
            if not isinstance(os, str):
                raise ValidationError('Invalid os')
            product.os.append(os)

        if version is not None:
            if not isinstance(version, str):
                raise ValidationError('Invalid version')
            product.version.append(version)

        product.save()
        return Response(
            {'results': 'Successfully add new os'},
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

    def destroy(self, request, pk=None):
        obj = self.get_object()
        obj.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class TicketCategoryViewSet(mixins.CreateModelMixin,
                            mixins.ListModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):
    serializer_class = s.TicketCategorySerializer
    permission_classes = (p.IsSuperUserOrReadOnly, )

    def get_queryset(self):
        return m.TicketCategory.objects.all()

    def create(self, request):
        serializer_data = request.data.get('ticket_category', {})
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
        serializer_data = self.get_queryset()

        serializer = self.serializer_class(
            serializer_data,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['GET'])
    def tickets(self, request, pk=None):
        category = self.get_object()
        page = self.paginate_queryset(category.tickets.all())

        serializer = TicketSerializer(
            page,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('ticket_category', {})
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

    def destroy(self, request, pk=None):
        obj = self.get_object()
        obj.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class TicketIssueTypeViewSet(mixins.CreateModelMixin,
                             mixins.ListModelMixin,
                             mixins.UpdateModelMixin,
                             mixins.RetrieveModelMixin,
                             mixins.DestroyModelMixin,
                             viewsets.GenericViewSet):
    serializer_class = s.TicketIssueTypeSerializer
    permission_classes = (p.IsSuperUserOrReadOnly, )

    def get_queryset(self):
        return m.TicketIssueType.objects.all()

    def create(self, request):
        serializer_data = request.data.get('ticket_issue_type', {})
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
        serializer_data = self.get_queryset()

        serializer = self.serializer_class(
            serializer_data,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['GET'])
    def tickets(self, request, pk=None):
        issue_type = self.get_object()
        page = self.paginate_queryset(issue_type.tickets.all())

        serializer = TicketSerializer(
            page,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('ticket_issue_type', {})
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

    def destroy(self, request, pk=None):
        obj = self.get_object()
        obj.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class TicketStatusViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):
    serializer_class = s.TicketStatusSerializer
    permission_classes = (p.IsSuperUserOrReadOnly, )

    def get_queryset(self):
        return m.TicketStatus.objects.all()

    def create(self, request):
        serializer_data = request.data.get('ticket_status', {})
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
        serializer_data = self.get_queryset()

        serializer = self.serializer_class(
            serializer_data,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('ticket_status', {})
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

    def destroy(self, request, pk=None):
        obj = self.get_object()
        obj.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class UserRoleViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                      mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                      mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = s.UserRoleSerializer
    permission_classes = (p.IsSuperUserOrReadOnly, )

    def get_queryset(self):
        return m.UserRole.objects.all()

    def create(self, request):
        serializer_data = request.data.get('role', {})
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
        serializer_data = self.get_queryset()

        serializer = self.serializer_class(
            serializer_data,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('role', {})
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

    def destroy(self, request, pk=None):
        obj = self.get_object()
        obj.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class PermissionViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                        mixins.UpdateModelMixin, mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = s.PermissionSerializer
    permission_classes = (p.IsSuperUserOrReadOnly, )

    def get_queryset(self):
        return m.Permission.objects.all()

    def create(self, request):
        serializer_data = request.data.get('permission', {})
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
        serializer_data = self.get_queryset()

        serializer = self.serializer_class(
            serializer_data,
            many=True
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def update(self, request, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('permission', {})
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

    def destroy(self, request, pk=None):
        obj = self.get_object()
        obj.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)
