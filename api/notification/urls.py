from django.conf.urls import url
from notification import views as v

urlpatterns = [
    url(
        r'^notification/?$',
        v.NotificationSettingRetrieveUpdateAPIView.as_view(),
        name='notification'
    ),
]
