import React, { FunctionComponent } from "react";

import Company from "../../TicketDetail/SideBar/Company";
import Creator from "../../TicketDetail/SideBar/Creator";
import GluuServer from "../../TicketDetail/SideBar/GluuServer";
import Info from "../../TicketDetail/SideBar/Info";
import Os from "../../TicketDetail/SideBar/Os";
import Products from "../../TicketDetail/SideBar/Products";

import { CreateTicketState } from "../../../state/types/state";
import { SidebarType } from "../../../state/types/tickets";
import { useTicketPermissions } from "../../TicketDetail/hooks";

interface Props {
  ticket: CreateTicketState;
  step: number;
}

const SideBar: FunctionComponent<Props> = ({ ticket, step }) => {
  const { isCommunity, user } = useTicketPermissions(null);
  const { createdBy, createdFor } = ticket;

  return (
    <>
      {!isCommunity && step > 1 ? <Company ticket={ticket} /> : null}

      {!isCommunity && step > 2 ? (
        <Creator
          createdBy={createdBy || user}
          createdFor={createdFor || undefined}
          canEdit={true}
        />
      ) : null}

      {!isCommunity && step > 3 ? (
        <Info
          canEdit={true}
          ticket={ticket}
          sideBarType={SidebarType.IssueType}
        />
      ) : null}

      {step > 4 ? (
        <Info
          canEdit={true}
          ticket={ticket}
          sideBarType={SidebarType.Category}
        />
      ) : null}
      {step > 5 ? <GluuServer canEdit={true} ticket={ticket} /> : null}
      {step > 6 ? <Os canEdit={true} ticket={ticket} /> : null}
      {step > 8 ? <Products canEdit={true} ticket={ticket} /> : null}
    </>
  );
};

export default SideBar;
