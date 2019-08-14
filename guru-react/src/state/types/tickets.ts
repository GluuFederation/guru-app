import { GluuProduct } from "./info";
import { ShortUser, Company } from "./profiles";

export enum TicketFilterOrder {
  MostRecent = "+recent",
  LeastRecent = "-recent",
  UserAZ = "useraz",
  UserZA = "userza"
}

export interface TicketProduct {
  id: number;
  product: GluuProduct;
  version: string;
  os: string;
  osVersion: string;
}

export interface Ticket {
  id: number;
  slug: string;
  title: string;
  body: string;
  createdBy: ShortUser;
  createdFor: ShortUser;
  updatedBy: ShortUser;
  assignee: ShortUser;
  isPrivate: boolean;
  category: number;
  status: number;
  issueType: number;
  gluuServer: string;
  os: string;
  osVersion: string;
  voters: Array<ShortUser>;
  subscribers: Array<ShortUser>;
  companyAssociation: Company;
  products: Array<TicketProduct>;
  createdOn: string;
  updatedOn: string;
  responseNumber: number;
  attachments: Array<string>;
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
  attachments: Array<string>;
}
