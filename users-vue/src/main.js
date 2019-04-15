// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { CHECK_AUTH } from '@/store/actions.type'

// Plugins
import './plugins/bootstrapvue'
import './plugins/vuematerial'
import './plugins/vuelidate'
import './plugins/vuejsmodal'
import './plugins/vueloadingoverlay'
import './plugins/vueerrorpage'

// Vue-Awesome
import Icon from 'vue-awesome/components/Icon'

// Custom Style
import '@/assets/scss/main.scss'

import ApiService from '@/common/api.service'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)

ApiService.init()

router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(() => {
        if (store.getters.isAuthenticated) {
          if (to.meta.onlyForUnAuth) {
            next('/dashboard')
            return
          }
          if (!store.getters.isVerified) {
            if (to.name === 'ActivateUser') {
              next()
              return
            } else if (to.name !== 'EmailVerification') {
              next('/emailVerification')
              return
            }
          } else {
            if (!store.getters.isCompleted && to.name !== 'PersonalInfo') {
              next('completeRegistration')
              return
            }
            if (store.getters.isCompleted && to.name === 'PersonalInfo') {
              next('/dashboard')
              return
            }
            if (to.name === 'EmailVerification') {
              next('/dashboard')
              return
            }
          }
        } else {
          if (to.meta.requiresAuth) {
            next('/login')
            return
          }
        }
        next()
      })
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
