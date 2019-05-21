<template>
  <div id="nav-container">
    <b-container fluid>
      <b-navbar toggleable="lg" variant="faded" type="light">
        <b-navbar-brand :to="{ name: 'Home' }">
          <b-img :src="logoSvgUrl"/>
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"/>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item
              :to="{ name: 'Profile' }"
              class="nav-item-gluu"
              v-if="isAuthenticated"
            >Dashboard</b-nav-item>
            <b-nav-item :to="{ name: 'TicketList' }" class="nav-item-gluu">Tickets</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="isAuthenticated">
              <b-button class="gluu-normal-btn" :to="{ name: 'CreateTicket' }">+Add new ticket</b-button>
            </b-nav-item>

            <b-nav-item v-if="!isAuthenticated">
              <b-button class="gluu-normal-btn" :to="{ name: 'Login' }">Login</b-button>
            </b-nav-item>

            <b-nav-item v-if="isAuthenticated">
              <b-dropdown variant="link" no-caret class="nav-dropdown-gluu">
                <template slot="button-content">
                  <b-img :src="infoUrl" rounded="circle"/>
                </template>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="supportSvgUrl"/>Support Call
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="notificationSvgUrl"/>Consultation
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </b-nav-item>

            <b-nav-item v-if="isAuthenticated">
              <b-dropdown variant="link" no-caret class="nav-dropdown-gluu">
                <template slot="button-content">
                  <b-img :src="avatarUrl" rounded="circle"></b-img>
                </template>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="dashboardSvgUrl"/>Dashboard
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="notificationSvgUrl"/>Alerts
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="userSvgUrl"/>My Profile
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="usersSvgUrl"/>Team
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="creditCardSvgUrl"/>Billing
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center">
                    <b-img class="mr-lg-4" :src="userAdminSvgUrl"/>Admin
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="mb-lg-2">
                  <div class="d-flex align-items-center" @click="logout">Logout</div>
                </b-dropdown-item>
              </b-dropdown>
            </b-nav-item>

            <b-nav-item>
              <b-img :src="gridUrl" rounded="circle"></b-img>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import paths from "@/router/paths";
import { LOGOUT } from "@/store/auth/actions.type";
export default {
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    avatarUrl() {
      return require("@/assets/images/avatar.svg");
    },
    infoUrl() {
      return require("@/assets/images/info.svg");
    },
    gridUrl() {
      return require("@/assets/images/grid.svg");
    },
    logoSvgUrl() {
      return require("@/assets/images/logo.png");
    },
    dashboardSvgUrl() {
      return require("@/assets/images/dashboard.svg");
    },
    notificationSvgUrl() {
      return require("@/assets/images/notification.svg");
    },
    userSvgUrl() {
      return require("@/assets/images/user-dropdown.svg");
    },
    usersSvgUrl() {
      return require("@/assets/images/users.svg");
    },
    creditCardSvgUrl() {
      return require("@/assets/images/credit-card.svg");
    },
    userAdminSvgUrl() {
      return require("@/assets/images/user-admin-dropdown.svg");
    },
    supportSvgUrl() {
      return require("@/assets/images/support.svg");
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
      this.$router.push(paths.HOME);
    }
  }
};
</script>
