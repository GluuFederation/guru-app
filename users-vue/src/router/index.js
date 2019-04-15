import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register'),
      meta: { onlyForUnAuth: true }
    },
    {
      path: '/emailVerification',
      name: 'EmailVerification',
      component: () => import('@/views/EmailVerification'),
      meta: { requiresAuth: true }
    },
    {
      path: '/completeRegistration',
      name: 'PersonalInfo',
      component: () => import('@/views/PersonalInfo'),
      meta: { requiresAuth: true, requiresNonComplete: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user-profile',
      name: 'UserProfile',
      component: () => import('@/views/UserProfile'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth/activate/:userId/:pin',
      name: 'ActivateUser',
      component: () => import('@/views/ActivateUser')
    },
    {
      path: '/login',
      name: 'LoginRedirectView',
      component: () => import('@/views/LoginRedirectView')
    },
    {
      path: '/login-callback',
      name: 'LoginCallback',
      component: () => import('@/views/LoginCallback')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/Errors/NotFound')
    }
  ]
})
