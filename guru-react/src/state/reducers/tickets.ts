import actions from "../actions/constants";
import * as ticketsActions from "../actions/tickets";
import {
  TicketsState,
  TicketsFilterState,
  TicketDetailState
} from "../types/state";
import { TicketFilterOrder } from "../types/tickets";

export const initialFilters: TicketsFilterState = {
  companies: [],
  creators: [],
  assignees: [],
  categories: [],
  issueTypes: [],
  products: [],
  statuses: [],
  startDate: "",
  endDate: "",
  query: "",
  page: 1,
  totalCount: 0,
  pageItems: 10,
  order: TicketFilterOrder.MostRecent
};

const initialTicketDetail: TicketDetailState = {
  ticket: null,
  ticketHistory: [],
  answers: []
};

const initialState: TicketsState = {
  ticketDetail: initialTicketDetail,
  tickets: [],
  filters: initialFilters
};

const ticketsReducer = (
  state: TicketsState = initialState,
  action: ticketsActions.TicketsAction
): TicketsState => {
  switch (action.type) {
    case actions.ADD_FILTER_COMPANY:
      const company = (action as ticketsActions.AddFilterCompanyAction).company;
      return {
        ...state,
        filters: {
          ...state.filters,
          companies: [
            ...state.filters.companies.filter(item => item.id !== company.id),
            company
          ]
        }
      };
    case actions.ADD_FILTER_CREATOR:
      const creator = (action as ticketsActions.AddFilterCreatorAction).creator;
      return {
        ...state,
        filters: {
          ...state.filters,
          creators: [
            ...state.filters.creators.filter(item => item.id !== creator.id),
            creator
          ]
        }
      };
    case actions.ADD_FILTER_ASSIGNEE:
      const assignee = (action as ticketsActions.AddFilterAssigneeAction)
        .assignee;
      return {
        ...state,
        filters: {
          ...state.filters,
          assignees: [
            ...state.filters.assignees.filter(item => item.id !== assignee.id),
            assignee
          ]
        }
      };
    case actions.ADD_FILTER_CATEGORY:
      const category = (action as ticketsActions.AddFilterCategoryAction)
        .category;
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: [
            ...state.filters.categories.filter(item => item.id !== category.id),
            category
          ]
        }
      };
    case actions.ADD_FILTER_PRODUCT:
      const product = (action as ticketsActions.AddFilterProductAction).product;
      return {
        ...state,
        filters: {
          ...state.filters,
          products: [
            ...state.filters.products.filter(item => item.id !== product.id),
            product
          ]
        }
      };
    case actions.ADD_FILTER_ISSUE_TYPE:
      const issueType = (action as ticketsActions.AddFilterIssueTypeAction)
        .issueType;
      return {
        ...state,
        filters: {
          ...state.filters,
          issueTypes: [
            ...state.filters.issueTypes.filter(
              item => item.id !== issueType.id
            ),
            issueType
          ]
        }
      };
    case actions.ADD_FILTER_STATUS:
      const status = (action as ticketsActions.AddFilterStatusAction).status;
      return {
        ...state,
        filters: {
          ...state.filters,
          statuses: [
            ...state.filters.statuses.filter(item => item.id !== status.id),
            status
          ]
        }
      };
    case actions.REMOVE_FILTER_COMPANY:
      const companyR = (action as ticketsActions.RemoveFilterCompanyAction)
        .company;
      return {
        ...state,
        filters: {
          ...state.filters,
          companies: [
            ...state.filters.companies.filter(item => item.id !== companyR.id)
          ]
        }
      };
    case actions.REMOVE_FILTER_CREATOR:
      const creatorR = (action as ticketsActions.RemoveFilterCreatorAction)
        .creator;
      return {
        ...state,
        filters: {
          ...state.filters,
          creators: [
            ...state.filters.creators.filter(item => item.id !== creatorR.id)
          ]
        }
      };
    case actions.REMOVE_FILTER_ASSIGNEE:
      const assigneeR = (action as ticketsActions.RemoveFilterAssigneeAction)
        .assignee;
      return {
        ...state,
        filters: {
          ...state.filters,
          assignees: [
            ...state.filters.assignees.filter(item => item.id !== assigneeR.id)
          ]
        }
      };
    case actions.REMOVE_FILTER_CATEGORY:
      const categoryR = (action as ticketsActions.RemoveFilterCategoryAction)
        .category;
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: [
            ...state.filters.categories.filter(item => item.id !== categoryR.id)
          ]
        }
      };
    case actions.REMOVE_FILTER_PRODUCT:
      const productR = (action as ticketsActions.RemoveFilterProductAction)
        .product;
      return {
        ...state,
        filters: {
          ...state.filters,
          products: [
            ...state.filters.products.filter(item => item.id !== productR.id)
          ]
        }
      };
    case actions.REMOVE_FILTER_ISSUE_TYPE:
      const issueTypeR = (action as ticketsActions.RemoveFilterIssueTypeAction)
        .issueType;
      return {
        ...state,
        filters: {
          ...state.filters,
          issueTypes: [
            ...state.filters.issueTypes.filter(
              item => item.id !== issueTypeR.id
            )
          ]
        }
      };
    case actions.REMOVE_FILTER_STATUS:
      const statusR = (action as ticketsActions.RemoveFilterStatusAction)
        .status;
      return {
        ...state,
        filters: {
          ...state.filters,
          statuses: [
            ...state.filters.statuses.filter(item => item.id !== statusR.id)
          ]
        }
      };
    case actions.SET_FILTER_START_DATE:
      const startDate = (action as ticketsActions.SetFilterStartDateAction)
        .startDate;
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate
        }
      };
    case actions.SET_FILTER_END_DATE:
      const endDate = (action as ticketsActions.SetFilterEndDateAction).endDate;
      return {
        ...state,
        filters: {
          ...state.filters,
          endDate
        }
      };
    case actions.SET_FILTER_QUERY:
      const query = (action as ticketsActions.SetFilterQueryAction).query;
      return {
        ...state,
        filters: {
          ...state.filters,
          query
        }
      };
    case actions.SET_FILTER_ORDER:
      const order = (action as ticketsActions.SetFilterOrderAction).order;
      return {
        ...state,
        filters: {
          ...state.filters,
          order
        }
      };
    case actions.SET_FILTER_PAGE:
      const page = (action as ticketsActions.SetFilterPageAction).page;
      return {
        ...state,
        filters: {
          ...state.filters,
          page
        }
      };
    case actions.SET_FILTER_PAGE_ITEMS:
      const pageItems = (action as ticketsActions.SetFilterPageItemsAction)
        .pageItems;
      return {
        ...state,
        filters: {
          ...state.filters,
          pageItems
        }
      };
    case actions.SET_FILTER_TOTAL_COUNT:
      const totalCount = (action as ticketsActions.SetFilterTotalCountAction)
        .totalCount;
      return {
        ...state,
        filters: {
          ...state.filters,
          totalCount
        }
      };
    case actions.SET_TICKETS:
      const tickets = (action as ticketsActions.SetTicketsAction).tickets;
      return {
        ...state,
        tickets
      };
    case actions.SET_TICKET:
      const ticket = (action as ticketsActions.SetTicketAction).ticket;
      return {
        ...state,
        ticketDetail: { ...state.ticketDetail, ticket: ticket }
      };
    case actions.CLEAR_TICKET:
      return {
        ...state,
        ticketDetail: { ...state.ticketDetail, ticket: null }
      };
    case actions.SET_TICKET_ANSWERS:
      const answers = (action as ticketsActions.SetTicketAnswersAction).answers;
      return {
        ...state,
        ticketDetail: { ...state.ticketDetail, answers }
      };
    case actions.ADD_TICKET_ANSWER:
      const answer = (action as ticketsActions.AddTicketAnswerAction).answer;
      return {
        ...state,
        ticketDetail: {
          ...state.ticketDetail,
          answers: [
            ...state.ticketDetail.answers.filter(item => item.id !== answer.id),
            answer
          ]
        }
      };
    case actions.REMOVE_TICKET_ANSWER:
      const answerR = (action as ticketsActions.RemoveTicketAnswerAction)
        .answer;
      return {
        ...state,
        ticketDetail: {
          ...state.ticketDetail,
          answers: [
            ...state.ticketDetail.answers.filter(item => item.id !== answerR.id)
          ]
        }
      };
    case actions.SET_TICKET_HISTORY:
      const ticketHistory = (action as ticketsActions.SetTicketHistoryAction)
        .history;
      return {
        ...state,
        ticketDetail: { ...state.ticketDetail, ticketHistory }
      };
    case actions.CLEAR_ALL_FILTERS:
      return { ...state, filters: { ...initialFilters } };
    default:
      return state;
  }
};

export default ticketsReducer;
