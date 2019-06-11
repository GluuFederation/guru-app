<template>
  <div class="overloading-spinner-text">Waiting for Authentication...</div>
</template>

<script>
import { GET_SIGNUP_URL } from "@/store/actions.type";

export default {
  name: "SignupRedirect",
  mounted() {
    let loader = this.$loading.show({
      container: null
    });
    this.$store
      .dispatch(GET_SIGNUP_URL)
      .then(results => {
        window.location.href = results.signupUrl;
      })
      .catch(error => {
        loader.hide();
        if (error.status === 500) {
          this.$_error("InternalServer");
        }
        if (error.status === 400) {
          this.$_error("BadRequest");
        }
      });
  }
};
</script>
