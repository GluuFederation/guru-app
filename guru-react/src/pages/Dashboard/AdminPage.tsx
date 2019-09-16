import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import GraphIcon from "../../assets/images/user_one.png";
import PersonIcon from "../../assets/images/user_one.png";
import NextArrow from "../../assets/images/user_one.png";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
import AdminNotificationPopover from "../../components/Dashboard/AdminNotificationPopover";
import AdminUserRolePopover from "../../components/Dashboard/AdminUserRolePopover";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    ContainerAlign: {
      width: "80%",
      margin: "0 auto",
      marginTop: -4,
      marginBottom: 54
    },
    contentContainer: {},
    cardGraph: {
      width: "100%",
      height: 100,
      backgroundColor: "#ffa516",
      color: "#ffffff"
    },
    cardPerson: {
      width: "100%",
      height: 100,
      backgroundColor: "#059599",
      color: "#ffffff"
    },
    dashboardClickImg: {
      width: 90,
      height: 90,
      marginTop: -34,
      opacity: 0.3,
      float: "right"
    },
    nextArrow: {
      width: 15,
      marginTop: 5,
      marginLeft: 10,
      height: "auto"
    }
  });

type Props = WithStyles<typeof styles> & RouteComponentProps;

class AdminPage extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Navbar />
        <Container className={classes.ContainerAlign} fixed>
          <Box mt={2}>
            <Grid className={classes.contentContainer} container>
              <Grid item md={4} xs={12} sm={12}>
                <DashboardSideMenu></DashboardSideMenu>
              </Grid>
              <Grid item md={8} xs={12} sm={12}>
                <Grid container>
                  <Grid item md={4} sm={6} xs={12}>
                    <AdminUserRolePopover></AdminUserRolePopover>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <AdminNotificationPopover></AdminNotificationPopover>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Box ml={1} mr={1}>
                      <Card className={classes.cardGraph}>
                        <CardActionArea>
                          <Box mt={3} ml={5}>
                            <Typography variant="subtitle1" align="left">
                              System Metrics
                            </Typography>
                          </Box>
                          <Box ml={5}>
                            <Typography variant="caption" align="left">
                              Click here
                              <img
                                className={classes.nextArrow}
                                alt=""
                                src={NextArrow}
                              />
                            </Typography>
                          </Box>
                          <img
                            className={classes.dashboardClickImg}
                            alt=""
                            src={GraphIcon}
                          />
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Box ml={1} mr={1} mt={2}>
                      <Card className={classes.cardPerson}>
                        <CardActionArea>
                          <Box mt={3} ml={5}>
                            <Typography variant="subtitle1" align="left">
                              Profile Setting
                            </Typography>
                          </Box>
                          <Box ml={5}>
                            <Typography variant="caption" align="left">
                              Click here
                              <img
                                alt=""
                                className={classes.nextArrow}
                                src={NextArrow}
                              />
                            </Typography>
                          </Box>
                          <img
                            className={classes.dashboardClickImg}
                            alt=""
                            src={PersonIcon}
                          />
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AdminPage));
