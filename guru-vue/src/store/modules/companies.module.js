import ApiService from "@/services/api.service";

import {
  ACCEPT_INVITATION,
  SEND_INVITATION,
  FETCH_ASSOCIATED_COMPANIES
} from "@/store/actions.type";

import { SET_ASSOCIATED_COMPANIES } from "@/store/mutations.type";

export const initialState = {
  companies: []
};

export const state = Object.assign({}, initialState);

export const getters = {
  companies(state) {
    return state.companies;
  }
};

export const actions = {
  [ACCEPT_INVITATION](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`companies/${payload.companyId}/accept-invite`, {
        activationKey: payload.activationKey
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [SEND_INVITATION](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`companies/${payload.companyId}/invite`, {
        invitation: payload.invitation
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_ASSOCIATED_COMPANIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("companies")
        .then(({ data }) => {
          context.commit(SET_ASSOCIATED_COMPANIES, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

export const mutations = {
  [SET_ASSOCIATED_COMPANIES](state, companies) {
    state.companies = [...companies];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
