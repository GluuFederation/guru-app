import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/pages/home/Home")
    },
    {
      path: "/select-plan",
      name: "SelectPlan",
      component: () => import("@/pages/auth/selectPlan/SelectPlan")
    },
    {
      path: "/auth/login",
      name: "Login",
      component: () => import("@/pages/auth/LoginRedirect")
    },
    {
      path: "/auth/signup",
      name: "Signup",
      component: () => import("@/pages/auth/SignupRedirect")
    },
    {
      path: "/auth/login-callback",
      name: "LoginCallback",
      component: () => import("@/pages/auth/LoginCallback")
    },
    {
      path: "/ticket-list",
      name: "TicketList",
      component: () => import("@/pages/ticketlist/TicketList")
    },
    {
      path: "/ticket/:slug",
      name: "TicketDetail",
      component: () => import("@/pages/ticketdetail/TicketDetail"),
      props: true
    },
    {
      path: "/createTicket",
      name: "CreateTicket",
      component: () => import("@/pages/ticketcreate/TicketCreate")
    },
    {
      path: "/dashboard",
      component: () => import("@/pages/dashboard/Dashboard"),
      children: [
        {
          path: "",
          redirect: "notification"
        },
        {
          path: "notification",
          name: "Notification",
          component: () => import("@/pages/dashboard/Notification")
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("@/pages/dashboard/Profile")
        },
        {
          path: "team",
          name: "Team",
          component: () => import("@/pages/dashboard/Team")
        },
        {
          path: "partner",
          name: "Partner",
          component: () => import("@/pages/dashboard/Partner")
        },
        {
          path: "billing",
          name: "Billing",
          component: () => import("@/pages/dashboard/Billing")
        },
        {
          path: "security",
          name: "Security",
          component: () => import("@/pages/dashboard/Security")
        },
        {
          path: "admin",
          name: "Admin",
          component: () => import("@/pages/dashboard/Admin")
        }
      ]
    }
  ]
});
