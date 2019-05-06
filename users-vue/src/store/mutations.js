import Vue from "vue";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_JWT_TOKEN
} from "./mutations.type";
import actions from "./actions";
import getters from "./getters";

const state = {
  user: null,
  token: ""
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_JWT_TOKEN](state, token) {
    state.token = token;
  },
  [SET_AUTH](state, result) {
    state.user = { ...result };
    state.token = result.token;
    Vue.axios.defaults.headers.common["Authorization"] = `Token ${
      result.token
    }`;
  },
  [PURGE_AUTH](state) {
    state.user = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
