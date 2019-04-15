import Vue from 'vue'
import ErrorPage from 'vue-error-page'

window.eventBus = new Vue()

Vue.use(ErrorPage, {
  resolver: (component) => {
    return require('@/views/Errors/' + component).default
  }
})
