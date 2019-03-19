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
      return state.user !== '' && state.user !== ''
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

      localStorage.setItem('username', payload.username)
      localStorage.setItem('apiKey', payload.api_key)
      localStorage.setItem('user_id', payload.account_id)
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'ApiKey ' + state.username + ':' + state.apiKey
    },
    clearLoginInfo(state) {
      state.username = ''
      state.apiKey = ''
      state.isAuthenticated = false
      localStorage.setItem('username', '')
      localStorage.setItem('apiKey', '')
      localStorage.setItem('user_id', '')
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'ApiKey ' + state.username + ':' + state.apiKey
      router.push('/')
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_error(state) {
      state.status = 'error'
    }
  },
  actions: {
    userLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype
          .$http({
            url: 'http://127.0.0.1:8000/api/v1/users/login/',
            data: userInfo,
            method: 'POST'
          })
          .then(resp => {
            commit('setLoggedInfo', resp.data)
            commit('setIsAuthenticated', true)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            commit('clearLoginInfo')
            reject(err)
          })
      })
    },
    userLogout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype
          .$http({
            url: 'http://127.0.0.1:8000/api/v1/users/logout/',
            method: 'GET'
          })
          .then(resp => {
            commit('clearLoginInfo')
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            commit('clearLoginInfo')
            reject(err)
          })
      })
    },
    registerApplication({ commit }, application) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Vue.prototype
          .$http({ url: 'http://127.0.0.1:8000/api/v1/registerApplication/', data: application, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    },
    getApplicationList({commit}) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: 'http://127.0.0.1:8000/api/v1/applications/', method: 'GET' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    },
    getApplicationDetail({ commit }, app) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: 'http://127.0.0.1:8000/api/v1/application-detail/' + app.appId + '/', method: 'GET' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    },
    confirmApplication({ commit }, app) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({
            url: 'http://127.0.0.1:8000/api/v1/application-detail/' + app.appId + '/',
            method: 'PATCH',
            data: app
          })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    },
    storeFilterSet({ commit }, app) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: 'http://127.0.0.1:8000/api/v1/filters/', method: 'POST', data: app })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    },
    getFilterList({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.prototype
          .$http({ url: 'http://127.0.0.1:8000/api/v1/filters/', method: 'GET' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    },
    getUpdates({ commit }) {
      return new Promise((resolve, reject) => {
        let params = {}
        params['who'] = localStorage.getItem('user_id')
        Vue.prototype.$http.get('http://127.0.0.1:8000/api/v1/events/', {params: params})
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            if (err.response.status === 401) {
              commit('clearLoginInfo')
            }
            reject(err)
          })
      })
    }
  }
})
