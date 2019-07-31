from django.urls import path, include
from rest_framework.routers import DefaultRouter
from profiles.views import companies as cv
from profiles.views import users as uv
from profiles.views import auth as av
from profiles.views import tickets as tv

router = DefaultRouter()
router.register('companies', cv.CompanyViewSet, base_name='companies')
router.register('users', uv.UserViewSet, base_name='users')

urlpatterns = [
    path(
        'auth/me/',
        av.GetAuthUserAPIView.as_view(),
        name='get_auth_user'
    ),
    path(
        'auth/get-authorization-url/',
        av.GetLoginUrlAPIView.as_view(),
        name='get_login_url'
    ),
    path(
        'auth/login-callback/',
        av.LoginCallbackAPIView.as_view(),
        name='login_callback'
    ),
    path(
        'auth/get-signup-url/',
        av.GetSignupUrlAPIView.as_view(),
        name='get_signup_url'
    ),
    path(
        'auth/signup/',
        av.SignupAPIView.as_view(),
        name='signup'
    ),
    path(
        'auth/send-verification/',
        av.SendVerificationCodeAPIView.as_view(),
        name='send_verification'
    ),
    path(
        'auth/verify-code/',
        av.VerifyCodeAPIView.as_view(),
        name='verify_code'
    ),
    path(
        'auth/get-logout-url/',
        av.GetLogoutUrlAPIView.as_view(),
        name='get_logout_url'
    ),
    path(
        'auth/logout/',
        av.LogoutCallbackAPIView.as_view(),
        name='logout'
    ),
    path(
        'access-list/users/',
        tv.UserAccessList.as_view(),
        name='access-list-users'
    ),

    path(
        'access-list/companies/',
        tv.CompanyAccessList.as_view(),
        name='access-list-companies'
    ),
    path('', include(router.urls)),
]
