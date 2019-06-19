<template>
  <div>
    <md-autocomplete
      v-model="timezone"
      v-on:md-opened="opened"
      v-on:md-changed="changed(timezone)"
      :md-options="timezoneList"
      :class="customClass"
      class="timezone-picker"
      v-bind:autocomplete="autocomplete"
    >
      <label>Timezone</label>
      <span class="md-error" v-if="requiredError">Select your timezone</span>
      <span class="md-error" v-if="!requiredError && choiceError">Select the timezone from the list</span>
      <span class="md-error" v-if="backendError">This value is not valid</span>
    </md-autocomplete>
  </div>
</template>

<script>
import "vue-awesome/icons/sort-down";
import { timezoneList } from "@/plugins/customvalidators";

export default {
  name: "TimezoneComponent",
  props: {
    customClass: {
      type: Object
    },
    requiredError: {
      type: Boolean
    },
    choiceError: {
      type: Boolean
    },
    backendError: {
      type: [Boolean, Number]
    }
  },
  data() {
    return {
      timezone: "",
      timezoneList: []
    };
  },
  computed: {
    autocomplete() {
      return this.globalProps.isChrome ? "disabled" : "off";
    }
  },
  mounted() {
    this.timezone = this.$store.state.auth.user.timezone;
    this.timezoneList = timezoneList;
  },
  methods: {
    changed(value) {
      this.$emit("selected", value);
    },
    opened() {
      this.timezone += " ";
      this.timezone = this.timezone.substring(0, this.timezone.length - 1);
    }
  }
};
</script>
