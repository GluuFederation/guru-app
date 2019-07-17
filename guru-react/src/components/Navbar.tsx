import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import { colors } from "../theme";

import MenuIcon from "@material-ui/icons/Menu";
// import AppsIcon from "@material-ui/icons/Apps";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
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

import { WithUserProps, withUser } from "../state/hocs/profiles";
import { paths } from "../routes";
import NavLink from "./NavLink";

import Logo from "../assets/images/logo.png";
import InfoIcon from "../assets/images/info.svg";

const styles = (theme: Theme) =>
  createStyles({
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
  });

type Props = WithUserProps & RouteComponentProps & WithStyles<typeof styles>;

interface State {
  isDrawerOpen: boolean;
  userMenuElement: HTMLElement | null;
  scheduleMenuElement: HTMLElement | null;
}

class Navbar extends Component<Props, State> {
  state = {
    isDrawerOpen: false,
    userMenuElement: null,
    scheduleMenuElement: null
  };

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };

  openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ userMenuElement: event.currentTarget });
  };

  openScheduleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ scheduleMenuElement: event.currentTarget });
  };

  closeUserMenu = () => {
    this.setState({ userMenuElement: null });
  };

  closeScheduleMenu = () => {
    this.setState({ scheduleMenuElement: null });
  };

  navigateTo = (path: string) => () => {
    this.props.history.push(path);
  };

  logout = () => {
    this.props.logout().then(() => {
      this.props.history.push(paths.HOMEPAGE);
    });
  };

  render() {
    const { classes, user } = this.props;
    const isLoggedIn = user !== null;
    const { isDrawerOpen, userMenuElement, scheduleMenuElement } = this.state;
    console.log(userMenuElement);

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
                  onClick={this.toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <div className={classes.title}>
                <img src={Logo} alt="" className={classes.logo} />
                {isLoggedIn ? (
                  <Hidden xsDown>
                    <NavLink to={paths.HOMEPAGE}>Dashboard</NavLink>
                    <NavLink to={paths.HOMEPAGE}>Tickets</NavLink>
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
                    >
                      + Add Ticket
                    </Button>
                    <div
                      className={classes.navItems}
                      aria-controls="schedule-menu"
                      aria-haspopup="true"
                      onClick={this.openScheduleMenu}
                    >
                      <img src={InfoIcon} alt="" />
                    </div>
                    <Menu
                      id="schedule-menu"
                      anchorEl={scheduleMenuElement}
                      keepMounted
                      open={Boolean(scheduleMenuElement)}
                      onClose={this.closeScheduleMenu}
                      classes={{ paper: classes.menuPaper }}
                    >
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <HeadsetMicIcon />
                        </ListItemIcon>
                        Support Call
                      </MenuItem>
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <NotificationsNoneIcon />
                        </ListItemIcon>
                        Consultation
                      </MenuItem>
                    </Menu>
                    <div
                      aria-controls="user-menu"
                      aria-haspopup="true"
                      onClick={this.openUserMenu}
                    >
                      <Avatar />
                    </div>
                    <Menu
                      id="user-menu"
                      anchorEl={userMenuElement}
                      keepMounted
                      open={Boolean(userMenuElement)}
                      onClose={this.closeUserMenu}
                      classes={{ paper: classes.menuPaper }}
                    >
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <NotificationsNoneIcon />
                        </ListItemIcon>
                        Notifications
                      </MenuItem>
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <PeopleOutlineIcon />
                        </ListItemIcon>
                        Team
                      </MenuItem>
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <DomainIcon />
                        </ListItemIcon>
                        Partners
                      </MenuItem>
                      <MenuItem onClick={this.navigateTo(paths.HOMEPAGE)}>
                        <ListItemIcon>
                          <CreditCardIcon />
                        </ListItemIcon>
                        Billing
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={this.logout}>
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
                      onClick={this.navigateTo(paths.SIGNUP)}
                    >
                      Signup
                    </Button>
                    <Button
                      color="primary"
                      classes={{ root: classes.button }}
                      variant="outlined"
                      onClick={this.navigateTo(paths.LOGIN)}
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
        <Drawer open={isDrawerOpen} onClose={this.toggleDrawer}>
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
                  <ListItem button onClick={this.navigateTo(paths.HOMEPAGE)}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <ReceiptOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tickets" />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <NotificationsNoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DomainIcon />
                    </ListItemIcon>
                    <ListItemText primary="Partners" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Billing" />
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={this.logout}>
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
                  <ListItem button onClick={this.navigateTo(paths.LOGIN)}>
                    <ListItemIcon>
                      <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem button onClick={this.navigateTo(paths.SIGNUP)}>
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
      </div>
    );
  }
}

export default withRouter(withUser(withStyles(styles)(Navbar)));
