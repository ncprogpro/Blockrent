import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    username: '',
    apiKey: '',
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
    setLoggedInfo(state, payload) {
      state.username = payload.username
      state.apiKey = payload.api_key
      if (state.apiKey) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = state.username + ':' + state.apiKey
      }
      console.log(state.username)
      console.log(state.apiKey)
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
    userLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log(userInfo)
        axios({
          url: 'http://127.0.0.1:8000/api/v1/users/login/',
          data: userInfo,
          method: 'POST'
        })
          .then(resp => {
            console.log(resp.data)
            commit('setLoggedInfo', resp.data)
            commit('setIsAuthenticated', true)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            commit('setLoggedInfo', {'username': null, 'api_key': null})
            commit('setIsAuthenticated', false)
            reject(err)
          })
      })
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
    },
    getApplicationDetail({ commit }, app) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://127.0.0.1:8000/api/v1/applications/' + app.appId + '/', method: 'GET' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
