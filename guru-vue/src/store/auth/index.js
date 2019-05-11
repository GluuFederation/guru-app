import Vue from "vue";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_JWT_TOKEN,
  SET_COMPANY,
  SET_ROLE
} from "./mutations.type";
import actions from "./actions";
import getters from "./getters";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
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
  company: {
    name: "",
    address: {
      line1: "",
      line2: "",
      country: "",
      city: "",
      state: "",
      zipCode: ""
    },
    users: []
  },
  token: "",
  role: ""
};

const mutations = {
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
    state.token = "";
    state = { ...initialState };
    window.location.href = "";
  },
  [SET_COMPANY](state, company) {
    state.company = { ...company };
  },
  [SET_ROLE](state, role) {
    state.role = role;
  }
};

export default {
  state: initialState,
  actions,
  mutations,
  getters
};
