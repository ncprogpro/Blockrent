import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: colors.orange,
    secondary: colors.shades.black
  },
  options: {
    customProperties: true
  }
})
