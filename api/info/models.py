from django.db import models
from django.contrib.postgres.fields import CICharField, ArrayField
from info import constants


class GluuProduct(models.Model):

    name = CICharField(
        max_length=20,
        unique=True
    )

    version = ArrayField(
        models.CharField(max_length=20)
    )

    os = ArrayField(
        models.CharField(max_length=20)
    )

    def __str__(self):
        return self.name


class TicketCategory(models.Model):

    name = CICharField(
        max_length=30,
        unique=True
    )

    slug = models.SlugField(
        max_length=30
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Ticket Categories'


class HighIssueTypeManager(models.Model):

    def get_queryset(self):
        return super().get_queryset().filter(
            priority=constants.HIGH_PRIORITY
        )


class LowIssueTypeManager(models.Model):

    def get_queryset(self):
        return super().get_queryset().filter(
            priority=constants.LOW_PRIORITY
        )


class TicketIssueType(models.Model):

    name = CICharField(
        max_length=30,
        unique=True
    )

    slug = models.SlugField(
        max_length=30
    )

    priority = models.CharField(
        max_length=10,
        choices=constants.PRIORITY,
        default=constants.LOW_PRIORITY
    )

    objects = models.Manager()
    high = HighIssueTypeManager()
    low = LowIssueTypeManager()

    def __str__(self):
        return self.name


class TicketStatus(models.Model):

    name = CICharField(
        max_length=30,
        unique=True
    )

    slug = models.SlugField(
        max_length=30
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Ticket Status'


class UserRole(models.Model):

    name = CICharField(
        max_length=20,
        unique=True
    )

    is_company_associated = models.BooleanField(
        default=False
    )

    permissions = models.ManyToManyField(
        'Permission'
    )

    def __str__(self):
        return self.name

    def has_permission(self, app_name, model_name, action):
        permissions = self.permissions.filter(
            app_name=app_name,
            model_name=model_name
        )

        for permission in permissions:
            if action in permission.actions:
                return True

        return False


class Permission(models.Model):

    app_name = models.CharField(
        max_length=20
    )

    model_name = models.CharField(
        max_length=20
    )

    actions = ArrayField(
        models.CharField(max_length=20)
    )

    description = models.TextField()

    def __str__(self):
        return self.description
