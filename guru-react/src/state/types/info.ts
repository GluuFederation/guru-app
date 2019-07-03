export enum TicketPriority {
  High = "high",
  Low = "low"
}

export interface GluuProduct {
  id: number;
  name: string;
  version: Array<string>;
  os: Array<string>;
}

export interface TicketCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface TicketIssueType {
  id: number;
  name: string;
  slug: string;
  priority: TicketPriority;
}

export interface TicketStatus {
  id: number;
  name: string;
  slug: string;
}

export interface Permission {
  id: number;
  appName: string;
  modelName: string;
  actions: Array<string>;
  description: string;
}

export interface UserRole {
  id: number;
  name: string;
  isCompanyAssociated: boolean;
  permissions: Array<Permission>;
}
