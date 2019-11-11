import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import UserOne from "../../assets/images/user_one.png";
import UserTwo from "../../assets/images/user_two.jpg";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import InvitePartnerPopover from "../../components/Dashboard/InvitePartnerPopover";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
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
    btnDeny: {
      margin: theme.spacing(1),
      fontSize: 12,
      fontWeight: 600,
      color: "#232323",
      marginTop: 0,
      width: "90%",
      marginBottom: 0,
      backgroundColor: "#ededed",
      textTransform: "capitalize",
      fontFamily: '"Lato", sans-serif',
      "&:hover": { color: "#00b372" }
    },
    btnSuccessS: {
      color: "#ffffff",
      backgroundColor: "#00b572",
      width: "90%",
      textTransform: "capitalize",
      "&:hover": { color: "#2dce56", backgroundColor: "transparent" }
    },
    btnDenyS: {
      backgroundColor: "transparent",
      textTransform: "capitalize",
      color: "#232323",
      width: "90%",
      "&:hover": { color: "#ffffff", backgroundColor: "#232323" }
    },
    avatarAverage: {
      width: 65,
      height: 65,
      marginBottom: 15
    },
    avatarSmall: {
      width: 45,
      height: 45,
      float: "left"
    },
    table: {
      minWidth: "100%"
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  });
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

type Props = WithStyles<typeof styles> & RouteComponentProps;

class PartnersPage extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Navbar />
        <Container className={classes.ContainerAlign} fixed>
          <Box mt={2}>
            <div className={`container-body`}>
              <Grid className={classes.contentContainer} container>
                <Grid item md={4} xs={12} sm={12}>
                  <DashboardSideMenu></DashboardSideMenu>
                </Grid>

                <Grid item md={8} xs={12} sm={12}>
                  <Grid container>
                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="h5" align="left">
                        Partner Companies
                    </Typography>
                    </Grid>
                    <Grid item md={9} xs={8} sm={8}>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2" align="left">
                          Give a partner company access to your company access.
                        View all of the certified Gluu services Partners on your{" "}
                          <a style={{ color: "#00b372" }} href="#">
                            website
                        </a>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={3} xs={4} sm={4}>
                      <InvitePartnerPopover></InvitePartnerPopover>
                    </Grid>
                  </Grid>
                  <Paper
                    style={{ marginBottom: 20, marginTop: 20 }}
                    className={classes.paper}
                  >
                    <Box style={{ padding: 25 }}>
                      <Grid style={{ marginBottom: -17 }} container>
                        <Grid item xs={12} md={2}>
                          <Avatar
                            alt="Avatar"
                            src={UserTwo}
                            className={classes.avatarAverage}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" align="left">
                            Cogito
                        </Typography>
                          <Typography variant="body2" align="left">
                            invited Feb 28, 2019
                        </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box mt={2}>
                            <Typography
                              variant="body2"
                              align="left"
                              color="secondary"
                            >
                              Invitation pending
                          </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={2}>
                          <Box mt={1}>
                            <Button
                              variant="contained"
                              className={classes.btnSuccessS}
                              size="medium"
                            >
                              Approve
                          </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={2}>
                          <Box mt={1}>
                            <Button
                              variant="contained"
                              className={classes.btnDeny}
                              size="medium"
                            >
                              Deny
                          </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                  <Paper
                    style={{ marginTop: 20, marginBottom: 20 }}
                    className={classes.paper}
                  >
                    <Box style={{ padding: 25 }}>
                      <Grid container>
                        <Grid item xs={12} md={2}>
                          <Avatar
                            alt="Avatar"
                            src={UserOne}
                            className={classes.avatarAverage}
                          />
                        </Grid>
                        <Grid item md={7}>
                          <Typography variant="h6" align="left">
                            Falcom Systems Consulting
                        </Typography>
                          <Typography variant="body2" align="left">
                            Added on July 12, 2019
                        </Typography>
                        </Grid>
                        <Grid item md={3}>
                          <Button
                            variant="contained"
                            className={classes.btnDeny}
                            size="medium"
                          >
                            Revoke access
                        </Button>
                        </Grid>
                      </Grid>
                      <hr />
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" align="left">
                            Assigned Users
                        </Typography>
                        </Grid>
                      </Grid>
                      <Box style={{ overflowX: "auto" }}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow style={{ width: "100%" }}>
                              <TableCell style={{ width: "50%" }} align="left">
                                <Typography variant="body2" align="left">
                                  Name
                              </Typography>
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <Typography variant="body2" align="left">
                                  View
                              </Typography>
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <Typography variant="body2" align="left">
                                  Create
                              </Typography>
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <Typography variant="body2" align="left">
                                  Edit
                              </Typography>
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <Typography variant="body2" align="left">
                                  Delete
                              </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow style={{ width: "100%" }}>
                              <TableCell style={{ width: "50%" }}>
                                <Avatar
                                  alt="Avatar"
                                  src={UserTwo}
                                  className={classes.avatarSmall}
                                />
                                <Box mt={2}>
                                  <Typography variant="body2" align="right">
                                    Nasir Uddin
                                </Typography>
                                </Box>
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('A')}
                                  value="A"
                                />
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('B')}
                                  value="B"
                                />
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('C')}
                                  value="C"
                                />
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('E')}
                                  value="E"
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow style={{ width: "100%" }}>
                              <TableCell style={{ width: "50%" }}>
                                <Avatar
                                  alt="Avatar"
                                  src={UserOne}
                                  className={classes.avatarSmall}
                                />
                                <Box mt={2}>
                                  <Typography variant="body2" align="right">
                                    Nasir Uddin
                                </Typography>
                                </Box>
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('A')}
                                  value="A"
                                />
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('B')}
                                  value="B"
                                />
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('C')}
                                  value="C"
                                />
                              </TableCell>
                              <TableCell style={{ width: "12%" }} align="left">
                                <GreenCheckbox
                                  // onChange={handleChangeCheckBox('E')}
                                  value="E"
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(PartnersPage));
