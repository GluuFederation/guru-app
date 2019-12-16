import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";

import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import PersonIcon from "@material-ui/icons/Person";
import DomainIcon from "@material-ui/icons/Domain";
import InputIcon from "@material-ui/icons/Input";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { colors } from "../../../theme";
import { getLoginUrl } from "../../../state/actions/profiles";
import { logout } from "../../../state/actions/logout";
import { paths } from "../../../routes";

import Logo from "../../../assets/images/logo.png";
import { AppState } from "../../../state/types/state";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex"
  },
  containerXs: {
    paddingLeft: 0,
    paddingRight: 0
  },
  navItems: {
    marginLeft: "1em",
    marginRight: "1em"
  },
  logo: {
    marginRight: "2em",
    height: "1.75em"
  },
  drawer: {
    paddingTop: ".5em",
    paddingBottom: ".5em",
    width: 250
  },
  menuPaper: {
    top: "3em !important"
  },
  button: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR,
    textTransform: "capitalize"
  }
}));

interface Props {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const Navbar: FunctionComponent<Props> = ({ toggleDrawer, isDrawerOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { user } = useSelector((state: AppState) => state.profiles);

  const navigateTo = (path: string) => () => {
    history.push(path);
  };

  const login = () => {
    getLoginUrl()(dispatch)
      .then(url => {
        window.location.href = url;
      })
      .catch(() => {
        history.push(paths.ERROR_PAGE, {
          errorTitle: "Unable to Log you in"
        });
      });
  };

  const logoutUser = () => {
    logout()(dispatch).then(url => {
      window.location.href = url;
    });
  };

  const isLoggedIn = user !== null;
  return (
    <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
      <div className={classes.drawer}>
        <List>
          <img
            src={Logo}
            alt=""
            className={classes.logo}
            style={{ marginLeft: "1em" }}
          />
        </List>
        <Divider />
        {isLoggedIn ? (
          <React.Fragment>
            <List>
              <ListItem button onClick={navigateTo(paths.HOMEPAGE)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button onClick={navigateTo(paths.TICKET_LIST)}>
                <ListItemIcon>
                  <ReceiptOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Tickets" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={navigateTo(paths.NOTIFICATIONS)}>
                <ListItemIcon>
                  <NotificationsNoneIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button onClick={navigateTo(paths.PROFILE)}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={navigateTo(paths.TEAM_DETAILS)}>
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Team" />
              </ListItem>
              <ListItem button onClick={navigateTo(paths.PARTNERS)}>
                <ListItemIcon>
                  <DomainIcon />
                </ListItemIcon>
                <ListItemText primary="Partners" />
              </ListItem>
              <ListItem button onClick={navigateTo(paths.BILLING)}>
                <ListItemIcon>
                  <CreditCardIcon />
                </ListItemIcon>
                <ListItemText primary="Billing" />
              </ListItem>
              <Divider />
              <ListItem button onClick={logoutUser}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <List>
              <ListItem button onClick={login}>
                <ListItemIcon>
                  <InputIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={navigateTo(paths.SIGNUP)}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItem>
            </List>
          </React.Fragment>
        )}
      </div>
    </Drawer>
  );
};

export default Navbar;
