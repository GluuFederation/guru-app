import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import UserOne from "../../assets/images/user_one.png";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const styles = (theme: Theme) =>
  createStyles({
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
    paper: {
      marginRight: theme.spacing(2)
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
      top: "20%"
    },
    popupEditImageP: {
      backgroundColor: "#ffffff",
      width: 30,
      height: 30,
      borderRadius: 20,
      border: "none",
      outline: "none",
      cursor: "pointer",
      textAlign: "right",
      marginLeft: "15%",
      position: "relative",
      boxShadow: "0 0 0 0.1rem rgba(0,123,255,.1)"
    },
    popupEditPancil: {
      fontSize: 15,
      borderRadius: 20,
      color: "#2dce56",
      marginLeft: 0,
      marginTop: 2
    },
    popupAvatar: {
      width: 85,
      height: 85,
      marginBottom: 15,
      marginTop: 15
    },
    txtField: {
      margin: 0,
      width: "100%",
      marginBottom: 10
    },
    btnSuccess: {
      backgroundColor: "#2dce56",
      textTransform: "capitalize",
      color: "#ffffff",
      "&:hover": { color: "#2dce56", backgroundColor: "transparent" }
    }
  });

type Props = RouteComponentProps & WithStyles<typeof styles>;

interface State {
  openAdd: boolean;
}

class EditTeamPopover extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openAdd: false
    };
  }

  handleOpenAdd = () => {
    this.setState({ openAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography align="left">
          <Link href="#" onClick={this.handleOpenAdd} color="textSecondary">
            Edit details
          </Link>
        </Typography>
        <Modal open={this.state.openAdd} onClose={this.handleCloseAdd}>
          <Box style={{ width: "28%" }} className={classes.paperModel}>
            <form>
              <Box>
                <Typography variant="h5" align="left">
                  Edit team profile
                </Typography>

                <Box mb={2}>
                  <Avatar
                    style={{ marginBottom: -26 }}
                    alt="Avatar"
                    src={UserOne}
                    className={classes.popupAvatar}
                  />
                  <button className={classes.popupEditImageP}>
                    <Edit className={classes.popupEditPancil} />
                  </button>
                </Box>
                <Typography variant="body2" align="left">
                  Name
                </Typography>
                <TextField
                  className={classes.txtField}
                  variant="outlined"
                  margin="dense"
                />

                <Typography variant="body2" align="left">
                  BIO
                </Typography>
                <TextField
                  className={classes.txtField}
                  variant="outlined"
                  margin="dense"
                />
                <Typography display="block" variant="caption" align="left">
                  Maximum 25 words
                </Typography>

                <Button variant="outlined" className={classes.btnSuccess}>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(EditTeamPopover));
