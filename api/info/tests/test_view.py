import json
from django.urls import reverse
from django.core.management import call_command
from rest_framework import status
from rest_framework.test import APITestCase
from djangorestframework_camel_case.util import camelize
from profiles.models import User
from info.models import (
    GluuProduct, TicketCategory, TicketIssueType, TicketStatus,
    UserRole, Permission
)
from info.serializers import (
    GluuProductSerializer, TicketCategorySerializer, TicketIssueTypeSerializer,
    TicketStatusSerializer, UserRoleSerializer, PermissionSerializer
)


class GluuProductViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.user = User.objects.create_user(
            email='user@gmail.org',
            password='user'
        )

        self.valid_payload = {
            "product": {
                "name": "GluuProductViewset",
                "version": ["2.1"],
                "os": ["Centos"]
            }
        }

        self.invalid_payload = {
            "product": {
                "name": ""
            }
        }

        self.product = GluuProduct.objects.get(name='Super Gluu')

    def test_create_info(self):
        """
         - create info by user
         - create valid info by manager
         - create invalid info by manager
        """
        # create info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.post(
            reverse('info:product-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('info:product-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid info by manager
        response = self.client.post(
            reverse('info:product-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_info(self):
        serializer = GluuProductSerializer(
            GluuProduct.objects.all(),
            many=True
        )
        response = self.client.get(reverse('info:product-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

    def test_update_info(self):
        """
         - update info by user
         - update valid info by manager
         - update invalid info by manager
         - update non-existing info by manager
        """
        # update info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.put(
            reverse('info:product-detail', kwargs={'pk': self.product.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.put(
            reverse('info:product-detail', kwargs={'pk': self.product.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid info by manager
        response = self.client.put(
            reverse('info:product-detail', kwargs={'pk': self.product.id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing info by manager
        response = self.client.put(
            reverse('info:product-detail', kwargs={'pk': 0}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_info(self):
        """
         - retrieve info
         - retrieve non-existing info
        """
        # retrieve info
        serializer = GluuProductSerializer(self.product)
        response = self.client.get(
            reverse('info:product-detail', kwargs={'pk': self.product.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

        # retrieve non-existing info
        response = self.client.get(
            reverse('info:product-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_info(self):
        """
         - delete info by user
         - delete valid info by manager
         - delete non-existing info by manager
        """
        # delete info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.delete(
            reverse('info:product-detail', kwargs={'pk': self.product.id}),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse('info:product-detail', kwargs={'pk': self.product.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing info by manager
        response = self.client.delete(
            reverse('info:product-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TicketCategoryViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.user = User.objects.create_user(
            email='user@gmail.org',
            password='user'
        )

        self.valid_payload = {
            "ticket_category": {
                "name": "TicketCategoryViewSet"
            }
        }

        self.invalid_payload = {
            "ticket_category": {
                "name": ""
            }
        }

        self.category = TicketCategory.objects.get(name='Installation')

    def test_create_info(self):
        """
         - create info by user
         - create valid info by manager
         - create invalid info by manager
        """
        # create info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.post(
            reverse('info:category-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('info:category-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid info by manager
        response = self.client.post(
            reverse('info:category-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_info(self):
        serializer = TicketCategorySerializer(
            TicketCategory.objects.all(),
            many=True
        )
        response = self.client.get(reverse('info:category-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

    def test_update_info(self):
        """
         - update info by user
         - update valid info by manager
         - update invalid info by manager
         - update non-existing info by manager
        """
        # update info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.put(
            reverse('info:category-detail', kwargs={'pk': self.category.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.put(
            reverse('info:category-detail', kwargs={'pk': self.category.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid info by manager
        response = self.client.put(
            reverse('info:category-detail', kwargs={'pk': self.category.id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing info by manager
        response = self.client.put(
            reverse('info:category-detail', kwargs={'pk': 0}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_info(self):
        """
         - retrieve info
         - retrieve non-existing info
        """
        # retrieve info
        serializer = TicketCategorySerializer(self.category)
        response = self.client.get(
            reverse('info:category-detail', kwargs={'pk': self.category.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

        # retrieve non-existing info
        response = self.client.get(
            reverse('info:category-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_info(self):
        """
         - delete info by user
         - delete valid info by manager
         - delete non-existing info by manager
        """
        # delete info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.delete(
            reverse('info:category-detail', kwargs={'pk': self.category.id}),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse('info:category-detail', kwargs={'pk': self.category.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing info by manager
        response = self.client.delete(
            reverse('info:category-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TicketIssueTypeViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.user = User.objects.create_user(
            email='user@gmail.org',
            password='user'
        )

        self.valid_payload = {
            "ticket_issue_type": {
                "name": "TicketIssueTypeViewSet"
            }
        }

        self.invalid_payload = {
            "ticket_issue_type": {
                "name": ""
            }
        }

        self.type = TicketIssueType.objects.get(name='Production Outage')

    def test_create_info(self):
        """
         - create info by user
         - create valid info by manager
         - create invalid info by manager
        """
        # create info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.post(
            reverse('info:type-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('info:type-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid info by manager
        response = self.client.post(
            reverse('info:type-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_info(self):
        serializer = TicketIssueTypeSerializer(
            TicketIssueType.objects.all(),
            many=True
        )
        response = self.client.get(reverse('info:type-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

    def test_update_info(self):
        """
         - update info by user
         - update valid info by manager
         - update invalid info by manager
         - update non-existing info by manager
        """
        # update info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.put(
            reverse('info:type-detail', kwargs={'pk': self.type.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.put(
            reverse('info:type-detail', kwargs={'pk': self.type.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid info by manager
        response = self.client.put(
            reverse('info:type-detail', kwargs={'pk': self.type.id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing info by manager
        response = self.client.put(
            reverse('info:type-detail', kwargs={'pk': 0}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_info(self):
        """
         - retrieve info
         - retrieve non-existing info
        """
        # retrieve info
        serializer = TicketIssueTypeSerializer(self.type)
        response = self.client.get(
            reverse('info:type-detail', kwargs={'pk': self.type.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

        # retrieve non-existing info
        response = self.client.get(
            reverse('info:type-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_info(self):
        """
         - delete info by user
         - delete valid info by manager
         - delete non-existing info by manager
        """
        # delete info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.delete(
            reverse('info:type-detail', kwargs={'pk': self.type.id}),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse('info:type-detail', kwargs={'pk': self.type.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing info by manager
        response = self.client.delete(
            reverse('info:type-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TicketStatusViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.user = User.objects.create_user(
            email='user@gmail.org',
            password='user'
        )

        self.valid_payload = {
            "ticket_status": {
                "name": "TicketStatusViewSet"
            }
        }

        self.invalid_payload = {
            "ticket_status": {
                "name": ""
            }
        }

        self.status = TicketStatus.objects.get(name='new')

    def test_create_info(self):
        """
         - create info by user
         - create valid info by manager
         - create invalid info by manager
        """
        # create info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.post(
            reverse('info:status-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('info:status-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid info by manager
        response = self.client.post(
            reverse('info:status-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_info(self):
        serializer = TicketStatusSerializer(
            TicketStatus.objects.all(),
            many=True
        )
        response = self.client.get(reverse('info:status-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

    def test_update_info(self):
        """
         - update info by user
         - update valid info by manager
         - update invalid info by manager
         - update non-existing info by manager
        """
        # update info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.put(
            reverse('info:status-detail', kwargs={'pk': self.status.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.put(
            reverse('info:status-detail', kwargs={'pk': self.status.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid info by manager
        response = self.client.put(
            reverse('info:status-detail', kwargs={'pk': self.status.id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing info by manager
        response = self.client.put(
            reverse('info:status-detail', kwargs={'pk': 0}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_info(self):
        """
         - retrieve info
         - retrieve non-existing info
        """
        # retrieve info
        serializer = TicketStatusSerializer(self.status)
        response = self.client.get(
            reverse('info:status-detail', kwargs={'pk': self.status.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

        # retrieve non-existing info
        response = self.client.get(
            reverse('info:status-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_info(self):
        """
         - delete info by user
         - delete valid info by manager
         - delete non-existing info by manager
        """
        # delete info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.delete(
            reverse('info:status-detail', kwargs={'pk': self.status.id}),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse('info:status-detail', kwargs={'pk': self.status.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing info by manager
        response = self.client.delete(
            reverse('info:status-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class UserRoleViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.user = User.objects.create_user(
            email='user@gmail.org',
            password='user'
        )

        self.valid_payload = {
            "role": {
                "name": "UserRoleViewSet",
                "permissions": [1, 2]
            }
        }

        self.invalid_payload = {
            "role": {
                "name": ""
            }
        }

        self.role = UserRole.objects.get(name='staff')

    def test_create_info(self):
        """
         - create info by user
         - create valid info by manager
         - create invalid info by manager
        """
        # create info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.post(
            reverse('info:role-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('info:role-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid info by manager
        response = self.client.post(
            reverse('info:role-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_info(self):
        serializer = UserRoleSerializer(
            UserRole.objects.all(),
            many=True
        )
        response = self.client.get(reverse('info:role-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

    def test_update_info(self):
        """
         - update info by user
         - update valid info by manager
         - update invalid info by manager
         - update non-existing info by manager
        """
        # update info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.put(
            reverse('info:role-detail', kwargs={'pk': self.role.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.put(
            reverse('info:role-detail', kwargs={'pk': self.role.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid info by manager
        response = self.client.put(
            reverse('info:role-detail', kwargs={'pk': self.role.id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing info by manager
        response = self.client.put(
            reverse('info:role-detail', kwargs={'pk': 0}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_info(self):
        """
         - retrieve info
         - retrieve non-existing info
        """
        # retrieve info
        serializer = UserRoleSerializer(self.role)
        response = self.client.get(
            reverse('info:role-detail', kwargs={'pk': self.role.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

        # retrieve non-existing info
        response = self.client.get(
            reverse('info:role-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_info(self):
        """
         - delete info by user
         - delete valid info by manager
         - delete non-existing info by manager
        """
        # delete info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.delete(
            reverse('info:role-detail', kwargs={'pk': self.role.id}),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse('info:role-detail', kwargs={'pk': self.role.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing info by manager
        response = self.client.delete(
            reverse('info:role-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PermissionViewSetTest(APITestCase):

    def setUp(self):
        call_command('loaddata', 'data', verbosity=0)

        self.manager = User.objects.create_superuser(
            email='manager@gmail.com',
            password='manager'
        )

        self.user = User.objects.create_user(
            email='user@gmail.org',
            password='user'
        )

        self.valid_payload = {
            "permission": {
                "app_name": "PermissionViewSet",
                "model_name": "PermissionViewSet",
                "actions": ["create"],
                "description": "PermissionViewSet"
            }
        }

        self.invalid_payload = {
            "permission": {
                "app_name": "",
                "model_name": "Ticket",
                "actions": ["create"],
                "description": "Create Ticket"
            }
        }

        self.permission = Permission.objects.get(
            app_name="billing", model_name="Billing",
            actions=["retrieve", "list"]
        )

    def test_create_info(self):
        """
         - create info by user
         - create valid info by manager
         - create invalid info by manager
        """
        # create info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.post(
            reverse('info:permission-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # create valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.post(
            reverse('info:permission-list'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # create invalid info by manager
        response = self.client.post(
            reverse('info:permission-list'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_info(self):
        serializer = PermissionSerializer(
            Permission.objects.all(),
            many=True
        )
        response = self.client.get(reverse('info:permission-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], camelize(serializer.data))

    def test_update_info(self):
        """
         - update info by user
         - update valid info by manager
         - update invalid info by manager
         - update non-existing info by manager
        """
        # update info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.put(
            reverse(
                'info:permission-detail',
                kwargs={'pk': self.permission.id}
            ),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # update valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.put(
            reverse(
                'info:permission-detail',
                kwargs={'pk': self.permission.id}
            ),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # update invalid info by manager
        response = self.client.put(
            reverse(
                'info:permission-detail',
                kwargs={'pk': self.permission.id}
            ),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # update non-existing info by manager
        response = self.client.put(
            reverse('info:permission-detail', kwargs={'pk': 0}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_info(self):
        """
         - retrieve info
         - retrieve non-existing
        """
        # retrieve info
        serializer = PermissionSerializer(self.permission)
        response = self.client.get(
            reverse(
                'info:permission-detail',
                kwargs={'pk': self.permission.id}
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)

        # retrieve non-existing info
        response = self.client.get(
            reverse('info:permission-detail', kwargs={'pk': 0})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_info(self):
        """
         - delete info by user
         - delete valid info by manager
         - delete non-existing info by manager
        """
        # delete info by user
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.delete(
            reverse(
                'info:permission-detail',
                kwargs={'pk': self.permission.id}
            ),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # delete valid info by manager
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.manager.token
        )
        response = self.client.delete(
            reverse(
                'info:permission-detail',
                kwargs={'pk': self.permission.id}
            )
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # delete non-existing info by manager
        response = self.client.delete(
            reverse('info:permission-detail', kwargs={'pk': 0}),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
