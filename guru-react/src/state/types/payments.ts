import { Address, Company } from "./profiles";

export enum PaymentCardBrand {
  Visa = "Visa",
  AmericanExpress = "American Express",
  MasterCard = "MasterCard",
  Discover = "Discover",
  Jcb = "JCB",
  DinersClub = "DinersClub"
}

export enum PaymentMethod {
  Card = "card"
}

export interface PaymentCard {
  id: number;
  brand: PaymentCardBrand;
  last4: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  billingAddress: Address;
  isPrimary: boolean;
  company: Company;
}

export interface PaymentInvoice {
  id: number;
  createdOn: string;
  dueDate: string;
  invoiceId: string;
  periodStart: string;
  periodEnd: string;
  reference: string;
  method: PaymentMethod;
  company: Company;
}

export interface PaymentReceipt {
  id: number;
  invoice: PaymentInvoice;
  amountPaid: number;
  paymentDate: string;
}
