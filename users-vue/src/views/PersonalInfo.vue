<template>
  <div class="personal-card">
    <form @submit.prevent="validateBeforeSubmit" class="loading-parent">
      <md-card
        class="md-layout-item md-size-40 md-medium-size-55 md-small-size-80 md-xsmall-size-100"
      >
        <md-card-header>
          <div class="md-title">Hi {{ currentUser.firstName }}, Welcome to Gluu</div>
          <div class="md-subhead">Provide a few additional details to complete account registration</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <country-list-component
                v-on:selected="setCountry"
                :customClass="{'md-invalid': $v.country.$error || countryError }"
                :requiredError="!$v.country.required"
                :choiceError="!$v.country.countryChoiceValidator"
                :backendError="$v.country.required && $v.country.countryChoiceValidator && countryError"
              ></country-list-component>
            </div>
          </div>

          <md-field :class="{'md-invalid': $v.address1.$error}">
            <label>Address(line1)</label>
            <md-input v-model="address1"></md-input>
            <span class="md-error" v-if="!$v.address1.required">Enter your address</span>
          </md-field>

          <md-field>
            <label>Address(line2)</label>
            <md-input v-model="address2"></md-input>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field :class="{'md-invalid': $v.city.$error}">
                <label>City</label>
                <md-input v-model.trim="city"></md-input>
                <span class="md-error" v-if="!$v.city.required">Enter your city</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <state-component v-on:selected="setState"></state-component>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field :class="{'md-invalid': $v.zipCode.$error}">
                <label>ZIP code</label>
                <md-input v-model="zipCode"></md-input>
                <span class="md-error" v-if="!$v.zipCode.required">Enter your Zip Code</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <timezone-component
                v-on:selected="setTimezone"
                :customClass="{'md-invalid': $v.timezone.$error || timezoneError}"
                :requiredError="!$v.timezone.required"
                :choiceError="!$v.timezone.timezoneChoiceValidator"
                :backendError="$v.timezone.required && $v.timezone.timezoneChoiceValidator && timezoneError"
              ></timezone-component>
            </div>
          </div>
        </md-card-content>

        <md-card-actions md-alignment="left">
          <md-button
            type="submit"
            class="md-raised md-primary mobile-btn-100"
            :disabled="sending"
          >Finish</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { UPDATE_USER } from "@/store/actions.type";
import TimezoneComponent from "@/components/TimezoneComponent";
import StateComponent from "@/components/StateComponent";
import CountryListComponent from "@/components/CountryListComponent";
import { required } from "vuelidate/lib/validators";
import {
  countryChoiceValidator,
  timezoneChoiceValidator
} from "@/plugins/customvalidators";
import paths from "@/router/paths";

export default {
  name: "PersonalInfo",
  components: {
    StateComponent,
    TimezoneComponent,
    CountryListComponent
  },
  data: () => ({
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    timezone: "",
    timezoneError: "",
    countryError: "",
    sending: false
  }),
  validations() {
    return {
      country: { required, countryChoiceValidator },
      address1: { required },
      city: { required },
      zipCode: { required },
      timezone: { required, timezoneChoiceValidator }
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  mounted() {
    this.setTimezone("America/Chicago");
  },
  methods: {
    setState(value) {
      this.state = value;
    },
    setTimezone(value) {
      this.purgeTimezoneError();
      this.timezone = value;
    },
    setCountry(value) {
      this.purgeCountryError();
      this.country = value;
    },
    purgeCountryError() {
      this.countryError = "";
    },
    purgeTimezoneError() {
      this.timezoneError = "";
    },
    validateBeforeSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;
        let loader = this.$loading.show({
          container: null
        });
        this.$store
          .dispatch(UPDATE_USER, {
            address: {
              line_1: this.address1,
              line_2: this.address2,
              country: this.country,
              city: this.city,
              state: this.state,
              zipCode: this.zipCode
            },
            timezone: this.timezone,
            isProfileCompleted: true
          })
          .then(() => {
            loader.hide();
            this.$router.push(paths.DASHBOARD);
          })
          .catch(error => {
            loader.hide();
            this.sending = false;
            if (error.status === 500) {
              this.$_error("InternalServer");
            }
          });
      }
    }
  }
};
</script>
