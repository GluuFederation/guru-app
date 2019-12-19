import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { setTicketOsVersion, setTicketOs } from "../../../state/actions/ticket";
import { CreateTicketState } from "../../../state/types/state";
import { useDefaultStyles } from "../styles";

interface Props {
  ticket: CreateTicketState;
}

const Step6: FunctionComponent<Props> = ({ ticket }) => {
  const dispatch = useDispatch();
  const classes = useDefaultStyles();

  const setOsVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const osVersion = event.target.value;
    if (osVersion) {
      dispatch(setTicketOsVersion(osVersion));
    }
  };

  const setOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const os = event.target.value;
    if (os) {
      dispatch(setTicketOs(os));
    }
  };

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
                value={ticket.os}
                onChange={setOs}
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
                value={ticket.osVersion}
                required
                onChange={setOsVersion}
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step6;
