import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import { getChipClass } from "../../utils/chipStyles";
import { Ticket } from "../../state/types/tickets";
import { useTicketProperties } from "../../hPages/TicketDetail/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  chips: {
    [theme.breakpoints.down("sm")]: {
      marginTop: ".8rem"
    }
  }
}));

interface Props {
  ticket: Ticket;
}

const Chips: FunctionComponent<Props> = ({ ticket }) => {
  const classes = useStyles();
  const { status, issueType, category } = useTicketProperties(ticket);

  return (
    <div className={classes.chips}>
      <Chip label={status.name} className={getChipClass(status.slug)} />
      {issueType ? (
        <Chip label={issueType.name} className={getChipClass(issueType.slug)} />
      ) : null}

      <Chip label={category.name} className={getChipClass(category.slug)} />
    </div>
  );
};

export default Chips;
