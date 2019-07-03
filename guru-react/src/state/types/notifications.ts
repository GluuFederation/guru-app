import { ShortUser, Company } from "./profiles";
import { Ticket } from "./tickets";

export enum AppNotificationObjectType {
  Ticket = "ticket",
  Answer = "answer",
  Invoice = "invoice",
  User = "user",
  Company = "company",
  Partner = "partner",
  PaymentMethod = "payment-method"
}

export interface AppNotification {
  id: number;
  user: ShortUser;
  associatedCompany: Company;
  recipient?: ShortUser;
  action: string;
  objectType: AppNotificationObjectType;
  text: string;
  url: string;
  ticket?: Ticket;
  company?: Company;
  partner?: Company;
}

export interface AppNotificationSettings {
  newTickets: boolean;
  receiveNewsletter: boolean;
  [key: string]: boolean;
}
