import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


import { languages } from './customize.js'
import {ism, pps, ism_pps } from './mastersUT/General.js'
import {saint, saint_hier, ism_saint, temple_saint, } from './mastersUT/saints.js'

import {temple, temple_hier, ism_temple, pps_temple} from './mastersUT/temples.js'
import {song, song_hier, ism_song, temple_song, saint_song} from './mastersUT/songs.js'
// import {saint_detail} from './mastersUT/saintdetail.js';
// import {temple_detail} from './mastersUT/templedetail.js';

// import { messages } from './mastersUT/messages.js'
// import { messages2 } from './mastersUT/messages2.js';
// import { node1_messages } from './mastersUT/node1_messages.js';
// import { node2_messages } from './mastersUT/node2_messages.js';
// import { node3_messages } from './mastersUT/node3_messages.js';


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: languages,
    // messages: messages,
    // messages2: messages2,
    // saint-details
   // node1_messages: node1_messages,
    // node2_messages: node2_messages,
    // node3_messages: node3_messages,
    node1_messages: {
      en: {saint_expln_header_text: {}},
      ta: {saint_expln_header_text: {}},
      te: {saint_expln_header_text: {}}
    },

    node2_messages: {
      en: {temple_expln_header_text: {}},
      ta: {temple_expln_header_text: {}},
      te: {temple_expln_header_text: {}}
    },

    node3_messages: {
      en: {
        song_text: {},
        song_word: {},
        word_meaning: {},
        song_expln_header_text: {}
      },
      ta: {
        song_text: {},
        song_word: {},
        word_meaning: {},
        song_expln_header_text: {}
      },
      te: {
        song_text: {},
        song_word: {},
        word_meaning: {},
        song_expln_header_text: {}
    }
    },

    // add_ln_id: [],
    // all_ln_id : ['en'],

    ism: ism,

    saint: saint,
    saint_hier: saint_hier,
    ism_saint: ism_saint,

    temple_saint: temple_saint,

    temple: temple,
    temple_hier: temple_hier,
    ism_temple: ism_temple,
    pps_temple: pps_temple,

    song: song,
    song_hier: song_hier,
    ism_song: ism_song,


    saint_song: saint_song,
    temple_song: temple_song,

    pps: pps,
    ism_pps: ism_pps,

    // saint_detail: saint_detail,
    // temple_detail: temple_detail,

    // songsDetails: [],
    songsDetailsId: [],
    templesDetailsId: [],
    saintsDetailsId: [],
    isLoading: false,
  },

  getters: {

  },

  mutations: {

      // initStore (state) {
      //   // using the Map set and get function to refer subsequently
      //   state.map_desc = new Map();
      //   // state.map_desc.set('header', state.header_desc).set('node0', state.ism_desc).set('node1', state.saint_desc).set('node2', state.temple_desc).set('node3', state.song_desc).set('node4', state.pps_desc);
      //   state.map_desc.set('node2', state.temple_desc).set('node3', state.song_desc);
      //   state.map_detail = new Map();
      //   state.map_detail.set('node1', state.saint_detail).set('node2', state.temple_detail);
      //   state.map_node = new Map();
      //   state.map_node.set('node0', state.ism).set('node1', state.saint).set('node2', state.temple).set('node3', state.song).set('node1_0', state.saint_ism).set('node2_0', state.temple_ism).set('node3_0', state.song_ism);
      // },

      // update_locale (state, payload) {
      //     // state.main_ln_id = payload;
      //     // var x = [payload];
      //     state.add_ln_id = state.add_ln_id.filter(x => x != payload);
      //     state.all_ln_id = [payload].concat(state.add_ln_id);
      //   },

      // update_add_ln (state, payload) {
      //     state.add_ln_id = payload[0];
      //     // var x = [state.main_ln_id];
      //     // state.all_ln_id = [state.main_ln_id].concat(payload);
      //     state.all_ln_id = [payload[1]].concat(payload[0]);
      //   },
      saintsDetailsMut (state, payload) {
          if (payload.ln_id == "en") {
            if (payload.expln_header_text) {Object.assign(state.node1_messages.en.saint_expln_header_text, {[payload.saint_id]: payload.expln_header_text})}
          }
          else if (payload.ln_id == "ta") {
            if (payload.expln_header_text) {Object.assign(state.node1_messages.ta.saint_expln_header_text, {[payload.saint_id]: payload.expln_header_text})}
          }
          else if (payload.ln_id == "te") {
            if (payload.expln_header_text) {Object.assign(state.node1_messages.te.saint_expln_header_text, {[payload.saint_id]: payload.expln_header_text})}
          }
          if (state.isLoading) {
            state.isLoading = false
          };
        },

      saintsDetailsIdMut (state, payload) {
          if (state.saintsDetailsId.indexOf(payload.saint_id) === -1) {
              state.saintsDetailsId.push(payload);
          };
      },

      templesDetailsMut (state, payload) {
          if (payload.ln_id == "en") {
            if (payload.expln_header_text) {Object.assign(state.node2_messages.en.temple_expln_header_text, {[payload.temple_id]: payload.expln_header_text})}
          }
          else if (payload.ln_id == "ta") {
            if (payload.expln_header_text) {Object.assign(state.node2_messages.ta.temple_expln_header_text, {[payload.temple_id]: payload.expln_header_text})}
          }
          else if (payload.ln_id == "te") {
            if (payload.expln_header_text) {Object.assign(state.node2_messages.te.temple_expln_header_text, {[payload.temple_id]: payload.expln_header_text})}
          }
          if (state.isLoading) {
            state.isLoading = false
          };
        },

      templesDetailsIdMut (state, payload) {
          if (state.templesDetailsId.indexOf(payload.temple_id) === -1) {
              state.templesDetailsId.push(payload);
          };
      },


    songsDetailsMut (state, payload) {
        if (payload.ln_id == "en") {
          if (payload.song_text) {Object.assign(state.node3_messages.en.song_text, {[payload.song_id]: payload.song_text})}
          if (payload.song_word) {Object.assign(state.node3_messages.en.song_word, {[payload.song_id]: payload.song_word})}
          if (payload.word_meaning) {Object.assign(state.node3_messages.en.word_meaning, {[payload.song_id]: payload.word_meaning})}
          if (payload.expln_header_text) {Object.assign(state.node3_messages.en.song_expln_header_text, {[payload.song_id]: payload.expln_header_text})}
        }
        else if (payload.ln_id == "ta") {
          if (payload.song_text) {Object.assign(state.node3_messages.ta.song_text, {[payload.song_id]: payload.song_text})}
          if (payload.song_word) {Object.assign(state.node3_messages.ta.song_word, {[payload.song_id]: payload.song_word})}
          if (payload.word_meaning) {Object.assign(state.node3_messages.ta.word_meaning, {[payload.song_id]: payload.word_meaning})}
          if (payload.expln_header_text) {Object.assign(state.node3_messages.ta.song_expln_header_text, {[payload.song_id]: payload.expln_header_text})}
        }
        else if (payload.ln_id == "te") {
          if (payload.song_text) {Object.assign(state.node3_messages.te.song_text, {[payload.song_id]: payload.song_text})}
          if (payload.song_word) {Object.assign(state.node3_messages.te.song_word, {[payload.song_id]: payload.song_word})}
          if (payload.word_meaning) {Object.assign(state.node3_messages.te.word_meaning, {[payload.song_id]: payload.word_meaning})}
          if (payload.expln_header_text) {Object.assign(state.node3_messages.te.song_expln_header_text, {[payload.song_id]: payload.expln_header_text})}
        }
        if (state.isLoading) {
          state.isLoading = false
        };
      },

      songsDetailsIdMut (state, payload) {
          if (state.songsDetailsId.indexOf(payload.song_id) === -1) {
              state.songsDetailsId.push(payload);
          };
      },

      isLoadingMut (state, payload) {
          state.isLoading = payload;
      }

  },

  actions: {
    // initStore: ({commit}) => {
    //   commit('initStore');
    // },

    // update_main_ln: ({commit}, payload) => {
    //   alert ("hellp from methods")
    //   commit('update_main_ln', payload);
    // },
    saintsDetailsAct: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)

      payload.forEach(function(element) {
        const a = element
        // axios.get('https://templesvuet.firebaseio.com/xsaintsDetails.json?orderBy="saint_id"&equalTo=' + a )
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/saintdetail?saint_id=eq.' + a )
          .then(res => {
            const data = res.data
            for (let key in data) {
              if ( data[key] !== null && Object.keys(data[key]).length >0) {
                commit('saintsDetailsMut', data[key])
              }
            }
//0524          .catch(error => console.log(error))
          })
          commit('saintsDetailsIdMut', a)
      // before commit the mutation a check is done for lenght. else undefined objects where gettin in
      })
    },

    templesDetailsAct: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)

      payload.forEach(function(element) {
        const a = element
        // axios.get('https://templesvuet.firebaseio.com/xtemplesDetails.json?orderBy="temple_id"&equalTo=' + a )
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/templedetail?temple_id=eq.' + a )
          .then(res => {
            const data = res.data
            for (let key in data) {
              if ( data[key] !== null && Object.keys(data[key]).length >0) {
                commit('templesDetailsMut', data[key])
              }
            }
//0524          .catch(error => console.log(error))
          })
          commit('templesDetailsIdMut', a)
      // before commit the mutation a check is done for lenght. else undefined objects where gettin in
      })
    },

    songsDetailsAct: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)

      payload.forEach(function(element) {
        // alert("from action - songsDetailsId element " + element + "state" + state.songsDetailsId)
        const a = element
        // axios.get('https://templesvuet.firebaseio.com/mSongsDetails.json?orderBy="Id"&equalTo=' + a )
        // axios.get('https://templesvuet.firebaseio.com/xsongsDetails.json?orderBy="song_id"&equalTo=' + a )
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/songdetail?song_id=eq.' + a )
          .then(res => {
            const data = res.data
            for (let key in data) {
              if ( data[key] !== null && Object.keys(data[key]).length >0) {
                commit('songsDetailsMut', data[key])
              }
            }
//0524          .catch(error => console.log(error))
          })
          commit('songsDetailsIdMut', a)
      // before commit the mutation a check is done for lenght. else undefined objects where gettin in
      })
    }
  }
})
