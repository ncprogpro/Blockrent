import Vue from 'vue'
import { getFormattedCurrency } from './utils/format'

Vue.filter('withCurrency', amount => getFormattedCurrency(amount))
