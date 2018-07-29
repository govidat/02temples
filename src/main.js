// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import { store } from './store/store.js'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import { messages } from './store/mastersUT/messages.js'
// import { messages2 } from './store/mastersUT/messages2.js'
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})
Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})
// Vue.use(Vuetify)
// merge messages2 into messages

// Object.assign(messages.en, messages2.en)
messages.en = {...messages.en, ...store.state.messages2.en, ...store.state.node1_messages.en, ...store.state.node2_messages.en, ...store.state.node3_messages.en}
messages.ta = {...messages.ta, ...store.state.messages2.ta, ...store.state.node1_messages.ta, ...store.state.node2_messages.ta, ...store.state.node3_messages.ta}
messages.te = {...messages.te, ...store.state.messages2.te, ...store.state.node1_messages.te, ...store.state.node2_messages.te, ...store.state.node3_messages.te}

// messages.en = {...messages.en, ...store.state.node1_messages.en}
// messages.ta = {...messages.ta, ...store.state.node1_messages.ta}
// messages.te = {...messages.te, ...store.state.node1_messages.te}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  created() {
   this.$store.dispatch('initStore')
  },
  components: { App },
  template: '<App/>'
})
