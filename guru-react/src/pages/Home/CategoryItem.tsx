import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { colors } from "../../theme";

import { paths } from "../../routes";
import { TicketCategory } from "../../state/types/info";

import { ReactComponent as AuthenticationIcon } from "../../assets/images/authentication.svg";
import { ReactComponent as AccessManagementIcon } from "../../assets/images/access-management.svg";
import { ReactComponent as CustomizationIcon } from "../../assets/images/customization.svg";
import { ReactComponent as FeatureRequestIcon } from "../../assets/images/feature-request.svg";
import { ReactComponent as IdentityManagementIcon } from "../../assets/images/identity-management.svg";
import { ReactComponent as InstallationIcon } from "../../assets/images/installation.svg";
import { ReactComponent as MaintenanceIcon } from "../../assets/images/maintenance.svg";
import { ReactComponent as OutageIcon } from "../../assets/images/outage.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { ReactComponent as OtherIcon } from "../../assets/images/other.svg";
import { ReactComponent as SsoIcon } from "../../assets/images/sso.svg";
import { ReactComponent as UpgradeIcon } from "../../assets/images/upgrade.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "7em",
      alignContent: "center",
      textAlign: "center",
      padding: "1em",
      paddingTop: "2em",
      border: `1px solid ${colors.VERY_LIGHT_TEXT}`,
      marginTop: "1px",
      marginBottom: "1px",
      "&:hover": {
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        marginTop: 0,
        marginBottom: 0,
        cursor: "pointer",
        "& g": {
          fill: theme.palette.primary.main
        }
      }
    },
    icon: {
      height: "3em",
      marginBottom: "-.1em",
      display: "inline",
      width: "auto"
    }
  });

interface ExternalProps {
  category: TicketCategory;
}

type Props = WithStyles<typeof styles> & RouteComponentProps & ExternalProps;

class CategoryItem extends Component<Props> {
  getComponentFromSlug = (slug: string) => {
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
  render() {
    const { classes, category } = this.props;
    const Icon = this.getComponentFromSlug(category.slug);
    return (
      <Paper className={classes.root}>
        <Icon className={classes.icon} />
        <p>{category.name}</p>
      </Paper>
    );
  }
}

export default withRouter(withStyles(styles)(CategoryItem));
