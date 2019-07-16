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

export interface TicketHistory {
  id: number;
  ticket: number;
  changedBy: ShortUser;
  changedField: string;
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
