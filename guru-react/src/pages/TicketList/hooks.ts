import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import {
  addFilterCompany,
  addFilterAssignee,
  addFilterCategory,
  addFilterCreator,
  addFilterIssueType,
  addFilterProduct,
  addFilterStatus,
  clearAllFilters,
  setFilterEndDate,
  setFilterStartDate,
  setFilterOrder,
  setFilterPage,
  setFilterPageItems,
  setFilterQuery,
  fetchTickets
} from "../../state/actions/tickets";
import { useTicketsState } from "../../state/hooks";
import { Company, ShortUser } from "../../state/types/profiles";
import { TicketFilterOrder } from "../../state/types/tickets";
import {
  TicketIssueType,
  GluuProduct,
  TicketStatus,
  TicketCategory
} from "../../state/types/info";
import { AppState } from "../../state/types/state";

export const useStatePathSync = () => {
  const { search } = useLocation();
  const { filters } = useTicketsState();
  const dispatch = useDispatch();
  const superState = useSelector((state: AppState) => state);

  const ticketFetch = (routeToParams?: boolean) =>
    fetchTickets(routeToParams)(dispatch, () => superState, undefined);

  const syncStateWithPath = async () => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/get-params-data/`;
    const searchParams = new URLSearchParams(search);
    const companies = searchParams.get("companies");
    const creators = searchParams.get("creators");
    const assignees = searchParams.get("assignees");
    const issueTypes = searchParams.get("types");
    const products = searchParams.get("products");
    const statuses = searchParams.get("statuses");
    const categories = searchParams.get("categories");
    const params = {
      companies: companies ? companies : undefined,
      creators: creators ? creators : undefined,
      assignees: assignees ? assignees : undefined,
      issueTypes: issueTypes ? issueTypes : undefined,
      products: products ? products : undefined,
      statuses: statuses ? statuses : undefined,
      categories: categories ? categories : undefined
    };

    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");
    const query = searchParams.get("q");
    const order = searchParams.get("order");
    const pageItemsStr = searchParams.get("limit");
    const pageStr = searchParams.get("offset");

    const response = await axios.get(url, { params });
    const results = response.data.results;
    dispatch(clearAllFilters());
    let pageItems = filters.pageItems;
    if (results.companies) {
      results.companies.forEach((company: Company) => {
        dispatch(addFilterCompany(company));
      });
    }
    if (results.creators) {
      results.creators.forEach((creator: ShortUser) => {
        dispatch(addFilterCreator(creator));
      });
    }
    if (results.assignees) {
      results.assignees.forEach((assignee: ShortUser) => {
        dispatch(addFilterAssignee(assignee));
      });
    }
    if (results.issueTypes) {
      results.issueTypes.forEach((issueType: TicketIssueType) => {
        dispatch(addFilterIssueType(issueType));
      });
    }
    if (results.products) {
      results.products.forEach((product: GluuProduct) => {
        dispatch(addFilterProduct(product));
      });
    }
    if (results.statuses) {
      results.statuses.forEach((status: TicketStatus) => {
        dispatch(addFilterStatus(status));
      });
    }
    if (results.categories) {
      results.categories.forEach((category: TicketCategory) => {
        dispatch(addFilterCategory(category));
      });
    }
    if (pageItemsStr) {
      pageItems = parseInt(pageItemsStr, 10);
      if (!isNaN(pageItems)) {
        dispatch(setFilterPageItems(pageItems));
      }
    }
    if (pageStr) {
      const page = Math.round(parseInt(pageStr, 10) / pageItems) + 1;
      if (!isNaN(page)) {
        dispatch(setFilterPage(page));
      }
    }
    if (startDate && moment(startDate).isValid()) {
      dispatch(setFilterStartDate(startDate));
    }
    if (endDate && moment(endDate).isValid()) {
      dispatch(setFilterEndDate(endDate));
    }
    if (query) {
      dispatch(setFilterQuery(query));
    }
    if (order) {
      dispatch(
        setFilterOrder(
          order === TicketFilterOrder.LeastRecent
            ? TicketFilterOrder.LeastRecent
            : order === TicketFilterOrder.UserAZ
            ? TicketFilterOrder.UserAZ
            : order === TicketFilterOrder.UserZA
            ? TicketFilterOrder.UserZA
            : TicketFilterOrder.MostRecent
        )
      );
    }
    return ticketFetch();
  };

  return {
    syncStateWithPath,
    addFilterCompany,
    addFilterAssignee,
    addFilterCategory,
    addFilterCreator,
    addFilterIssueType,
    addFilterProduct,
    addFilterStatus,
    clearAllFilters,
    setFilterEndDate,
    setFilterStartDate,
    setFilterOrder,
    setFilterPage,
    setFilterPageItems,
    setFilterQuery,
    fetchTickets: ticketFetch
  };
};
