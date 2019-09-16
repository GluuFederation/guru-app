import { RouteComponentProps } from "react-router-dom";

import { Company, ShortUser, User, TeamMember, ShortCompany } from "./profiles";
import {
  TicketCategory,
  GluuProduct,
  TicketIssueType,
  TicketStatus,
  Permission,
  UserRole
} from "./info";
import {
  Ticket,
  TicketFilterOrder,
  TicketHistoryItem,
  Answer,
  TicketProduct
} from "./tickets";
import { AppNotification, AppNotificationSettings } from "./notifications";
import { PaymentCard, PaymentInvoice, PaymentReceipt } from "./payments";

export interface InfoState {
  categories: Array<TicketCategory>;
  products: Array<GluuProduct>;
  issueTypes: Array<TicketIssueType>;
  statuses: Array<TicketStatus>;
  permissions: Array<Permission>;
  userRoles: Array<UserRole>;
}

export interface TicketsFilterState {
  companies: Array<Company>;
  creators: Array<ShortUser>;
  assignees: Array<ShortUser>;
  categories: Array<TicketCategory>;
  products: Array<GluuProduct>;
  issueTypes: Array<TicketIssueType>;
  statuses: Array<TicketStatus>;
  startDate: string;
  endDate: string;
  query: string;
  order: TicketFilterOrder;
  page: number;
  pageItems: number;
  totalCount: number;
}

export interface TicketDetailState {
  ticket: Ticket | null;
  ticketHistory: Array<TicketHistoryItem>;
  answers: Array<Answer>;
}

export interface TicketsState {
  ticketDetail: TicketDetailState;
  tickets: Array<Ticket>;
  filters: TicketsFilterState;
}

export interface CreateTicketState {
  step: number;
  hasProducts?: boolean;
  slug: string;
  title: string;
  body: string;
  createdBy: ShortUser | null;
  createdFor: ShortUser | null;
  assignee: null;
  isPrivate: boolean;
  category: number;
  status: number;
  issueType: number;
  gluuServer: string;
  os: string;
  osVersion: string;
  companyAssociation: ShortCompany | null;
  products: Array<TicketProduct>;
}

export interface AppNotificationsState {
  allActivities: Array<AppNotification>;
  yourActivities: Array<AppNotification>;
  settings: AppNotificationSettings;
}

export interface ProfilesState {
  user: User | null;
  token: string;
  associatedCompanies: Array<Company>;
  teamMembers: Array<TeamMember>;
  invitees: Array<TeamMember>;
}

export interface PaymentsState {
  cards: Array<PaymentCard>;
  invoices: Array<PaymentInvoice>;
  receipts: Array<PaymentReceipt>;
}

export interface AppState {
  info: InfoState;
  tickets: TicketsState;
  ticket: CreateTicketState;
  notifications: AppNotificationsState;
  profiles: ProfilesState;
  payments: PaymentsState;
  router: RouteComponentProps;
}
