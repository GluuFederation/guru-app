import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { CreateTicketState, AppState } from "../types/state";
import {
  TeamMember,
  Company,
  User,
  ShortUser,
  ShortCompany
} from "../types/profiles";
import {
  SetTicketCompanyAction,
  SetTicketBodyAction,
  SetTicketCreatorAction,
  SetTicketIssueTypeAction,
  SetTicketCategoryAction,
  SetTicketGluuServerAction,
  SetTicketOsAction,
  SetTicketOsVersionAction,
  SetTicketHasProductsAction,
  AddTicketProductAction,
  RemoveTicketProductAction,
  SetTicketTitleAction,
  SetTicketPrivacyAction,
  ClearTicketEntryAction,
  SetTicketStepAction,
  UpdateNewTicketAction,
  updateNewTicket,
  setTicketStep,
  setTicketCompany,
  setTicketBody,
  setTicketCreator,
  setTicketIssueType,
  setTicketCategory,
  setTicketGluuServer,
  setTicketOs,
  setTicketOsVersion,
  setTicketHasProducts,
  addTicketProduct,
  removeTicketProduct,
  setTicketTitle,
  setTicketPrivacy,
  createTicket,
  clearTicketEntry
} from "../actions/ticket";
import { TicketIssueType, TicketCategory } from "../types/info";
import { TicketProduct, Ticket } from "../types/tickets";

export interface WithCreateTicketState {
  newTicket: CreateTicketState;
}

export interface WithCreateTicketDispatch {
  setCreateTicketStep: (step: number) => SetTicketStepAction;
  setCreateTicketCompany: (
    companyAssociation: ShortCompany
  ) => SetTicketCompanyAction;
  setCreateTicketCreator: (creator: ShortUser) => SetTicketCreatorAction;
  setCreateTicketIssueType: (issueType: number) => SetTicketIssueTypeAction;
  setCreateTicketCategory: (category: number) => SetTicketCategoryAction;
  setCreateTicketGluuServer: (gluuServer: string) => SetTicketGluuServerAction;
  setCreateTicketOs: (os: string) => SetTicketOsAction;
  setCreateTicketOsVersion: (osVersion: string) => SetTicketOsVersionAction;
  setCreateTicketHasProducts: (
    hasProducts: boolean
  ) => SetTicketHasProductsAction;
  addCreateTicketProduct: (product: TicketProduct) => AddTicketProductAction;
  removeCreateTicketProduct: (
    product: TicketProduct
  ) => RemoveTicketProductAction;
  setCreateTicketTitle: (title: string) => SetTicketTitleAction;
  setCreateTicketBody: (body: string) => SetTicketBodyAction;
  setCreateTicketPrivacy: (isPrivate: boolean) => SetTicketPrivacyAction;
  clearTicketEntry: () => ClearTicketEntryAction;
  createTicket: (ticket: CreateTicketState) => Promise<Ticket>;
  updateNewTicket: (ticket: CreateTicketState) => UpdateNewTicketAction;
}

export type WithCreateTicketProps = WithCreateTicketState &
  WithCreateTicketDispatch;

export const withCreateTicket = <P extends WithCreateTicketProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithCreateTicket extends Component<WithCreateTicketProps> {
    render() {
      return <WrappedComponent {...(this.props as P)} />;
    }
  }

  return connect<WithCreateTicketState, WithCreateTicketDispatch, any, any>(
    (state: AppState) => ({
      newTicket: state.ticket
    }),
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
      setCreateTicketCompany: (companyAssociation: ShortCompany) =>
        dispatch(setTicketCompany(companyAssociation)),
      setCreateTicketStep: (step: number) => dispatch(setTicketStep(step)),
      setCreateTicketCreator: (creator: ShortUser) =>
        dispatch(setTicketCreator(creator)),
      setCreateTicketIssueType: (issueType: number) =>
        dispatch(setTicketIssueType(issueType)),
      setCreateTicketCategory: (category: number) =>
        dispatch(setTicketCategory(category)),
      setCreateTicketGluuServer: (gluuServer: string) =>
        dispatch(setTicketGluuServer(gluuServer)),
      setCreateTicketOs: (os: string) => dispatch(setTicketOs(os)),
      setCreateTicketOsVersion: (osVersion: string) =>
        dispatch(setTicketOsVersion(osVersion)),
      setCreateTicketHasProducts: (hasProducts: boolean) =>
        dispatch(setTicketHasProducts(hasProducts)),
      addCreateTicketProduct: (product: TicketProduct) =>
        dispatch(addTicketProduct(product)),
      removeCreateTicketProduct: (product: TicketProduct) =>
        dispatch(removeTicketProduct(product)),
      setCreateTicketTitle: (title: string) => dispatch(setTicketTitle(title)),
      setCreateTicketBody: (body: string) => dispatch(setTicketBody(body)),
      setCreateTicketPrivacy: (isPrivate: boolean) =>
        dispatch(setTicketPrivacy(isPrivate)),
      clearTicketEntry: () => dispatch(clearTicketEntry()),
      createTicket: (ticket: CreateTicketState) =>
        dispatch(createTicket(ticket)),
      updateNewTicket: (ticket: CreateTicketState) =>
        dispatch(updateNewTicket(ticket))
    })
  )(WithCreateTicket);
};
