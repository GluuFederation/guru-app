import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/pages/home/Home")
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
      path: "/create-ticket",
      name: "CreateTicket"
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
