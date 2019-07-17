from django.conf.urls import include, url
from rest_framework_nested import routers

from tickets.views import (
    TicketViewSet, AnswerViewSet, TicketSearchView,
    GetTicketParamsDataView
)

router = routers.SimpleRouter()
router.register(
    r'tickets',
    TicketViewSet,
    base_name='ticket'
)

router.register(
    r'search',
    TicketSearchView,
    base_name="location-search"
)

tickets_router = routers.NestedSimpleRouter(
    router,
    r'tickets',
    lookup='ticket'
)

tickets_router.register(
    r'answers',
    AnswerViewSet,
    base_name='ticket-answers'
)

urlpatterns = [
    url(r'^tickets/get-params-data/', GetTicketParamsDataView.as_view()),
    url(r'^', include(router.urls)),
    url(r'^', include(tickets_router.urls)),
]
