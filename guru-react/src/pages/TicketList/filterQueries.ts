import { Company, ShortUser } from "../../state/types/profiles";
import {
  TicketIssueType,
  GluuProduct,
  TicketStatus,
  TicketCategory
} from "../../state/types/info";
import { TicketFilterOrder } from "../../state/types/tickets";

export const getSearchString = (params: {
  companies?: Array<Company>;
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
  if (companies) {
    searchString += "companies=";
    companies.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
  }
  if (creators) {
    searchString += "creators=";
    creators.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
  }
  if (assignees) {
    searchString += "assignees=";
    assignees.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
  }
  if (issueTypes) {
    searchString += "types=";
    issueTypes.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
  }
  if (products) {
    searchString += "products=";
    products.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
  }
  if (statuses) {
    searchString += "statuses=";
    statuses.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
  }
  if (categories) {
    searchString += "categories=";
    categories.forEach(item => {
      searchString += `${item.id},`;
    });
    searchString += "&";
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
  return searchString;
};
