from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from suitecrm import interface as i


class GetAccountsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        name = request.query_params.get('name', '')
        accounts = []

        if len(name) > 2:
            accounts = i.get_accounts(name)

        return Response(
            {'results': accounts},
            status=status.HTTP_200_OK
        )
