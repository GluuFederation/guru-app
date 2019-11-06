import { ShortUser, ShortCompany } from "./profiles";

export enum TicketFilterOrder {
  MostRecent = "+recent",
  LeastRecent = "-recent",
  UserAZ = "useraz",
  UserZA = "userza"
}

export interface TicketProduct {
  id: number;
  product: number;
  version: string;
  os: string;
  osVersion: string;
}

export interface TicketDocument {
  id: number;
  file: string;
}

export interface Ticket {
  id: number;
  slug: string;
  title: string;
  body: string;
  createdBy: ShortUser;
  createdFor: ShortUser | null;
  updatedBy: ShortUser | null;
  assignee: ShortUser | null;
  isPrivate: boolean;
  category: number;
  status: number;
  issueType: number;
  gluuServer: string;
  os: string;
  osVersion: string;
  voters: Array<ShortUser>;
  subscribers: Array<ShortUser>;
  companyAssociation: ShortCompany;
  products: Array<TicketProduct>;
  createdOn: string;
  updatedOn: string;
  responseNumber: number;
  attachments: Array<TicketDocument>;
}

export interface TicketSearchResult {
  id: number;
  title: string;
}

export enum HistoryChangedField {
  Title = "title",
  Category = "category",
  Status = "status",
  IssueType = "issue type",
  GluuServer = "gluu server",
  Os = "os",
  OsVersion = "os version",
  Body = "body",
  CreatedBy = "creator",
  Assignee = "assignee",
  Privacy = "privacy",
  Products = "products",
  Comment = "comment",
  EditComment = "edit comment"
}

export interface TicketHistoryItem {
  id: number;
  ticket: number;
  createdOn: string;
  changedBy: ShortUser;
  affectedUser?: ShortUser;
  changedField: HistoryChangedField;
  beforeValue: string;
  afterValue: string;
}

export interface Answer {
  id: number;
  body: string;
  ticket: number;
  createdBy: ShortUser;
  createdOn: string;
  updatedOn: string;
  attachments: Array<TicketDocument>;
}
