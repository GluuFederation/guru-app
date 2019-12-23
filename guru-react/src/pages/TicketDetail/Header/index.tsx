import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import MoreVert from "@material-ui/icons/MoreVert";

import { colors } from "../../../theme";
import { useTicketPermissions } from "../hooks";
import { Ticket } from "../../../state/types/tickets";
import Chips from "../../../components/Chips";

interface Props {
  ticket: Ticket;
  editTicket: () => void;
}

const useStyles = makeStyles({
  privacyIcon: {
    height: "1.283rem"
  },
  editButton: {
    backgroundColor: colors.LIGHT_BUTTON
  },
  ticketId: {
    color: colors.LIGHTER_TEXT
  },
  ticketTitle: {
    fontSize: "1.5rem"
  },
  moreIconDiv: {
    textAlign: "right"
  }
});

const TicketDetailHeader: FunctionComponent<Props> = ({
  ticket,
  editTicket
}) => {
  const { canEdit } = useTicketPermissions(ticket);
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Hidden mdUp>
          <Grid container>
            <Grid item xs={10}>
              <Chips ticket={ticket} />
            </Grid>
            <Grid item xs={2}>
              <div className={classes.moreIconDiv}>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Grid item md={9}>
        <Typography variant="h5" classes={{ root: classes.ticketTitle }}>
          {ticket.title} <span className={classes.ticketId}>#{ticket.id}</span>
        </Typography>
      </Grid>

      <Grid
        item
        container
        justify="flex-end"
        alignItems="flex-end"
        alignContent="flex-end"
        md={3}
      >
        <Hidden smDown>
          {canEdit ? (
            <>
              {ticket.isPrivate ? (
                <Lock height="10" classes={{ root: classes.privacyIcon }} />
              ) : (
                <LockOpen height="10" classes={{ root: classes.privacyIcon }} />
              )}
              &emsp;
              <Button
                variant="outlined"
                classes={{ root: classes.editButton }}
                onClick={editTicket}
              >
                <small>Edit</small>
              </Button>
            </>
          ) : null}
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default TicketDetailHeader;
