import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginLeft: ".5em",
      marginRight: ".5em",
      color: "#181F1C",
      "&:hover": {
        color: theme.palette.primary.main,
        textDecoration: "none"
      }
    }
  });

interface ExternalProps {
  to: string;
}

type Props = ExternalProps & WithStyles<typeof styles>;

class NavLink extends Component<Props> {
  render() {
    const { classes, to, children } = this.props;

    return (
      <Link
        component={RouterLink}
        classes={{ root: `${classes.root}` }}
        to={to}
      >
        {children}
      </Link>
    );
  }
}

export default withStyles(styles)(NavLink);
