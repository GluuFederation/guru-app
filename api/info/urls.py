from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from info import views as v

router = DefaultRouter()
router.register(r'products', v.GluuProductViewSet, base_name='product')
router.register(r'categories', v.TicketCategoryViewSet, base_name="category")
router.register(r'issue-types', v.TicketIssueTypeViewSet, base_name="type")
router.register(r'statuses', v.TicketStatusViewSet, base_name="status")
router.register(r'roles', v.UserRoleViewSet, base_name='role')
router.register(r'permissions', v.PermissionViewSet, base_name='permission')

urlpatterns = [
    url(r'^all/?$', v.GetAllInfoView.as_view()),
    url(r'^', include(router.urls)),
]
