import Vue from 'vue'
import VueI18n from 'vue-i18n' // or whatever the module is called


Vue.use(VueI18n) // you don't need this in main.js

import { store } from './store/store.js'
// this seting is to direct to DEV/QA/PRDN environment
import { messages } from './store/mastersUT/messages.js'
// import {isObject, mergeDeep} from './helper.js' // this has issues on reactivity. hence not used

// 2
// var messages = {}

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages // set locale messages

})

// 2
// messages = mergeDeep(messages, store.state.node1_messages, store.state.node2_messages, store.state.node3_messages )

// 2
// messages.en = Object.assign({}, messages.en, store.state.node1_messages.en, store.state.node2_messages.en, store.state.node3_messages.en)
// messages.ta = Object.assign({}, messages.ta, store.state.node1_messages.ta, store.state.node2_messages.ta, store.state.node3_messages.ta)
// messages.te = Object.assign({}, messages.te, store.state.node1_messages.te, store.state.node2_messages.te, store.state.node3_messages.te)

// if new languages are added; add below as well as add in store.state.text_details_messages
messages.en = Object.assign(messages.en, store.state.text_details_messages.en, store.state.entity_desc_messages.en )
messages.ta = Object.assign(messages.ta, store.state.text_details_messages.ta, store.state.entity_desc_messages.ta )
messages.te = Object.assign(messages.te, store.state.text_details_messages.te, store.state.entity_desc_messages.te )
