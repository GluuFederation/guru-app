<template>
  <div>
    <md-autocomplete
      v-model="state"
      v-on:md-opened="opened"
      v-on:md-selected="emitSelectedEvent(state)"
      :md-options="statesNameList"
      class="state-picker"
      v-bind:autocomplete="autocomplete"
    >
      <label>State</label>
    </md-autocomplete>
  </div>
</template>

<script>
import UsaStates from "usa-states";
export default {
  name: "StateComponent",
  data() {
    return {
      state: "",
      statesNameList: [],
      statesAbbrevList: []
    };
  },
  computed: {
    autocomplete() {
      return this.globalProps.isChrome ? "disabled" : "off";
    }
  },
  mounted() {
    if (this.$store.state.auth.user.address) {
      this.state = this.$store.state.auth.user.address.state;
    }
    const usStates = new UsaStates.UsaStates();
    this.statesNameList = usStates.arrayOf("names");
    this.statesAbbrevList = usStates.arrayOf("abbreviations");
  },
  methods: {
    emitSelectedEvent(value) {
      this.$emit("selected", value);
      // if (value) {
      //   for (let i = 0; i < this.statesNameList.length; i++) {
      //     if (this.statesNameList[i] === value) {
      //       this.$emit('selected', this.statesAbbrevList[i])
      //       break
      //     }
      //   }
      // }
    },
    opened() {
      this.state += " ";
      this.state = this.state.substring(0, this.state.length - 1);
    }
  }
};
</script>
