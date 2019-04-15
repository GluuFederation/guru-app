from django.contrib.auth import get_user_model

from oxd.uma import get_user_info
from oxd.scim import get_user


class OpenIdBackend:
    def authenticate(self, request, access_token=None, id_token=None):
        """
        Authenticate against IDP using access token gotten after callback.

        :param request: request object to set user to.
        :param access_token: Access token after login is successful. (Gotten
        from authorization code returned during the callback.)
        :param id_token: Id token to be used as hint during logout
        :returns authenticated user object.
        """
        user_model = get_user_model()
        user_inum = get_user_info(access_token)
        idp_uuid = user_inum.get('inum', '')
        user = None
        try:
            user = user_model.objects.get(
                idp_uuid=idp_uuid
            )

        except user_model.DoesNotExist:
            user = user_model(
                idp_uuid=idp_uuid
            )

        user_info = get_user(idp_uuid)
        try:
            user.update_from_idp(user_info)

            if id_token:
                user.id_token = id_token
                user.save()
        except AttributeError:
            print(
                'WARNING: "update_from_idp" method is missing from User model'
            )

        request.user = user
        return user

    def get_user(self, idp_uuid):
        """
        Get user from database using UUID.

        :param idp_uuid: UUID of IDP user.
        :return: user object.
        """
        user_model = get_user_model()
        try:
            return user_model.objects.get(idp_uuid=idp_uuid)
        except user_model.DoesNotExist:
            return None
