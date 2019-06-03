import Vue from "vue";
import ApiService from "@/services/api.service";

import {
  FETCH_TICKET,
  FETCH_ANSWERS,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
  CREATE_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET,
  FETCH_HISTORY,
  FETCH_TICKET_CREATABLE_COMPANIES,
  RESET_TICKET_STATE
} from "@/store/actions.type";

import {
  SET_TICKET,
  SET_ANSWERS,
  SET_HISTORY,
  SET_TICKET_ISSUE_TYPE,
  SET_TICKET_CATEGORY,
  SET_TICKET_GLUU_SERVER,
  SET_TICKET_GLUU_OS,
  SET_TICKET_GLUU_OS_VERSION,
  SET_TICKET_CONTENT,
  SET_TICKET_CREATABLE_COMPANIES,
  SET_TICKET_COMPANY_ASSOCIATION,
  SET_TICKET_OWNER,
  RESET_STATE
} from "@/store/mutations.type";

export const initialState = {
  ticket: {
    title: "",
    body: "",
    issueType: "",
    status: "",
    category: "",
    gluuServer: "",
    os: "",
    osVersion: "",
    companyAssociation: "",
    createdFor: ""
  },
  respondPermission: false,
  companies: [],
  answers: [],
  history: []
};

export const state = Object.assign({}, initialState);

export const getters = {
  ticket(state) {
    return state.ticket;
  },
  ticketCompanyAssociation(state) {
    return state.ticket.companyAssociation;
  },
  respondPermission() {
    return state.respondPermission;
  },
  answers(state) {
    return state.answers;
  },
  ticketCreatableCompanies(state) {
    return state.companies;
  }
};

export const actions = {
  [FETCH_TICKET](context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.get("tickets", slug)
        .then(({ data }) => {
          context.commit(SET_TICKET, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_ANSWERS](context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.get(`tickets/${slug}/answers`)
        .then(({ data }) => {
          context.commit(SET_ANSWERS, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [CREATE_ANSWER](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`tickets/${payload.slug}/answers`, { ...payload.answer })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [UPDATE_ANSWER](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.update(
        `tickets/${payload.ticketSlug}/answers`,
        payload.answerSlug,
        { ...payload.answer }
      )
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [DELETE_ANSWER](context, ticketSlug, answerSlug) {
    return new Promise((resolve, reject) => {
      ApiService.delete(`tickets/${ticketSlug}/answers/${answerSlug}/`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [CREATE_TICKET](context, ticket) {
    return new Promise((resolve, reject) => {
      ApiService.post("tickets/", { ...ticket })
        .then(({ data }) => {
          context.commit(SET_TICKET, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [UPDATE_TICKET](context, slug, ticket) {
    return new Promise((resolve, reject) => {
      ApiService.put("tickets", slug, { ...ticket })
        .then(({ data }) => {
          context.commit(SET_TICKET, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [DELETE_TICKET](context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.delete(`tickets/${slug}/`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_HISTORY](context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.get(`tickets/${slug}/history`)
        .then(({ data }) => {
          context.commit(SET_HISTORY, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_TICKET_CREATABLE_COMPANIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get(`companies/ticket-createable`)
        .then(({ data }) => {
          context.commit(SET_HISTORY, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [RESET_TICKET_STATE](context) {
    context.commit(RESET_STATE);
  }
};
export const mutations = {
  [SET_TICKET](state, data) {
    state.ticket = data.results;
    state.respondPermission = data.respondPermission;
  },
  [SET_ANSWERS](state, answers) {
    state.answers = answers;
  },
  [SET_HISTORY](state, history) {
    state.history = history;
  },
  [SET_TICKET_ISSUE_TYPE](state, type) {
    state.ticket.issueType = type;
  },
  [SET_TICKET_CATEGORY](state, category) {
    state.ticket.category = category;
  },
  [SET_TICKET_GLUU_SERVER](state, server) {
    state.ticket.gluuServer = server;
  },
  [SET_TICKET_GLUU_OS](state, os) {
    state.ticket.os = os;
  },
  [SET_TICKET_GLUU_OS_VERSION](state, osVersion) {
    state.ticket.osVersion = osVersion;
  },
  [SET_TICKET_CONTENT](state, payload) {
    state.ticket.title = payload.title;
    state.ticket.body = payload.body;
  },
  [SET_TICKET_CREATABLE_COMPANIES](state, payload) {
    state.companies = payload;
  },
  [SET_TICKET_COMPANY_ASSOCIATION](state, companyAssociation) {
    state.ticket.companyAssociation = companyAssociation;
  },
  [SET_TICKET_OWNER](state, createdFor) {
    state.ticket.createdFor = createdFor;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
