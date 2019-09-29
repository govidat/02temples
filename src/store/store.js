import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {isObject, mergeDeep} from '../helper.js'
// import { languages } from './customize.js'
import { languages, zicons } from '../customize.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: languages,
    zicons: zicons,
// One level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new language is introduced
// this is to get entity descriptions after initiating the session
    // entity_desc_messages: {},

    entity_desc_messages: {
      en: {"entity": {}},
      ta: {"entity": {}},
      te: {"entity": {}}
    },

// One level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new language is introduced
    text_details_messages: {
      en: {"server": {}},
      ta: {"server": {}},
      te: {"server": {}}
    },
// trying to keep song_details separate to manipulate the display of multiple ln
    song_details: {},

    mmx_cms: {},
    map_coords: {},
    mmx_shell: {},
    node: [],
    song_range: [],
    song_numbering: [],
    isnodeLoading: false,
    isentityLoading: false,
    // node gets loaded from backend. to re render the zfilter3 codes, using this flag to toggle to true and then false.
    // similar to the usage in isLoading flag for saints, temples and songs
    avlblDetailsId: [],
    avlblMmxsId: {},
    isLoading: false,
    ismmxLoading: false,
    // better to have some initial values
    ln_song: ['ta', 'en'],
    ln_song_meaning: ['ta', 'en'],
    ln_song_explanation: ['ta', 'en'],
    // better to have some initial values - this is for no of loops and word/line/para
    splitchoice: 3,
    zloop: 10,
    zloop_gap_sec: 2,
    // 1 is by word, 2 by line and 3 nosplit
    zplaybackrate: 1,
  },

  getters: {},

  mutations: {
      initnodemut (state, payload) {
        // alert("payload" + JSON.stringify(payload))
        state.node = payload;
        if (state.isnodeLoading) { state.isnodeLoading = false }},

      init_entity_mut (state, payload) {
          var t1 = payload[0].val
          state.entity_desc_messages = mergeDeep(state.entity_desc_messages, t1)
          if (state.isentityLoading) { state.isentityLoading = false }},

      song_range_mut (state, payload) { state.song_range = payload },

      song_numbering_mut (state, payload) { state.song_numbering = payload },

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
        if (state.isLoading) { state.isLoading = false}
      },

      song_details_mut (state, payload) {
        // payload is an array.
        for (var i =0; i < payload.length; i++) {
          var t1 = payload[i].val
          state.song_details = mergeDeep(state.song_details, t1)
        }
        if (state.isLoading) { state.isLoading = false}
      },

      map_coords_mut (state, payload) {
        var t1 = {}
        for (var i =0; i < payload.length; i++) {
          var zt1 = payload[i].val
          var t1 = Object.assign(t1, zt1)
        }
        state.map_coords = mergeDeep(state.map_coords, t1)
      },

      mmx_shell_mut (state, payload) {
        var t1 = {}
        for (var i =0; i < payload.length; i++) {
          var zt1 = payload[i].val
          var t1 = Object.assign(t1, zt1)
        }
        state.mmx_shell = mergeDeep(state.mmx_shell, t1)
      },

      mmx_details_mut (state, payload) {
        var t1 = {}
        for (var i = 0; i < payload[0].length; i++) {
          // idea is to get an object like {sub_id: []...}
          var zsubid = payload[0][i].sub_id
          var zt1 = {[zsubid]: Buffer.from(payload[0][i].mmx.replace(/\\x/g,''), 'hex').toString('base64')}
          var t1 = Object.assign(t1, zt1)
        }

        // idea is to get an object like {8: {2: {2: {1: []}}}}
        const t2 = {[payload[1]]: { [payload[2]]: t1 }}
        state.mmx_cms = mergeDeep(state.mmx_cms, t2)

        if (state.ismmxLoading) { state.ismmxLoading = false }
      },

      text_details_id_mut (state, payload) {
        state.avlblDetailsId = Array.from(new Set(state.avlblDetailsId.concat(payload)))
        if (state.isLoading) { state.isLoading = false}
      },

      mmx_details_id_mut (state, payload) {
        // payload is [zitemid, zmmxtypeid , 'All'/ zsubid]
        //updateObj = { data: { [rowIdx]: { [prop]: {$set: val} } } };
        var t1 = {}
        if (payload[2] ==="All") {
          t1 = { [payload[0]]: {[payload[1]]: 'y'}}
        } else {
          t1 = { [payload[0]]: {[payload[1]]: {[payload[2]]: 'y'} }}
        }
        state.avlblMmxsId = mergeDeep(state.avlblMmxsId, t1)
      },

      isnodeLoadingMut (state, payload) { state.isnodeLoading = payload },

      isentityLoadingMut (state, payload) { state.isentityLoading = payload },

      isLoadingMut (state, payload) { state.isLoading = payload},

      ismmxLoadingMut (state, payload) { state.ismmxLoading = payload},
      upd_ln_song (state, payload) { state.ln_song = payload },
      upd_ln_song_meaning (state, payload) { state.ln_song_meaning = payload },
      upd_ln_song_explanation (state, payload) { state.ln_song_explanation = payload },
      upd_zloop (state, payload) { state.zloop = payload },
      upd_zloop_gap_sec (state, payload) { state.zloop_gap_sec = payload },
      upd_splitchoice (state, payload) { state.splitchoice = payload },
      upd_zplaybackrate (state, payload) { state.zplaybackrate = payload },
  },

  actions: {
    initnode: ({commit}) => {
      commit('isnodeLoadingMut', true)
      axios.get('/node_matrix_v11')
      .then(res => {
        const data = res.data
        commit('initnodemut', data)
        //0524          .catch(error => console.log(error))
      })
    },

    init_entity_act: ({commit}) => {
     commit('isentityLoadingMut', true)
      axios.all([
            axios.get('/entity_desc_v'),
            axios.get('/song_range_v11'),
            axios.get('/song_numbering_v11')
          ])
      .then(axios.spread((res1, res2, res3) => {
        if (res1.data.length > 0) {
          commit('init_entity_mut', res1.data)
        }
        if (res2.data.length > 0) {
          commit('song_range_mut', res2.data)
        }
        if (res3.data.length > 0) {
          commit('song_numbering_mut', res3.data)
        }
      }));

    },

    text_details_act: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)

      // get a string of numbers of the payload to pass it on to axios as an IN condition
      const a = payload.toString()
      // expected value 2,5,6
      axios.all([
          axios.get('/mmx_text_v11?select=val&id=in.(' + a + ')'),
          axios.get('/map_coords_v11?select=val&id=in.(' + a + ')'),
          axios.get('/mmx_cms_shell_v14?select=val&id=in.(' + a + ')' )
        ])
        .then(axios.spread((res1, res2, res3) => {
          if (res1.data.length > 0) {
            commit('text_details_mut', res1.data)
          }
          commit('text_details_id_mut', payload)
          if (res2.data.length > 0) {
            commit('map_coords_mut', res2.data)
          }

          if (res3.data.length > 0) {
            commit('mmx_shell_mut', res3.data)
          }
        }));
    },

    song_details_act: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)
      // get a string of numbers of the payload to pass it on to axios as an IN condition
      const a = payload.toString()
      // expected value 2,5,6
        axios.all([
          axios.get('/song_text_v12?select=val&id=in.(' + a + ')'),
          axios.get('/mmx_cms_shell_v14?select=val&id=in.(' + a + ')' )
        ])
        .then(axios.spread((res1, res2) => {
          if (res1.data.length > 0) {
            commit('song_details_mut', res1.data)
          }
          commit('text_details_id_mut', payload)
          if (res2.data.length > 0) {
            commit('mmx_shell_mut', res2.data)
          }
        }))
        .catch(error => {
          commit('text_details_id_mut', payload)
          commit('isLoadingMut', false)
        })

        // axios.get('/song_text_v12?select=val&id=in.(' + a + ')')
        // .then(res => {
        //   if (res.data.length > 0) {
        //     commit('song_details_mut', res.data)
        //   }
        //   commit('text_details_id_mut', payload)
        // })
        // .catch(error => {
        //   commit('text_details_id_mut', payload)
        //   commit('isLoadingMut', false)
        // })

    },

    mmx_details_act: ({commit, state}, payload) => {
      // payload is an array of cat_id, itemid, mmx_typeid, 'All'/ sub_id
      commit('ismmxLoadingMut', true)

      // get a string of numbers of the payload to pass it on to axios as an IN condition
      // const zcatid = payload[0]
      const zitemid = payload[0]
      const zmmxtypeid = payload[1]
      const zsubid = payload[2]

      if (zsubid==="All") {
        axios.get('/mmx_cms_v12?select=mmx,sub_id&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid)
        .then(res => {
          if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zitemid, zmmxtypeid])}
          })
        commit('mmx_details_id_mut', [zitemid, zmmxtypeid, 'All'])
      } else {
        axios.get('/mmx_cms_v12?select=mmx,sub_id&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid + '&sub_id=eq.' + zsubid)
        .then(res => {
          if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zitemid, zmmxtypeid])}
          })
        commit('mmx_details_id_mut', [zitemid, zmmxtypeid, zsubid])
      }
    },

  }
})
