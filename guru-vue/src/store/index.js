import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import auth from "./modules/auth.module";
import companies from "./modules/companies.module";
import info from "./modules/info.module";
import ticket from "./modules/ticket.module";
import tickets from "./modules/tickets.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    info,
    companies,
    ticket,
    tickets
  },
  plugins: [new VuexPersistence().plugin]
});
