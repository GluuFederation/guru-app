import { TicketStatus, UserRole, Permission } from "../types/info";

export const newStatus: TicketStatus = {
  id: 1,
  slug: "new",
  name: "New"
};

export const assignedStatus: TicketStatus = {
  id: 2,
  slug: "Assigned",
  name: "assigned"
};

export const inProgressStatus: TicketStatus = {
  id: 3,
  slug: "inprogress",
  name: "In Progress"
};

export const pendingStatus: TicketStatus = {
  id: 4,
  slug: "pending",
  name: "Pending"
};

export const closedStatus: TicketStatus = {
  id: 5,
  slug: "closed",
  name: "Closed"
};

export const staffRole: UserRole = {
  id: 1,
  name: "staff",
  isCompanyAssociated: false,
  permissions: []
};
