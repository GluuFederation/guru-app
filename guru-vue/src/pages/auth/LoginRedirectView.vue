<template>
  <div class="overloading-spinner-text">Redirecting to Gluu Server...</div>
</template>

<script>
import { GET_LOGIN_URL } from "@/store/actions.type";
export default {
  name: "LoginRedirectView",
  mounted() {
    this.$loading.show({
      container: null
    });
    this.$store.dispatch(GET_LOGIN_URL).then(response => {
      window.location.href = response.loginUrl;
    });
  }
};
</script>
