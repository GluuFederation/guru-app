EMPTY_OR_INVALID = 'U100'


class GluuError(Exception):
    """General Gluu exceptions."""
    pass


class NetworkError(GluuError):
    """Gluu errors that have to do with network issues."""
    pass


class InvalidRpt(GluuError):
    """Errors related to an invalid RPT."""
    pass


class InvalidWwwAuthHeader(GluuError):
    """Errors related to ticket generation."""
    pass


class ScimError(GluuError):
    """Errors from SCIM API requests to Gluu server."""
    pass


class ScimUserAlreadyExists(ScimError):
    """Error when User already exists from SCIM API."""
    pass


class OxdError(GluuError):
    """Errors related to oxd server calls."""
    pass


class UmaError(GluuError):
    """Errors encountered when using UMA endpoints from Gluu server."""
    pass


class InvalidAccessTokenError(OxdError):
    """Invalid access token while connecting to oxd server."""
    pass
