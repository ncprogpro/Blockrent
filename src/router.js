import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './container/Dashboard'
import Profile from './views/Profile'
import Preferences from './views/Preferences'
import Property from './views/Property'
import NotFound from './views/NotFound'
import LandingPage from './views/Landing'
import Registration from './views/RegistrationForm'
import ConfirmApplication from './views/ConfirmApplication'
import ListView from './views/ListView'
import DetailView from './views/DetailView'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/registration/:applicationid/confirm/',
      name: 'confirm',
      props: true,
      component: ConfirmApplication
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
      path: '/dashboard',
      name: 'dashboard',
      redirect: 'dashboard/list',
      component: Dashboard,
      children: [
        {
          path: 'list',
          name: 'list',
          component: ListView
        },
        {
          path: 'detail/:applicationid',
          name: 'detail',
          props: true,
          component: DetailView
        }
      ]
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/registration']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('apiKey')
  if (authRequired && !loggedIn) {
    return next('/')
  }
  if (loggedIn && to.name === 'landing') {
    return next('/dashboard')
  }
  next()
})

export default router
