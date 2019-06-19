<template>
  <div>
    <md-autocomplete
      v-model="country"
      v-on:md-opened="opened"
      v-on:md-changed="changed"
      :md-options="countriesNameList"
      :class="customClass"
      class="state-picker"
      :autocomplete="autocomplete"
    >
      <label>Country</label>
      <span class="md-error" v-if="requiredError">Enter your country</span>
      <span class="md-error" v-if="!requiredError && choiceError">Select the country from the list</span>
      <span class="md-error" v-if="backendError">This value is not valid</span>
    </md-autocomplete>
  </div>
</template>

<script>
import {
  countriesNameList,
  countriesCodeList
} from "@/plugins/customvalidators";

export default {
  name: "CountryListComponent",
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
      country: "",
      countriesNameList: [],
      countriesCodeList: []
    };
  },
  mounted() {
    this.countriesNameList = countriesNameList;
    this.countriesCodeList = countriesCodeList;

    if (this.$store.state.auth.user.address) {
      const countryCode = this.$store.state.auth.user.address.country;
      if (countryCode) {
        for (let i = 0; i < this.countriesCodeList.length; i++) {
          if (this.countriesCodeList[i] === countryCode) {
            this.country = this.countriesNameList[i];
            break;
          }
        }
      }
    }
  },
  methods: {
    changed(value) {
      if (value) {
        for (let i = 0; i < this.countriesNameList.length; i++) {
          if (this.countriesNameList[i] === value) {
            value = this.countriesCodeList[i];
            break;
          }
        }
      }
      this.$emit("selected", value);
    },
    opened() {
      this.country += " ";
      this.country = this.country.substring(0, this.country.length - 1);
    }
  },
  computed: {
    autocomplete() {
      return this.globalProps.isChrome ? "disabled" : "off";
    }
  }
};
</script>
