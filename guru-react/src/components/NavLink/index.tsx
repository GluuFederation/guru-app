import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import { colors } from "../../theme";
import { setConfirmationPath } from "../../state/actions/info";

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
  confirmNavigation?: boolean;
}

const NavLink: FunctionComponent<Props> = ({
  to,
  search,
  isFooter,
  replace,
  onClick,
  state,
  extraClasses,
  children,
  confirmNavigation
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const linkTo = {
    pathname: to,
    search,
    state
  };
  const onConfirmClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setConfirmationPath(to));
  };
  const superOnClick = confirmNavigation ? onConfirmClick : onClick;

  return (
    <Link
      component={RouterLink}
      classes={{
        root: `${classes.root} ${isFooter ? classes.footer : classes.topNav} ${
          extraClasses ? extraClasses : ""
        }`
      }}
      to={linkTo}
      onClick={superOnClick}
      replace={replace}
    >
      {children}
    </Link>
  );
};

export default NavLink;
