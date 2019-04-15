<template>
  <b-navbar class="nav-custom">
    <b-navbar-brand href="#">
      <img src="@/assets/static/logo.png" height="45px">
    </b-navbar-brand>
    <b-dropdown variant="link" size="lg" no-caret right>
      <template slot="button-content">
        <img src="@/assets/static/external.png">
      </template>
      <b-dropdown-item class="my-dropdown-item" @click="logout" v-if="isAuthenticated">Logout</b-dropdown-item>
      <b-dropdown-item class="my-dropdown-item" href="/dashboard" v-if="isAuthenticated">Dashboard</b-dropdown-item>
      <b-dropdown-item class="my-dropdown-item" to="/login" v-else>Login</b-dropdown-item>
    </b-dropdown>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT } from '@/store/actions.type'
export default {
  name: 'GluuHeader',
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'logoutUrl'
    ])
  },
  methods: {
    logout () {
      this.$loading.show({
        container: null
      })
      this.$store.dispatch(LOGOUT)
        .then(() => {
          window.location.href = this.logoutUrl
        })
    }
  }
}
</script>

<style scoped>

</style>
