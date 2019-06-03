import ApiService from "@/services/api.service";

import {
  FETCH_INFO_ALL,
  FETCH_INFO_PRODUCTS,
  FETCH_INFO_CATEGORIES,
  FETCH_INFO_TYPES,
  FETCH_INFO_STATUSES,
  FETCH_INFO_PERMISSIONS,
  FETCH_INFO_USER_ROLES
} from "@/store/actions.type";

import {
  SET_INFO_ALL,
  SET_INFO_PRODUCTS,
  SET_INFO_CATEGORIES,
  SET_INFO_TYPES,
  SET_INFO_STATUSES,
  SET_INFO_PERMISSIONS,
  SET_INFO_USER_ROLES
} from "@/store/mutations.type";

export const initialState = {
  products: [],
  categories: [],
  types: [],
  statuses: [],
  permissions: [],
  userRoles: []
};

export const state = Object.assign({}, initialState);

export const getters = {
  gluuServer(state) {
    return state.products.find(product => product.name === "Gluu Server");
  },
  products(state) {
    return state.products;
  },
  categories(state) {
    return state.categories;
  },
  types(state) {
    return state.types;
  },
  statuses(state) {
    return state.statuses;
  },
  permissions(state) {
    return state.permissions;
  },
  userRoles(state) {
    return state.userRoles;
  }
};

export const actions = {
  [FETCH_INFO_ALL](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/all")
        .then(({ data }) => {
          context.commit(SET_INFO_ALL, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_INFO_PRODUCTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/products")
        .then(({ data }) => {
          context.commit(SET_INFO_PRODUCTS, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_INFO_CATEGORIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/categories")
        .then(({ data }) => {
          context.commit(SET_INFO_CATEGORIES, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_INFO_TYPES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/types")
        .then(({ data }) => {
          context.commit(SET_INFO_TYPES, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_INFO_STATUSES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/statuses")
        .then(({ data }) => {
          context.commit(SET_INFO_STATUSES, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_INFO_PERMISSIONS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/permissions")
        .then(({ data }) => {
          context.commit(SET_INFO_PERMISSIONS, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_INFO_USER_ROLES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("info/roles")
        .then(({ data }) => {
          context.commit(SET_INFO_USER_ROLES, data.results);
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};
export const mutations = {
  [SET_INFO_ALL](state, results) {
    state.products = [...results.products];
    state.categories = [...results.categories];
    state.types = [...results.types];
    state.statuses = [...results.statuses];
    state.permissions = [...results.permissions];
    state.userRoles = [...results.userRoles];
  },
  [SET_INFO_PRODUCTS](state, results) {
    state.products = [...results];
  },
  [SET_INFO_CATEGORIES](state, results) {
    state.categories = [...results];
  },
  [SET_INFO_TYPES](state, results) {
    state.types = [...results];
  },
  [SET_INFO_PERMISSIONS](state, results) {
    state.permissions = [...results];
  },
  [SET_INFO_USER_ROLES](state, results) {
    state.userRoles = [...results];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
