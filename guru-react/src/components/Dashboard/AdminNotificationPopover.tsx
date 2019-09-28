import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import BellIcon from "../../assets/images/bell_icon.png";
import NextArrow from "../../assets/images/next_arrow.png";
import Box from "@material-ui/core/Box";

const styles = (theme: Theme) =>
  createStyles({
    editTextField: {
      margin: 0,
      width: "80%",
      marginBottom: 10,
      float: "left"
    },
    cardBell: {
      width: "100%",
      height: 98,
      backgroundColor: "#1d8de0",
      color: "#ffffff"
    },
    dashboardClickImg: {
      width: 70,
      height: 70,
      opacity: 0.3,
      marginTop: -34,
      float: "right"
    },
    nextArrow: {
      width: 15,
      marginTop: 5,
      marginLeft: 10,
      height: "auto"
    },
    paperModel: {
      position: "absolute",
      width: "60%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      outline: "none",
      left: "35%",
      top: "2%"
    },
    selectType: {
      paddingLeft: 10,
      paddingRight: 5,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 4,
      height: 40,
      backgroundColor: "transparent",
      borderColor: "#c9c9c9",
      boxShadow: "0 0 0 0.1rem rgba(0,123,255,.1)"
    },
    btnSuccess: {
      padding: 10,
      width: "30%",
      marginRight: 10,
      fontWeight: 500,
      color: "#ffffff",
      backgroundColor: "#00b372",
      fontFamily: '"Lato", sans-serif',
      "&:hover": {
        color: "#00b372"
      }
    },
    btnCancel: {
      padding: 10,
      width: "30%",
      marginRight: 10,
      border: "none",
      fontWeight: 500,
      color: "#232323",
      backgroundColor: "transparent",
      fontFamily: '"Lato", sans-serif',
      "&:hover": {
        color: "#00b372"
      }
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  });

type Props = WithStyles<typeof styles> & RouteComponentProps;
interface State {
  openClNoti: boolean;
}
class AdminNotificationPopover extends Component<Props, State> {
  state = {
    openClNoti: false
  };
  handleOpenClNoti = () => {
    this.setState({ openClNoti: true });
  };

  handleCloseClNoti = () => {
    this.setState({ openClNoti: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Box ml={1} mr={1}>
          <Card onClick={this.handleOpenClNoti} className={classes.cardBell}>
            <CardActionArea>
              <Box mt={3} ml={5}>
                <Typography variant="subtitle1" align="left">
                  Notifications
                </Typography>
              </Box>
              <Box ml={5}>
                <Typography variant="caption" align="left">
                  Click here
                  <img className={classes.nextArrow} alt="" src={NextArrow} />
                </Typography>
              </Box>
              <img
                className={classes.dashboardClickImg}
                alt=""
                src={BellIcon}
              />
            </CardActionArea>
          </Card>
        </Box>
        <Modal open={this.state.openClNoti} onClose={this.handleCloseClNoti}>
          <Box style={{ width: "40%" }} className={classes.paperModel}>
            <form>
              <Box>
                <Box>
                  <Typography variant="h6" align="left">
                    Notification
                  </Typography>
                  <Typography variant="caption" align="left">
                    For important updates regarding your Gull activity, certain
                    notification cannot be disabled.
                  </Typography>
                  <hr />
                  <Box mt={2}>
                    <Typography variant="subtitle1" align="left">
                      Settings
                    </Typography>{" "}
                  </Box>
                  <Box style={{ marginTop: 5 }}> </Box>
                  <Grid container>
                    <Grid item xs={5}>
                      <Box mt={1}>
                        <Typography variant="body2">
                          New ticket reminder interval:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        className={classes.editTextField}
                        placeholder="Search Name..."
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={5}>
                      <Box mt={1}>
                        <Typography variant="body2" align="left">
                          New ticket reminder frequency:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        className={classes.editTextField}
                        placeholder="Search Name..."
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                  </Grid>

                  <Box style={{ marginTop: 10 }}> </Box>
                  <Typography variant="subtitle1" align="left">
                    Idle ticket reminder
                  </Typography>
                  <Box style={{ marginTop: 10 }}> </Box>
                  <Grid container>
                    <Grid item xs={5}>
                      <Box mt={1}>
                        <Typography variant="body2" align="left">
                          Community user:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        className={classes.editTextField}
                        placeholder="Search Name..."
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={5}>
                      <Box mt={1}>
                        <Typography variant="body2" align="left">
                          Core user:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        className={classes.editTextField}
                        placeholder="Search Name..."
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={5}>
                      <Box mt={1}>
                        <Typography variant="body2" align="left">
                          VIP user:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        className={classes.editTextField}
                        placeholder="Search Name..."
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={7}>
                      <Box mt={2} mr={1} display="inline">
                        <Button
                          variant="contained"
                          className={classes.btnSuccess}
                          size="medium"
                        >
                          Save
                        </Button>
                      </Box>
                      <Box mt={2} ml={1} display="inline">
                        <Button
                          variant="contained"
                          className={classes.btnCancel}
                          size="medium"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box mb={2}> </Box>
                  <hr />
                  <Box mt={2} mb={2}>
                    <Typography variant="subtitle1" align="left">
                      Send test email notification
                    </Typography>
                  </Box>
                  <Grid container>
                    <Grid item xs={3}>
                      <Box mt={1}>
                        <Typography variant="body2" align="left">
                          Comunity user:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      <select
                        style={{ width: "70%", float: "left" }}
                        className={classes.selectType}
                      >
                        <option value="Activitaion email">
                          Activitaion email
                        </option>
                        <option value="NotActivitaion email ">
                          Not Activitaion email
                        </option>
                      </select>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                      <Box style={{ textAlign: "left", marginTop: 10 }}>
                        <Button
                          variant="outlined"
                          className={classes.btnSuccess}
                          size="medium"
                        >
                          Send Email
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AdminNotificationPopover));
