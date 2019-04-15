<template>
  <div class="text-center error-page-container">
    <img src="@/assets/static/404bg.png"/>
    <div>
      <p>
        Looks like something went wrong! Don't worry, it can happen to the best of us.<br/>
        Try one of these links instead:
      </p>
      <div>
        <md-button class="md-raised md-primary" to="/dashboard">Dashboard</md-button>
        <md-button class="md-raised md-primary" to="/register">Sign Up</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
