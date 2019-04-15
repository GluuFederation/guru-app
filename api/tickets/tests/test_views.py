import json
from django.urls import reverse
from django.core.management import call_command
from rest_framework import status
from rest_framework.test import APITestCase
from info.models import UserRole
from profiles.models import User, Company, Membership
from tickets.models import Ticket, Answer


class TicketViewSetTest(APITestCase):

    def setUp(self):

        call_command('loaddata', 'data', verbosity=0)

        # Create Company
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

        # Retrieve User Role
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
            company=self.openiam, user=self.openiam_admin, role=self.role_admin
        )
        Membership.objects.create(
            company=self.openiam, user=self.openiam_named, role=self.role_named
        )
        Membership.objects.create(
            company=self.openiam, user=self.openiam_user, role=self.role_user
        )

        # Create Tickets; Community Ticket, Company Ticket
        self.ticket_by_community_user = Ticket.objects.create(
            title='title', body='body', status_id=1, category_id=1,
            issue_type_id=1, gluu_server='3.1.4', os='Ubuntu',
            created_by=self.community_user
        )

        self.ticket_by_gluu_admin = Ticket.objects.create(
            title='title', body='body', status_id=1, category_id=1,
            issue_type_id=1, gluu_server='3.1.4', os='Ubuntu',
            created_by=self.gluu_admin, company_association=self.gluu,
            created_for=self.gluu_named
        )

        self.ticket_by_staff_for_gluu = Ticket.objects.create(
            title='title', body='body', status_id=1, category_id=1,
            issue_type_id=1, gluu_server='3.1.4', os='Ubuntu',
            created_by=self.staff, company_association=self.gluu,
            created_for=self.gluu_named
        )

        self.valid_create_ticket_payload = {
            "ticket": {
                "title": "title",
                "body": "body",
                "issueType": 1,
                "status": 1,
                "category": 1,
                "gluuServer": "3.1.4",
                "os": "Ubuntu",
                "osVersion": "18.04"
            }
        }

        self.invalid_create_ticket_payload = {
            "ticket": {
                "title": "aaa",
                "body": "body",
                "issueType": 1,
                "status": 1,
                "category": 1,
                "gluuServer": 1,
                "os": 0
            }
        }

        self.valid_create_gluu_ticket_payload = {
            "ticket": {
                "title": "title",
                "body": "body",
                "issueType": 1,
                "status": 1,
                "category": 1,
                "gluuServer": "3.1.4",
                "os": "Ubuntu",
                "osVersion": "18.04",
                "company_association": self.gluu.id,
                "created_for": self.gluu_named.id
            }
        }

        self.invalid_create_gluu_ticket_payload = {
            "ticket": {
                "title": "title",
                "body": "body",
                "issueType": 1,
                "status": 1,
                "category": 1,
                "gluuServer": 1,
                "os": 1,
                "company_association": self.gluu.id,
                "created_for": self.openiam_admin.id
            }
        }

        self.assign_for_community_ticket_payload = {
            "ticket": {
                "assignee": self.staff.id
            }
        }

        self.assign_for_gluu_ticket_payload = {
            "ticket": {
                "assignee": self.gluu_admin.id
            }
        }

    def test_create_ticket(self):
        """
         - Create Ticket by unauthenticated user
         - Create Valid Ticket by community user
         - Create InValid Ticket by community user
        """
        # Create Ticket by unauthenticated user
        response = self.client.post(
            reverse('tickets:ticket-list'),
            data=json.dumps(self.valid_create_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Create Valid Ticket
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.post(
            reverse('tickets:ticket-list'),
            data=json.dumps(self.valid_create_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Create Invalid Ticket
        response = self.client.post(
            reverse('tickets:ticket-list'),
            data=json.dumps(self.invalid_create_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_company_ticket(self):
        """
         - create company ticket by non permission users
         - create company ticket by permission users
         - create invalid company ticket by permission user
        """
        # create company ticket by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse('tickets:ticket-list'),
                data=json.dumps(self.valid_create_gluu_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create company ticket by permission users
        permission_users = [
            self.gluu_named, self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse('tickets:ticket-list'),
                data=json.dumps(self.valid_create_gluu_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid company ticket by permission user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('tickets:ticket-list'),
            data=json.dumps(self.invalid_create_gluu_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_ticket(self):
        """
         - Update Ticket by unauthenticated user.
         - Update Non-existing ticket by community user
         - Update Invalid Ticket by community user
         - update community ticket by non permission users
         - update community ticket by permission users
        """
        # Update Ticket by unauthenticated user.
        response = self.client.put(
            reverse(
                'tickets:ticket-detail',
                kwargs={'pk': self.ticket_by_community_user.id}
            ),
            data=json.dumps(self.valid_create_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Update Non-existing ticket by community user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.put(
            reverse('tickets:ticket-detail', kwargs={'pk': 0}),
            data=json.dumps(self.valid_create_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Update Invalid Ticket by community user
        response = self.client.put(
            reverse(
                'tickets:ticket-detail',
                kwargs={'pk': self.ticket_by_community_user.id}
            ),
            data=json.dumps(self.invalid_create_ticket_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update community ticket by non permission users
        non_permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_community_user.id}
                ),
                data=json.dumps(self.valid_create_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update community ticket by permission users
        permission_users = [
            self.community_user, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_community_user.id}
                ),
                data=json.dumps(self.valid_create_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_company_ticket(self):
        """
         - update company ticket by non permission users
         - update company ticket by permission users
        """
        # update company ticket by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                ),
                data=json.dumps(self.valid_create_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update company ticket by permission users
        permission_users = [
            self.gluu_named, self.gluu_named, self. staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                ),
                data=json.dumps(self.valid_create_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            response = self.client.put(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_staff_for_gluu.id}
                ),
                data=json.dumps(self.valid_create_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_ticket(self):
        """
        1. Retrieve Community Ticket by unauthenticated user.
        2. Retrieve Company Ticket by unauthenticated user.
        3. Retrieve Non-existing Ticket by community user
        """
        # Retrieve Community Ticket by unauthenticated user.
        response = self.client.get(
            reverse(
                'tickets:ticket-detail',
                kwargs={'pk': self.ticket_by_community_user.id}
            ),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Retrieve Company Ticket by unauthenticated user.
        response = self.client.get(
            reverse(
                'tickets:ticket-detail',
                kwargs={'pk': self.ticket_by_gluu_admin.id}
            ),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Retrieve Non-existing Ticket
        response = self.client.get(
            reverse('tickets:ticket-detail', kwargs={'pk': 0}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_company_ticket(self):
        """
         - retrieve company ticket by non permission users
         - retireve company ticket by permission users
        """
        # retireve company ticket by non permission users
        non_permission_users = [
            self.community_user, self.openiam_user,
            self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                ),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # retrieve company ticket by permission users
        permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                ),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_ticket(self):
        """
        1. Delete ticket by unauthenticated user
        2. Delete ticket
        3. Delete non-existing ticket
        """
        # Delete ticket by unauthenticated user
        response = self.client.delete(
            reverse(
                'tickets:ticket-detail',
                kwargs={'pk': self.ticket_by_community_user.id}
            )
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Delete ticket by community user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.delete(
            reverse(
                'tickets:ticket-detail',
                kwargs={'pk': self.ticket_by_community_user.id}
            )
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Delete non-existing ticket
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.delete(
            reverse('tickets:ticket-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_company_ticket(self):
        """
        - delete company ticket by non permission users
        - delete company ticket by permission users
        """
        # delete company ticket by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                )
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete company ticket by permisison users
        permission_users = [
            self.gluu_named, self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(
                reverse(
                    'tickets:ticket-detail',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                )
            )
            if user is permission_users[0]:
                self.assertEqual(
                    response.status_code, status.HTTP_204_NO_CONTENT
                )
            else:
                self.assertEqual(
                    response.status_code, status.HTTP_404_NOT_FOUND
                )

    def test_retrieve_community_ticket_history(self):
        """
         - retrieve community ticket history by unauthenticated user
         - retireve community ticket history by authenticated users
        """
        # retrieve community ticket history by unauthenticated user
        response = self.client.get(
            reverse(
                'tickets:ticket-history',
                kwargs={'pk': self.ticket_by_community_user.id}
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # retireve community ticket history by authenticated users
        permission_users = [
            self.community_user,
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin,
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'tickets:ticket-history',
                    kwargs={'pk': self.ticket_by_community_user.id}
                )
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_company_ticket_history(self):
        """
         - retrieve company ticket history by non permission users
         - retireve company ticket history by permission users
        """
        # retrieve company ticket history by non permission users
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
                    'tickets:ticket-history',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                )
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # retrieve company ticket history by permission users
        permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'tickets:ticket-history',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                )
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_assign_for_community_ticket(self):
        """
         - assign for community ticket by non permission users
         - assign for community ticket by permission users
        """
        # assign for community ticket by non permission users
        non_permission_users = [
            self.community_user,
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-assign',
                    kwargs={'pk': self.ticket_by_community_user.id}
                ),
                data=json.dumps(self.assign_for_community_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # assign for community ticket by permission users
        permission_users = [
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-assign',
                    kwargs={'pk': self.ticket_by_community_user.id}
                ),
                data=json.dumps(self.assign_for_community_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_assign_for_company_ticket(self):
        """
         - assign for company ticket by non permission users
         - assign for company ticket by permission users
        """
        # assign for community ticket by non permission users
        non_permission_users = [
            self.community_user,
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-assign',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                ),
                data=json.dumps(self.assign_for_gluu_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # assign for community ticket by permission users
        permission_users = [
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-assign',
                    kwargs={'pk': self.ticket_by_gluu_admin.id}
                ),
                data=json.dumps(self.assign_for_gluu_ticket_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)


class AnswerViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        # Create Company
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

        # Retrieve User Role
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
            company=self.openiam, user=self.openiam_admin, role=self.role_admin
        )
        Membership.objects.create(
            company=self.openiam, user=self.openiam_named, role=self.role_named
        )
        Membership.objects.create(
            company=self.openiam, user=self.openiam_user, role=self.role_user
        )

        # Create Tickets; Community Ticket, Company Ticket
        self.ticket_by_community_user = Ticket.objects.create(
            title='title', body='body', status_id=1, category_id=1,
            issue_type_id=1, gluu_server='3.1.4', os='Ubuntu',
            created_by=self.community_user
        )

        self.ticket_by_gluu_admin = Ticket.objects.create(
            title='title', body='body', status_id=1, category_id=1,
            issue_type_id=1, gluu_server='3.1.4', os='Ubuntu',
            created_by=self.gluu_admin, company_association=self.gluu,
            created_for=self.gluu_named
        )

        self.ticket_by_staff_for_gluu = Ticket.objects.create(
            title='title', body='body', status_id=1, category_id=1,
            issue_type_id=1, gluu_server='3.1.4', os='Ubuntu',
            created_by=self.staff, company_association=self.gluu,
            created_for=self.gluu_named
        )

        # Create Answer
        self.answer_for_community_ticket_by_manager = Answer.objects.create(
            body='body', ticket=self.ticket_by_community_user,
            created_by=self.manager
        )

        self.answer_for_community_ticket_by_community_user =\
            Answer.objects.create(
                body='body', ticket=self.ticket_by_community_user,
                created_by=self.community_user
            )

        self.answer_for_gluu_ticket_by_manager = Answer.objects.create(
            body='body', ticket=self.ticket_by_gluu_admin,
            created_by=self.manager
        )

        self.valid_create_answer_payload = {
            "answer": {
                "body": "body"
            }
        }

        self.invalid_create_answer_payload = {
            "answer": {
                "body": ""
            }
        }

    def test_create_answer_for_community_ticket(self):
        """
         - create answer for community ticket by unauthenticated user
         - create answer for community ticket by non permission users
         - create answer for community ticket by permission users
         - create answer for community ticket with invalid payload
        """
        # create answer for community ticket by unauthenticated user
        response = self.client.post(
            reverse(
                'tickets:ticket-answers-list',
                kwargs={'ticket_pk': self.ticket_by_community_user.id}
            ),
            data=json.dumps(self.valid_create_answer_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create answer for community ticket by non permission users
        non_permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-answers-list',
                    kwargs={'ticket_pk': self.ticket_by_community_user.id}
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create answer for community ticket by permission users
        permission_users = [
            self.community_user, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-answers-list',
                    kwargs={'ticket_pk': self.ticket_by_community_user.id}
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create answer for community ticket with invalid payload
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse(
                'tickets:ticket-answers-list',
                kwargs={'ticket_pk': self.ticket_by_community_user.id}
            ),
            data=json.dumps(self.invalid_create_answer_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_answer_for_company_ticket(self):
        """
         - create answer for company ticket by non permission users
         - create answer for company ticket by permission users
        """
        # create answer for company ticket by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-answers-list',
                    kwargs={'ticket_pk': self.ticket_by_gluu_admin.id}
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create answer fro company ticket by permission users
        permission_users = [
            self.gluu_named, self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.post(
                reverse(
                    'tickets:ticket-answers-list',
                    kwargs={'ticket_pk': self.ticket_by_gluu_admin.id}
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_answer_for_community_ticket(self):
        """
         - update answer for community ticket by unauthenticated user
         - update answer for community ticket by non permission users
         - update answer for community ticket by permission users
         - update answer for community ticket with invalid payload
         - update answer for non-existing ticket
        """
        # update answer for community ticket by unauthenticated user
        response = self.client.put(
            reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': self.answer_for_community_ticket_by_community_user.id
                }
            ),
            data=json.dumps(self.valid_create_answer_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update answer for community ticket by non permission users
        # update answer_for_community_ticket_by_manager by non permission users
        non_permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin,
            self.community_user
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_community_user.id,
                        'pk': self.answer_for_community_ticket_by_manager.id
                    }
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update answer_for_community_ticket_by_community_user
        # by non permission users
        non_permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            url = reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': self.answer_for_community_ticket_by_community_user.id
                }
            )
            response = self.client.put(
                url,
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update answer for community ticket by permission users
        # update answer_for_community_ticket_by_manager by permission users
        permission_users = [
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_community_user.id,
                        'pk': self.answer_for_community_ticket_by_manager.id
                    }
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update answer_for_community_ticket_by_community_user
        # by permission users
        permission_users = [
            self.community_user
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            url = reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': self.answer_for_community_ticket_by_community_user.id
                }
            )
            response = self.client.put(
                url,
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_answer_for_company_ticket(self):
        """
         - update answer for company ticket by non permission users
         - update answer for company ticket by permission users
        """
        # update answer for company ticket by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_gluu_admin.id,
                        'pk': self.answer_for_gluu_ticket_by_manager.id
                    }
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update answer for company ticket by permission users
        permission_users = [
            self.gluu_named, self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.put(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_gluu_admin.id,
                        'pk': self.answer_for_gluu_ticket_by_manager.id
                    }
                ),
                data=json.dumps(self.valid_create_answer_payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_answer_for_community_ticket(self):
        """
         - retrieve community ticket by unauthenticated user
         - retrieve community ticket by permission users
         - retrieve non-existing ticket
        """
        # retrieve community ticket by unauthenticated user
        response = self.client.get(
            reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': self.answer_for_community_ticket_by_community_user.id
                }
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # retrieve community ticket by permission users
        permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin,
            self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            url = reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': self.answer_for_community_ticket_by_community_user.id
                }
            )
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Retrieve non-existing ticket answer by community user
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.get(
            reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': 0
                }
            )
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_answer_for_company_ticket(self):
        """
         - retrieve answer for company ticket by non permission users
         - retrieve answer for company ticket by permission users
        """
        # retrieve answer for company ticket by non permission users
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
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_gluu_admin.id,
                        'pk': self.answer_for_gluu_ticket_by_manager.id
                    }
                )
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # retrieve answer for company ticket by permission users
        permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.get(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_gluu_admin.id,
                        'pk': self.answer_for_gluu_ticket_by_manager.id
                    }
                )
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_answer_for_community_ticket(self):
        """
         - delete answer for community ticket by unauthenticated user
         - delete answer for community ticket by non permission users
         - delete answer for community ticket by permission users
         - delete non existing answer
        """
        # delete answer for community ticket by unauthenticated user
        response = self.client.delete(
            reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': self.answer_for_community_ticket_by_community_user.id
                }
            )
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete answer for community ticket by non permission users
        non_permission_users = [
            self.gluu_user, self.gluu_named, self.gluu_admin,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        url = reverse(
            'tickets:ticket-answers-detail',
            kwargs={
                'ticket_pk': self.ticket_by_community_user.id,
                'pk': self.answer_for_community_ticket_by_community_user.id
            }
        )
        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(url)
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete answer for community ticket by permission users
        permission_users = [
            self.community_user, self.staff, self.manager
        ]

        url = reverse(
            'tickets:ticket-answers-detail',
            kwargs={
                'ticket_pk': self.ticket_by_community_user.id,
                'pk': self.answer_for_community_ticket_by_community_user.id
            }
        )
        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(url)
            if user is permission_users[0]:
                expected = status.HTTP_204_NO_CONTENT
            else:
                expected = status.HTTP_404_NOT_FOUND
            self.assertEqual(response.status_code, expected)

        # delete non existing answer
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.community_user.token
        )
        response = self.client.delete(
            reverse(
                'tickets:ticket-answers-detail',
                kwargs={
                    'ticket_pk': self.ticket_by_community_user.id,
                    'pk': 0
                }
            )
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_answer_for_company_ticket(self):
        """
         - delete answer for company ticket by non permission users
         - delete answer for company ticket by permission users
        """
        # delete answer for company ticket by non permission users
        non_permission_users = [
            self.community_user, self.gluu_user,
            self.openiam_user, self.openiam_named, self.openiam_admin
        ]

        for user in non_permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_gluu_admin.id,
                        'pk': self.answer_for_gluu_ticket_by_manager.id
                    }
                )
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete answer for company ticket by permission users
        permission_users = [
            self.gluu_named, self.gluu_admin, self.staff, self.manager
        ]

        for user in permission_users:
            self.client.credentials(
                HTTP_AUTHORIZATION='Token ' + user.token
            )
            response = self.client.delete(
                reverse(
                    'tickets:ticket-answers-detail',
                    kwargs={
                        'ticket_pk': self.ticket_by_gluu_admin.id,
                        'pk': self.answer_for_gluu_ticket_by_manager.id
                    }
                )
            )
            if user is permission_users[0]:
                expected = status.HTTP_204_NO_CONTENT
            else:
                expected = status.HTTP_404_NOT_FOUND
            self.assertEqual(response.status_code, expected)
