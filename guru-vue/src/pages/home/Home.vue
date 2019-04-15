<template>
  <div id="home">
    <div id="content-container" class="mt-lg-5">
      <b-container>
        <b-row class="mb-lg-5">
          <b-col cols="12">
            <div id="hero-container">
              <div class="p-lg-3 d-flex justify-content-center align-items-center">
                <b-img class="img-fluid" :src="heroUrl" />
                <div class="position-absolute" id="search-for-a-question-container">
                  <div class="dark-36-semi mb-lg-3" id="search-for-a-question-top">Search for a Ticket</div>
                  <div id="search-for-a-question-container-bottom">
                    <b-img class="mr-lg-3" :src="searchGreenUrl" />
                    <b-form-input id="input-default" type="text" size="lg" placeholder="Search or ask a question" />
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row id="select-ticket-category-container">
          <b-col cols="12">
            <div class="dark-22-medium mb-lg-4 text-center">Select The category to find related topic</div>
            <div class="flex-row flex-wrap d-flex justify-content-center align-items-center">
              <div class="gluu-tile flex-column" v-for="(tile, index) in tiles" :key=index>
                <div class="mb-lg-3">
                  <gluu-svg :icon="tile.iconName"></gluu-svg>
                </div>
                <div class="dark-16-medium">{{ tile.text }}</div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import GluuSvg from '@/components/includes/gluusvg/GluuSvg'
export default {
  components: {
    GluuSvg
  },
  data () {
    console.log(process.env.VUE_APP_API_URL);
    return {
      tiles: [
        { iconName: 'installation', text: 'Installation' },
        { iconName: 'identity-management', text: 'Identity Management' },
        { iconName: 'sso', text: 'Single Sign-On' },
        { iconName: 'authentication', text: 'Authentication' },
        { iconName: 'customization', text: 'Customization' },
        { iconName: 'access-management', text: 'Access Management' },
        { iconName: 'maintenance', text: 'Maintenance' },
        { iconName: 'upgrade', text: 'Upgrade' },
        { iconName: 'feature-request', text: 'Feature Request' },
        { iconName: 'outage', text: 'Outages' },
        { iconName: 'logout', text: 'Log Out' },
        { iconName: 'other', text: 'Other' },
      ]
    }
  },
  computed: {
    heroUrl() {
      return require('@/assets/images/hero.svg');
    },
    searchGreenUrl() {
      return require('@/assets/images/searchGreen.svg');
    }
  }
}
</script>

<style lang="scss">
@import 'Home';
</style>
