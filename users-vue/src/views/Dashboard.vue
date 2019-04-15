<template>
  <div class="dashboard">
    <dashboard-card
      imgUrl="personal"
      description="Personal Profile"
      toView="UserProfile"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import 'vue-awesome/icons/check-circle'
import DashboardCard from '@/components/DashboardCard'
export default {
  name: 'Dashboard',
  components: {
    DashboardCard
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
}
</script>
