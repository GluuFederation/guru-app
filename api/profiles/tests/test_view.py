import json
from django.urls import reverse
from django.core.management import call_command
from rest_framework import status
from rest_framework.test import APITestCase
from djangorestframework_camel_case.util import camelize
from profiles.models import User, Company, Membership, Invitation
from profiles.serializers import (
    CompanySerializer, ShortCompanySerializer
)
from info.models import UserRole
from oxd.models import Configuration
from gluru_backend.utils import generate_hash


class CompanyViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        # Create Companies; Gluu, OpenIAM
        self.gluu = Company.objects.create(name='Gluu')
        self.openiam = Company.objects.create(name='OpenIAM')

        # Create Users; manager, staff, community user, Gluu and OpenIAM users
        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.staff = User.objects.create_user(
            email='staff@gmail.com',
            password='staff'
        )
        self.staff.is_staff = True
        self.staff.save()

        self.community_user = User.objects.create_user(
            email='user@gmail.com',
            password='levan'
        )

        self.gluu_admin = User.objects.create_user(
            email='admin@gluu.org',
            password='levan'
        )

        self.gluu_named = User.objects.create_user(
            email='named@gluu.org',
            password='levan'
        )

        self.gluu_user = User.objects.create_user(
            email='user@gluu.org',
            password='levan'
        )

        self.openiam_admin = User.objects.create_user(
            email='admin@openiam.com',
            password='levan'
        )

        self.openiam_named = User.objects.create_user(
            email='named@openiam.com',
            password='levan'
        )

        self.openiam_user = User.objects.create_user(
            email='user@openiam.com',
            password='levan'
        )

        self.gluu_user_openiam_user = User.objects.create_user(
            email='user@mixed.com',
            password='levan'
        )

        # Create Permission and UserRole
        self.role_staff = UserRole.objects.get(name='staff')
        self.role_admin = UserRole.objects.get(name='admin')
        self.role_named = UserRole.objects.get(name='named')
        self.role_user = UserRole.objects.get(name='user')

        # Create Membership
        Membership.objects.create(
            company=self.gluu, user=self.gluu_admin, role=self.role_admin
        )
        Membership.objects.create(
            company=self.gluu, user=self.gluu_named, role=self.role_named
        )
        Membership.objects.create(
            company=self.gluu, user=self.gluu_user, role=self.role_user
        )
        Membership.objects.create(
            company=self.gluu, user=self.gluu_user_openiam_user,
            role=self.role_user
        )

        Membership.objects.create(
            company=self.openiam, user=self.openiam_admin, role=self.role_admin
        )
        Membership.objects.create(
            company=self.openiam, user=self.openiam_named, role=self.role_named
        )
        Membership.objects.create(
            company=self.openiam, user=self.openiam_user, role=self.role_user
        )
        Membership.objects.create(
            company=self.openiam, user=self.gluu_user_openiam_user,
            role=self.role_user
        )

        self.valid_create_company_payload = {
            "company": {
                "name": "IDFConnect"
            }
        }

        self.invalid_create_company_payload = {
            "company": {
                "name": ""
            }
        }

        self.valid_update_company_payload = {
            "company": {
                "name": "New IDFConnect"
            }
        }

        self.valid_invite_user_payload = {
            "invitation": {
                "email": "gibupjo127@gmail.com",
                "role": self.role_named.id
            }
        }

        self.invalid_invite_user_payload = {
            "invitation": {
                "email": "",
                "role": self.role_staff.id
            }
        }

        # Create Invitation
        self.invite_community_user_by_gluu_admin = Invitation.objects.create(
            email=self.community_user.email,
            invited_by=self.gluu_admin,
            company=self.gluu,
            role=self.role_user,
            activation_key=generate_hash(self.community_user.email)
        )

        self.invite_gluu_user_by_openiam_admin = Invitation.objects.create(
            email=self.gluu_user.email,
            invited_by=self.openiam_admin,
            company=self.openiam,
            role=self.role_user,
            activation_key=generate_hash(self.gluu_user.email)
        )

        self.valid_accept_invite_payload = {
            "activationKey": generate_hash(self.community_user.email)
        }

        self.valid_accept_invite_payload2 = {
            "activationKey": generate_hash(self.gluu_user.email)
        }

        self.invalid_accept_invite_payload = {
            "activationKey": 'afdafdafda'
        }

        self.valid_revoke_gluu_invite_payload = {
            "inviteId": self.invite_community_user_by_gluu_admin.id
        }

        self.valid_revoke_openiam_invite_payload = {
            "inviteId": self.invite_gluu_user_by_openiam_admin.id
        }

        self.invalid_revoke_payload = {
            "inviteId": 0
        }

        self.valid_remove_gluu_user_payload = {
            "user_id": self.gluu_user.id
        }

        self.valid_remove_gluu_admin_payload = {
            "user_id": self.gluu_admin.id
        }

        self.valid_change_gluu_user_role_payload = {
            "changeRole": {
                "userId": self.gluu_user.id,
                "role": self.role_named.id
            }
        }

        self.valid_change_gluu_admin_role_payload = {
            "changeRole": {
                "userId": self.gluu_admin.id,
                "role": self.role_named.id
            }
        }

    def test_create_company(self):
        """
         - create company info by non permission users
         - create company info by permission users
         - create invalid company info by manager
        """
        # create company info by non permission users
        non_permission_users = [
            self.community_user, self.staff,
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse('profiles:company-list'),
                data=json.dumps(self.valid_create_company_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid company info by permission users
        permission_users = [
            self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse('profiles:company-list'),
                data=json.dumps(self.valid_create_company_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid company info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('profiles:company-list'),
            data=json.dumps(self.invalid_create_company_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_company(self):
        """
         - list company info by community users
         - list company info by staff users
         - list company info by gluu users
         - list company info by openiam users
         - list company info by gluu&openiam user
        """
        # list company info by non permission users
        non_permission_users = [
            self.community_user
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(reverse('profiles:company-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['count'], 0)
            self.assertEqual(response.data['next'], None)
            self.assertEqual(response.data['previous'], None)
            self.assertEqual(response.data['results'], [])

        # list company info by staff users
        permission_users = [
            self.staff, self.manager
        ]
        company_serializer = ShortCompanySerializer(
            Company.objects.all(),
            many=True
        )
        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(reverse('profiles:company-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['count'], Company.objects.count())
            self.assertEqual(response.data['next'], None)
            self.assertEqual(response.data['previous'], None)
            self.assertEqual(
                response.data['results'], camelize(company_serializer.data)
            )

        # list company info by gluu users
        gluu_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin
        ]
        company_serializer = ShortCompanySerializer(
            Company.objects.filter(name='Gluu'),
            many=True
        )
        for user in gluu_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(reverse('profiles:company-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['count'], 1)
            self.assertEqual(response.data['next'], None)
            self.assertEqual(response.data['previous'], None)
            self.assertEqual(
                response.data['results'], camelize(company_serializer.data)
            )

        # list company info by openiam users
        openiam_users = [
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]
        company_serializer = ShortCompanySerializer(
            Company.objects.filter(name='OpenIAM'),
            many=True
        )
        for user in openiam_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(reverse('profiles:company-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['count'], 1)
            self.assertEqual(response.data['next'], None)
            self.assertEqual(response.data['previous'], None)
            self.assertEqual(
                response.data['results'], camelize(company_serializer.data)
            )

        # list company info by gluu&openiam user
        company_serializer = ShortCompanySerializer(
            self.gluu_user_openiam_user.companies, many=True
        )
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.gluu_user_openiam_user.token
        )
        response = self.client.get(reverse('profiles:company-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(response.data['next'], None)
        self.assertEqual(response.data['previous'], None)
        self.assertEqual(
            response.data['results'], camelize(company_serializer.data)
        )

    def test_update_company(self):
        """
         - update company info by non permission users
         - update company info by permission users
         - update invalid company info by manager
         - update non-existing company info by manager
        """
        # update company info by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user, self.gluu_named,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'profiles:company-detail',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_update_company_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update company info by permission users
        permission_users = [
            self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'profiles:company-detail',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_update_company_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid company info by manager
        response = self.client.put(
            reverse('profiles:company-detail', kwargs={'pk': self.gluu.id}),
            data=json.dumps(self.invalid_create_company_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing company info by manager
        response = self.client.put(
            reverse('profiles:company-detail', kwargs={'pk': 0}),
            data=json.dumps(self.valid_update_company_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_company(self):
        """
         - retrieve company info by non permission users
         - retrieve company info by permission users
         - retrieve non-existing company
        """
        # retrieve company info by non permission users
        non_permission_users = [
            self.community_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]
        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'profiles:company-detail',
                    kwargs={'pk': self.gluu.id}
                ),
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # retrieve company info by permission users
        permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.staff, self.manager
        ]
        company_serializer = ShortCompanySerializer(self.gluu)

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'profiles:company-detail',
                    kwargs={'pk': self.gluu.id}
                ),
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(
                response.data['results'], camelize(company_serializer.data)
            )

        # retrieve non-existing company
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.get(
            reverse('profiles:company-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_company(self):
        """
         - delete company info by non permission users
         - delete company info by permission users
         - delete non-existing company by manager
        """
        # delete company info by non permission users
        non_permission_users = [
            self.community_user,
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin,
            self.staff
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(
                reverse(
                    'profiles:company-detail',
                    kwargs={'pk': self.gluu.id}
                ),
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete company info by permission users
        permission_users = [
            self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(
                reverse(
                    'profiles:company-detail',
                    kwargs={'pk': self.gluu.id}
                ),
            )
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing company by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse('profiles:company-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_company_users(self):
        """
         - retrieve company users by non permission users
         - retrieve company users by permission users
         - retrieve non-existing company users
        """
        # retrieve company users by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.gluu_named, self.gluu_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'profiles:company-users',
                    kwargs={'pk': self.openiam.id}
                ),
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # retrieve company users by permission users
        permission_users = [
            self.openiam_user, self.openiam_named, self.openiam_admin,
            self.staff, self.manager
        ]
        company_serializer = CompanySerializer(self.openiam)
        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'profiles:company-users',
                    kwargs={'pk': self.openiam.id}
                ),
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(
                response.data['results'], camelize(company_serializer.data)
            )

        # retrieve non-existing company users by community user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.get(
            reverse('profiles:company-users', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invite_user(self):
        """
         - invite user by non permission users
         - invite user by permission users
         - invite user with incorrect user roles by permission users
        """
        # invite user by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user, self.gluu_named,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-invite',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_invite_user_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # invite user by permission users
        permission_users = [
            self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-invite',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_invite_user_payload),
                content_type='application/json'
            )

            if user is not permission_users[0]:
                msg = '{} already invited {} as {} in {}'.format(
                    permission_users[0].email,
                    self.valid_invite_user_payload['invitation']['email'],
                    self.role_named.name, self.gluu.name
                )
                self.assertEqual(response.data[0], msg)

            else:
                self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # invite user with incorrect user roles by permission users
        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-invite',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.invalid_invite_user_payload),
                content_type='application/json'
            )

            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_accept_invite(self):
        """
         - accept invite by non-invited user
         - accept invite by invited user
         - accept invite by invited user twice
        """
        # accept invite by non-invited user
        non_permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin,
            self.staff, self.manager
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-accept-invite',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.invalid_accept_invite_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # accept invite by invited user
        # community user accept invitation from gluu
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.post(
            reverse(
                'profiles:company-accept-invite',
                kwargs={'pk': self.gluu.id}
            ),
            data=json.dumps(self.valid_accept_invite_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # gluu user accept invitation from openiam
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.gluu_user.token
        )
        response = self.client.post(
            reverse(
                'profiles:company-accept-invite',
                kwargs={'pk': self.openiam.id}
            ),
            data=json.dumps(self.valid_accept_invite_payload2),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # accept invite by invited user twice
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.post(
            reverse(
                'profiles:company-accept-invite',
                kwargs={'pk': self.gluu.id}
            ),
            data=json.dumps(self.valid_accept_invite_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data[0], 'You already accepted invitation')

    def test_revoke_invite(self):
        """
         - revoke invite by non permission users
         - revoke invite by permission users
        """
        # revoke invite by non permission users
        # revoke gluu invite by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user, self.gluu_named,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-revoke-invite',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_revoke_gluu_invite_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # revoke openiam invite by non permission users
        non_permission_users = [
            self.community_user, self.openiam_user, self.openiam_named,
            self.gluu_user, self.gluu_named, self.gluu_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-revoke-invite',
                    kwargs={'pk': self.openiam.id}
                ),
                data=json.dumps(self.valid_revoke_openiam_invite_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # revoke invite by permission users
        # revoke gluu invite by permission users
        permission_users = [
            self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-revoke-invite',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_revoke_gluu_invite_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # revoke openiam invite by permission users
        permission_users = [
            self.openiam_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-revoke-invite',
                    kwargs={'pk': self.openiam.id}
                ),
                data=json.dumps(self.valid_revoke_openiam_invite_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_member(self):
        """
         - remove member by non permission users
         - remove member by permission users
         - remove company admin
        """
        # remove member by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user, self.gluu_named,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-remove-member',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_remove_gluu_user_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # remove member by permission users
        permission_users = [
            self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-remove-member',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_remove_gluu_user_payload),
                content_type='application/json'
            )
            if user is permission_users[0]:
                self.assertEqual(response.status_code, status.HTTP_200_OK)
            else:
                self.assertEqual(
                    response.status_code, status.HTTP_404_NOT_FOUND
                )

        # remove member byself
        users = [
            self.gluu_admin, self.staff, self.manager
        ]

        for user in users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-remove-member',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_remove_gluu_admin_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_leave_company(self):
        """
         - leave company by non permission users
         - leave company by permission users
         - leave company byself
        """
        # leave company by non permission users
        non_permission_users = [
            self.community_user, self.openiam_user, self.openiam_named,
            self.openiam_admin, self.staff, self.manager
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'profiles:company-leave-company',
                    kwargs={'pk': self.gluu.id}
                )
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # leave company by permission users
        permission_users = [
            self.gluu_user, self.gluu_named
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'profiles:company-leave-company',
                    kwargs={'pk': self.gluu.id}
                )
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # company admin leave company
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.gluu_admin.token
        )
        response = self.client.get(
            reverse(
                'profiles:company-leave-company',
                kwargs={'pk': self.gluu.id}
            )
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_role(self):
        """
         - change role by non permission users
         - change role by permission users
         - change company admin role
        """
        # change role by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user, self.gluu_named,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-change-role',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_change_gluu_user_role_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # change role by permission users
        permission_users = [
            self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'profiles:company-change-role',
                    kwargs={'pk': self.gluu.id}
                ),
                data=json.dumps(self.valid_change_gluu_user_role_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # change company admin role
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.gluu_admin.token
        )
        response = self.client.post(
            reverse(
                'profiles:company-change-role',
                kwargs={'pk': self.gluu.id}
            ),
            data=json.dumps(self.valid_change_gluu_admin_role_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserViewSetTest(APITestCase):
    pass


class OtherAPIViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@gmail.com',
            password='levan'
        )

        op_host = 'https://didp.gluu.org'
        oxd_host = 'https://oxd-server.gluu.org:8443'
        authorization_redirect_uri = 'http://localhost:8081/#/login-callback'
        post_logout_redirect_uri = 'http://localhost:8081'
        client_name = 'New Support Portal App'
        c_id = '@!A578.3242.DCA8.432A!0001!1DF4.0E33!0008!E432.FDF8.FC47.4052'
        client_secret = 'begashvili'
        scope = ['openid']
        grant_types = [
            'authorization_code', 'refresh_token', 'client_credentials'
        ]
        Configuration.objects.create(
            op_host=op_host,
            oxd_host=oxd_host,
            authorization_redirect_uri=authorization_redirect_uri,
            post_logout_redirect_uri=post_logout_redirect_uri,
            client_name=client_name,
            client_id=c_id,
            client_secret=client_secret,
            scope=scope,
            grant_types=grant_types
        )

    def test_get_login_url(self):
        """
         - get login url by unauthenticated user
         - get login url by authenticated user
        """
        # get login url by unauthenticated user
        response = self.client.get(
            reverse('profiles:get_login_url'),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get login url by authenticated user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.user.token
        )
        response = self.client.get(
            reverse('profiles:get_login_url'),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_login_callback(self):
        """
         - login callback by unauthenticated user
         - login callback by authenticated user
        """
        # login callback by unauthenticated user
        # response = self.client.get(
        #     reverse('profiles:login_callback'),
        # )
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

        # login callback by authenticated user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.user.token
        )
        response = self.client.get(
            reverse('profiles:login_callback'),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_signup_url(self):
        """
         - get signup url by unauthenticated user
         - get signup url by authenticated user
        """
        # get signup url by unauthenticated user
        response = self.client.get(
            reverse('profiles:get_signup_url'),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get signup url by authenticated user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.user.token
        )
        response = self.client.get(
            reverse('profiles:get_signup_url'),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_signup(self):
        """
         - signup by unauthenticated user
         - signup by authenticated user
        """
        # signup by unauthenticated user
        response = self.client.get(
            reverse('profiles:signup'),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # get signup url by authenticated user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.user.token
        )
        response = self.client.get(
            reverse('profiles:signup'),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logout(self):
        """
         - logout by unauthenticated user
         - logout by authenticated user
        """
        # get signup url by unauthenticated user
        response = self.client.get(
            reverse('profiles:logout'),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # get signup url by authenticated user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.user.token
        )
        response = self.client.get(
            reverse('profiles:logout'),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_auth(self):
        """
         - get auth token by unauthenticated user
         - get auth token by authenticated user
        """
        # get auth token by unauthenticated user
        response = self.client.get(
            reverse('profiles:get_auth'),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # get auth token by authenticated user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.user.token
        )
        response = self.client.get(
            reverse('profiles:get_auth'),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
