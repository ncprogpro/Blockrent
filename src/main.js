import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './app-filters'
import Axios from 'axios'
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
const username = localStorage.getItem('username')
const apiKey = localStorage.getItem('apiKey')
if (apiKey) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = username + ':' + apiKey
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
