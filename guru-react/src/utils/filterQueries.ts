import { ShortCompany, ShortUser } from "../state/types/profiles";
import {
  TicketIssueType,
  GluuProduct,
  TicketStatus,
  TicketCategory
} from "../state/types/info";
import { TicketFilterOrder } from "../state/types/tickets";

export const getSearchString = (params: {
  companies?: Array<ShortCompany>;
  creators?: Array<ShortUser>;
  assignees?: Array<ShortUser>;
  issueTypes?: Array<TicketIssueType>;
  products?: Array<GluuProduct>;
  statuses?: Array<TicketStatus>;
  categories?: Array<TicketCategory>;
  startDate?: string;
  endDate?: string;
  query?: string;
  order?: TicketFilterOrder;
  page?: number;
  pageItems?: number;
}): string => {
  let searchString = "?";
  const {
    companies,
    creators,
    assignees,
    issueTypes,
    products,
    statuses,
    categories,
    startDate,
    endDate,
    query,
    order,
    page,
    pageItems
  } = params;
  if (companies && companies.length) {
    searchString += `companies=${companies.map(item => item.id).join()}&`;
  }
  if (creators && creators.length) {
    searchString += `creators=${creators.map(item => item.id).join()}&`;
  }
  if (assignees && assignees.length) {
    searchString += `assignees=${assignees.map(item => item.id).join()}&`;
  }
  if (issueTypes && issueTypes.length) {
    searchString += `types=${issueTypes.map(item => item.id).join()}&`;
  }
  if (products && products.length) {
    searchString += `products=${products.map(item => item.id).join()}&`;
  }
  if (statuses && statuses.length) {
    searchString += `statuses=${statuses.map(item => item.id).join()}&`;
  }
  if (categories && categories.length) {
    searchString += `categories=${categories.map(item => item.id).join()}&`;
  }
  if (startDate) {
    searchString += `start=${startDate}&`;
  }
  if (endDate) {
    searchString += `end=${endDate}&`;
  }
  if (query) {
    searchString += `q=${query}&`;
  }
  if (order) {
    searchString += `ordering=${order}&`;
  }
  if (page && pageItems) {
    searchString += `offset=${(page - 1) * pageItems}&limit=${pageItems}`;
  }
  if (searchString[searchString.length - 1] === "&") {
    searchString = searchString.substring(0, searchString.length - 1);
  }
  return searchString;
};
