import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { paths } from "../../../routes";
import { Ticket } from "../../../state/types/tickets";

interface Props {
  ticket: Ticket;
}

const TicketDetailBreadcrumbs: FunctionComponent<Props> = ({ ticket }) => {
  return (
    <>
      <Breadcrumbs>
        <Link component={RouterLink} to={paths.NOTIFICATIONS}>
          Dashboard
        </Link>
        <Link component={RouterLink} to={paths.TICKET_LIST}>
          Tickets
        </Link>
        <Typography>#{ticket.id}</Typography>
      </Breadcrumbs>
    </>
  );
};

export default TicketDetailBreadcrumbs;
