import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    application: {},
    status: ''
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_error(state) {
      state.status = 'error'
    }
  },
  actions: {
    userRegister({ commit }, { email, password }) {
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(user => {
      //     commit('setUser', user)
      //     commit('setIsAuthenticated', true)
      //     router.push('/about')
      //   })
      //   .catch(() => {
      //     commit('setUser', null)
      //     commit('setIsAuthenticated', false)
      //     router.push('/')
      //   })
    },
    userLogin({ commit }, { email, password }) {
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(user => {
      //     commit('setUser', user)
      //     commit('setIsAuthenticated', true)
      //     router.push('/about')
      //   })
      //   .catch(() => {
      //     commit('setUser', null)
      //     commit('setIsAuthenticated', false)
      //   })
    },
    userLogout({ commit }) {
      // firebase
      //   .auth()
      //   .signOut()
      //   .then(() => {
      //     commit('setUser', null)
      //     commit('setIsAuthenticated', false)
      //     router.push('/')
      //   })
      //   .catch(() => {
      //     commit('setUser', null)
      //     commit('setIsAuthenticated', false)
      //     router.push('/')
      //   })
    },
    registerApplication({ commit }, application) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://127.0.0.1:8000/api/v1/registerApplication/', data: application, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
      })
    }
  }
})
