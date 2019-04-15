<template>
  <div id="dashboard-sidebar-container">
    <b-card class="card-gluu">
      <div class="d-flex flex-column justify-content-center align-items-center information-container mt-lg-4">
        <div class="mb-lg-3">
          <div class="d-flex align-items-end justify-content-end">
            <b-img :src="avatarUrl" class="avatar-image" />
            <div class="edit-icon-container">
              <b-img class="edit-icon" :src="editIconUrl" />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div>Nasir uddin <b-img :src="verifiedUrl" class="mr-lg-1" /></div>
          <div>Gluu Inc</div>
          <div>nasir@gluu.org</div>
        </div>
      </div>

      <hr>

      <div class="stats-container">
        <b-container>
          <b-row>
            <b-col cols="6">
              <div class="d-flex flex-column justify-content-center align-items-center w-100">
              <div class="mb-lg-1">12</div>
              <div>Opened tickets</div>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="d-flex flex-column justify-content-center align-items-center w-100">
                <div class="mb-lg-1">170</div>
                <div>Upvotes</div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <hr>
      <b-nav vertical id="dashboard-sidebar-links">
        <b-nav-item>
          <router-link 
            :to="{ name: 'Notification' }"
            class="gluu-sidebar-link"
            active-class="active">
            Notification
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link 
            :to="{ name: 'Profile' }"
            class="gluu-sidebar-link"
            active-class="active">
            Profile
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link 
            :to="{ name: 'Team' }"
            class="gluu-sidebar-link"
            active-class="active">
            Team
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link 
            :to="{ name: 'Partner' }"
            class="gluu-sidebar-link"
            active-class="active">
            Partners
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link 
            :to="{ name: 'Billing' }"
            class="gluu-sidebar-link"
            active-class="active">
            Billing
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link 
            :to="{ name: 'Security' }"
            class="gluu-sidebar-link"
            active-class="active">
            Account Security
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link 
            :to="{ name: 'Admin' }"
            class="gluu-sidebar-link"
            active-class="active">
            Admin
          </router-link>
        </b-nav-item>
      </b-nav>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'GluuDashboardSidebar',
  computed:{
    avatarUrl() {
      return require('@/assets/images/avatar.svg');
    },
    verifiedUrl () {
      return require('@/assets/images/verified.svg')
    },
  }
}
</script>

<style lang="scss">
@import 'GluuDashboardSidebar';
</style>

