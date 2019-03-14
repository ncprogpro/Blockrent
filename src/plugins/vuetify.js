import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi' || 'fa',
  theme: {
    primary: colors.orange,
    secondary: colors.shades.black,
    lighten2: colors.orange.lighten1,
    lime: colors.lime,
    yground: '#FBBA23',
    leftsidebc: '#f0f3f7'
  },
  options: {
    customProperties: true
  }
})
