import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";

import MenuIcon from "@material-ui/icons/Menu";
// import AppsIcon from "@material-ui/icons/Apps";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PersonIcon from "@material-ui/icons/Person";
import DomainIcon from "@material-ui/icons/Domain";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { colors } from "../../theme";
import { getLoginUrl } from "../../state/actions/profiles";
import { logout } from "../../state/actions/logout";
import useMenuElement from "../../utils/hooks/menu";
import { paths } from "../../routes";
import NavLink from "../NavLink";

import Logo from "../../assets/images/logo.png";
import InfoIcon from "../../assets/images/info.svg";
import { AppState } from "../../state/types/state";
import Drawer from "./Drawer";

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

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { user } = useSelector((state: AppState) => state.profiles);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const {
    element: userMenuElement,
    open: openUserMenu,
    close: closeUserMenu
  } = useMenuElement();
  const {
    element: scheduleMenuElement,
    open: openScheduleMenu,
    close: closeScheduleMenu
  } = useMenuElement();

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

  const isLoggedIn = user.id !== -1;
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{
          color: colors.MAIN_COLOR,
          backgroundColor: colors.MAIN_BACKGROUND
        }}
        elevation={1}
      >
        <Container
          maxWidth={false}
          classes={{ maxWidthXs: classes.containerXs }}
        >
          <Toolbar>
            <Hidden smUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <div className={classes.title}>
              <img
                src={Logo}
                alt=""
                className={classes.logo}
                onClick={navigateTo(paths.HOMEPAGE)}
              />
              {isLoggedIn ? (
                <Hidden xsDown>
                  <NavLink to={paths.TICKET_LIST}>Dashboard</NavLink>
                  {/* <NavLink to={paths.TICKET_LIST}>Tickets</NavLink> */}
                </Hidden>
              ) : null}
            </div>
            <Hidden xsDown>
              {isLoggedIn ? (
                <React.Fragment>
                  <Button
                    color="primary"
                    classes={{ root: classes.button }}
                    variant="outlined"
                    onClick={navigateTo(paths.getCreateTicketPath(NaN))}
                  >
                    + Add Ticket
                  </Button>
                  <div
                    className={classes.navItems}
                    aria-controls="schedule-menu"
                    aria-haspopup="true"
                    onClick={openScheduleMenu}
                  >
                    <img src={InfoIcon} alt="" />
                  </div>
                  <Menu
                    id="schedule-menu"
                    anchorEl={scheduleMenuElement}
                    keepMounted
                    open={Boolean(scheduleMenuElement)}
                    onClose={closeScheduleMenu}
                    classes={{ paper: classes.menuPaper }}
                  >
                    <MenuItem onClick={navigateTo(paths.HOMEPAGE)}>
                      <ListItemIcon>
                        <HeadsetMicIcon />
                      </ListItemIcon>
                      Support Call
                    </MenuItem>
                    <MenuItem onClick={navigateTo(paths.HOMEPAGE)}>
                      <ListItemIcon>
                        <NotificationsNoneIcon />
                      </ListItemIcon>
                      Consultation
                    </MenuItem>
                  </Menu>
                  <div
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={openUserMenu}
                  >
                    <Avatar />
                  </div>
                  <Menu
                    id="user-menu"
                    anchorEl={userMenuElement}
                    keepMounted
                    open={Boolean(userMenuElement)}
                    onClose={closeUserMenu}
                    classes={{ paper: classes.menuPaper }}
                  >
                    <MenuItem onClick={navigateTo(paths.NOTIFICATIONS)}>
                      <ListItemIcon>
                        <NotificationsNoneIcon />
                      </ListItemIcon>
                      Notifications
                    </MenuItem>
                    <MenuItem onClick={navigateTo(paths.PROFILE)}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={navigateTo(paths.TEAM_DETAILS)}>
                      <ListItemIcon>
                        <PeopleOutlineIcon />
                      </ListItemIcon>
                      Team
                    </MenuItem>
                    <MenuItem onClick={navigateTo(paths.PARTNERS)}>
                      <ListItemIcon>
                        <DomainIcon />
                      </ListItemIcon>
                      Partners
                    </MenuItem>
                    <MenuItem onClick={navigateTo(paths.BILLING)}>
                      <ListItemIcon>
                        <CreditCardIcon />
                      </ListItemIcon>
                      Billing
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logoutUser}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    color="primary"
                    classes={{
                      root: `${classes.button} ${classes.navItems}`
                    }}
                    variant="outlined"
                    onClick={navigateTo(paths.SIGNUP)}
                  >
                    Signup
                  </Button>
                  <Button
                    color="primary"
                    classes={{ root: classes.button }}
                    variant="outlined"
                    onClick={login}
                  >
                    Login
                  </Button>
                </React.Fragment>
              )}
            </Hidden>

            {/* <IconButton
                edge="start"
                className={classes.menuButton}
                style={{ marginLeft: ".5em" }}
                color="inherit"
                aria-label="Apps"
              >
                <AppsIcon />
              </IconButton> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Navbar;
