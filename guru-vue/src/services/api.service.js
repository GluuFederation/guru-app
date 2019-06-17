import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store";
import { PURGE_AUTH } from "@/store/mutations.type";

const ApiService = {
  init() {
    let headers = {};
    if (store.state.auth.token)
      headers.Authorization = `Token ${store.state.auth.token}`;
    const instance = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/api/v1`,
      headers: headers
    });
    instance.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (error.response && error.response.status === 401) {
          store.commit(PURGE_AUTH);
        } else {
          return Promise.reject(error);
        }
      }
    );
    Vue.use(VueAxios, instance);
  },

  query(resource, params) {
    return Vue.axios.get(resource, { params });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}/`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}/`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource);
  }
};

export default ApiService;
