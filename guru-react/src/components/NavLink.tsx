import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { colors } from "../theme";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: colors.DARK_TEXT,
      "&:hover": {
        color: theme.palette.primary.main,
        textDecoration: "none"
      }
    },
    topNav: {
      marginLeft: ".5em",
      marginRight: ".5em"
    },
    footer: {
      marginTop: "1em",
      marginBottom: "1em",
      color: colors.LIGHTER_TEXT,
      display: "block"
    }
  });

interface ExternalProps {
  to: string;
  search?: string;
  hash?: string;
  isFooter?: boolean;
  replace?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  state?: any;
}

type Props = ExternalProps & WithStyles<typeof styles>;

class NavLink extends Component<Props> {
  render() {
    const {
      classes,
      to,
      search,
      children,
      isFooter,
      onClick,
      state,
      replace
    } = this.props;
    const linkTo = {
      pathName: to,
      search,
      state
    };
    return (
      <Link
        component={RouterLink}
        classes={{
          root: `${classes.root} ${isFooter ? classes.footer : classes.topNav}`
        }}
        to={linkTo}
        onClick={onClick}
        replace={replace}
      >
        {children}
      </Link>
    );
  }
}

export default withStyles(styles)(NavLink);
