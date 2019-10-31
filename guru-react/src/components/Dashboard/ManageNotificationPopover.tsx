import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import CrossIcon from "../../assets/images/cross_icon.png";
import { green } from "@material-ui/core/colors";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
const styles = (theme: Theme) =>
  createStyles({
    btnNotificationSet: {
      margin: theme.spacing(1),
      fontSize: 10,
      fontWeight: 500,
      color: "#232323",
      backgroundColor: "#ededed",
      textTransform: "capitalize",
      fontFamily: '"Lato", sans-serif',
      "&:hover": { color: "#00b372" }
    },
    paperNotifModelCont: {
      overflow: 'auto'
    },
    paperNotifModel: {
      position: "absolute",
      width: "60%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      outline: "none",
      left: "15%",
      top: "5%",
    },
    crossIcon: {
      width: 15,
      height: 15,
      marginBottom: 10,
      marginTop: 10,
      float: "right",
      cursor: "pointer"
    },
    selectType: {
      paddingLeft: 10,
      paddingRight: 5,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 4,
      backgroundColor: "transparent",
      borderColor: "#c9c9c9",
      boxShadow: "0 0 0 0.1rem rgba(0,123,255,.1)"
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
interface State {
  openTeamPro: boolean;
}

class ManageNotificationPopover extends Component<Props, State> {
  state = {
    openTeamPro: false
  };

  handleOpenTeamPro = () => {
    this.setState({ openTeamPro: true });
  };

  handleCloseTeamPro = () => {
    this.setState({ openTeamPro: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          onClick={this.handleOpenTeamPro}
          variant="outlined"
          size="medium"
          className={classes.btnNotificationSet}
        >
          Manage Notification Settings
        </Button>
        <Modal className={classes.paperNotifModelCont} open={this.state.openTeamPro} onClose={this.handleCloseTeamPro}>
          <Box className={classes.paperNotifModel}>
            <Box>
              <img
                alt="Avatar"
                src={CrossIcon}
                className={classes.crossIcon}
                onClick={this.handleCloseTeamPro}
              />
              <Typography variant="h6" align="left">
                Notification Settings
              </Typography>
            </Box>

            <form>
              <Box>
                <hr />
                <Typography variant="body2" align="left">
                  Notification Setting for new tickets only
                </Typography>

                <Box mt={2} mb={2}>
                  <GreenCheckbox
                    style={{
                      marginBottom: 5,
                      marginRight: 8,
                      width: 15,
                      height: 15
                    }}
                    // onChange={handleChangeCheckBox('A')}
                    value="A"
                  />
                  <Typography variant="subtitle1" align="left" display="inline">
                    All new tickets
                  </Typography>
                </Box>
                <hr />
                <Typography variant="caption" align="left">
                  Notification setting for new tickets and tickets update
                  (answer, status changes etc )
                </Typography>

                <Grid style={{ marginBottom: 20 }} container>
                  <Grid item xs={6}>
                    <Box style={{ marginBottom: 15, marginTop: 20 }}>
                      <GreenCheckbox
                        style={{
                          marginBottom: 5,
                          marginRight: 8,
                          width: 15,
                          height: 15
                        }}
                        // onChange={handleChangeCheckBox('A')}
                        value="A"
                      />
                      <Typography
                        variant="subtitle1"
                        align="left"
                        display="inline"
                      >
                        All tickets types
                      </Typography>
                    </Box>

                    <Box style={{ marginLeft: 15, marginRight: 15 }}>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Production Outage
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Production Impaired
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Pre-Production Issues
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Minor Issues
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          New Development Issues
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box style={{ marginBottom: 15, marginTop: 20 }}>
                      <GreenCheckbox
                        style={{
                          marginBottom: 5,
                          marginRight: 8,
                          width: 15,
                          height: 15
                        }}
                        // onChange={handleChangeCheckBox('A')}
                        value="A"
                      />
                      <Typography
                        variant="subtitle1"
                        align="left"
                        display="inline"
                      >
                        All categories
                      </Typography>
                    </Box>

                    <Box style={{ marginLeft: 15, marginRight: 15 }}>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Production Outage
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Production Impaired
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Pre-Production Issues
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          Minor Issues
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 10, marginTop: 10 }}>
                        <GreenCheckbox
                          style={{
                            marginBottom: 5,
                            marginRight: 8,
                            width: 15,
                            height: 15
                          }}
                          //   onChange={handleChangeCheckBox('A')}
                          value="A"
                        />
                        <Typography
                          variant="body2"
                          align="left"
                          display="inline"
                        >
                          New Development Issues
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <hr />

                <Grid container>
                  <Grid item xs={3}>
                    <Box mt={1}>
                      <Typography variant="body2" align="left">
                        Receive the newsletter :{" "}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={9}>
                    <select
                      style={{ width: "40%", height: 40 }}
                      className={classes.selectType}
                    >
                      <option value="Choose a Company">Never</option>
                      <option value="consulting ">Receive</option>
                    </select>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(ManageNotificationPopover));
