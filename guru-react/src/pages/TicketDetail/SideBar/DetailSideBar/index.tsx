import React, { FunctionComponent } from "react";

import Assignee from "../Assignee";
import Creator from "../Creator";
import GluuServer from "../GluuServer";
import Info from "../Info";
import Os from "../Os";
import Products from "../Products";
import { Ticket, SidebarType } from "../../../../state/types/tickets";
import { useTicketPermissions } from "../../hooks";

interface Props {
  ticket: Ticket;
}

const DetailSideBar: FunctionComponent<Props> = ({ ticket }) => {
  const { canEdit, isCommunity, isStaff } = useTicketPermissions(ticket);
  const { slug, assignee, createdBy, createdFor } = ticket;

  return (
    <>
      {isStaff ? (
        <Creator
          createdBy={createdBy}
          createdFor={createdFor || undefined}
          slug={slug}
          canEdit={canEdit}
        />
      ) : null}

      {isStaff ? (
        <Assignee
          slug={slug}
          canEdit={canEdit}
          assignee={assignee || undefined}
        />
      ) : null}

      {!isCommunity ? (
        <Info
          canEdit={canEdit}
          ticket={ticket}
          sideBarType={SidebarType.IssueType}
        />
      ) : null}

      <Info
        canEdit={canEdit}
        ticket={ticket}
        sideBarType={SidebarType.Status}
      />
      <Info
        canEdit={canEdit}
        ticket={ticket}
        sideBarType={SidebarType.Category}
      />
      <GluuServer canEdit={canEdit} ticket={ticket} />
      <Os canEdit={canEdit} ticket={ticket} />
      <Products canEdit={canEdit} ticket={ticket} />
    </>
  );
};

export default DetailSideBar;
