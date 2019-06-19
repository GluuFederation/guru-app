<template>
  <b-navbar class="nav-custom">
    <b-navbar-brand href="#">
      <img src="@/assets/static/logo.png" height="45px">
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-dropdown variant="link" size="lg" no-caret right>
        <template slot="button-content">
          <img src="@/assets/static/external.png">
        </template>
        <b-dropdown-item class="my-dropdown-item" @click="logout" v-if="isAuthenticated">Logout</b-dropdown-item>
        <b-dropdown-item
          class="my-dropdown-item"
          :href="paths.DASHBOARD"
          v-if="isAuthenticated"
        >Dashboard</b-dropdown-item>
        <b-dropdown-item class="my-dropdown-item" :to="paths.LOGIN" v-else>Login</b-dropdown-item>
      </b-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";
import paths from "@/router/paths";

export default {
  name: "GluuHeader",
  computed: {
    paths: function() {
      return paths;
    },
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    logout() {
      let loader = this.$loading.show({
        container: null
      });
      this.$store.dispatch(LOGOUT);
      this.$router.push(paths.HOME);
      loader.hide();
    }
  }
};
</script>

<style scoped>
</style>
