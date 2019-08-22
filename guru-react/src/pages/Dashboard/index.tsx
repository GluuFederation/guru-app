import React, { Component } from "react";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { createStyles, Theme } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import UserOne from "../../assets/images/user_one.png";
import VerifyIcon from "../../assets/images/verified.svg";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import TeamPage from "./TeamPage";
import PartnersPage from "./PartnersPage";
import NotificationPage from "./NotificationPage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box style={{ padding: 0 }} p={3}>
        {children}
      </Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

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
    userPname: {
      fontSize: 22,
      color: "#232323",
      fontWeight: 500,
      display: "flex",
      justifyContent: "center",
      width: "100%",
      fontFamily: '"Lato", sans-serif'
    },
    userCompany: {
      marginTop: 0,
      marginBottom: 0,
      color: "#ADADAD",
      textAlign: "center",
      fontSize: 14,
      fontWeight: 400,
      fontFamily: '"Lato", sans-serif'
    },
    userCompanyEmail: {
      marginTop: 0,
      color: "#232323",
      textAlign: "center",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif'
    },
    ticketsCount: {
      marginBottom: 0,
      color: "#232323",
      textAlign: "center",
      fontSize: 22,
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif'
    },
    ticketsTitle: {
      marginTop: 10,
      color: "#ADADAD",
      textAlign: "center",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif'
    },
    votesCount: {
      marginBottom: 0,
      color: "#232323",
      textAlign: "center",
      fontSize: 22,
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif'
    },
    votesTitle: {
      marginTop: 10,
      color: "#ADADAD",
      textAlign: "center",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif'
    },
    contentContainer: {},
    detailMembers: {
      fontSize: 14,
      color: "#232323",
      fontWeight: 500,
      fontFamily: '"Lato", sans-serif'
    },

    margin: {
      margin: theme.spacing(1)
    },
    fab: {},
    paper: {
      marginRight: theme.spacing(2)
    },

    tabs: {
      borderRight: "1px solid ${theme.palette.divider}",
      textTransform: "capitalize"
    }
  });

type Props = WithUserProps & RouteComponentProps & WithStyles<typeof styles>;

interface State {
  value: number;
}

class Dashboard extends Component<Props, State> {
  state = {
    value: 2
  };

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar />
        <Container className={classes.ContainerAlign} fixed>
          <Grid className={classes.contentContainer} container>
            <Grid item md={4} xs={12} sm={12}>
              <Paper
                style={{ marginTop: 20, marginBottom: 20 }}
                className={classes.paper}
              >
                <div style={{ padding: 25 }}>
                  <div>
                    <Avatar
                      style={{ marginBottom: -26 }}
                      alt="Avatar"
                      src={UserOne}
                      className={classes.avatarBig}
                    />
                    <button className={classes.editImageP}>
                      <Edit className={classes.editPancil} />
                    </button>
                  </div>
                  <span className={classes.userPname}>
                    Nasir uddin
                    <img
                      alt="Verify Icon"
                      style={{
                        width: 18,
                        height: 18,
                        marginLeft: 5,
                        marginTop: 8
                      }}
                      src={VerifyIcon}
                    />
                  </span>
                  <p className={classes.userCompany}>Gluu Inc</p>
                  <p className={classes.userCompanyEmail}>nasir@gluu.org</p>
                  <div
                    style={{
                      backgroundColor: "#eeeeee",
                      height: 1,
                      width: "100%"
                    }}
                  />
                  <Grid container>
                    <Grid item md={6} xs={6} sm={6}>
                      <p className={classes.ticketsCount}>12</p>
                      <p className={classes.ticketsTitle}>Opened Tickets</p>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6}>
                      <p className={classes.votesCount}>170</p>
                      <p className={classes.votesTitle}>Upvotes</p>
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    backgroundColor: "#eeeeee",
                    height: 1,
                    width: "100%"
                  }}
                />
                <div>
                  <Tabs
                    orientation="vertical"
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Notification"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Profile"
                      {...a11yProps(1)}
                    />
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Team"
                      {...a11yProps(2)}
                    />
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Partners"
                      {...a11yProps(3)}
                    />
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Billing"
                      {...a11yProps(4)}
                    />
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Account Security"
                      {...a11yProps(5)}
                    />
                    <Tab
                      style={{ width: "100%", flex: 0, alignSelf: "center" }}
                      label="Admin"
                      {...a11yProps(6)}
                    />
                  </Tabs>
                </div>
              </Paper>
            </Grid>

            <Grid item md={8} xs={12} sm={12}>
              <TabPanel value={this.state.value} index={0}>
                <NotificationPage />
              </TabPanel>

              <TabPanel value={this.state.value} index={1}>
                Profile
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                <TeamPage />
              </TabPanel>
              <TabPanel value={this.state.value} index={3}>
                <PartnersPage />
              </TabPanel>
              <TabPanel value={this.state.value} index={4}>
                Billing
              </TabPanel>
              <TabPanel value={this.state.value} index={5}>
                Account Security
              </TabPanel>
              <TabPanel value={this.state.value} index={6}>
                Admin
              </TabPanel>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(withUser(withStyles(styles)(Dashboard)));
