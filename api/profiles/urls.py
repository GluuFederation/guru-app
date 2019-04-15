from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from profiles.views import companies as cv
from profiles.views import users as uv
from profiles.views import auth as av

router = DefaultRouter()
router.register(r'company', cv.CompanyViewSet, base_name='company')
router.register(r'users', uv.UserViewSet, base_name='user')

urlpatterns = [
    url(
        r'^user/?$',
        av.GetUserAuthAPIView.as_view(),
        name='get_auth'
    ),
    url(
        r'^get-authorization-url/?$',
        av.GetLoginUrlAPIView.as_view(),
        name='get_login_url'
    ),
    url(
        r'^login-callback/?$',
        av.LoginCallbackAPIView.as_view(),
        name='login_callback'
    ),
    url(
        r'^get-signup-url/?$',
        av.GetSignupUrlAPIView.as_view(),
        name='get_signup_url'
    ),
    url(
        r'^signup/?$',
        av.SignupAPIView.as_view(),
        name='signup'
    ),
    url(
        r'^logout/?$',
        av.LogoutUrlAPIView.as_view(),
        name='logout'
    ),
    url(r'^', include(router.urls)),
]
