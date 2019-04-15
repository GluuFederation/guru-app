<template>
  <div class="overloading-spinner-text">
    Waiting for Authentication...
  </div>
</template>

<script>
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'LoginCallback',
  mounted () {
    let loader = this.$loading.show({
      container: null
    })
    this.$store.dispatch(LOGIN, this.$route.query)
      .then(() => {
        loader.hide()
        this.$router.push({ name: 'Dashboard' })
      })
      .catch((error) => {
        loader.hide()
        if (error.status === 500) {
          this.$_error('InternalServer')
        }
        if (error.status === 400) {
          this.$_error('BadRequest')
        }
      })
  }
}
</script>
