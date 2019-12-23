import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { setTicketOsVersion, setTicketOs } from "../../../state/actions/ticket";
import { CreateTicketState } from "../../../state/types/state";
import { useDefaultStyles } from "../styles";
import { TicketOs } from "../../../state/types/info";

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

  const osValues = Object.values(TicketOs);
  const osKeys = Object.keys(TicketOs);

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
                {osKeys.map((key, index) => (
                  <MenuItem value={osValues[index] as string} key={key}>
                    {key}
                  </MenuItem>
                ))}
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
