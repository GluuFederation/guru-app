import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import actions from "./constants";
import { Company, ShortUser } from "../types/profiles";
import { TicketIssueType, TicketCategory } from "../types/info";
import { TicketProduct, Ticket } from "../types/tickets";
import { CreateTicketState } from "../types/state";

export interface SetTicketCompanyAction {
  type: string;
  companyAssociation: Company;
}

export interface SetTicketCreatorAction {
  type: string;
  creator: ShortUser;
}

export interface SetTicketIssueTypeAction {
  type: string;
  issueType: TicketIssueType;
}

export interface SetTicketCategoryAction {
  type: string;
  category: TicketCategory;
}

export interface SetTicketGluuServerAction {
  type: string;
  gluuServer: string;
}

export interface SetTicketOsAction {
  type: string;
  os: string;
}

export interface SetTicketOsVersionAction {
  type: string;
  osVersion: string;
}

export interface SetTicketHasProductsAction {
  type: string;
  hasProducts: boolean;
}

export interface AddTicketProductAction {
  type: string;
  product: TicketProduct;
}

export interface RemoveTicketProductAction {
  type: string;
  product: TicketProduct;
}

export interface SetTicketTitleAction {
  type: string;
  title: string;
}

export interface SetTicketBodyAction {
  type: string;
  body: string;
}

export interface SetTicketPrivacyAction {
  type: string;
  isPrivate: boolean;
}

export interface ClearTicketEntryAction {
  type: string;
}

export type CreateTicketAction =
  | SetTicketCompanyAction
  | SetTicketCreatorAction
  | SetTicketIssueTypeAction
  | SetTicketCategoryAction
  | SetTicketGluuServerAction
  | SetTicketOsAction
  | SetTicketOsVersionAction
  | SetTicketHasProductsAction
  | AddTicketProductAction
  | RemoveTicketProductAction
  | SetTicketTitleAction
  | SetTicketBodyAction
  | SetTicketPrivacyAction
  | ClearTicketEntryAction;

export const setTicketCompany = (
  companyAssociation: Company
): SetTicketCompanyAction => ({
  type: actions.SET_TICKET_CREATE_COMPANY,
  companyAssociation
});

export const setTicketCreator = (
  creator: ShortUser
): SetTicketCreatorAction => ({
  type: actions.SET_TICKET_CREATE_CREATOR,
  creator
});

export const setTicketIssueType = (
  issueType: TicketIssueType
): SetTicketIssueTypeAction => ({
  type: actions.SET_TICKET_CREATE_ISSUE_TYPE,
  issueType
});

export const setTicketCategory = (
  category: TicketCategory
): SetTicketCategoryAction => ({
  type: actions.SET_TICKET_CREATE_CATEGORY,
  category
});

export const setTicketGluuServer = (
  gluuServer: string
): SetTicketGluuServerAction => ({
  type: actions.SET_TICKET_CREATE_GLUU_SERVER,
  gluuServer
});

export const setTicketOs = (os: string): SetTicketOsAction => ({
  type: actions.SET_TICKET_CREATE_OS,
  os
});

export const setTicketOsVersion = (
  osVersion: string
): SetTicketOsVersionAction => ({
  type: actions.SET_TICKET_CREATE_OS_VERSION,
  osVersion
});

export const setTicketHasProducts = (
  hasProducts: boolean
): SetTicketHasProductsAction => ({
  type: actions.SET_TICKET_CREATE_HAS_PRODUCTS,
  hasProducts
});

export const addTicketProduct = (
  product: TicketProduct
): AddTicketProductAction => ({
  type: actions.ADD_TICKET_CREATE_PRODUCT,
  product
});

export const removeTicketProduct = (
  product: TicketProduct
): RemoveTicketProductAction => ({
  type: actions.REMOVE_TICKET_CREATE_PRODUCT,
  product
});

export const setTicketTitle = (title: string): SetTicketTitleAction => ({
  type: actions.SET_TICKET_CREATE_TITLE,
  title
});

export const setTicketBody = (body: string): SetTicketBodyAction => ({
  type: actions.SET_TICKET_CREATE_BODY,
  body
});

export const setTicketPrivacy = (
  isPrivate: boolean
): SetTicketPrivacyAction => ({
  type: actions.SET_TICKET_CREATE_PRIVACY,
  isPrivate
});

export const clearTicketEntry = (): ClearTicketEntryAction => ({
  type: actions.CLEAR_TICKET_ENTRY
});

export const createTicket = (ticket: CreateTicketState) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/`;
    const data = { ticket: { ...ticket, createdFor: ticket.creator } };
    return axios.post(URL, { ...data }).then(response => {
      const results = response.data.results;
      return Promise.resolve(results);
    });
  };
};
