import ApiService from "@/services/api.service";

import { FETCH_TICKETS } from "@/store/actions.type";

import {
  SET_TICKETS,
  SET_PAGINATION_ITEMS,
  SET_PAGINATION_PAGE,
  ADD_FILTER_COMPANY,
  ADD_FILTER_CREATOR,
  ADD_FILTER_ASSIGNEE,
  ADD_FILTER_CATEGORY,
  ADD_FILTER_PRODUCT,
  ADD_FILTER_TYPE,
  ADD_FILTER_STATUS,
  REMOVE_FILTER_COMPANY,
  REMOVE_FILTER_CREATOR,
  REMOVE_FILTER_ASSIGNEE,
  REMOVE_FILTER_CATEGORY,
  REMOVE_FILTER_PRODUCT,
  REMOVE_FILTER_TYPE,
  REMOVE_FILTER_STATUS,
  CLEAR_FILTER_COMPANIES,
  CLEAR_FILTER_CREATORS,
  CLEAR_FILTER_ASSIGNEES,
  CLEAR_FILTER_CATEGORIES,
  CLEAR_FILTER_PRODUCTS,
  CLEAR_FILTER_TYPES,
  CLEAR_FILTER_STATUSES,
  SET_FILTER_START_DATE,
  SET_FILTER_END_DATE,
  SET_SEARCH_TEXT
} from "@/store/mutations.type";

export const initialState = {
  tickets: [],
  pagination: {
    totalCount: 0,
    itemsPerPage: 10,
    currentPage: 1
  },
  filters: {
    companies: [],
    createdBy: [],
    assignedTo: [],
    categories: [],
    products: [],
    types: [],
    statuses: [],
    startDate: "",
    endDate: "",
    searchText: "",
    orderBy: { name: "Most recent", value: "+recent" }
  }
};

export const state = Object.assign({}, initialState);

export const getters = {
  tickets(state) {
    return state.tickets;
  },
  ticketPagination(state) {
    return state.pagination;
  },
  ticketFilters(state) {
    return state.filters;
  }
};

export const actions = {
  [FETCH_TICKETS](context) {
    const filters = { ...context.state.filters };
    const pagination = { ...context.state.pagination };
    let params = {};
    if (filters.companies.length)
      params.companies = filters.companies.map(company => company.id).join();
    if (filters.createdBy.length)
      params.authors = filters.createdBy.map(user => user.id).join();
    if (filters.assignedTo.length)
      params.assignees = filters.assignedTo.map(user => user.id).join();
    if (filters.categories.length)
      params.categories = filters.categories
        .map(category => category.id)
        .join();
    if (filters.products.length)
      params.products = filters.products.map(product => product.id).join();
    if (filters.types.length)
      params.types = filters.types.map(type => type.id).join();
    if (filters.statuses.length)
      params.statuses = filters.statuses.map(status => status.id).join();
    if (filters.searchText) params.searchText = filters.searchText;
    if (filters.startDate) params.start = filters.startDate;
    if (filters.endDate) params.end = filters.endDate;

    params.offset = (pagination.currentPage - 1) * pagination.itemsPerPage;
    params.limit = pagination.itemsPerPage;

    return new Promise((resolve, reject) => {
      ApiService.query("tickets", params)
        .then(({ data }) => {
          context.commit(SET_TICKETS, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

export const mutations = {
  [SET_TICKETS](state, tickets) {
    state.tickets = [...tickets];
  },
  [SET_PAGINATION_ITEMS](state, itemsPerPage) {
    state.pagination = { ...state.pagination, itemsPerPage };
  },
  [SET_PAGINATION_PAGE](state, currentPage) {
    state.pagination = { ...state.pagination, currentPage };
  },
  [ADD_FILTER_COMPANY](state, company) {
    let companies = [...state.filters.companies];
    companies.push(company);
    const filters = { ...state.filters, companies };
    state.filters = { ...filters };
  },
  [ADD_FILTER_ASSIGNEE](state, assignee) {
    let assignedTo = [...state.filters.assignedTo];
    assignedTo.push(assignee);
    const filters = { ...state.filters, assignedTo };
    state.filters = { ...filters };
  },
  [ADD_FILTER_CREATOR](state, creator) {
    let createdBy = [...state.filters.createdBy];
    createdBy.push(creator);
    const filters = { ...state.filters, createdBy };
    state.filters = { ...filters };
  },
  [ADD_FILTER_CATEGORY](state, category) {
    let categories = [...state.filters.categories];
    categories.push(category);
    const filters = { ...state.filters, categories };
    state.filters = { ...filters };
  },
  [ADD_FILTER_PRODUCT](state, product) {
    let products = [...state.filters.products];
    products.push(product);
    const filters = { ...state.filters, products };
    state.filters = { ...filters };
  },
  [ADD_FILTER_STATUS](state, status) {
    let statuses = [...state.filters.statuses];
    statuses.push(status);
    const filters = { ...state.filters, statuses };
    state.filters = { ...filters };
  },
  [ADD_FILTER_TYPE](state, type) {
    let types = [...state.filters.types];
    types.push(type);
    const filters = { ...state.filters, types };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_COMPANY](state, company) {
    let companies = [...state.filters.companies];
    companies = companies.filter(c => c.id !== company.id);
    const filters = { ...state.filters, companies };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_ASSIGNEE](state, assignee) {
    let assignedTo = [...state.filters.assignedTo];
    assignedTo = assignedTo.filter(a => a.id !== assignee.id);
    const filters = { ...state.filters, assignedTo };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_CREATOR](state, creator) {
    let createdBy = [...state.filters.createdBy];
    createdBy = createdBy.filter(c => c.id !== creator.id);
    const filters = { ...state.filters, createdBy };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_CATEGORY](state, category) {
    let categories = [...state.filters.categories];
    categories = categories.filter(c => c.id !== category.id);
    const filters = { ...state.filters, categories };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_PRODUCT](state, product) {
    let products = [...state.filters.products];
    products = products.filter(c => c.id !== product.id);
    const filters = { ...state.filters, products };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_STATUS](state, status) {
    let statuses = [...state.filters.statuses];
    statuses = statuses.filter(c => c.id !== status.id);
    const filters = { ...state.filters, statuses };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_TYPE](state, type) {
    let types = [...state.filters.types];
    types = types.filter(c => c.id !== type.id);
    const filters = { ...state.filters, types };
    state.filters = { ...filters };
  },
  [CLEAR_FILTER_COMPANIES](state) {
    state.companies = [];
  },
  [CLEAR_FILTER_CREATORS](state) {
    state.createdBy = [];
  },
  [CLEAR_FILTER_ASSIGNEES](state) {
    state.assignedTo = [];
  },
  [CLEAR_FILTER_CATEGORIES](state) {
    state.categories = [];
  },
  [CLEAR_FILTER_PRODUCTS](state) {
    state.products = [];
  },
  [CLEAR_FILTER_STATUSES](state) {
    state.statuses = [];
  },
  [CLEAR_FILTER_TYPES](state) {
    state.types = [];
  },
  [SET_FILTER_START_DATE](state, startDate) {
    state.filters = { ...state.filters, startDate };
  },
  [SET_FILTER_END_DATE](state, endDate) {
    state.filters = { ...state.filters, endDate };
  },
  [SET_SEARCH_TEXT](state, searchText) {
    state.filters = { ...state.filters, searchText };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
