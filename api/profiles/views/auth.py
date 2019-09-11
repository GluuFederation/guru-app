import json
import random
import hmac
import binascii
import hashlib

import requests
from django.conf import settings
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django_q.tasks import AsyncTask

from guru.utils import generate_hash
from profiles import models as m
from profiles import serializers as s
from profiles import permissions as p
from profiles import constants as c
from oxd import uma as api
from oxd import exceptions as e
from billing import models as bm
from billing import utils as bu
from suitecrm import interface as i
from suitecrm import models as sm
from info import models as im


class GetLoginUrlAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        app = request.query_params.get('app', c.GURU)
        redirect_uri = '{}/auth/login-callback'.format(
            settings.FRONTEND_URL
        )
        if app == c.USERS:
            redirect_uri = '{}/auth/login-callback'.format(
                settings.GLUU_USER_APP
            )
        url = api.get_authorization_url(redirect_uri)
        return Response(
            {
                'results': {
                    'login_url': url
                }
            },
            status=status.HTTP_200_OK
        )


class SignupAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = s.SignupSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        if user is not None:
            verification_pin = random.randint(100000, 999999)
            user.verification_token = verification_pin
            user.verification_tries = 0
            user.save()

            activation_url = '{}/auth/activate/{}/{}'.format(
                settings.GLUU_USER_APP, user.id,
                user.verification_token
            )

            task = AsyncTask(
                user.email_user,
                'emails/profiles/verify_email/verify_email_subject.txt',
                'emails/profiles/verify_email/verify_email.txt',
                {
                    'activation_link': activation_url,
                    'user': user
                },
                'emails/profiles/verify_email/verify_email.html'
            )

            task.run()

            user = s.UserSerializer(user)

            return Response(
                {'results': user.data},
                status=status.HTTP_201_CREATED
            )


class VerifyCodeAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = s.VerifyCodeSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            serialized_data = s.UserSerializer(user)
            return Response(
                {'results': serialized_data.data},
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class SendVerificationCodeAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = s.RequestEmailSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        verification_pin = random.randint(100000, 999999)
        user.verification_token = verification_pin
        user.verification_tries = 0
        user.save()

        activation_url = '{}/auth/activate/{}/{}'.format(
            settings.FRONTEND_URL, user.id,
            user.verification_token
        )

        task = AsyncTask(
            user.email_user,
            'emails/profiles/verify_email/verify_email_subject.txt',
            'emails/profiles/verify_email/verify_email.txt',
            {
                'activation_link': activation_url,
                'user': user
            },
            'emails/profiles/verify_email/verify_email.html'
        )
        task.run()

        return Response(
            {
                'results': 'Code sent!'
            },
            status=status.HTTP_201_CREATED
        )


class LoginCallbackAPIView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        app = request.query_params.get('app', c.GURU)
        redirect_uri = '{}/auth/login-callback'.format(
            settings.FRONTEND_URL
        )
        if app == c.USERS:
            redirect_uri = '{}/auth/login-callback'.format(
                settings.GLUU_USER_APP
            )
        query_params = {
            'code': request.query_params.get('code', ''),
            'redirect_uri': redirect_uri,
            'state': request.query_params.get('state', '')
        }
        token_json = api.get_token_from_callback(query_params)
        access_token = token_json.get('access_token')
        id_token = token_json.get('id_token')
        if not access_token:
            raise e.OxdError('Invalid token')
        user = authenticate(
            request, access_token=access_token, id_token=id_token
        )
        if user is not None:
            company = user.company
            if not company:
                domain = user.email
                email_parts = user.email.split('@')

                if len(email_parts) > 1:
                    domain = email_parts[1]

                companies = m.Company.objects.filter(
                    website__icontains=domain
                )
                if companies.count() == 1:
                    membership, created = m.Membership.objects.get_or_create(
                        user=user,
                        company=companies[0]
                    )
                    if created:
                        membership.role = im.UserRole.objects.get(name='user')
                    membership.is_primary = True
                    membership.save()

                else:
                    company = m.Company.objects.create(
                        name=user.email
                    )
                    m.Membership.objects.create(
                        user=user,
                        company=company,
                        role=im.UserRole.objects.get(name='admin'),
                        is_primary=True
                    )

            user_serializer = s.UserSerializer(user)
            return Response(
                {
                    'results': user_serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                'user': 'You are not registered on support portal yet'
            },
            status=status.HTTP_403_FORBIDDEN
        )


class GetSignupUrlAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        url = '{}/auth/register?from=guru'\
            .format(settings.GLUU_USER_APP)
        return Response(
            {
                'results': {
                    'signup_url': url
                }
            },
            status=status.HTTP_200_OK
        )


class ConfirmSignupAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        check_signup_endpoint = '{}/api/v1/confirm-created/'.format(
            settings.GLUU_USER_APP_BACKEND
        )

        headers = {
            'Content-Type': 'application/json'
        }

        data = {
            'idp_uuid': request.query_params.get('idp_uuid', None),
            'email_hash': request.query_params.get('email_hash', None)
        }

        r = requests.post(
            check_signup_endpoint, data=json.dumps(data), headers=headers
        )

        if r.status_code == 200:
            response = r.json()
            user = response.get('user')
            invite = response.get('invite')

            email = user.get('email')
            idp_uuid = user.get('idpUuid')
            first_name = user.get('firstName')
            last_name = user.get('lastName')

            user = m.Invitation.objects.create(
                email=email,
                first_name=first_name,
                last_name=last_name,
                idp_uuid=idp_uuid
            )

            company = invite.get('company')
            activation_key = invite.get('activationKey')

            if company is not None and activation_key is not None:
                try:
                    invite = m.Invitation.objects.get(
                        company__id=company,
                        activation_key=activation_key
                    )
                except m.Invitation.DoesNotExist:
                    pass

                if email != invite.email:
                    pass

                if user in invite.company.users.all():
                    pass

                invite.accept(user)

            user_serializer = s.UserSerializer(user)
            return Response(
                {
                    'results': user_serializer.data
                },
                status=status.HTTP_200_OK
            )
        else:
            raise ValidationError('Incorrect activation key')


class GetLogoutUrlAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        url = api.get_logout_url(id_token=request.user.id_token)
        return Response(
            {
                'results': {
                    'logout_url': url
                }
            },
            status=status.HTTP_200_OK
        )


class LogoutCallbackAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        state = request.query_params.get('state')
        is_valid = api.logout_callback(state)
        return Response(
            {
                'results': {
                    'is_valid': is_valid
                }
            },
            status=status.HTTP_200_OK
        )


class GetAuthUserAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = s.UserSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            instance=request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        task = AsyncTask(
            user.sync_data
        )
        task.run()
        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )


class GetSupportPortalRedirectUrlAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        generated_hash = hmac.new(
            binascii.unhexlify(settings.HEX_KEY),
            request.user.email.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        if request.user.service_from == c.GURU:
            base_url = settings.SUPPORT_PORTAL_URL
        else:
            base_url = ''

        url = '{}/signup-callback?idp_uuid={}&email_hash={}'.format(
            base_url, request.user.idp_uuid, generated_hash
        )
        return Response(
            {'results': url},
            status=status.HTTP_200_OK
        )
