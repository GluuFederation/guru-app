import Vue from "vue";
import Router from "vue-router";

import paths from "./paths";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: paths.HOME,
      redirect: paths.REGISTER
    },
    {
      path: paths.REGISTER,
      name: "Register",
      component: () => import("@/views/Register"),
      meta: { requiresUnAuth: true }
    },
    {
      path: paths.EMAIL_VERIFICATION,
      name: "EmailVerification",
      component: () => import("@/views/EmailVerification"),
      meta: { requiresAuth: true }
    },
    {
      path: paths.COMPLETE_REGISTRATION,
      name: "PersonalInfo",
      component: () => import("@/views/PersonalInfo"),
      meta: { requiresAuth: true, requiresNonComplete: true }
    },
    {
      path: paths.DASHBOARD,
      name: "Dashboard",
      component: () => import("@/views/Dashboard"),
      meta: { requiresAuth: true }
    },
    {
      path: paths.USER_PROFILE,
      name: "UserProfile",
      component: () => import("@/views/UserProfile"),
      meta: { requiresAuth: true }
    },
    {
      path: paths.ACTIVATE_USER,
      name: "ActivateUser",
      component: () => import("@/views/ActivateUser")
    },
    {
      path: paths.LOGIN,
      name: "LoginRedirectView",
      component: () => import("@/views/LoginRedirectView")
    },
    {
      path: paths.LOGIN_CALLBACK,
      name: "LoginCallback",
      component: () => import("@/views/LoginCallback")
    },
    {
      path: "*",
      name: "NotFound",
      component: () => import("@/views/Errors/NotFound")
    }
  ]
});
