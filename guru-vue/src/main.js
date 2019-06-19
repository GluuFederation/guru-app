import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ApiService from "@/services/api.service";

// Plugins
import "./plugins/bootstrapvue";
import "./plugins/vueawesome";
import "./plugins/vuemultiselect";
import "./plugins/vuectkdatetimepicker";
import "./plugins/vuefilterpluralize";
import "./plugins/vueloadingoverlay";
import "./plugins/vuejspaginate";

Vue.config.productionTip = false;
ApiService.init();

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
