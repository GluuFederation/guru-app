import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../actions/tickets";
import { ShortUser, ShortCompany } from "../../types/profiles";
import {
  TicketCategory,
  TicketIssueType,
  GluuProduct,
  TicketStatus
} from "../../types/info";
import {
  TicketFilterOrder,
  Ticket,
  Answer,
  TicketProduct,
  TicketHistoryItem
} from "../../types/tickets";
import { AppState } from "../../types/state";

const useTicketsActions = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);

  const addFilterCompany = (company: ShortCompany) =>
    dispatch(actions.addFilterCompany(company));
  const addFilterCreator = (creator: ShortUser) =>
    dispatch(actions.addFilterCreator(creator));
  const addFilterAssignee = (assignee: ShortUser) =>
    dispatch(actions.addFilterAssignee(assignee));
  const addFilterCategory = (category: TicketCategory) =>
    dispatch(actions.addFilterCategory(category));
  const addFilterIssueType = (issueType: TicketIssueType) =>
    dispatch(actions.addFilterIssueType(issueType));
  const addFilterProduct = (product: GluuProduct) =>
    dispatch(actions.addFilterProduct(product));
  const addFilterStatus = (status: TicketStatus) =>
    dispatch(actions.addFilterStatus(status));
  const removeFilterCompany = (companyId: number) =>
    dispatch(actions.removeFilterCompany(companyId));
  const removeFilterCreator = (creatorId: number) =>
    dispatch(actions.removeFilterCreator(creatorId));
  const removeFilterAssignee = (assigneeId: number) =>
    dispatch(actions.removeFilterAssignee(assigneeId));
  const removeFilterCategory = (categoryId: number) =>
    dispatch(actions.removeFilterCategory(categoryId));
  const removeFilterIssueType = (issueTypeId: number) =>
    dispatch(actions.removeFilterIssueType(issueTypeId));
  const removeFilterProduct = (productId: number) =>
    dispatch(actions.removeFilterProduct(productId));
  const removeFilterStatus = (statusId: number) =>
    dispatch(actions.removeFilterStatus(statusId));
  const setFilterStartDate = (startDate: string) =>
    dispatch(actions.setFilterStartDate(startDate));
  const setFilterEndDate = (endDate: string) =>
    dispatch(actions.setFilterEndDate(endDate));
  const setFilterQuery = (query: string) =>
    dispatch(actions.setFilterQuery(query));
  const setFilterOrder = (order: TicketFilterOrder) =>
    dispatch(actions.setFilterOrder(order));
  const setFilterPage = (page: number) => dispatch(actions.setFilterPage(page));
  const setFilterPageItems = (pageItems: number) =>
    dispatch(actions.setFilterPageItems(pageItems));
  const setFilterTotalCount = (totalCount: number) =>
    dispatch(actions.setFilterTotalCount(totalCount));
  const clearAllFilters = () => dispatch(actions.clearAllFilters());
  const clearTicket = () => dispatch(actions.clearTicket());
  const setTickets = (tickets: Array<Ticket>) =>
    dispatch(actions.setTickets(tickets));
  const setTicket = (ticket: Ticket) => dispatch(actions.setTicket(ticket));
  const setTicketAnswers = (answers: Array<Answer>) =>
    dispatch(actions.setTicketAnswers(answers));
  const addTicketAnswer = (answer: Answer) =>
    dispatch(actions.addTicketAnswer(answer));
  const removeTicketAnswer = (answer: Answer) =>
    dispatch(actions.removeTicketAnswer(answer));
  const addTicketProduct = (product: TicketProduct) =>
    dispatch(actions.addTicketProduct(product));
  const removeTicketProduct = (product: TicketProduct) =>
    dispatch(actions.removeTicketProduct(product));
  const setTicketHistory = (history: Array<TicketHistoryItem>) =>
    dispatch(actions.setTicketHistory(history));
  const setTicketListItemAssignee = (ticketSlug: string, assignee: ShortUser) =>
    dispatch(actions.setTicketListItemAssignee(ticketSlug, assignee));
  const resetTicketsState = () => dispatch(actions.resetTicketsState());
  const fetchTickets = (routeToParams?: boolean) =>
    actions.fetchTickets(routeToParams)(dispatch, () => state, undefined);
  const fetchTicket = (ticketSlug: string) =>
    actions.fetchTicket(ticketSlug)(dispatch);
  const changeTicketVote = (ticketSlug: string, vote: boolean) =>
    actions.changeTicketVote(ticketSlug, vote)(dispatch);
  const setTicketAssignee = (
    ticketSlug: string,
    assignee: number,
    fromList?: boolean
  ) => actions.setTicketAssignee(ticketSlug, assignee, fromList)(dispatch);
  const setTicketCreator = (ticketSlug: string, creator: number) =>
    actions.setTicketCreator(ticketSlug, creator)(dispatch);
  const updateTicket = (ticket: Ticket) =>
    actions.updateTicket(ticket)(dispatch);
  const uploadTicketFiles = (ticketSlug: string, data: FormData) =>
    actions.uploadTicketFiles(ticketSlug, data)(dispatch);
  const changeTicketSubscription = (ticketSlug: string, subscribe: boolean) =>
    actions.changeTicketSubscription(ticketSlug, subscribe)(dispatch);
  const createTicketAnswer = (ticketSlug: string, body: string) =>
    actions.createTicketAnswer(ticketSlug, body)(dispatch);
  const updateTicketAnswer = (ticketSlug: string, answer: Answer) =>
    actions.updateTicketAnswer(ticketSlug, answer)(dispatch);
  const uploadAnswerFiles = (
    ticketSlug: string,
    answer: Answer,
    data: FormData
  ) => actions.uploadAnswerFiles(ticketSlug, answer, data)(dispatch);
  const deleteTicketAnswer = (ticketSlug: string, answer: Answer) =>
    actions.deleteTicketAnswer(ticketSlug, answer)(dispatch);
  const createTicketProduct = (ticketSlug: string, product: TicketProduct) =>
    actions.createTicketProduct(ticketSlug, product)(dispatch);
  const updateTicketProduct = (ticketSlug: string, product: TicketProduct) =>
    actions.updateTicketProduct(ticketSlug, product)(dispatch);
  const deleteTicketProduct = (ticketSlug: string, product: TicketProduct) =>
    actions.deleteTicketProduct(ticketSlug, product)(dispatch);
  const deleteTicket = (ticketSlug: string) =>
    actions.deleteTicket(ticketSlug)(dispatch);
  return {
    addFilterCompany,
    addFilterCreator,
    addFilterAssignee,
    addFilterCategory,
    addFilterIssueType,
    addFilterProduct,
    addFilterStatus,
    removeFilterCompany,
    removeFilterCreator,
    removeFilterAssignee,
    removeFilterCategory,
    removeFilterIssueType,
    removeFilterProduct,
    removeFilterStatus,
    setFilterStartDate,
    setFilterEndDate,
    setFilterQuery,
    setFilterOrder,
    setFilterPage,
    setFilterPageItems,
    setFilterTotalCount,
    clearAllFilters,
    clearTicket,
    setTickets,
    setTicket,
    setTicketAnswers,
    addTicketAnswer,
    removeTicketAnswer,
    addTicketProduct,
    removeTicketProduct,
    setTicketHistory,
    setTicketListItemAssignee,
    resetTicketsState,
    fetchTickets,
    fetchTicket,
    changeTicketVote,
    setTicketAssignee,
    setTicketCreator,
    updateTicket,
    uploadTicketFiles,
    changeTicketSubscription,
    createTicketAnswer,
    updateTicketAnswer,
    uploadAnswerFiles,
    deleteTicketAnswer,
    createTicketProduct,
    updateTicketProduct,
    deleteTicketProduct,
    deleteTicket
  };
};

export default useTicketsActions;
