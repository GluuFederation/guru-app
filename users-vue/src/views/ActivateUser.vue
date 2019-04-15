<template>
  <div class="overloading-spinner-text">
    Verifying email...
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ACTIVATE_USER } from '@/store/actions.type'

export default {
  name: 'ActivateUser',
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'isVerifyErrors',
      'verifyErrors'
    ])
  },
  mounted () {
    let loader = this.$loading.show({
      container: null
    })
    this.$store.dispatch(ACTIVATE_USER, {
      userId: this.$route.params.userId,
      pin: this.$route.params.pin
    })
      .then(() => {
        loader.hide()
        this.$router.push({ name: 'PersonalInfo' })
      })
      .catch((error) => {
        loader.hide()
        if (error.status === 500) {
          this.$_error('InternalServer')
        }
        if (error.status === 400) {
          if (this.isVerifyErrors) {
            if (this.verifyErrors === 'verify-400') {
              this.$router.push({ name: 'Dashboard' })
            }
            this.$_error('ErrorDetails', {
              message: this.verifyErrors
            })
          }
          this.$_error('BadRequest')
        }
      })
  }
}
</script>
