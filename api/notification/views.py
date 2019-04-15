from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView
from notification import serializers as s
from notification import models as m


class NotificationSettingRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = s.NotificationSettingSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            setting = m.NotificationSetting.objects.get(user=request.user)

        except m.NotificationSetting.DoesNotExist:
            raise NotFound('This user does not have Notification Setting')

        serializer = self.serializer_class(setting)
        return Response(
            {'results': serializer.data},
            status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('notification_settings', {})

        try:
            setting = m.NotificationSetting.objects.get(user=request.user)
        except m.NotificationSetting.DoesNotExist:
            raise NotFound('This user does not have Notification Setting')

        serializer = self.serializer_class(
            setting, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
