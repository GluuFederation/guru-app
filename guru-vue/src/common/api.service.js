import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/v1`;
    if (store.state.auth.token)
      Vue.axios.defaults.headers.common["Authorization"] = `Token ${
        store.state.auth.token
      }`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params);
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  }
};

export default ApiService;
