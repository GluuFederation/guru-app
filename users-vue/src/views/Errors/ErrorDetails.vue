<template>
  <div class="text-center error-page-container">
    <img src="@/assets/static/404bg.png"/>
    <div>
      <h4>
        {{ payload.message }}
      </h4>
      <br/>
      <p>
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
  name: 'ErrorDetails',
  props: ['payload']
}
</script>
