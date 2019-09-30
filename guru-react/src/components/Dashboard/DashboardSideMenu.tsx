import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import UserOne from "../../assets/images/user_one.png";
import VerifyIcon from "../../assets/images/verify_icon.png";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";

const styles = (theme: Theme) =>
  createStyles({
    avatarBig: {
      width: 85,
      height: 85,
      margin: "auto",
      marginBottom: 15
    },
    editImageP: {
      backgroundColor: "#ffffff",
      width: 30,
      height: 30,
      borderRadius: 20,
      border: "none",
      outline: "none",
      cursor: "pointer",
      textAlign: "right",
      marginLeft: "53%",
      position: "relative",
      boxShadow: "0 0 0 0.1rem rgba(0,123,255,.1)"
    },
    editPancil: {
      fontSize: 15,
      borderRadius: 20,
      color: "#2dce56"
    },
    menuSidebar: {
      color: "#232323",
      fontSize: 14,
      fontWeight: 600,
      fontFamily: '"Lato", sans-serif',
      backgroundColor: "#ffffff",
      "&:hover": { color: "#00b372", borderLeft: "solid #2dce56" }
    },
    anchorMenu: {
      textDecoration: "none",
      color: "#232323",
      marginLeft: "10%",
      "&:hover": { color: "#2dce56" }
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  });

type Props = WithStyles<typeof styles> & RouteComponentProps;

class DashboardSideMenu extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Box mb={2}>
          <Paper className={classes.paper}>
            <Box p={2}>
              <Box>
                <Avatar
                  style={{ marginBottom: -26 }}
                  alt="Avatar"
                  src={UserOne}
                  className={classes.avatarBig}
                />
                <button className={classes.editImageP}>
                  <Edit className={classes.editPancil} />
                </button>
              </Box>
              <Typography variant="h6" align="center">
                Nasir uddin
                <img
                  alt="Verify Icon"
                  style={{
                    width: 18,
                    height: 18,
                    marginLeft: 5,
                    marginBottom: -3
                  }}
                  src={VerifyIcon}
                />
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
              >
                Gluu Inc
              </Typography>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                align="center"
              >
                nasir@gluu.org
              </Typography>
            </Box>
            <hr />
            <Box p={2}>
              <Grid container>
                <Grid justify="center" item md={6} xs={6} sm={6}>
                  <Typography align="center" variant="h6">
                    12
                  </Typography>
                  <Typography
                    align="center"
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    Opened Tickets
                  </Typography>
                </Grid>
                <Grid justify="center" item md={6} xs={6} sm={6}>
                  <Typography align="center" variant="h6">
                    170
                  </Typography>
                  <Typography
                    align="center"
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    Upvotes
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <hr />

            <Box>
              <MenuList>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/notifications">
                    <Typography variant="subtitle1" align="left">
                      Notification
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/profile">
                    <Typography variant="subtitle1" align="left">
                      Profile
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/team">
                    <Typography variant="subtitle1" align="left">
                      Team
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/partners">
                    <Typography variant="subtitle1" align="left">
                      Partners
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/customer">
                    <Typography variant="subtitle1" align="left">
                      Customers
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/billing">
                    <Typography variant="subtitle1" align="left">
                      Billing
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/account-setting">
                    <Typography variant="subtitle1" align="left">
                      Account Security
                    </Typography>
                  </a>
                </MenuItem>
                <MenuItem className={classes.menuSidebar}>
                  <a className={classes.anchorMenu} href="/admin">
                    <Typography variant="subtitle1" align="left">
                      Admin
                    </Typography>
                  </a>
                </MenuItem>
              </MenuList>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(DashboardSideMenu));
