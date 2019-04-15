<template>
  <div class="verification-card">
    <md-card class="md-layout-item md-size-40 md-medium-size-50 md-small-size-60 md-xsmall-size-90 text-center">
      <md-card-content>
        <v-icon name="regular/check-circle" scale="4"/>
        <h4 class="card-title mb-4 mt-4" >An activation email has been sent to your account.</h4>
        <h6 class="mb-4">Please click on the link in the email to activate your account and complete the registration process.</h6>
        <p class="sub-footer">Didn’t receive any email? <md-button class="md-primary second-btn-link" v-on:click="resend">RESEND</md-button></p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RESEND_EMAIL } from '@/store/actions.type'
import 'vue-awesome/icons/regular/check-circle'
export default {
  name: 'EmailVerification',
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    resend () {
      this.$store.dispatch(RESEND_EMAIL, this.currentUser.email)
    }
  }
}
</script>
