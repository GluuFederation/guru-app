import ApiService from "@/services/api.service";

import { FETCH_TICKETS } from "@/store/actions.type";

import {
  SET_TICKETS,
  SET_PAGINATION_COUNT,
  SET_PAGINATION_ITEMS,
  SET_PAGINATION_PAGE,
  ADD_FILTER_COMPANY,
  ADD_FILTER_CREATOR,
  ADD_FILTER_ASSIGNEE,
  REMOVE_FILTER_COMPANY,
  REMOVE_FILTER_CREATOR,
  REMOVE_FILTER_ASSIGNEE,
  CLEAR_FILTER_COMPANIES,
  CLEAR_FILTER_CREATORS,
  CLEAR_FILTER_ASSIGNEES,
  SET_FILTER_CATEGORY,
  SET_FILTER_PRODUCT,
  SET_FILTER_TYPE,
  SET_FILTER_STATUS,
  SET_FILTER_CREATED_DATE,
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
    category: "",
    product: "",
    type: "",
    status: "",
    createdDate: "",
    searchText: ""
  }
};

export const state = Object.assign({}, initialState);

export const getters = {
  profile(state) {
    return state.profile;
  }
};

export const actions = {
  [FETCH_TICKETS](context) {
    const filters = { ...context.state.filters };
    const pagination = { ...context.state.pagination };
    let params = {};
    params.companies = filters.companies.join();
    params.createdBy = filters.createdBy.join();
    params.category = filters.category;
    params.product = filters.product;
    params.type = filters.type;
    params.status = filters.status;
    params.createdDate = filters.createdDate;
    params.searchText = filters.searchText;
    params.page = pagination.currentPage;

    return new Promise((resolve, reject) => {
      ApiService.query("tickets")
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
  [SET_PAGINATION_COUNT](state, totalCount) {
    state.pagination = { ...state.pagination, totalCount };
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
  [REMOVE_FILTER_COMPANY](state, company) {
    let companies = [...state.filters.companies];
    companies = companies.filter(c => c !== company);
    const filters = { ...state.filters, companies };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_ASSIGNEE](state, assignee) {
    let assignedTo = [...state.filters.assignedTo];
    assignedTo = assignedTo.filter(a => a !== assignee);
    const filters = { ...state.filters, assignedTo };
    state.filters = { ...filters };
  },
  [REMOVE_FILTER_CREATOR](state, creator) {
    let createdBy = [...state.filters.createdBy];
    createdBy = createdBy.filter(c => c !== creator);
    const filters = { ...state.filters, createdBy };
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
  [SET_FILTER_CATEGORY](state, category) {
    state.filters = { ...state.filters, category };
  },
  [SET_FILTER_PRODUCT](state, product) {
    state.filters = { ...state.filters, product };
  },
  [SET_FILTER_CREATED_DATE](state, createdDate) {
    state.filters = { ...state.filters, createdDate };
  },
  [SET_FILTER_STATUS](state, status) {
    state.filters = { ...state.filters, status };
  },
  [SET_FILTER_TYPE](state, type) {
    state.filters = { ...state.filters, type };
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
