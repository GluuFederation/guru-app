import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import { colors } from "../../theme";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "2em 5em"
    },
    saveButton: {
      color: colors.MAIN_BACKGROUND,
      backgroundColor: colors.MAIN_COLOR
    }
  });

interface ExternalProps {
  closeModal: () => void;
}

type Props = ExternalProps &
  WithTicketDetailProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

interface State {
  os: string;
  osVersion: string;
}

class ChangeOs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const ticket = props.ticket;
    let os = "";
    let osVersion = "";
    if (ticket) {
      os = ticket.os;
      osVersion = ticket.osVersion;
    }
    this.state = {
      os,
      osVersion
    };
  }

  changeOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ os: event.target.value });
  };

  changeOsVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ osVersion: event.target.value });
  };

  updateTicket = () => {
    const { ticket, closeModal, updateTicket } = this.props;
    const { os, osVersion } = this.state;
    if (ticket && os && osVersion) {
      updateTicket({ ...ticket, os, osVersion }).then(() => {
        closeModal();
      });
    }
  };

  render() {
    const { classes, closeModal } = this.props;
    const { os, osVersion } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h6">Edit OS Version</Typography> <br />
        <p>Which OS?</p>
        <TextField
          select
          required
          value={os}
          onChange={this.changeOs}
          fullWidth
          margin="dense"
          variant="outlined"
        >
          <MenuItem value="Ubuntu">Ubuntu</MenuItem>
          <MenuItem value="CentOS">CentOS</MenuItem>
          <MenuItem value="RHEL">RHEL</MenuItem>
          <MenuItem value="Debian">Debian</MenuItem>
          <MenuItem value="Docker">Docker</MenuItem>
          <MenuItem value="RH Container">RH Container</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <p>What version?</p>
        <Box mb={2}>
          <TextField
            fullWidth
            value={osVersion}
            required
            onChange={this.changeOsVersion}
            margin="dense"
            variant="outlined"
          />
        </Box>
        <Button
          onClick={this.updateTicket}
          classes={{ root: classes.saveButton }}
        >
          Save
        </Button>{" "}
        &emsp;
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    );
  }
}

export default withTicketDetail(withRouter(withStyles(styles)(ChangeOs)));
