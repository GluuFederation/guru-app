// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import paths from "./router/paths";
import store from "./store";
import { SET_FROM } from "./store/mutations.type";

// Plugins
import "./plugins/bootstrapvue";
import "./plugins/vuematerial";
import "./plugins/vuelidate";
import "./plugins/vuejsmodal";
import "./plugins/vueloadingoverlay";
import "./plugins/vueerrorpage";

// Vue-Awesome
import Icon from "vue-awesome/components/Icon";

// Custom Style
import "@/assets/scss/main.scss";

import ApiService from "@/common/api.service";

Vue.config.productionTip = false;

Vue.component("v-icon", Icon);

ApiService.init();

router.beforeEach((to, from, next) => {
  const queryFrom = to.query.from;
  const queryAction = to.query.action;
  if (queryFrom && from.name === null) {
    let fromObj = { app: queryFrom, action: "signup" };
    if (queryAction) fromObj.action = queryAction;
    store.commit(SET_FROM, fromObj);
  }
  if (to.meta.requiresAuth) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next(paths.LOGIN);
    }
  } else if (to.meta.requiresUnAuth) {
    if (store.getters.isAuthenticated) {
      next(paths.DASHBOARD);
    } else {
      next();
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
