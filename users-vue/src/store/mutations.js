import Vue from "vue";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_JWT_TOKEN
} from "./mutations.type";
import actions from "./actions";
import getters from "./getters";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    address: {
      line1: "",
      line2: "",
      country: "",
      city: "",
      state: "",
      zipCode: ""
    },
    timezone: ""
  },
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
    state.user = { ...initialState.user };
    state.token = "";
  }
};

export default {
  state: initialState,
  actions,
  mutations,
  getters
};
