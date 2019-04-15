import logging

from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.http.response import Http404
from rest_framework.views import exception_handler
from rest_framework import status
from rest_framework.response import Response


LOGGER = logging.getLogger('django')


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        if isinstance(exc, KeyError):
            response = Response(
                {'details': {str(exc): ['guru-404']}},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif isinstance(exc, ObjectDoesNotExist) or isinstance(exc, Http404):
            response = Response(
                {'details': str(exc)},
                status=status.HTTP_404_NOT_FOUND
            )
        elif isinstance(exc, ValidationError):
            response = Response(
                {'details': str(exc)},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            LOGGER.exception(exc)
            return Response(
                {'details': 'Oops something happened'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return response
