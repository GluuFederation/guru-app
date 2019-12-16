import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { colors } from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

interface Props {
  to: string;
  search?: string;
  hash?: string;
  isFooter?: boolean;
  replace?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  state?: any;
  extraClasses?: string;
}

const NavLink: FunctionComponent<Props> = ({
  to,
  search,
  hash,
  isFooter,
  replace,
  onClick,
  state,
  extraClasses,
  children
}) => {
  const classes = useStyles();
  const linkTo = {
    pathname: to,
    search,
    state
  };
  return (
    <Link
      component={RouterLink}
      classes={{
        root: `${classes.root} ${isFooter ? classes.footer : classes.topNav} ${
          extraClasses ? extraClasses : ""
        }`
      }}
      to={linkTo}
      onClick={onClick}
      replace={replace}
    >
      {children}
    </Link>
  );
};

export default NavLink;
