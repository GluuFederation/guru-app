import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { updateTicket } from "../../../state/actions/tickets";
import { setTicketOs, setTicketOsVersion } from "../../../state/actions/ticket";
import { colors } from "../../../theme";
import { AppState } from "../../../state/types/state";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2em 5em"
  },
  saveButton: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR
  }
});

interface Props {
  closeModal: () => void;
  isNew?: boolean;
}

interface State {
  os: string;
  osVersion: string;
}

const ChangeOs: FunctionComponent<Props> = ({ closeModal, isNew }) => {
  const { ticket } = useSelector(
    (state: AppState) => state.tickets.ticketDetail
  );
  const { ticket: newTicket } = useSelector((state: AppState) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [os, setOs] = useState("");
  const [osVersion, setOsVersion] = useState("");

  useEffect(() => {
    if (isNew) {
      setOs(newTicket.os);
      setOsVersion(newTicket.osVersion);
    } else if (ticket) {
      setOs(ticket.os);
      setOsVersion(ticket.osVersion);
    }
  }, []);

  const changeOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOs(event.target.value);
  };

  const changeOsVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOsVersion(event.target.value);
  };

  const update = () => {
    if (os && osVersion) {
      if (isNew) {
        dispatch(setTicketOs(os));
        dispatch(setTicketOsVersion(osVersion));
        closeModal();
      } else if (ticket) {
        updateTicket({ ...ticket, os, osVersion })(dispatch).then(() => {
          closeModal();
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Edit OS Version</Typography> <br />
      <p>Which OS?</p>
      <TextField
        select
        required
        value={os}
        onChange={changeOs}
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
          onChange={changeOsVersion}
          margin="dense"
          variant="outlined"
        />
      </Box>
      <Button onClick={update} classes={{ root: classes.saveButton }}>
        Save
      </Button>{" "}
      &emsp;
      <Button onClick={closeModal}>Cancel</Button>
    </div>
  );
};

export default ChangeOs;
