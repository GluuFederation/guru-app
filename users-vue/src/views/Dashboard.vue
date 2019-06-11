<template>
  <div class="dashboard">
    <dashboard-card imgUrl="personal" description="Personal Profile" toView="UserProfile"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "vue-awesome/icons/check-circle";
import DashboardCard from "@/components/DashboardCard";
import { GET_LOGIN_URL } from "@/store/actions.type";
import { PURGE_AUTH } from "@/store/mutations.type";

export default {
  name: "Dashboard",
  components: {
    DashboardCard
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  mounted() {
    const from = this.$store.state.auth.from;
    console.log(from);
    if (from.action === "signup") {
      this.$store.commit(PURGE_AUTH);
      this.$store.dispatch(GET_LOGIN_URL, "guru").then(response => {
        window.location.href = response.loginUrl;
      });
    } else if (from.action === "profile")
      window.location.href = `${process.env.VUE_APP_GURU_URL}`;
  }
};
</script>
