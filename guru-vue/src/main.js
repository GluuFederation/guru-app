import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Plugins
import "./plugins/bootstrapvue";
import "./plugins/vueawesome";
import "./plugins/vuemultiselect";
import "./plugins/vuectkdatetimepicker";
import "./plugins/vuefilterpluralize";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
