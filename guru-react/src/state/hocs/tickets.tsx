import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { AppState, TicketsFilterState } from "../types/state";
import {
  Ticket,
  TicketFilterOrder,
  TicketHistory,
  Answer
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
  updateTicket,
  changeTicketSubscription,
  createTicketAnswer,
  deleteTicketAnswer,
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
  ticketHistory: Array<TicketHistory>;
  answers: Array<Answer>;
}

export interface WithTicketDetailDispatch {
  fetchTicket: (ticketId: number) => Promise<Ticket>;
  changeTicketVote: (ticketId: number, vote: boolean) => Promise<Ticket>;
  setTicketAssignee: (ticketId: number, assignee: ShortUser) => Promise<Ticket>;
  updateTicket: (ticket: Ticket) => Promise<Ticket>;
  changeTicketSubscription: (
    ticketId: number,
    subscribe: boolean
  ) => Promise<Ticket>;
  createTicketAnswer: (ticketSlug: string, body: string) => Promise<Answer>;
  deleteTicketAnswer: (ticketSlug: string, answer: Answer) => Promise<Answer>;
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
      fetchTicket: (ticketId: number) => dispatch(fetchTicket(ticketId)),
      changeTicketVote: (ticketId: number, vote: boolean) =>
        dispatch(changeTicketVote(ticketId, vote)),
      setTicketAssignee: (ticketId: number, assignee: ShortUser) =>
        dispatch(setTicketAssignee(ticketId, assignee)),
      updateTicket: (ticket: Ticket) => dispatch(updateTicket(ticket)),
      changeTicketSubscription: (ticketId: number, subscribe: boolean) =>
        dispatch(changeTicketSubscription(ticketId, subscribe)),
      createTicketAnswer: (ticketSlug: string, body: string) =>
        dispatch(createTicketAnswer(ticketSlug, body)),
      deleteTicketAnswer: (ticketSlug: string, answer: Answer) =>
        dispatch(deleteTicketAnswer(ticketSlug, answer)),
      deleteTicket: (ticketSlug: string) => dispatch(deleteTicket(ticketSlug))
    })
  )(WithInfo);
};
