<template>
  <div id="support-plan" class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="row mt-4">
          <div class="col text-center">
            <h2>Select a Plan</h2>
            <p>
              <small>Thanks for choosing Gluu. To provide you with the service that best suits you, please select a plan.</small>
            </p>
          </div>
        </div>
        <div
          class="support-item row mt-4"
          v-bind:class="{ active: selectedPlan === 'community' }"
          v-on:click="setPlan('community')"
        >
          <div class="col-9">
            <h3>Community</h3>
            <p>Unlimited access to public support, ticket tracking and community participation</p>
          </div>
          <div class="col-3 text-right">
            <div v-show="selectedPlan === 'community'" class="current-selector">Current Plan</div>
            <h2>Free</h2>
          </div>
        </div>

        <div
          class="support-item row mt-4"
          v-bind:class="{ active: selectedPlan === 'core' }"
          v-on:click="setPlan('core')"
        >
          <div class="col-9">
            <h3>Core</h3>
            <p>A verified profile and access to extra features like upvoting, shared tickets and more</p>
          </div>
          <div class="col-3 text-right">
            <div v-show="selectedPlan === 'core'" class="current-selector">Current Plan</div>
            <h2>$10.00</h2>
            <p>/monthly</p>
          </div>
        </div>

        <div class="support-item row mt-4" v-bind:class="{ active: selectedPlan === 'vip' }">
          <div class="col-9">
            <h3>VIP</h3>
            <p>Ongoing and consistent care from our expert team, 24/7 outage support and more.</p>
          </div>
          <div class="col-3 text-right">
            <div v-show="selectedPlan === 'vip'" class="current-selector">Current Plan</div>
            <a href>Learn more</a>
          </div>
        </div>

        <div class="text-center mt-4">
          <button class="gluu-normal-btn">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import paths from "@/router/paths";

export default {
  name: "SelectPlan",
  data() {
    return {
      selectedPlan: "community",
      showCore: false
    };
  },
  methods: {
    setPlan(plan) {
      this.$data.selectedPlan = plan;
    },
    confirm() {}
  }
};
</script>

<style lang="scss">
@import "SelectPlan";
</style>
