<template>
  <router-link :to="{ name: toView }" tag="div" class="dashboard-card">
    <img :src="imagePath">
    <p>{{ description }}</p>
    <v-icon name="check-circle"/>
  </router-link>
</template>

<script>
import 'vue-awesome/icons/check-circle'
export default {
  name: 'DashboardCard',
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    toView: {
      type: String,
      required: true
    }
  },
  computed: {
    imagePath () {
      return require('@/assets/static/' + this.imgUrl + '.png')
    }
  }
}
</script>
