import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {isObject, mergeDeep} from '../helper.js'
// import i18n from '../i18n.js'
import { languages } from './customize.js'
// import {node, node_matrix, song_range } from './mastersUT/General.js'
import {node_matrix, song_range } from './mastersUT/General.js'

// import {temple_song, saint_song} from './mastersUT/songs.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: languages,

// Onle level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new language is introduced
    text_details_messages: {
      en: {"server": {}},
      ta: {"server": {}},
      te: {"server": {}}

      // en: {cat9: {}, cat8: {}, cat15: {}},
      // ta: {cat9: {}, cat8: {}, cat15: {}},
      // te: {cat9: {}, cat8: {}, cat15: {}}
    },

    // node1_messages: {
    //   en: {saint_expln_header_text: {}},
    //   ta: {saint_expln_header_text: {}},
    //   te: {saint_expln_header_text: {}}
    // },
    //
    // node2_messages: {
    //   en: {temple_expln_header_text: {}},
    //   ta: {temple_expln_header_text: {}},
    //   te: {temple_expln_header_text: {}}
    // },
    //
    // node3_messages: {
    //   en: {
    //     song_text: {},
    //     song_word: {},
    //     word_meaning: {},
    //     song_expln_header_text: {}
    //   },
    //   ta: {
    //     song_text: {},
    //     song_word: {},
    //     word_meaning: {},
    //     song_expln_header_text: {}
    //   },
    //   te: {
    //     song_text: {},
    //     song_word: {},
    //     word_meaning: {},
    //     song_expln_header_text: {}
    //   }
    // },
    node: [],
    isnodeLoading: false,
    // node gets loaded from backend. to re render the zfilter3 codes, using this flag to toggle to true and then false.
    // similar to the usage in isLoading flag for saints, temples and songs

    // add_ln_id: [],
    // all_ln_id : ['en'],

    // saint_song: saint_song,
    // temple_song: temple_song,

    songsDetailsId: [],
    // templesDetailsId: [],
    saintsDetailsId: [],
    avlblDetailsId: {8: [], 9: [], 15: []},
    isLoading: false,
    ismmxLoading: false,

    // node: node,
    // hier: hier,
    node_matrix: node_matrix,
    song_range: song_range,
  },

  getters: {

  },

  mutations: {

      initnodemut (state, payload) {
          state.node = payload;
          if (state.isnodeLoading) {
            state.isnodeLoading = false
          };

      },

      text_details_mut (state, payload) {
        // payload is an array. each element has a val. each val is an array of [{en:..}, {ta:..}, {te:..}]
        // combine all objects of each val into a single object like [{en:..., ta:...}]

        for (var i =0; i < payload.length; i++) {
          var t1 =     payload[i].val.reduce(function(acc, x) {
            for (var key in x) acc[key] = x[key];
            return acc;
            }, {})
        // t1 = {en: {}, ta...}
          state.text_details_messages = mergeDeep(state.text_details_messages, t1)
        }

          if (state.isLoading) {
            state.isLoading = false
          };
          // alert("state.isLoading after mut" + state.isLoading)
        },

        text_details_id_mut (state, payload) {
          //payload[0] is an array of temple/saint id's payload[1] = cat_id
          // const array3 = Array.from(new Set(array1.concat(array2)));
          // if (payload[1] == 9) {
          //   state.templesDetailsId = Array.from(new Set(state.templesDetailsId.concat(payload[0])));
          // } else {
          //   if (payload[1] == 8) {
          //     state.saintsDetailsId = Array.from(new Set(state.saintsDetailsId.concat(payload[0])));
          //   } else {
          //     if (payload[1] == 15) {
          //       state.songsDetailsId = Array.from(new Set(state.songsDetailsId.concat(payload[0])));
          //     }
          //   }
          // };

          state.avlblDetailsId[payload[1]] = Array.from(new Set(state.avlblDetailsId[payload[1]].concat(payload[0])));
        },



      // saintsDetailsMut (state, payload) {
      //     if (payload.ln_id == "en") {
      //       if (payload.expln_header_text) {Object.assign(state.node1_messages.en.saint_expln_header_text, {[payload.saint_id]: payload.expln_header_text})}
      //     }
      //     else if (payload.ln_id == "ta") {
      //       if (payload.expln_header_text) {Object.assign(state.node1_messages.ta.saint_expln_header_text, {[payload.saint_id]: payload.expln_header_text})}
      //     }
      //     else if (payload.ln_id == "te") {
      //       if (payload.expln_header_text) {Object.assign(state.node1_messages.te.saint_expln_header_text, {[payload.saint_id]: payload.expln_header_text})}
      //     }
      //     if (state.isLoading) {
      //       state.isLoading = false
      //     };
      //   },
      //
      // saintsDetailsIdMut (state, payload) {
      //     if (state.saintsDetailsId.indexOf(payload.saint_id) === -1) {
      //         state.saintsDetailsId.push(payload);
      //     };
      // },

      // templesDetailsMut (state, payload) {
      //     if (payload.ln_id == "en") {
      //       if (payload.expln_header_text) {Object.assign(state.node2_messages.en.temple_expln_header_text, {[payload.temple_id]: payload.expln_header_text})}
      //     }
      //     else if (payload.ln_id == "ta") {
      //       if (payload.expln_header_text) {Object.assign(state.node2_messages.ta.temple_expln_header_text, {[payload.temple_id]: payload.expln_header_text})}
      //     }
      //     else if (payload.ln_id == "te") {
      //       if (payload.expln_header_text) {Object.assign(state.node2_messages.te.temple_expln_header_text, {[payload.temple_id]: payload.expln_header_text})}
      //     }
      //     if (state.isLoading) {
      //       state.isLoading = false
      //     };
      //   },
      //
      // templesDetailsIdMut (state, payload) {
      //     if (state.templesDetailsId.indexOf(payload.temple_id) === -1) {
      //         state.templesDetailsId.push(payload);
      //     };
      // },


    // songsDetailsMut (state, payload) {
    //     if (payload.ln_id == "en") {
    //       if (payload.song_text) {Object.assign(state.node3_messages.en.song_text, {[payload.song_id]: payload.song_text})}
    //       if (payload.song_word) {Object.assign(state.node3_messages.en.song_word, {[payload.song_id]: payload.song_word})}
    //       if (payload.word_meaning) {Object.assign(state.node3_messages.en.word_meaning, {[payload.song_id]: payload.word_meaning})}
    //       if (payload.expln_header_text) {Object.assign(state.node3_messages.en.song_expln_header_text, {[payload.song_id]: payload.expln_header_text})}
    //     }
    //     else if (payload.ln_id == "ta") {
    //       if (payload.song_text) {Object.assign(state.node3_messages.ta.song_text, {[payload.song_id]: payload.song_text})}
    //       if (payload.song_word) {Object.assign(state.node3_messages.ta.song_word, {[payload.song_id]: payload.song_word})}
    //       if (payload.word_meaning) {Object.assign(state.node3_messages.ta.word_meaning, {[payload.song_id]: payload.word_meaning})}
    //       if (payload.expln_header_text) {Object.assign(state.node3_messages.ta.song_expln_header_text, {[payload.song_id]: payload.expln_header_text})}
    //     }
    //     else if (payload.ln_id == "te") {
    //       if (payload.song_text) {Object.assign(state.node3_messages.te.song_text, {[payload.song_id]: payload.song_text})}
    //       if (payload.song_word) {Object.assign(state.node3_messages.te.song_word, {[payload.song_id]: payload.song_word})}
    //       if (payload.word_meaning) {Object.assign(state.node3_messages.te.word_meaning, {[payload.song_id]: payload.word_meaning})}
    //       if (payload.expln_header_text) {Object.assign(state.node3_messages.te.song_expln_header_text, {[payload.song_id]: payload.expln_header_text})}
    //     }
    //     if (state.isLoading) {
    //       state.isLoading = false
    //     };
    //   },

      // songsDetailsIdMut (state, payload) {
      //     if (state.songsDetailsId.indexOf(payload.song_id) === -1) {
      //         state.songsDetailsId.push(payload);
      //     };
      // },

      isnodeLoadingMut (state, payload) {
          state.isnodeLoading = payload;
      },

      isLoadingMut (state, payload) {
          state.isLoading = payload;
      },

      ismmxLoadingMut (state, payload) {
          state.ismmxLoading = payload;
      }


  },

  actions: {
    initnode: ({commit}) => {
      commit('isnodeLoadingMut', true)
      axios.get('https://templesvuet.firebaseio.com/General_fb_node.json')
      // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/hierview?')
        .then(res => {
          const data = res.data
          commit('initnodemut', data)
          // for (let key in data) {
          //   if ( data[key] !== null && Object.keys(data[key]).length >0) {
          //               alert ("Hello" + JSON.stringify(data))
          //     commit('initnodemut', data[key])
          //   }
          // }
//0524          .catch(error => console.log(error))
        })
    },


    text_details_act: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)

      // get a string of numbers of the payload to pass it on to axios as an IN condition
      const a = payload[0].toString()
      // alert("axios" + JSON.stringify(a))
      // expected value 2,5,6
      const b = payload[1]
      // alert("axios" + JSON.stringify(b))
      // expected value ; cat_id 8/9
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_text_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
        // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/text_detail_v2?select=val&cat_id=eq.9&id=in.(' + a + ')' )
        // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/text_detail_v2?select=val&cat_id=eq.9&id=in.(2,5)' )
          .then(res => {
            // alert("axios" + JSON.stringify(res.data))
            if (res.data.length > 0) {
              commit('text_details_mut', res.data)
            }
          })
        commit('text_details_id_mut', payload)
    },

    songtext_details_act: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)

      // get a string of numbers of the payload to pass it on to axios as an IN condition
      const a = payload[0].toString()
      // expected value 2,5,6
      const b = payload[1]
      // expected value ; cat_id 8/9
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/songtext_detail_v2?select=val&id=in.(' + a + ')' )
          .then(res => {
            if (res.data.length > 0) {
              commit('text_details_mut', res.data)
            }
          })
        commit('text_details_id_mut', payload)
    },
// for loading songs mmx, it takes time. Hence make isLoading = true using an action. After loading, make it to false

    ismmxLoadingAct: ({commit, state}, payload) => {
      // payload is true or false
      commit('ismmxLoadingMut', payload)
    },

//     saintsDetailsAct: ({commit, state}, payload) => {
//       // payload is an array of Ids from sourceFilePage
//       commit('isLoadingMut', true)
//
//       payload.forEach(function(element) {
//         const a = element
//         // axios.get('https://templesvuet.firebaseio.com/xsaintsDetails.json?orderBy="saint_id"&equalTo=' + a )
//         axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/saintdetail?saint_id=eq.' + a )
//           .then(res => {
//             const data = res.data
//             for (let key in data) {
//               if ( data[key] !== null && Object.keys(data[key]).length >0) {
//                 commit('saintsDetailsMut', data[key])
//               }
//             }
// //0524          .catch(error => console.log(error))
//           })
//           commit('saintsDetailsIdMut', a)
//       // before commit the mutation a check is done for lenght. else undefined objects where gettin in
//       })
//     },

//     templesDetailsAct: ({commit, state}, payload) => {
//       // payload is an array of Ids from sourceFilePage
//       commit('isLoadingMut', true)
//
//       payload.forEach(function(element) {
//         const a = element
//         axios.get('https://templesvuet.firebaseio.com/xtemplesDetails.json?orderBy="temple_id"&equalTo=' + a )
//         // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/templedetail?temple_id=eq.' + a )
//           .then(res => {
//             const data = res.data
//             for (let key in data) {
//               if ( data[key] !== null && Object.keys(data[key]).length >0) {
//                 commit('templesDetailsMut', data[key])
//               }
//             }
// //0524          .catch(error => console.log(error))
//           })
//           commit('templesDetailsIdMut', a)
//       // before commit the mutation a check is done for lenght. else undefined objects where gettin in
//       })
//
//       // code to get
//     },

//     songsDetailsAct: ({commit, state}, payload) => {
//       // payload is an array of Ids from sourceFilePage
//       commit('isLoadingMut', true)
//
//       payload.forEach(function(element) {
//         // alert("from action - songsDetailsId element " + element + "state" + state.songsDetailsId)
//         const a = element
//         // axios.get('https://templesvuet.firebaseio.com/mSongsDetails.json?orderBy="Id"&equalTo=' + a )
//         axios.get('https://templesvuet.firebaseio.com/xsongsDetails.json?orderBy="song_id"&equalTo=' + a )
//         // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/songdetail?song_id=eq.' + a )
//           .then(res => {
//             const data = res.data
//             for (let key in data) {
//               if ( data[key] !== null && Object.keys(data[key]).length >0) {
//                 commit('songsDetailsMut', data[key])
//               }
//             }
// //0524          .catch(error => console.log(error))
//           })
//           commit('songsDetailsIdMut', a)
//       // before commit the mutation a check is done for lenght. else undefined objects where gettin in
//       })
//     }

  }
})
