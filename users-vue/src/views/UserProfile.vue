<template>
  <div class="user-profile-card">
    <div class="profile-mobile-title">
      <h4>Your Personal profile</h4>
      <h6>Manage this basic information — your name, email, and phone number — to manage gluu support account</h6>
    </div>
    <modals-container/>
    <md-card class="md-layout-item md-size-50 md-small-size-80 md-xsmall-size-95">
      <md-card-header>
        <div class="md-title">Your Personal profile</div>
        <div
          class="md-subhead mt-2"
        >Manage this basic information — your name, email, and phone number — to manage gluu support account</div>
      </md-card-header>
      <md-divider></md-divider>
      <md-card-content>
        <md-list>
          <profile-info-item
            name="Name"
            v-bind:value="currentUser.firstName + ' ' + currentUser.lastName"
            v-on:update-info="updateInfo('name')"
            :isMobileDevice="isMobileDevice"
          />
          <md-divider></md-divider>
          <profile-info-item
            name="Email"
            v-bind:value="currentUser.email"
            v-on:update-info="updateInfo('email')"
            :isMobileDevice="isMobileDevice"
          />
          <md-divider></md-divider>
          <profile-info-item
            name="Address"
            v-bind:value="address"
            v-on:update-info="updateInfo('address')"
            :isMobileDevice="isMobileDevice"
          />
          <md-divider></md-divider>
          <profile-info-item
            name="Timezone"
            v-bind:value="currentUser.timezone"
            v-on:update-info="updateInfo('timezone')"
            :isMobileDevice="isMobileDevice"
          />
        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileInfoItem from "@/components/ProfileInfoItem";
import UpdateModal from "@/components/UpdateModal";
import { GET_LOGIN_URL } from "@/store/actions.type";

export default {
  name: "UserProfile",
  components: {
    ProfileInfoItem
    // UpdateModal
  },
  data() {
    return {
      isMobileDevice: false
    };
  },
  mounted() {
    const from = this.$store.state.auth.from;
    if (from.action === "signup")
      this.$store.dispatch(GET_LOGIN_URL, "guru").then(response => {
        window.location.href = response.loginUrl;
      });
    else if (from.action === "profile")
      window.location.href = `${process.env.VUE_APP_GURU_URL}`;
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth());
    });
  },
  computed: {
    ...mapGetters(["currentUser", "address"])
  },
  methods: {
    updateInfo(type) {
      this.$modal.show(
        UpdateModal,
        { modalType: type },
        { width: this.isMobileDevice ? "90%" : "30%", height: "auto" }
      );
    },
    getWindowWidth() {
      if (document.documentElement.clientWidth < 600) {
        this.isMobileDevice = true;
      } else {
        this.isMobileDevice = false;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth());
  }
};
</script>

<style lang="scss">
.v--modal-overlay {
  background: rgba(39, 46, 43, 0.4);
}
</style>
