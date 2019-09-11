import { ReactComponent as AuthenticationIcon } from "../assets/images/authentication.svg";
import { ReactComponent as AccessManagementIcon } from "../assets/images/access-management.svg";
import { ReactComponent as CustomizationIcon } from "../assets/images/customization.svg";
import { ReactComponent as FeatureRequestIcon } from "../assets/images/feature-request.svg";
import { ReactComponent as IdentityManagementIcon } from "../assets/images/identity-management.svg";
import { ReactComponent as InstallationIcon } from "../assets/images/installation.svg";
import { ReactComponent as MaintenanceIcon } from "../assets/images/maintenance.svg";
import { ReactComponent as OutageIcon } from "../assets/images/outage.svg";
import { ReactComponent as LogoutIcon } from "../assets/images/logout.svg";
import { ReactComponent as OtherIcon } from "../assets/images/other.svg";
import { ReactComponent as SsoIcon } from "../assets/images/sso.svg";
import { ReactComponent as UpgradeIcon } from "../assets/images/upgrade.svg";

export const getCategoryComponentFromSlug = (slug: string) => {
  switch (slug) {
    case "authentication":
      return AuthenticationIcon;
    case "access-management":
      return AccessManagementIcon;
    case "customization":
      return CustomizationIcon;
    case "feature-request":
      return FeatureRequestIcon;
    case "identity-management":
      return IdentityManagementIcon;
    case "installation":
      return InstallationIcon;
    case "logout":
      return LogoutIcon;
    case "maintenance":
      return MaintenanceIcon;
    case "outage":
      return OutageIcon;
    case "sso":
      return SsoIcon;
    case "upgrade":
      return UpgradeIcon;
    default:
      return OtherIcon;
  }
};
