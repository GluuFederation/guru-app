import Vue from 'vue'
import App from './App.vue'
import router from "./router"

// Plugins
import './plugins/bootstrapvue'
import './plugins/vueawesome'
import './plugins/vuemultiselect'
import './plugins/vuectkdatetimepicker'
import './plugins/vuefilterpluralize'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
