import { TicketStatus } from "../types/info";
import { ShortUser } from "../types/profiles";

export const newStatus: TicketStatus = {
  id: 1,
  slug: "new",
  name: "New"
};

export const assignedStatus: TicketStatus = {
  id: 2,
  slug: "assigned",
  name: "Assigned"
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

export const unassigned: ShortUser = {
  id: -1,
  firstName: "Unassigned",
  lastName: "",
  otherNames: "",
  companyName: "",
  email: "",
  role: null,
  avatar: ""
};

export const assigned: ShortUser = {
  id: -2,
  firstName: "Assigned",
  lastName: "",
  otherNames: "",
  companyName: "",
  email: "",
  role: null,
  avatar: ""
};
