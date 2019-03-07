import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false
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
    }
  }
})
