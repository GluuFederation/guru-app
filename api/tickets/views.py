from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from drf_haystack.viewsets import HaystackViewSet
from drf_haystack.filters import HaystackAutocompleteFilter

from tickets import models as m
from tickets import serializers as s
from tickets import permissions as p
from guru import viewsets
from guru.utils import get_tickets_query
from info.models import UserRole


class TicketSearchView(HaystackViewSet):
    index_models = [m.Ticket]
    serializer_class = s.TicketSearchSerializer
    filter_backends = [HaystackAutocompleteFilter]


class TicketViewSet(viewsets.ModelViewSet):
    lookup_field = 'slug'
    permission_classes = (p.TicketCustomPermission, )
    serializer_class = s.TicketSerializer
    queryset = m.Ticket.actives.select_related(
        'created_by', 'created_for', 'company_association', 'updated_by',
        'assignee', 'status', 'issue_type', 'status', 'category'
    )

    def get_queryset(self):
        queryset = self.queryset

        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category__slug=category)

        return queryset

    def create(self, request):
        serializer_data = request.data.get('ticket', {})

        context = {
            'created_by': request.user,
            'created_for': serializer_data.pop('created_for', ''),
            'company_association': serializer_data.pop(
                'company_association', ''
            )
        }

        serializer = self.serializer_class(
            data=serializer_data, context=context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_201_CREATED
        )

    def list(self, request):
        page = self.paginate_queryset(
            self.get_queryset().filter(get_tickets_query(self.request.user)).order_by('id')
            # m.Ticket.objects.all().order_by(id)
        )
        if request.GET.get('created_by'):
            page = self.paginate_queryset(
                self.get_queryset().filter(created_by__in=request.GET.getlist('created_by')).order_by('id')
            )
            
            print (self.get_queryset().filter(created_by__in=request.GET.getlist('created_by')).order_by('id').query,flush=True)
        serializer = self.serializer_class(
            page,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def update(self, request, slug=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('ticket', {})
        context = {
            'updated_by': request.user
        }
        serializer = self.serializer_class(
            serializer_instance,
            data=serializer_data,
            context=context,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def retrieve(self, request, slug=None):
        ticket = self.get_object()
        serializer = self.serializer_class(
            ticket,
        )

        if ticket.company_association is None:
            respond_permission = (request.user == ticket.created_by)

        else:
            membership = request.user.membership_set.filter(
                company=ticket.company_association
            ).first()
            respond_permission = membership and membership.role and\
                membership.role.has_permission(
                    app_name='tickets', model_name='Answer', action='create'
                )

        if request.user.is_superuser:
            respond_permission = True

        if not request.user.is_superuser and request.user.is_staff:
            staff_role = UserRole.objects.get(name='staff')
            respond_permission = staff_role.has_permission(
                app_name='tickets', model_name='Answer', action='create'
            )
        return Response(
            {
                'results': serializer.data,
                'respond_permission': respond_permission
            },
            status=status.HTTP_200_OK
        )

    def destroy(self, request, slug=None):
        ticket = self.get_object()
        ticket.is_deleted = True
        ticket.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['GET'])
    def history(self, request, slug=None):
        serializer_instance = self.get_object()
        page = self.paginate_queryset(
            serializer_instance.history.all()
        )

        serializer = s.TicketHistorySerializer(
            page,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=['POST'])
    def assign(self, request, slug=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('ticket', {})
        context = {
            'assignee_id': serializer_data.pop('assignee', None),
            'updated_by': request.user
        }
        serializer = self.serializer_class(
            serializer_instance,
            data=serializer_data,
            context=context,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['POST'])
    def vote(self, request, slug=None):
        ticket = self.get_object()
        data = request.data.get('vote', {})
        vote = data.get('vote', True)
        if vote:
            ticket.voters.add(request.user)
            msg = 'You voted this ticket'
        else:
            if request.user in ticket.voters.all():
                ticket.voters.remove(request.user)
                msg = 'You unvoted this ticket'
            else:
                msg = 'You have not voted this ticket yet'

        return Response({'results': msg}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def subscribe(self, request, slug=None):
        ticket = self.get_object()
        data = request.data.get('subscribe', {})
        subscribe = data.get('subscribe', True)
        if subscribe:
            ticket.subscribers.add(request.user)
            msg = 'You are subscribed to this ticket'
        else:
            if request.user in ticket.subscribers.all():
                ticket.subscribers.remove(request.user)
                msg = 'You are unsubscribed to this ticket'
            else:
                msg = 'You are not subscribed to this ticket yet'

        return Response({'results': msg}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['PUT'], parser_classes=[MultiPartParser])
    def upload(self, request, slug=None):
        obj = self.get_object()
        files = list(request.FILES.values())
        for f in files:
            serializer = s.DocumentSerializer(data={"file": f})
            serializer.is_valid(raise_exception=True)
            document = serializer.save()
            m.Attachments.objects.create(
                document=document,
                ticket=obj
            )

        return Response(
            {'results': 'Successfully uploaded'},
            status=status.HTTP_200_OK
        )


class AnswerViewSet(viewsets.ModelViewSet):
    permission_classes = (p.AnswerCustomPermission, )
    serializer_class = s.AnswerSerializer

    def get_queryset(self):
        return m.Answer.actives.filter(
            ticket__slug=self.kwargs['ticket_slug'],
            ticket__is_deleted=False
        )

    def create(self, request, ticket_slug=None):
        serializer_data = request.data.get('answer', {})
        ticket = get_object_or_404(
            m.Ticket, is_deleted=False, slug=ticket_slug
        )
        context = {
            'created_by': request.user,
            'ticket': ticket
        }
        serializer = self.serializer_class(
            data=serializer_data,
            context=context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_201_CREATED
        )

    def update(self, request, ticket_slug=None, pk=None):
        serializer_instance = self.get_object()
        serializer_data = request.data.get('answer', {})
        context = {
            'updated_by': request.user
        }
        serializer = self.serializer_class(
            serializer_instance,
            data=serializer_data,
            context=context,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def retrieve(self, request, ticket_slug=None, pk=None):
        serializer_instance = self.get_object()
        serializer = self.serializer_class(
            serializer_instance,
        )

        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def destroy(self, request, ticket_slug=None, pk=None):
        answer = self.get_object()
        answer.is_deleted = True
        answer.save()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['PUT'], parser_classes=[MultiPartParser])
    def upload(self, request, ticket_slug=None, pk=None):
        obj = self.get_object()
        files = list(request.FILES.values())
        for f in files:
            serializer = s.DocumentSerializer(data={"file": f})
            serializer.is_valid(raise_exception=True)
            document = serializer.save()
            m.Attachments.objects.create(
                document=document,
                answer=obj
            )

        return Response(
            {'results': 'Successfully uploaded'},
            status=status.HTTP_200_OK
        )
