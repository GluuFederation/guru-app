import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { AppState, TicketsFilterState } from "../types/state";
import {
  Ticket,
  TicketFilterOrder,
  TicketHistoryItem,
  Answer,
  TicketProduct
} from "../types/tickets";
import { Company, ShortUser } from "../types/profiles";
import {
  addFilterCompany,
  AddFilterCompanyAction,
  AddFilterCreatorAction,
  AddFilterAssigneeAction,
  AddFilterIssueTypeAction,
  AddFilterProductAction,
  AddFilterStatusAction,
  AddFilterCategoryAction,
  RemoveFilterCompanyAction,
  RemoveFilterCreatorAction,
  RemoveFilterAssigneeAction,
  RemoveFilterIssueTypeAction,
  RemoveFilterProductAction,
  RemoveFilterStatusAction,
  RemoveFilterCategoryAction,
  SetFilterStartDateAction,
  SetFilterEndDateAction,
  SetFilterQueryAction,
  SetFilterOrderAction,
  SetFilterPageAction,
  SetFilterPageItemsAction,
  SetFilterTotalCountAction,
  ClearAllFiltersAction,
  addFilterCreator,
  addFilterAssignee,
  addFilterIssueType,
  addFilterProduct,
  addFilterCategory,
  addFilterStatus,
  removeFilterCompany,
  removeFilterCreator,
  removeFilterAssignee,
  removeFilterIssueType,
  removeFilterProduct,
  removeFilterCategory,
  removeFilterStatus,
  setFilterEndDate,
  setFilterStartDate,
  setFilterQuery,
  setFilterOrder,
  setFilterPage,
  setFilterPageItems,
  setFilterTotalCount,
  clearAllFilters,
  fetchTickets,
  fetchTicket,
  changeTicketVote,
  setTicketAssignee,
  setTicketCreator,
  updateTicket,
  changeTicketSubscription,
  createTicketAnswer,
  updateTicketAnswer,
  deleteTicketAnswer,
  createTicketProduct,
  updateTicketProduct,
  deleteTicketProduct,
  deleteTicket
} from "../actions/tickets";
import {
  TicketIssueType,
  TicketStatus,
  TicketCategory,
  GluuProduct
} from "../types/info";

export interface WithTicketListState {
  tickets: Array<Ticket>;
  filters: TicketsFilterState;
}

export interface WithTicketsListDispatch {
  addFilterCompany: (company: Company) => AddFilterCompanyAction;
  addFilterCreator: (creator: ShortUser) => AddFilterCreatorAction;
  addFilterAssignee: (assignee: ShortUser) => AddFilterAssigneeAction;
  addFilterIssueType: (issueType: TicketIssueType) => AddFilterIssueTypeAction;
  addFilterProduct: (product: GluuProduct) => AddFilterProductAction;
  addFilterStatus: (status: TicketStatus) => AddFilterStatusAction;
  addFilterCategory: (category: TicketCategory) => AddFilterCategoryAction;
  removeFilterCompany: (companyId: number) => RemoveFilterCompanyAction;
  removeFilterCreator: (creatorId: number) => RemoveFilterCreatorAction;
  removeFilterAssignee: (assigneeId: number) => RemoveFilterAssigneeAction;
  removeFilterIssueType: (issueTypeId: number) => RemoveFilterIssueTypeAction;
  removeFilterProduct: (productId: number) => RemoveFilterProductAction;
  removeFilterStatus: (statusId: number) => RemoveFilterStatusAction;
  removeFilterCategory: (categoryId: number) => RemoveFilterCategoryAction;
  setFilterStartDate: (startDate: string) => SetFilterStartDateAction;
  setFilterEndDate: (endDate: string) => SetFilterEndDateAction;
  setFilterQuery: (query: string) => SetFilterQueryAction;
  setFilterOrder: (order: TicketFilterOrder) => SetFilterOrderAction;
  setFilterPage: (page: number) => SetFilterPageAction;
  setFilterPageItems: (pageItems: number) => SetFilterPageItemsAction;
  setFilterTotalCount: (totalCount: number) => SetFilterTotalCountAction;
  clearAllFilters: () => ClearAllFiltersAction;
  fetchTickets: (routeToParams?: boolean) => Promise<Array<Ticket>>;
}

export interface WithTicketDetailState {
  ticket: Ticket | null;
  ticketHistory: Array<TicketHistoryItem>;
  answers: Array<Answer>;
}

export interface WithTicketDetailDispatch {
  fetchTicket: (ticketSlug: string) => Promise<Ticket>;
  changeTicketVote: (ticketSlug: string, vote: boolean) => Promise<Ticket>;
  setTicketAssignee: (ticketSlug: string, assignee: number) => Promise<Ticket>;
  setTicketCreator: (ticketSlug: string, creator: number) => Promise<Ticket>;
  updateTicket: (ticket: Ticket) => Promise<Ticket>;
  changeTicketSubscription: (
    ticketSlug: string,
    subscribe: boolean
  ) => Promise<Ticket>;
  createTicketAnswer: (ticketSlug: string, body: string) => Promise<Answer>;
  updateTicketAnswer: (ticketSlug: string, answer: Answer) => Promise<Answer>;
  deleteTicketAnswer: (ticketSlug: string, answer: Answer) => Promise<Answer>;
  createTicketProduct: (
    ticketSlug: string,
    product: TicketProduct
  ) => Promise<TicketProduct>;
  updateTicketProduct: (
    ticketSlug: string,
    product: TicketProduct
  ) => Promise<TicketProduct>;
  deleteTicketProduct: (
    ticketSlug: string,
    product: TicketProduct
  ) => Promise<TicketProduct>;
  deleteTicket: (ticketSlug: string) => Promise<boolean>;
}

export type WithTicketListProps = WithTicketListState & WithTicketsListDispatch;

export type WithTicketDetailProps = WithTicketDetailState &
  WithTicketDetailDispatch;

export const withTicketList = <P extends WithTicketListProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithInfo extends Component<WithTicketListProps> {
    render() {
      return <WrappedComponent {...this.props as P} />;
    }
  }

  return connect<WithTicketListState, WithTicketsListDispatch, any, any>(
    (state: AppState) => ({
      tickets: state.tickets.tickets,
      filters: state.tickets.filters
    }),
    (dispatch: ThunkDispatch<any, AppState, AnyAction>) => ({
      addFilterCompany: (company: Company) =>
        dispatch(addFilterCompany(company)),
      addFilterCreator: (creator: ShortUser) =>
        dispatch(addFilterCreator(creator)),
      addFilterAssignee: (assignee: ShortUser) =>
        dispatch(addFilterAssignee(assignee)),
      addFilterIssueType: (issueType: TicketIssueType) =>
        dispatch(addFilterIssueType(issueType)),
      addFilterProduct: (product: GluuProduct) =>
        dispatch(addFilterProduct(product)),
      addFilterCategory: (category: TicketCategory) =>
        dispatch(addFilterCategory(category)),
      addFilterStatus: (status: TicketStatus) =>
        dispatch(addFilterStatus(status)),
      removeFilterCompany: (companyId: number) =>
        dispatch(removeFilterCompany(companyId)),
      removeFilterCreator: (creatorId: number) =>
        dispatch(removeFilterCreator(creatorId)),
      removeFilterAssignee: (assigneeId: number) =>
        dispatch(removeFilterAssignee(assigneeId)),
      removeFilterIssueType: (issueTypeId: number) =>
        dispatch(removeFilterIssueType(issueTypeId)),
      removeFilterProduct: (productId: number) =>
        dispatch(removeFilterProduct(productId)),
      removeFilterCategory: (categoryId: number) =>
        dispatch(removeFilterCategory(categoryId)),
      removeFilterStatus: (statusId: number) =>
        dispatch(removeFilterStatus(statusId)),
      setFilterEndDate: (endDate: string) =>
        dispatch(setFilterEndDate(endDate)),
      setFilterStartDate: (startDate: string) =>
        dispatch(setFilterStartDate(startDate)),
      setFilterQuery: (query: string) => dispatch(setFilterQuery(query)),
      setFilterOrder: (order: TicketFilterOrder) =>
        dispatch(setFilterOrder(order)),
      setFilterPage: (page: number) => dispatch(setFilterPage(page)),
      setFilterPageItems: (pageItems: number) =>
        dispatch(setFilterPageItems(pageItems)),
      setFilterTotalCount: (totalCount: number) =>
        dispatch(setFilterTotalCount(totalCount)),
      clearAllFilters: () => dispatch(clearAllFilters()),
      fetchTickets: (routeToParams?: boolean) =>
        dispatch(fetchTickets(routeToParams))
    })
  )(WithInfo);
};

export const withTicketDetail = <P extends WithTicketDetailProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithInfo extends Component<WithTicketDetailProps> {
    render() {
      return <WrappedComponent {...this.props as P} />;
    }
  }

  return connect<WithTicketDetailState, WithTicketDetailDispatch, any, any>(
    (state: AppState) => ({
      ticket: state.tickets.ticketDetail.ticket,
      ticketHistory: state.tickets.ticketDetail.ticketHistory,
      answers: state.tickets.ticketDetail.answers
    }),
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
      fetchTicket: (ticketSlug: string) => dispatch(fetchTicket(ticketSlug)),
      changeTicketVote: (ticketSlug: string, vote: boolean) =>
        dispatch(changeTicketVote(ticketSlug, vote)),
      setTicketAssignee: (ticketSlug: string, assignee: number) =>
        dispatch(setTicketAssignee(ticketSlug, assignee)),
      setTicketCreator: (ticketSlug: string, creator: number) =>
        dispatch(setTicketCreator(ticketSlug, creator)),
      updateTicket: (ticket: Ticket) => dispatch(updateTicket(ticket)),
      changeTicketSubscription: (ticketSlug: string, subscribe: boolean) =>
        dispatch(changeTicketSubscription(ticketSlug, subscribe)),
      createTicketAnswer: (ticketSlug: string, body: string) =>
        dispatch(createTicketAnswer(ticketSlug, body)),
      deleteTicketAnswer: (ticketSlug: string, answer: Answer) =>
        dispatch(deleteTicketAnswer(ticketSlug, answer)),
      updateTicketAnswer: (ticketSlug: string, answer: Answer) =>
        dispatch(updateTicketAnswer(ticketSlug, answer)),
      createTicketProduct: (ticketSlug: string, product: TicketProduct) =>
        dispatch(createTicketProduct(ticketSlug, product)),
      deleteTicketProduct: (ticketSlug: string, product: TicketProduct) =>
        dispatch(deleteTicketProduct(ticketSlug, product)),
      updateTicketProduct: (ticketSlug: string, product: TicketProduct) =>
        dispatch(updateTicketProduct(ticketSlug, product)),
      deleteTicket: (ticketSlug: string) => dispatch(deleteTicket(ticketSlug))
    })
  )(WithInfo);
};
