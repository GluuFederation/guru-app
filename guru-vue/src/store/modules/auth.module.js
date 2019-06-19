import Vue from "vue";
import ApiService from "@/services/api.service";

import {
  CHECK_AUTH,
  GET_LOGIN_URL,
  LOGIN,
  LOGOUT,
  GET_SIGNUP_URL
} from "@/store/actions.type";

import { SET_AUTH, PURGE_AUTH } from "@/store/mutations.type";

export const initialState = {
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

export const state = Object.assign({}, initialState);

export const getters = {
  currentUser(state) {
    return state.user;
  },
  address(state) {
    if (state.user && state.user.address) {
      return state.user.address.line_1;
    }
    return "N/A";
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  isVerified(state) {
    if (state.user && state.user.isVerified) {
      return state.user.isVerified;
    }
    return false;
  },
  isCompleted(state) {
    if (state.user && state.user.isProfileCompleted) {
      return state.user.isProfileCompleted;
    }
    return false;
  },
  company(state) {
    return state.company;
  },
  role(state) {
    return state.role;
  }
};

export const actions = {
  [CHECK_AUTH](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("auth/me")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_LOGIN_URL]() {
    return new Promise((resolve, reject) => {
      const params = { app: "guru" };
      ApiService.query(`auth/get-authorization-url`, { ...params })
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      let queryParams = params;
      queryParams.app = "guru";
      ApiService.query(`auth/login-callback`, { ...queryParams })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_SIGNUP_URL]() {
    return new Promise((resolve, reject) => {
      const params = { app: "guru" };
      ApiService.query(`auth/get-signup-url`, { ...params })
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    // return new Promise(resolve => {
    //   ApiService.get("auth/logout")
    //     .then(({ data }) => {
    //       context.commit(PURGE_AUTH);
    //       resolve(data.results);
    //     })
    //     .catch(({ response }) => {
    //       console.log(response);
    //     });
    // });
  }
};
export const mutations = {
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
    window.location.href = "/";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
