ADMIN = 'admin'
NAMED = 'named'
USER = 'user'
GLUU = 'gluu'

USER_TYPE = (
    (ADMIN, 'Admin'),
    (NAMED, 'Named'),
    (USER, 'User'),
)

COMPANY_ROLE_CHOICES = (
    (ADMIN, 'Admin'),
    (NAMED, 'Named'),
    (USER, 'User'),
)

GURU = 'guru'
USERS = 'users'
BILLING = 'bill'

SERVICE_CHOICES = (
    (GURU, 'Guru'),
    (USERS, 'Account Management'),
    (BILLING, 'Billing'),
)

DEFAULT_TIMEZONE = 'America/Chicago'

# Login Constants
LOGIN_SUCCESS = 'login-200'
LOGIN_ACC_DISABLED = 'login-401'
LOGIN_UNVERIFIED_ACC = 'login-402'
LOGIN_ADMIN_ACC = 'login-403'
LOGIN_NOT_FOUND = 'login-404'

# Signup Constants
SIGNUP_SUCCESS = 'signup-200'
SIGNUP_INVALID_PARAMETER = 'signup-400'
SIGNUP_ACC_DISABLED = 'signup-401'
SIGNUP_EMAIL_EXISTS = 'signup-403'
SIGNUP_EMAIL_EXISTS_GLUU = 'signup-405'

# Account Verification Constants
VERIFY_SUCCESS = 'verify-200'
VERIFY_ALREADY_VERIFIED = 'verify-400'
VERIFY_MAX_TRIES = 'verify-401'
VERIFY_INVALID_PIN = 'verify-402'
VERIFY_NOT_FOUND = 'verify-404'

MAX_VERIFICATION_TRIES = 3

# Reset Password Constants
RESET_SUCCESS = 'reset-200'
RESET_ACC_DISABLED = 'reset-400'
RESET_NOT_FOUND = 'reset-404'

# Set password Constants
SP_SUCCESS = 'sp-200'
SP_INVALID_PASSWORD = 'sp-401'

# Invitation Constants
INVITE_EXPIRATION = 25200
INVITE_EXISTS = 'invite-402'
INVITE_EXPIRED = 'invite-400'
INVITE_COMPANY_USER_EXISTS = 'invite-405'

# Company User Constants
CU_EXISTS = 'cu-402'
CU_IS_PRIMARY = 'cu-400'
