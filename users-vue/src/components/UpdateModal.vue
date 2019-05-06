<template>
  <form @submit.prevent="submit">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Change {{ modalType }}</h5>
        <button type="button" class="close" aria-label="Close" @click="$emit('close')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="modalType === 'name'">
          <md-field :class="{'md-invalid': $v.firstName.$error}">
            <label>First name</label>
            <md-input v-model="firstName"></md-input>
            <span class="md-error" v-if="!$v.firstName.required">Enter first name</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.lastName.$error}">
            <label>Last name</label>
            <md-input v-model="lastName"></md-input>
            <span class="md-error" v-if="!$v.lastName.required">Enter last name</span>
          </md-field>
        </div>
        <div v-else-if="modalType === 'email'">
          <p>
            <span style="opacity: 0.5">Your email</span>
            <br>
            <span style="color: #00A161;">{{ currentUser.email }}</span>
          </p>
          <md-field :class="{'md-invalid': $v.newEmail.$error}">
            <label>Add new email</label>
            <md-input v-model.trim="newEmail"></md-input>
            <span class="md-helper-text">Please use a valid email. You need to verify this email</span>
            <span class="md-error" v-if="!$v.newEmail.required">Enter email address</span>
            <span class="md-error" v-if="!$v.newEmail.email">Enter a valid email</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.newEmailConfirm.$error}">
            <label>Confirm email</label>
            <md-input v-model.trim="newEmailConfirm"></md-input>
            <span class="md-error" v-if="!$v.newEmailConfirm.required">Confirm email address</span>
            <span
              class="md-error"
              v-if="$v.newEmailConfirm.required && !$v.newEmailConfirm.sameAsPassword"
            >Those emails didn't match</span>
          </md-field>
        </div>
        <div v-else-if="modalType === 'address'">
          <country-list-component
            v-on:selected="setCountry"
            :customClass="{'md-invalid': $v.country.$error || Object.keys(errors).includes('address') }"
            :requiredError="!$v.country.required"
            :choiceError="!$v.country.countryChoiceValidator"
            :backendError="$v.country.required && $v.country.countryChoiceValidator && countryError"
          ></country-list-component>
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
          </div>
        </div>
        <div v-else-if="modalType === 'timezone'">
          <timezone-component
            v-on:selected="setTimezone"
            :customClass="{'md-invalid': $v.timezone.$error || Object.keys(errors).includes('timezone')}"
            :requiredError="!$v.timezone.required"
            :choiceError="!$v.timezone.timezoneChoiceValidator"
            :backendError="$v.timezone.required && $v.timezone.timezoneChoiceValidator && timezoneError"
          ></timezone-component>
        </div>
      </div>
      <div class="modal-footer">
        <md-button type="submit" class="md-raised md-primary">UPDATE</md-button>
        <button type="button" class="btn btn-link btn-cancel" @click="$emit('close')">CANCEL</button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { UPDATE_USER } from "@/store/actions.type";
import { required, email, sameAs } from "vuelidate/lib/validators";
import TimezoneComponent from "@/components/TimezoneComponent";
import StateComponent from "@/components/StateComponent";
import CountryListComponent from "@/components/CountryListComponent";
import {
  countryChoiceValidator,
  timezoneChoiceValidator
} from "@/plugins/customvalidators";

export default {
  name: "UpdateModal",
  components: {
    TimezoneComponent,
    StateComponent,
    CountryListComponent
  },
  props: {
    modalType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      address1: "",
      address2: "",
      state: "",
      zipCode: "",
      timezone: "",
      newEmail: "",
      newEmailConfirm: "",
      timezoneError: "",
      countryError: "",
      addressError: ""
    };
  },
  validations() {
    if (this.modalType === "name") {
      return {
        firstName: { required },
        lastName: { required }
      };
    } else if (this.modalType === "email") {
      return {
        newEmail: { required, email },
        newEmailConfirm: { required, sameAsEmail: sameAs("newEmail") }
      };
    } else if (this.modalType === "address") {
      return {
        country: { required, countryChoiceValidator },
        address1: { required },
        city: { required },
        zipCode: { required }
      };
    } else if (this.modalType === "timezone") {
      return {
        timezone: { required, timezoneChoiceValidator }
      };
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  mounted() {
    this.firstName = this.$store.state.auth.user.firstName;
    this.lastName = this.$store.state.auth.user.lastName;
    if (this.$store.state.auth.user.address) {
      this.country = this.$store.state.auth.user.address.country;
      this.city = this.$store.state.auth.user.address.city;
      this.address1 = this.$store.state.auth.user.address.line_1;
      this.address2 = this.$store.state.auth.user.address.line_2;
      this.state = this.$store.state.auth.user.address.state;
      this.zipCode = this.$store.state.auth.user.address.zipCode;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {};
        if (this.modalType === "name") {
          user.firstName = this.firstName;
          user.lastName = this.lastName;
        }

        if (this.modalType === "address") {
          user.address = {
            line_1: this.address1,
            line_2: this.address2,
            country: this.country,
            city: this.city,
            state: this.state,
            zipCode: this.zipCode
          };
        }
        if (this.modalType === "timezone") {
          user.timezone = this.timezone;
        }
        this.$store
          .dispatch(UPDATE_USER, user)
          .then(() => {
            this.$emit("close");
          })
          .catch(error => {
            if (error.status === 500) {
              this.$_error("InternalServer");
            }
          });
      }
    },
    setTimezone(value) {
      this.timezone = value;
    },
    setState(value) {
      this.state = value;
    },
    setCountry(value) {
      this.country = value;
    }
  }
};
</script>
