// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'babel-polyfill'
import Vuex from 'vuex'
import { store } from './store/store.js'
import axios from 'axios'
// this seting is to direct to DEV/QA/PRDN environment for getting the data from postgres
axios.defaults.baseURL = 'http://18.221.15.229/devapi'

import L from 'leaflet'
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

import i18n from './i18n'


Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  mounted() {
   this.$store.dispatch('initnode')
   this.$store.dispatch('init_entity_act')
  },
  components: { App },
  template: '<App/>'
})
