import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InvitationSeccess from "../../assets/images/invitation_seccess.png";
import CrossIcon from "../../assets/images/cross_icon.png";
import Box from "@material-ui/core/Box";

const styles = (theme: Theme) =>
  createStyles({
    paperModel: {
      position: "absolute",
      width: "60%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      outline: "none",
      left: "35%",
      top: "20%"
    },
    btnSuccess: {
      backgroundColor: "#2dce56",
      textTransform: "capitalize",
      color: "#ffffff",
      "&:hover": { color: "#2dce56", backgroundColor: "transparent" }
    },
    btnInviteNewPartn: {
      margin: theme.spacing(1),
      fontSize: 12,
      fontWeight: 600,
      color: "#232323",
      marginTop: 20,
      marginBottom: 0,
      backgroundColor: "#ededed",
      textTransform: "capitalize",
      fontFamily: '"Lato", sans-serif',
      "&:hover": { color: "#00b372" }
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
    invitationImg: {
      width: 80,
      height: 80,
      marginBottom: 15,
      marginTop: 15,
      marginLeft: "40%",
      marginRight: "40%"
    },
    crossIcon: {
      width: 15,
      height: 15,
      marginBottom: 10,
      marginTop: 10,
      float: "right",
      cursor: "pointer"
    },
    invitationSend: {
      fontFamily: '"Lato", sans-serif',
      fontSize: 22,
      fontWeight: 500,
      marginTop: 10,
      color: "#232323",
      textAlign: "center"
    },
    invitePartnMsg: {
      margin: 0,
      fontFamily: '"Lato", sans-serif',
      fontSize: 12,
      color: "#232323",
      width: "100%",
      height: 150,
      marginBottom: 10
    }
  });

type Props = WithStyles<typeof styles> & RouteComponentProps;

interface State {
  openInviteNewPartn: boolean;
  openInviteSend: boolean;
}

class InvitePartnerPopover extends Component<Props, State> {
  state = {
    openInviteNewPartn: false,
    openInviteSend: false
  };

  handleOpenInviteNewPartn = () => {
    this.setState({ openInviteNewPartn: true });
  };

  handleCloseInviteNewPartn = () => {
    this.setState({ openInviteNewPartn: false });
  };

  handleOpenInviteSend = () => {
    this.setState({ openInviteSend: true });
  };

  handleCloseInviteSend = () => {
    this.setState({ openInviteSend: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          size="medium"
          className={classes.btnInviteNewPartn}
          onClick={this.handleOpenInviteNewPartn}
        >
          Invite New Partner
        </Button>
        <Modal
          open={this.state.openInviteNewPartn}
          onClose={this.handleCloseInviteNewPartn}
        >
          <Box style={{ width: "28%" }} className={classes.paperModel}>
            <form>
              <Box>
                <Typography variant="h6" align="left">
                  Invite new Partner Company
                </Typography>

                <Box mt={2} mb={1}>
                  <Typography variant="body2" align="left">
                    Partner Company:
                  </Typography>
                </Box>

                <select
                  style={{ width: "100%", height: 40 }}
                  className={classes.selectType}
                >
                  <option value="Choose a Company">Choose a company</option>
                  <option value="consulting ">Consulting</option>
                  <option value="itsolution">IT Solution</option>
                  <option value="corporate">Corporate</option>
                </select>

                <Box mt={2} mb={1}>
                  <Typography variant="body2" align="left">
                    Message
                  </Typography>
                </Box>

                <TextareaAutosize
                  style={{ height: 100 }}
                  aria-label="maximum height"
                  defaultValue="we are authorizing your company access to your account on Gluu sports. if you agree, Please approve the request and assign users to work on our account."
                  className={classes.invitePartnMsg}
                />

                <Box mb={1}>
                  <Typography variant="caption" display="block" align="left">
                    Invitation will be sent for approval to admin contacts at
                    the partner Organization
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  className={classes.btnSuccess}
                  size="medium"
                  color="primary"
                  onClick={this.handleOpenInviteSend}
                >
                  Send Invite
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>

        <Modal
          open={this.state.openInviteSend}
          onClose={this.handleCloseInviteSend}
        >
          <div style={{ width: "28%" }} className={classes.paperModel}>
            <form>
              <div>
                <img
                  alt="Avatar"
                  src={CrossIcon}
                  className={classes.crossIcon}
                  onClick={this.handleCloseInviteSend}
                />
                <img
                  alt="Avatar"
                  src={InvitationSeccess}
                  className={classes.invitationImg}
                />
                <Typography className={classes.invitationSend}>
                  Invitation has been Sent
                </Typography>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(InvitePartnerPopover));
