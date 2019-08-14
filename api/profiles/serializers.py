from django.db.models import Q
from rest_framework import serializers
from rest_framework import fields
from django_countries.serializer_fields import CountryField

from guru.utils import generate_hash
from profiles import models as m
from profiles import constants as c
from oxd import scim
from billing.serializers import AccountSerializer
from info.serializers import UserRoleSerializer


class AddressSerializer(serializers.ModelSerializer):
    created_on = serializers.ReadOnlyField(source='created_on_str')
    last_update = serializers.ReadOnlyField(source='last_update_str')
    country = CountryField()

    class Meta:
        model = m.Address
        fields = [
            'id', 'line_1', 'line_2', 'city', 'state', 'zip_code',
            'country', 'created_on', 'last_update'
        ]


class ShortCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = m.Company
        fields = (
            'id', 'name'
        )


class ShortUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ReadOnlyField(source='avatar_url')
    company = ShortCompanySerializer()

    class Meta:
        model = m.User
        fields = (
            'id', 'first_name', 'last_name', 'other_names',
            'avatar', 'company'
        )

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        role = None
        email = ''
        request = self.context.get('request')
        if request:
            user = request.user
            if user.is_authenticated:
                is_connected = m.User.objects.filter(
                    Q(
                        membership__company__id__in=list(
                            user.company_set.values_list(
                                'id', flat=True
                            )
                        ),
                        id=instance.id
                    )
                ).exists() or instance.id == user.id
                if is_connected or user.is_gluu_staff:
                    email = instance.email
                    if instance.role:
                        role = UserRoleSerializer(instance.role).data

        rep['role'] = role
        rep['email'] = email
        return rep


class ShortCompanySerializer(serializers.ModelSerializer):

    admin_user = ShortUserSerializer(read_only=True)
    address = AddressSerializer()

    class Meta:
        model = m.Company
        fields = (
            'id', 'name', 'address', 'admin_user'
        )


class UserSerializer(serializers.ModelSerializer):
    company = ShortCompanySerializer()
    address = AddressSerializer(required=False)
    account = AccountSerializer(source='get_account', read_only=True)
    role = UserRoleSerializer(read_only=True)

    class Meta:
        model = m.User
        fields = (
            'id', 'first_name', 'last_name', 'other_names',
            'email', 'token', 'company', 'timezone',  'address',
            'idp_uuid', 'account', 'role'
        )

    def update(self, instance, validated_data):
        instance.email = validated_data.get(
            'email', instance.email
        )
        instance.first_name = validated_data.get(
            'first_name', instance.first_name
        )
        instance.last_name = validated_data.get(
            'last_name', instance.last_name
        )
        instance.other_names = validated_data.get(
            'other_names', instance.other_names
        )
        instance.phone_number = validated_data.get(
            'phone_number', instance.phone_number
        )
        instance.timezone = validated_data.get(
            'timezone', instance.timezone
        )
        address_data = validated_data.get(
            'address', None
        )

        if address_data is not None:
            if instance.address is not None:
                address_serializer = AddressSerializer(
                    instance=instance.address,
                    data=address_data,
                    partial=True
                )
            else:
                address_serializer = AddressSerializer(
                    data=address_data
                )
            address_serializer.is_valid(raise_exception=True)
            address = address_serializer.save()
            instance.address = address

        instance.save()
        return instance


class UserMembershipSerializer(serializers.ModelSerializer):

    company = ShortCompanySerializer(read_only=True)

    class Meta:
        model = m.Membership
        fields = (
            'company', 'role'
        )


class UserAssociationSerializer(serializers.ModelSerializer):

    associations = UserMembershipSerializer(
        source='membership_set', many=True, required=False
    )

    class Meta:
        model = m.User
        fields = (
            'id', 'associations'
        )


class CompanyMembershipSerializer(serializers.ModelSerializer):

    user = ShortUserSerializer(read_only=True)

    class Meta:
        model = m.Membership
        fields = (
            'user', 'role'
        )


class CompanySerializer(serializers.ModelSerializer):

    users = CompanyMembershipSerializer(
        source='membership_set', many=True, required=False
    )

    class Meta:
        model = m.Company
        fields = (
            'id', 'name', 'users'
        )


class ChangeRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = m.Membership
        fields = (
            'role',
        )
        extra_kwargs = {
            'role': {'allow_null': False}
        }


class InvitationSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)
    invited_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = m.Invitation
        fields = ['id', 'email', 'invited_by', 'company', 'role']
        extra_kwargs = {
            'role': {'required': True}
        }

    def validate_role(self, value):
        if not value.is_company_associated:
            raise serializers.ValidationError('Invalid user role value')
        return value

    def create(self, validated_data):
        invited_by = self.context.get('invited_by', None)
        company = self.context.get('company', None)
        activation_key = generate_hash(
            validated_data.get('email')
        )
        return m.Invitation.objects.create(
            invited_by=invited_by,
            company=company,
            activation_key=activation_key,
            **validated_data
        )


class SignupSerializer(serializers.Serializer):

    email = fields.EmailField(label='Email')
    password = fields.CharField(label='Password')
    first_name = fields.CharField(label='first_name')
    last_name = fields.CharField(label='last_name')
    service_from = fields.CharField(label='service_from', required=False)
    company = fields.IntegerField(required=False)
    activation_key = fields.CharField(required=False)

    def validate_email(self, value):
        try:
            user = m.User.objects.get(email__iexact=value)
            if user.is_verified:
                raise serializers.ValidationError(
                    c.SIGNUP_EMAIL_EXISTS
                )

        except m.User.DoesNotExist:
            pass

        if scim.email_exists(value):
            raise serializers.ValidationError(
                c.SIGNUP_EMAIL_EXISTS_GLUU
            )

        return value

    def create(self, validated_data):

        try:
            user = m.User.objects.get(
                email__iexact=validated_data['email']
            )
            user.is_verified = False
            user.set_password(validated_data['password'])
            user.save()

        except m.User.DoesNotExist:
            user = m.User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                service_from=validated_data.get('service_from', ''),
                is_verified=False
            )

        scim_user = scim.create_user(user, validated_data['password'])
        user.idp_uuid = scim_user['id']
        user.save()

        return user


class RequestEmailSerializer(serializers.Serializer):
    email = fields.EmailField(label='Email')

    def validate(self, data):
        try:
            user = m.User.objects.get(email__iexact=data.get('email'))
            if not user.is_active:
                raise serializers.ValidationError(
                    c.RESET_NOT_FOUND
                )

            data['user'] = user
        except m.User.DoesNotExist:
            raise serializers.ValidationError(
                c.RESET_NOT_FOUND
            )

        return data


class VerifyCodeSerializer(serializers.Serializer):
    pin = fields.CharField()
    pk = fields.CharField()

    def validate(self, data):
        token = data.get('pin')
        try:
            user = m.User.objects.get(
                pk=data.get('pk')
            )

            if user.verification_token != token:
                user.verification_tries += 1
                user.save()
                raise serializers.ValidationError({
                    'verify': c.VERIFY_INVALID_PIN
                })

            if user.is_verified:
                raise serializers.ValidationError({
                    'verify': c.VERIFY_ALREADY_VERIFIED
                })

            if user.verification_tries >= c.MAX_VERIFICATION_TRIES:
                raise serializers.ValidationError({
                    'verify': c.VERIFY_MAX_TRIES
                })

            user.verification_tries = 0
            user.is_verified = True
            user.save()
            scim.activate_user(user)
            data['user'] = user
        except m.User.DoesNotExist:
            raise serializers.ValidationError({
                'verify': c.VERIFY_NOT_FOUND
            })

        return data
