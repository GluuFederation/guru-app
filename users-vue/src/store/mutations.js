import Vue from "vue";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_JWT_TOKEN,
  SET_FROM
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
  token: "",
  from: {
    app: "",
    action: ""
  }
};

const mutations = {
  [SET_JWT_TOKEN](state, token) {
    state.token = token;
  },
  [SET_FROM](state, from) {
    state.from = { ...from };
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
