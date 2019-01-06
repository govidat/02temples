// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import Vuex from 'vuex'
import { store } from './store/store.js'

// import L from 'leaflet'
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
// 1
import i18n from './i18n'

// 1 import VueI18n from 'vue-i18n'  // all these //1 content moved to i18n.js
// 1 Vue.use(VueI18n)

// 1 import { messages } from './store/mastersUT/messages.js'
// 1 import {isObject, mergeDeep} from './helper.js'

// Create VueI18n instance with options
// 1 const i18n = new VueI18n({
// 1   locale: 'en', // set locale
// 1   fallbackLocale: 'en',
// 1   messages // set locale messages
// 1 })

Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})


// 1 var messages3 = mergeDeep(store.state.node1_messages, store.state.node2_messages)
// 1 alert("messages3" + JSON.stringify(messages3))
// Object.assign(messages.en, messages2.en)
// 1 messages.en = Object.assign({}, messages.en, store.state.node1_messages.en, store.state.node2_messages.en, store.state.node3_messages.en)
// 1 messages.ta = Object.assign({}, messages.ta, store.state.node1_messages.ta, store.state.node2_messages.ta, store.state.node3_messages.ta)
// 1 messages.te = Object.assign({}, messages.te, store.state.node1_messages.te, store.state.node2_messages.te, store.state.node3_messages.te)

// messages.en = {...messages.en, ...store.state.messages2.en, ...store.state.node1_messages.en, ...store.state.node2_messages.en, ...store.state.node3_messages.en}
// messages.ta = {...messages.ta, ...store.state.messages2.ta, ...store.state.node1_messages.ta, ...store.state.node2_messages.ta, ...store.state.node3_messages.ta}
// messages.te = {...messages.te, ...store.state.messages2.te, ...store.state.node1_messages.te, ...store.state.node2_messages.te, ...store.state.node3_messages.te}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  mounted() {
   this.$store.dispatch('initnode')
  },
  components: { App },
  template: '<App/>'
})
