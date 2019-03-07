import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'
import Preferences from './views/Preferences'
import Property from './views/Property'
import NotFound from './views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('./views/RegistrationForm')
    },
    {
      path: '/registration/thanks',
      name: 'thanks',
      component: () => import('./views/FormThankYou')
    },
    {
      path: '/registration/temp',
      name: 'temp',
      component: () => import('./views/BankDetailsForm')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/users/:userId/properties/:propertyId',
      name: 'property',
      component: Property
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: Preferences
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        title: 'Not Found'
      }
    }
  ]
})
