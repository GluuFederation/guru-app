import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { paths } from "../../../routes";
import { Ticket } from "../../../state/types/tickets";
import { useInfoState } from "../../../state/hooks/state";

interface Props {
  ticket: Ticket;
}

const TicketDetailBreadcrumbs: FunctionComponent<Props> = ({ ticket }) => {
  const getPath = (id: number) => {
    return `${paths.TICKET_LIST}?categories=${id}`;
  };
  const { categories } = useInfoState();
  const category = categories.find(item => ticket.category);

  return (
    <>
      <Breadcrumbs>
        <Link component={RouterLink} to={paths.HOMEPAGE}>
          Home
        </Link>
        <Link component={RouterLink} to={getPath(ticket.category)}>
          {category ? category.name : ""}
        </Link>
        <Typography>#{ticket.id}</Typography>
      </Breadcrumbs>
    </>
  );
};

export default TicketDetailBreadcrumbs;
