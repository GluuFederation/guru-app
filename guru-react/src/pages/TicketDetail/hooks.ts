import { useSelector } from "react-redux";

import { AppState } from "../../state/types/state";
import { Ticket } from "../../state/types/tickets";
import { closedStatus, otherCategory } from "../../state/preloaded/info";

export const useTicketPermissions = (ticket: Ticket | null) => {
  const user = useSelector((state: AppState) => state.profiles.user);

  const isNotCommunity =
    user && user.role ? user.role.name !== "community" : true;
  const isCommunity = !isNotCommunity;
  const isStaff = user && user.role ? user.role.name === "staff" : false;
  const isUserCompany =
    user &&
    user.company &&
    ticket &&
    ticket.companyAssociation &&
    user.company.id === ticket.companyAssociation.id
      ? true
      : false;
  const canEdit = (isUserCompany && !isCommunity) || isStaff;

  return {
    isCommunity,
    isStaff,
    isUserCompany,
    canEdit
  };
};

export const useTicketProperties = (ticket: Ticket) => {
  const { statuses, categories, issueTypes } = useSelector(
    (state: AppState) => state.info
  );

  const tempStatus = statuses.find(item => item.id === ticket.status);
  const status = tempStatus ? tempStatus : closedStatus;

  const tempCategory = categories.find(item => item.id === ticket.category);
  const category = tempCategory ? tempCategory : otherCategory;

  const issueType = issueTypes.find(item => item.id === ticket.issueType);

  return {
    status,
    category,
    issueType
  };
};
