import axios from "axios";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { push } from "connected-react-router";

import { paths } from "../../routes";
import { getSearchString } from "../../utils/filterQueries";
import { Company, ShortUser } from "../types/profiles";
import {
  TicketCategory,
  GluuProduct,
  TicketIssueType,
  TicketStatus
} from "../types/info";
import {
  TicketFilterOrder,
  Ticket,
  Answer,
  TicketHistoryItem,
  TicketProduct
} from "../types/tickets";
import actions from "./constants";
import { AppState } from "../types/state";

export interface AddFilterCompanyAction {
  type: string;
  company: Company;
}

export interface AddFilterCreatorAction {
  type: string;
  creator: ShortUser;
}

export interface AddFilterAssigneeAction {
  type: string;
  assignee: ShortUser;
}

export interface AddFilterCategoryAction {
  type: string;
  category: TicketCategory;
}

export interface AddFilterProductAction {
  type: string;
  product: GluuProduct;
}

export interface AddFilterIssueTypeAction {
  type: string;
  issueType: TicketIssueType;
}

export interface AddFilterStatusAction {
  type: string;
  status: TicketStatus;
}

export interface RemoveFilterCompanyAction {
  type: string;
  companyId: number;
}

export interface RemoveFilterCreatorAction {
  type: string;
  creatorId: number;
}

export interface RemoveFilterAssigneeAction {
  type: string;
  assigneeId: number;
}

export interface RemoveFilterCategoryAction {
  type: string;
  categoryId: number;
}

export interface RemoveFilterProductAction {
  type: string;
  productId: number;
}

export interface RemoveFilterIssueTypeAction {
  type: string;
  issueTypeId: number;
}

export interface RemoveFilterStatusAction {
  type: string;
  statusId: number;
}

export interface SetFilterStartDateAction {
  type: string;
  startDate: string;
}

export interface SetFilterEndDateAction {
  type: string;
  endDate: string;
}

export interface SetFilterQueryAction {
  type: string;
  query: string;
}

export interface SetFilterOrderAction {
  type: string;
  order: TicketFilterOrder;
}

export interface SetFilterPageAction {
  type: string;
  page: number;
}

export interface SetFilterPageItemsAction {
  type: string;
  pageItems: number;
}

export interface SetFilterTotalCountAction {
  type: string;
  totalCount: number;
}

export interface ClearAllFiltersAction {
  type: string;
}

export interface SetTicketsAction {
  type: string;
  tickets: Array<Ticket>;
}

export interface SetTicketAction {
  type: string;
  ticket: Ticket;
}

export interface ClearTicketAction {
  type: string;
}

export interface SetTicketAnswersAction {
  type: string;
  answers: Array<Answer>;
}

export interface AddTicketAnswerAction {
  type: string;
  answer: Answer;
}

export interface RemoveTicketAnswerAction {
  type: string;
  answer: Answer;
}

export interface AddTicketProductAction {
  type: string;
  product: TicketProduct;
}

export interface RemoveTicketProductAction {
  type: string;
  product: TicketProduct;
}

export interface SetTicketHistoryAction {
  type: string;
  history: Array<TicketHistoryItem>;
}

export interface ResetTicketsStateAction {
  type: string;
}

export type TicketsAction =
  | AddFilterCompanyAction
  | AddFilterAssigneeAction
  | AddFilterCreatorAction
  | AddFilterCategoryAction
  | AddFilterIssueTypeAction
  | AddFilterProductAction
  | AddFilterStatusAction
  | RemoveFilterCompanyAction
  | RemoveFilterAssigneeAction
  | RemoveFilterCreatorAction
  | RemoveFilterCategoryAction
  | RemoveFilterIssueTypeAction
  | RemoveFilterProductAction
  | RemoveFilterStatusAction
  | SetFilterEndDateAction
  | SetFilterStartDateAction
  | SetFilterQueryAction
  | SetFilterOrderAction
  | SetFilterPageAction
  | SetFilterTotalCountAction
  | SetFilterPageItemsAction
  | ClearAllFiltersAction
  | SetTicketsAction
  | SetTicketAction
  | ClearTicketAction
  | SetTicketAnswersAction
  | AddTicketAnswerAction
  | RemoveTicketAnswerAction
  | AddTicketProductAction
  | RemoveTicketProductAction
  | SetTicketHistoryAction
  | ResetTicketsStateAction;

export const addFilterCompany = (company: Company): AddFilterCompanyAction => ({
  type: actions.ADD_FILTER_COMPANY,
  company
});

export const addFilterCreator = (
  creator: ShortUser
): AddFilterCreatorAction => ({
  type: actions.ADD_FILTER_CREATOR,
  creator
});

export const addFilterAssignee = (
  assignee: ShortUser
): AddFilterAssigneeAction => ({
  type: actions.ADD_FILTER_ASSIGNEE,
  assignee
});

export const addFilterCategory = (
  category: TicketCategory
): AddFilterCategoryAction => ({
  type: actions.ADD_FILTER_CATEGORY,
  category
});

export const addFilterIssueType = (
  issueType: TicketIssueType
): AddFilterIssueTypeAction => ({
  type: actions.ADD_FILTER_ISSUE_TYPE,
  issueType
});

export const addFilterProduct = (
  product: GluuProduct
): AddFilterProductAction => ({
  type: actions.ADD_FILTER_PRODUCT,
  product
});

export const addFilterStatus = (
  status: TicketStatus
): AddFilterStatusAction => ({
  type: actions.ADD_FILTER_STATUS,
  status
});

export const removeFilterCompany = (
  companyId: number
): RemoveFilterCompanyAction => ({
  type: actions.REMOVE_FILTER_COMPANY,
  companyId
});

export const removeFilterCreator = (
  creatorId: number
): RemoveFilterCreatorAction => ({
  type: actions.REMOVE_FILTER_CREATOR,
  creatorId
});

export const removeFilterAssignee = (
  assigneeId: number
): RemoveFilterAssigneeAction => ({
  type: actions.REMOVE_FILTER_ASSIGNEE,
  assigneeId
});

export const removeFilterCategory = (
  categoryId: number
): RemoveFilterCategoryAction => ({
  type: actions.REMOVE_FILTER_CATEGORY,
  categoryId
});

export const removeFilterIssueType = (
  issueTypeId: number
): RemoveFilterIssueTypeAction => ({
  type: actions.REMOVE_FILTER_ISSUE_TYPE,
  issueTypeId
});

export const removeFilterProduct = (
  productId: number
): RemoveFilterProductAction => ({
  type: actions.REMOVE_FILTER_PRODUCT,
  productId
});

export const removeFilterStatus = (
  statusId: number
): RemoveFilterStatusAction => ({
  type: actions.REMOVE_FILTER_STATUS,
  statusId
});

export const setFilterStartDate = (
  startDate: string
): SetFilterStartDateAction => ({
  type: actions.SET_FILTER_START_DATE,
  startDate
});

export const setFilterEndDate = (endDate: string): SetFilterEndDateAction => ({
  type: actions.SET_FILTER_END_DATE,
  endDate
});

export const setFilterQuery = (query: string): SetFilterQueryAction => ({
  type: actions.SET_FILTER_QUERY,
  query
});

export const setFilterOrder = (
  order: TicketFilterOrder
): SetFilterOrderAction => ({
  type: actions.SET_FILTER_ORDER,
  order
});

export const setFilterPage = (page: number): SetFilterPageAction => ({
  type: actions.SET_FILTER_PAGE,
  page
});

export const setFilterPageItems = (
  pageItems: number
): SetFilterPageItemsAction => ({
  type: actions.SET_FILTER_PAGE_ITEMS,
  pageItems
});

export const setFilterTotalCount = (
  totalCount: number
): SetFilterTotalCountAction => ({
  type: actions.SET_FILTER_TOTAL_COUNT,
  totalCount
});

export const clearAllFilters = (): ClearAllFiltersAction => ({
  type: actions.CLEAR_ALL_FILTERS
});

export const setTickets = (tickets: Array<Ticket>): SetTicketsAction => ({
  type: actions.SET_TICKETS,
  tickets
});

export const setTicket = (ticket: Ticket): SetTicketAction => ({
  type: actions.SET_TICKET,
  ticket
});

export const clearTicket = (): ClearTicketAction => ({
  type: actions.CLEAR_TICKET
});

export const setTicketAnswers = (
  answers: Array<Answer>
): SetTicketAnswersAction => ({
  type: actions.SET_TICKET_ANSWERS,
  answers
});

export const addTicketAnswer = (answer: Answer): AddTicketAnswerAction => ({
  type: actions.ADD_TICKET_ANSWER,
  answer
});

export const removeTicketAnswer = (
  answer: Answer
): RemoveTicketAnswerAction => ({
  type: actions.REMOVE_TICKET_ANSWER,
  answer
});

export const addTicketProduct = (
  product: TicketProduct
): AddTicketProductAction => ({
  type: actions.ADD_TICKET_PRODUCT,
  product
});

export const removeTicketProduct = (
  product: TicketProduct
): RemoveTicketProductAction => ({
  type: actions.REMOVE_TICKET_PRODUCT,
  product
});

export const setTicketHistory = (
  history: Array<TicketHistoryItem>
): SetTicketHistoryAction => ({
  type: actions.SET_TICKET_HISTORY,
  history
});

export const resetTicketsState = (): ResetTicketsStateAction => ({
  type: actions.RESET_TICKETS_STATE
});

export const fetchTickets = (
  routeToParams?: boolean
): ThunkAction<any, AppState, any, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ): Promise<Array<Ticket>> => {
    const { filters } = getState().tickets;
    let params: any = {};

    if (filters.companies.length)
      params.companies = filters.companies.map(item => item.id).join();
    if (filters.creators.length)
      params.authors = filters.creators.map(item => item.id).join();
    if (filters.assignees.length)
      params.assignees = filters.assignees.map(item => item.id).join();
    if (filters.categories.length)
      params.categories = filters.categories.map(item => item.id).join();
    if (filters.products.length)
      params.products = filters.products.map(item => item.id).join();
    if (filters.issueTypes.length)
      params.types = filters.issueTypes.map(item => item.id).join();
    if (filters.statuses.length)
      params.statuses = filters.statuses.map(item => item.id).join();
    if (filters.query) params.q = filters.query;
    if (filters.startDate) params.start = filters.startDate;
    if (filters.endDate) params.start = filters.endDate;

    params.offset = (filters.page - 1) * filters.pageItems;
    params.limit = filters.pageItems;
    params.ordering = filters.order;

    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/`;
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      const count = response.data.count;
      dispatch(setTickets(results));
      dispatch(setFilterTotalCount(count));
      if (routeToParams) {
        dispatch(push(`${paths.TICKET_LIST}${getSearchString(filters)}`));
      }
      return Promise.resolve(results);
    });
  };
};

export const fetchTicket = (ticketSlug: string) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const ticketUrl = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/`;
    const answersUrl = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/answers/`;
    const historyUrl = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/history/`;

    return Promise.all([
      axios.get(ticketUrl),
      axios.get(answersUrl),
      axios.get(historyUrl)
    ])
      .then(responses => {
        const ticketResults = responses[0].data.results;
        const answersResults = responses[1].data.results;
        const historyResults = responses[2].data.results;

        dispatch(setTicket(ticketResults));
        dispatch(setTicketAnswers(answersResults));
        dispatch(setTicketHistory(historyResults));

        return Promise.resolve(ticketResults);
      })
      .catch(error => {
        if (error && error.response && error.response.status === 404) {
          dispatch(clearTicket());
          dispatch(setTicketAnswers([]));
          dispatch(setTicketHistory([]));
        }
      });
  };
};

export const changeTicketVote = (ticketSlug: string, vote: boolean) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/vote/`;
    return axios.post(URL, { vote }).then(response => {
      const results = response.data.results;
      dispatch(setTicket(results));
      return Promise.resolve(results);
    });
  };
};

export const setTicketAssignee = (ticketSlug: string, assignee: number) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/assign/`;
    const data = { ticket: { assignee } };
    return axios.post(URL, { ...data }).then(response => {
      const results = response.data.results;
      dispatch(setTicket(results));
      return Promise.resolve(results);
    });
  };
};

export const setTicketCreator = (ticketSlug: string, creator: number) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/set-creator/`;
    const data = { ticket: { creator } };
    return axios.post(URL, { ...data }).then(response => {
      const results = response.data.results;
      dispatch(setTicket(results));
      return Promise.resolve(results);
    });
  };
};

export const updateTicket = (ticket: Ticket) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/${
      ticket.slug
    }/`;
    return axios.put(URL, { ticket }).then(response => {
      const results = response.data.results;
      dispatch(setTicket(results));
      return Promise.resolve(results);
    });
  };
};

export const changeTicketSubscription = (
  tickerSlug: string,
  subscribe: boolean
) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Ticket> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${tickerSlug}/subscribe/`;
    return axios.post(URL, { subscribe }).then(response => {
      const results = response.data.results;
      dispatch(setTicket(results));
      return Promise.resolve(results);
    });
  };
};

export const createTicketAnswer = (ticketSlug: string, body: string) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Answer> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/answers/`;
    return axios.post(URL, { answer: { body } }).then(response => {
      const results = response.data.results;
      dispatch(addTicketAnswer(results));
      return Promise.resolve(results);
    });
  };
};

export const updateTicketAnswer = (ticketSlug: string, answer: Answer) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Answer> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/answers/${answer.id}/`;
    return axios.put(URL, { answer }).then(response => {
      const results = response.data.results;
      dispatch(removeTicketAnswer(answer));
      dispatch(addTicketAnswer(results));
      return Promise.resolve(results);
    });
  };
};

export const deleteTicketAnswer = (ticketSlug: string, answer: Answer) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Answer> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/answers/${answer.id}/`;
    return axios.delete(URL).then(response => {
      dispatch(removeTicketAnswer(answer));
      return Promise.resolve(answer);
    });
  };
};

export const createTicketProduct = (
  ticketSlug: string,
  product: TicketProduct
) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<TicketProduct> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/products/`;
    return axios.post(URL, { product }).then(response => {
      const results = response.data.results;
      dispatch(addTicketProduct(results));
      return Promise.resolve(results);
    });
  };
};

export const updateTicketProduct = (
  ticketSlug: string,
  product: TicketProduct
) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<TicketProduct> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/products/${product.id}/`;
    return axios.put(URL, { product }).then(response => {
      const results = response.data.results;
      dispatch(removeTicketProduct(product));
      dispatch(addTicketProduct(results));
      return Promise.resolve(results);
    });
  };
};

export const deleteTicketProduct = (
  ticketSlug: string,
  product: TicketProduct
) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<TicketProduct> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/products/${product.id}/`;
    return axios.delete(URL).then(() => {
      dispatch(removeTicketProduct(product));
      return Promise.resolve(product);
    });
  };
};

export const deleteTicket = (ticketSlug: string) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<boolean> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/tickets/${ticketSlug}/`;
    return axios.delete(URL).then(() => {
      dispatch(clearTicket());
      return Promise.resolve(true);
    });
  };
};
