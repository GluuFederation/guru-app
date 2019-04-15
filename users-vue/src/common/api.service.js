import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
  },

  query (resource, params) {
    return Vue.axios.get(resource, params)
  },

  get (resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`)
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  }
}

export default ApiService
