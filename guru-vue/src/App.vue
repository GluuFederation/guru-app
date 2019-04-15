<template>
  <div id="app">
    <gluu-header></gluu-header>
    <router-view></router-view>
    <gluu-footer></gluu-footer>
  </div>
</template>

<script>
import GluuHeader from '@/components/header/GluuHeader'
import GluuFooter from '@/components/footer/GluuFooter'
export default {
  name: 'app',
  components: {
    GluuHeader,
    GluuFooter
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
@import "@/assets/scss/main.scss";
</style>
