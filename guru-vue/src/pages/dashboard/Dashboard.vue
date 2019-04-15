<template>
  <div id="dashboard-container" class="mt-lg-5">
    <b-container>
      <b-row>
        <b-col cols="4">
          <gluu-dashboard-sidebar></gluu-dashboard-sidebar>
        </b-col>

        <b-col cols="8">
          <router-view></router-view>                   
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import GluuDashboardSidebar from '@/components/dashboard/GluuDashboardSidebar'
export default {
  components: {
    GluuDashboardSidebar
  }
}
</script>

<style lang="scss">
@import 'Dashboard';
</style>
