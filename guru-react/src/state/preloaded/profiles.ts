import {
  ShortUser,
  User,
  Company,
  PaymentCycle,
  GuruPlan,
  Address
} from "../types/profiles";
import { UserRole } from "../types/info";

export const emptyUser: ShortUser = {
  id: 0,
  firstName: "",
  lastName: "",
  otherNames: "",
  email: "",
  role: null,
  avatar: ""
};

export const anonymousRole: UserRole = {
  id: -1,
  name: "community",
  isCompanyAssociated: false,
  permissions: []
};

export const emptyCompany: Company = {
  id: -1,
  name: "",
  bio: "",
  adminUser: emptyUser,
  paymentCycle: PaymentCycle.Monthly,
  isAuto: true,
  plan: GuruPlan.Community,
  subscriptionStart: "2009-01-01",
  subscriptionEnd: "2050-12-31"
};

export const emptyAddress: Address = {
  id: -1,
  line1: "",
  line2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  createdOn: "",
  lastUpdate: ""
};

export const anonymousUser: User = {
  id: -1,
  firstName: "",
  lastName: "",
  otherNames: "",
  email: "",
  role: anonymousRole,
  avatar: "",
  company: emptyCompany,
  companyName: "",
  timezone: "UTC",
  address: emptyAddress,
  idpUuid: "",
  lastLogin: ""
};
