<template>
  <div id="app">
    <gluu-header></gluu-header>
    <app-view></app-view>
  </div>
</template>

<script>
import GluuHeader from '@/components/GluuHeader'

export default {
  name: 'App',
  components: {
    GluuHeader
  }
}
</script>
