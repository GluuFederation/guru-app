import React, { FunctionComponent } from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import { colors } from "../../../../theme";
import { Ticket } from "../../../../state/types/tickets";

const useStyles = makeStyles((theme: Theme) => ({
  ticketMeta: {
    color: colors.LIGHTER_TEXT,
    fontSize: ".7em",
    verticalAlign: "text-bottom",
    lineHeight: "1.2rem"
  },
  ticketId: {
    color: colors.MAIN_COLOR
  },
  heading: {
    marginBottom: ".5rem"
  }
}));

interface Props {
  ticket: Ticket;
}

const TicketInfo: FunctionComponent<Props> = ({ ticket }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" classes={{ root: classes.heading }}>
        {ticket.title}
      </Typography>
      <div>
        <span className={classes.ticketId}># {ticket.id}</span>&emsp;
        <span className={classes.ticketMeta}>
          Created: <em>{moment(ticket.createdOn).format("ll")}</em>
        </span>
        &emsp;
        <Hidden xsDown>
          <span className={classes.ticketMeta}>
            Last updated:{" "}
            <em>
              {moment(ticket.updatedOn).fromNow()}{" "}
              {ticket.updatedBy
                ? ` by ${ticket.updatedBy.firstName} ${ticket.updatedBy.lastName}`
                : ""}
            </em>
          </span>
        </Hidden>
      </div>
    </>
  );
};

export default TicketInfo;
