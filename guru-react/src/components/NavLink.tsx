import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: "#181F1C",
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
      color: "#6f757b",
      display: "block"
    }
  });

interface ExternalProps {
  to: string;
  isFooter?: boolean;
}

type Props = ExternalProps & WithStyles<typeof styles>;

class NavLink extends Component<Props> {
  render() {
    const { classes, to, children, isFooter } = this.props;

    return (
      <Link
        component={RouterLink}
        classes={{
          root: `${classes.root} ${isFooter ? classes.footer : classes.topNav}`
        }}
        to={to}
      >
        {children}
      </Link>
    );
  }
}

export default withStyles(styles)(NavLink);
