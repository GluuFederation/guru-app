import { UserRole } from "./info";

export enum GuruPlan {
  Community = "community",
  Core = "core",
  VipBasic = "vip-basic",
  VipStandard = "vip-standard",
  VipPremium = "vip-premium",
  VipEnterprise = "vip-enterprise",
  Partner = "partner"
}

export enum PaymentCycle {
  Monthly = "monthly",
  Yearly = "yearly"
}

export interface Address {
  id: number;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdOn: string;
  lastUpdate: string;
}

export interface ShortUser {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  companyName: string;
  email: string;
  role: UserRole | null;
  account?: Account;
  avatar: string;
}

export interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  companyName: string;
  companyId: number;
  email: string;
  role: UserRole | null;
  avatar: string;
}

export interface Company {
  id: number;
  name: string;
  bio: string;
  address?: Address;
  adminUser: ShortUser;
  paymentCycle: PaymentCycle;
  isAuto: boolean;
  plan: GuruPlan;
  subscriptionStart: string;
  subscriptionEnd: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  company: Company;
  companyName: string;
  timezone: string;
  address: Address;
  idpUuid: string;
  avatar: string;
  lastLogin: string;
  role: UserRole;
}
