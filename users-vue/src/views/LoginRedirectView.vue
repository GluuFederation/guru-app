<template>
  <div class="overloading-spinner-text">
    Redirecting to Gluu Server...
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_LOGIN_URL } from '@/store/actions.type'
export default {
  name: 'LoginRedirectView',
  computed: {
    ...mapGetters([
      'loginUrl'
    ])
  },
  mounted () {
    this.$loading.show({
      container: null
    })
    this.$store.dispatch(GET_LOGIN_URL)
      .then(() => {
        window.location.href = this.loginUrl
      })
  }
}
</script>
