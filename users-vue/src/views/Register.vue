<template>
  <div class="main-wrapper">
    <div class="left-div">
      <img src="@/assets/static/Artwork.png" class="signup-flex signup-flex-img"/>
    </div>
    <div class="right-div">
      <form @submit.prevent="validateBeforeSubmit" class="loading-parent">
        <md-card class="md-layout-item signup-flex">
          <md-card-header>
            <div class="md-title">Create your Gluu Account</div>
            <div class="md-subhead">To Continue to Gluu Support</div>
          </md-card-header>

          <md-card-content>
            <div class="mobile-screen-1" v-if="!isMobileDevice || isMobileDevice && mobileScreen===1">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                  <md-field :class="{'md-invalid': $v.firstName.$error }">
                    <label>First name</label>
                    <md-input v-model.trim="firstName"></md-input>
                    <span class="md-error" v-if="!$v.firstName.required">Enter first name</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-50">
                  <md-field :class="{'md-invalid': $v.lastName.$error }">
                    <label>Last name</label>
                    <md-input v-model.trim="lastName"></md-input>
                    <span class="md-error" v-if="!$v.lastName.required">Enter last name</span>
                  </md-field>
                </div>
              </div>

              <md-field :class="{'md-invalid': $v.email.$error || isEmailErrors }">
                <label>Enter your email address</label>
                <md-input v-model.trim="email" @input="purgeEmailError"></md-input>
                <span class="md-helper-text">Please use a valid email. You need to verify this email</span>
                <span class="md-error" v-if="!$v.email.required">Enter a email</span>
                <span class="md-error" v-if="!$v.email.email">Enter a valid email</span>
                <span class="md-error" v-if="$v.email.required && $v.email.email && isEmailErrors">{{ emailErrors }}</span>
              </md-field>
            </div>
            <div class="mobile-screen-2" v-if="!isMobileDevice || isMobileDevice && mobileScreen===2">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50 md-medium-size-100">
                  <md-field :class="{'md-invalid': $v.password.$error }">
                    <label>Password</label>
                    <md-input type="password" v-model="password"></md-input>
                    <span class="md-helper-text password-helper" v-show="!$v.repeatPassword.$error">Use 8 or more characters with a mix of letters, numbers & symbols</span>
                    <span class="md-error" v-if="!$v.password.required">Enter a password</span>
                    <span class="md-error" v-if="!$v.password.minLength">Password must be at least {{ $v.password.$params.minLength.min }} character long</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-50 md-medium-size-100 confirm-password">
                  <md-field :class="{'md-invalid': $v.repeatPassword.$error }">
                    <label>Confirm Password</label>
                    <md-input type="password" v-model="repeatPassword"></md-input>
                    <span class="md-error" v-if="!$v.repeatPassword.required">Confirm your password</span>
                    <span class="md-error" v-if="$v.repeatPassword.required && !$v.repeatPassword.sameAsPassword">Those passwords didn't match</span>
                  </md-field>
                </div>
              </div>
            </div>
          </md-card-content>

          <md-card-actions md-alignment="left">
            <md-button type="submit" class="md-raised md-primary mobile-btn-100" :disabled="sending">{{ buttonName }}</md-button>
          </md-card-actions>
          <md-card-actions md-alignment="left">
            <p>Already have an account?<md-button class="md-primary second-btn-link" to="/login">Log In</md-button></p>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { REGISTER } from '@/store/actions.type'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { PURGE_EMAIL_ERROR } from '@/store/mutations.type'

export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      buttonName: 'SIGN UP',
      isMobileDevice: false,
      mobileScreen: 0,
      sending: false
    }
  },
  validations () {
    if (!this.isMobileDevice) {
      return {
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        },
        repeatPassword: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    } else {
      if (this.mobileScreen === 1) {
        return {
          firstName: {
            required
          },
          lastName: {
            required
          },
          email: {
            required,
            email
          }
        }
      } else if (this.mobileScreen === 2) {
        return {
          password: {
            required,
            minLength: minLength(8)
          },
          repeatPassword: {
            required,
            sameAsPassword: sameAs('password')
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'emailErrors',
      'isEmailErrors'
    ])
  },
  mounted () {
    this.email = this.$route.query.email
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth())
    })
  },
  methods: {
    validateBeforeSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.isMobileDevice && this.mobileScreen === 1) {
          this.mobileScreen = 2
          this.buttonName = 'FINISH'
          return
        }
        this.sending = true
        let loader = this.$loading.show({
          container: null
        })
        this.$store.dispatch(REGISTER, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          serviceFrom: this.$route.query.from,
          company: this.$route.query.company,
          activationKey: this.$route.query.key
        })
          .then(() => {
            loader.hide()
            this.$router.push({ name: 'EmailVerification' })
          })
          .catch((error) => {
            if (error.status === 500) {
              this.$_error('InternalServer')
            }
            this.mobileScreen = 1
            this.buttonName = 'NEXT'
            this.sending = false
            loader.hide()
          })
      }
    },
    getWindowWidth () {
      if (document.documentElement.clientWidth < 600) {
        this.isMobileDevice = true
        this.mobileScreen = 1
        this.buttonName = 'NEXT'
      } else {
        this.isMobileDevice = false
        this.mobileScreen = 0
        this.buttonName = 'SIGN UP'
      }
    },
    purgeEmailError () {
      if (this.isEmailErrors) {
        this.$store.commit(PURGE_EMAIL_ERROR)
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth())
  }
}
</script>

<style scoped>

</style>
