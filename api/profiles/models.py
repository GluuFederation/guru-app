import pytz

import jwt
from datetime import datetime, timedelta
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.core.exceptions import ObjectDoesNotExist

from localflavor.us.models import USStateField, USZipCodeField
from guru.models import TimestampedModel
from guru.utils import send_mail
from info.models import UserRole
from oxd import scim
from profiles import constants as c
from billing import constants as bc


TIMEZONE_CHOICES = [(tz, tz) for tz in pytz.common_timezones]


class Address(TimestampedModel):
    line_1 = models.CharField(
        _('line 1'),
        max_length=510
    )
    line_2 = models.CharField(
        _('line 2'),
        max_length=510,
        blank=True
    )
    city = models.CharField(
        _('city'),
        max_length=255
    )
    state = models.CharField(
        _('state'),
        blank=True,
        max_length=255
    )
    zip_code = models.CharField(
        _('zip code'),
        blank=True,
        max_length=64
    )
    country = CountryField(_('country'))

    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'

    @property
    def country_name(self):
        return self.country.name


class UserManager(BaseUserManager):

    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if password is None:
            raise TypeError('Superusers must have a password.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):

    first_name = models.CharField(
        _('first name'),
        max_length=255,
        blank=True
    )

    last_name = models.CharField(
        _('last name'),
        max_length=255,
        blank=True
    )

    other_names = models.CharField(
        _('other names'),
        max_length=150,
        blank=True
    )

    job_title = models.CharField(
        _('job title'),
        max_length=150,
        blank=True
    )

    email = models.EmailField(
        _('email'),
        db_index=True,
        unique=True
    )

    phone_number = models.CharField(
        _('phone number'),
        max_length=100,
        blank=True
    )

    address = models.OneToOneField(
        Address,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    timezone = models.CharField(
        _('timezone'),
        max_length=63,
        default=c.DEFAULT_TIMEZONE,
        choices=TIMEZONE_CHOICES
    )

    idp_uuid = models.CharField(
        _('IDP UUID'),
        max_length=255,
        blank=True,
    )

    crm_id = models.TextField(
        _('suite crm id'),
        blank=True
    )

    id_token = models.TextField(
        _('id token'),
        blank=True
    )

    unique_key = models.CharField(
        _('unique key'),
        max_length=16,
        blank=True
    )

    service_from = models.CharField(
        _('service from'),
        max_length=255,
        blank=True,
        null=True
    )

    is_verified = models.BooleanField(
        _('is verified'),
        default=False
    )

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'
        ),
    )

    is_gluu = models.BooleanField(
        _('Gluu employee status'),
        default=False,
        help_text=_(
            'Designates whether the user is an employee of Gluu.'
        ),
    )

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    last_login = models.DateTimeField(
        _('last login'),
        auto_now=True
    )

    verification_token = models.CharField(
        _('verification token'),
        max_length=16,
        blank=True
    )

    verification_tries = models.PositiveSmallIntegerField(
        default=0
    )

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __repr__(self):
        return '{}-{}'.format(
            self.__class__, self.id
        )

    def __str__(self):
        return self.email

    @property
    def date_joined_str(self):
        return self.created_on.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    @property
    def last_login_str(self):
        return self.last_login.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    @property
    def token(self):
        return self._generate_jwt_token()

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

    @property
    def is_admin(self):
        return self.is_staff

    @property
    def company(self):
        membership = self.membership_set.filter(is_primary=True).first()
        return membership.company if membership else None

    @property
    def company_name(self):
        membership = self.membership_set.filter(is_primary=True).first()
        return membership.company.name if membership else ''

    @property
    def companies(self):
        membership = self.membership_set.all().order_by('-is_primary')
        return list(m.company for m in membership)

    @property
    def avatar_url(self):
        return ''

    @property
    def role(self):
        membership = self.membership_set.filter(is_primary=True).first()
        return membership.role if membership else None

    @property
    def is_gluu_staff(self):
        role = self.role
        if role:
            return role.name == 'staff'

        return False

    def sync_data(self):
        scim.update_user(self)

    def email_user(
            self, subject, email_template_name, context,
            html_email_template_name=None, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(
            subject, email_template_name, context, [self.email],
            html_email_template_name, from_email, **kwargs)

    def _generate_jwt_token(self):
        valid_time = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(valid_time.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')

    def update_from_idp(self, user_info):
        # Validate email
        email = user_info.get('email')
        if not email:
            raise ValidationError('Invalid email')
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            self.email = email

        self.idp_uuid = user_info.get('id', self.idp_uuid)
        self.first_name = user_info.get(
            'name', {}
        ).get(
            'givenName', self.first_name
        )
        self.last_name = user_info.get(
            'name', {}
        ).get(
            'familyName', self.last_name
        )
        phone_numbers = user_info.get('phoneNumbers', [])
        if phone_numbers:
            self.phone_number = phone_numbers[0].get(
                'value', self.phone_number
            )

        self.save()


class Company(TimestampedModel):

    name = models.CharField(
        _('name'),
        max_length=128,
        unique=True
    )

    address = models.OneToOneField(
        Address,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    users = models.ManyToManyField(
        User,
        through='Membership'
    )

    crm_id = models.CharField(
        _('crm id'),
        max_length=150,
        blank=True
    )

    website = models.URLField(
        _('website'),
        blank=True
    )

    plan = models.CharField(
        _('support plan'),
        max_length=25,
        choices=bc.GURU_PLAN_CHOICES,
        default=bc.COMMUNITY
    )

    support_hours = models.PositiveSmallIntegerField(
        _('support hours'),
        default=0
    )

    named_contacts = models.PositiveSmallIntegerField(
        _('named contacts'),
        default=0
    )

    review_hours = models.PositiveSmallIntegerField(
        _('review hours'),
        default=0
    )

    def __str__(self):
        return self.name

    def role_members(self, role):
        return self.membership_set.filter(role=role)

    def is_member(self, user):
        return user in self.users.all()

    class Meta:
        verbose_name_plural = 'Companies'


class Membership(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    role = models.ForeignKey(
        UserRole,
        on_delete=models.SET_NULL,
        null=True
    )

    is_primary = models.BooleanField(
        _('is primary company'),
        default=False
    )

    date_joined = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return '{} - {} at {}'.format(
            self.role.name if self.role else '',
            self.user,
            self.company
        )

    def save(self, *args, **kwargs):
        if not Membership.objects.filter(user=self.user).exists():
            self.is_primary = True
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['company', '-date_joined']
        unique_together = ['user', 'company']


class Invitation(TimestampedModel):

    email = models.EmailField()

    invited_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='invitations',
        on_delete=models.CASCADE
    )

    activation_key = models.CharField(
        max_length=64
    )

    company = models.ForeignKey(
        Company,
        related_name='invitations',
        on_delete=models.CASCADE
    )

    role = models.ForeignKey(
        UserRole,
        on_delete=models.SET_NULL,
        null=True
    )

    is_accepted = models.BooleanField(
        default=False
    )

    @property
    def invitation_link(self):
        if User.objects.filter(email=self.email).exists():
            link = '{}/accept-invitation/{}/{}'.format(
                settings.FRONTEND_URL,
                self.company.id,
                self.activation_key
            )
            return True, link
        else:
            link = '{}/register?from=support&company={}&key={}&email={}'\
                .format(
                    settings.GLUU_USER_APP_FRONTEND,
                    self.company.id,
                    self.activation_key,
                    self.email
                )
            return False, link

    def __str__(self):
        return '{}-{}'.format(
            self.email,
            self.company.name
        )

    def accept(self, user):
        if user is not None:
            Membership.objects.create(
                company=self.company,
                user=user,
                role=self.role
            )
            self.is_accepted = True
            self.save()

    class Meta:
        unique_together = ['company', 'email']
