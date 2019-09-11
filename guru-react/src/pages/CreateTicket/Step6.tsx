import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { colors } from "../../theme";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    }
  });

type Props = WithUserProps &
  WithCreateTicketProps &
  WithInfoProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  isLoading: boolean;
}

class Step4 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  setOsVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setCreateTicketOsVersion } = this.props;
    const osVersion = event.target.value;
    if (osVersion) {
      setCreateTicketOsVersion(osVersion);
    }
  };

  setOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setCreateTicketOs } = this.props;
    const os = event.target.value;
    if (os) {
      setCreateTicketOs(os);
    }
  };

  render() {
    const { classes, newTicket } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>Select an operating system</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <p>OS Name</p>
                <TextField
                  select
                  required
                  value={newTicket.os}
                  onChange={this.setOs}
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
              </Grid>
              <Grid item md={6}>
                <p>What version?</p>
                <TextField
                  fullWidth
                  value={newTicket.osVersion}
                  required
                  onChange={this.setOsVersion}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(Step4))))
);
