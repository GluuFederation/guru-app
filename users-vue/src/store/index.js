import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import auth from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [new VuexPersistence().plugin]
});
