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

// One level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new language is introduced
    text_details_messages: {
      en: {"server": {}},
      ta: {"server": {}},
      te: {"server": {}}
    },

// One level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new cat_id is introduced
    mmx_cms: {
      8: {},
      9: {},
      15: {}
    },


    node: [],
    isnodeLoading: false,
    // node gets loaded from backend. to re render the zfilter3 codes, using this flag to toggle to true and then false.
    // similar to the usage in isLoading flag for saints, temples and songs


    // songsDetailsId: [],
    // templesDetailsId: [],
    // saintsDetailsId: [],
    avlblDetailsId: {8: [], 9: [], 15: []},
//  data to be updated as {catid: {mmxid: [itemid...]}}
// using below, as it is not reactive to directly check the mmx_cms
    avlblMmxsId: {8: {}, 9: {}, 15: {}},
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

      mmx_details_mut (state, payload) {
        // alert("mutation" + JSON.stringify(payload))
        // payload is an array. - [res.data, zcatid, zitemid, zmmxtypeid]
        //190324 var t1 = []  - Get it as an object/ can also be used when sub_id wise accessed from server
        var t1 = {}
        for (var i = 0; i < payload[0].length; i++) {
          // this.images.push(Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64'))
          // idea is to get an object like {sub_id: []...}
          var zsubid = payload[0][i].sub_id
          var zt1 = {[zsubid]: Buffer.from(payload[0][i].mmx.replace(/\\x/g,''), 'hex').toString('base64')}
          // t1.push({sub_id: payload[0][i].sub_id, mmx: Buffer.from(payload[0][i].mmx.replace(/\\x/g,''), 'hex').toString('base64')})
          var t1 = Object.assign(t1, zt1)
        }

        // idea is to get an object like {8: {2: {2: {1: []}}}}
        //updateObj = { data: { [rowIdx]: { [prop]: {$set: val} } } };
        // const t1 = { [payload[0]]: { [payload[2]]: [payload[1]]}}
        const t2 = {[payload[1]]: {[payload[2]]: { [payload[3]]: t1 }} }
        // alert("mmx mutation t2" + JSON.stringify(t2))
        //Object.assign(target, source)
        // alert("state.mmx_cms - before" + JSON.stringify(state.mmx_cms))
        state.mmx_cms = mergeDeep(state.mmx_cms, t2)
        // alert("state.mmx_cms - after" + JSON.stringify(state.mmx_cms))

        if (state.ismmxLoading) {
          state.ismmxLoading = false
        };
          // alert("state.isLoading after mut" + state.isLoading)
      },

      text_details_id_mut (state, payload) {
        state.avlblDetailsId[payload[1]] = Array.from(new Set(state.avlblDetailsId[payload[1]].concat(payload[0])));
      },

      mmx_details_id_mut (state, payload) {
        // payload is [zcatid, zitemid, zmmxtypeid , 'All'/ zsubid]
        // alert("mmx_details_id_mut - payload" + JSON.stringify(payload))
        //updateObj = { data: { [rowIdx]: { [prop]: {$set: val} } } };
        var t1 = {}
        if (payload[3] ==="All") {
          //190324 t1 = { [payload[0]]: { [payload[2]]: [payload[1]]}}
          t1 = { [payload[0]]: { [payload[1]]: {[payload[2]]: 'y'}}}
        } else {
          //190324 t1 = { [payload[0]]: { [payload[2]]: {[payload[1]]: [payload[3]] }}}
          t1 = { [payload[0]]: { [payload[1]]: {[payload[2]]: {[payload[3]]: 'y'} }}}
        }
        // const t1 = { [payload[0]]: { [payload[2]]: [payload[1]]}}
        // alert("mmx_details_id_mut - before" + JSON.stringify(t1))
        // alert("avlblMmxsId - before" + JSON.stringify(state.avlblMmxsId))
        state.avlblMmxsId = mergeDeep(state.avlblMmxsId, t1)
        // alert("avlblMmxsId - after" + JSON.stringify(state.avlblMmxsId))
        // state.avlblDetailsId[payload[1]] = Array.from(new Set(state.avlblDetailsId[payload[1]].concat(payload[0])));
      },


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

    mmx_details_act: ({commit, state}, payload) => {
      // payload is an array of cat_id, itemid, mmx_typeid, 'All'/ sub_id
      // alert("axios" + JSON.stringify(payload))

      commit('ismmxLoadingMut', true)

      // get a string of numbers of the payload to pass it on to axios as an IN condition
      const zcatid = payload[0]
      const zitemid = payload[1]
      const zmmxtypeid = payload[2]
      const zsubid = payload[3]
      // alert("axios" + JSON.stringify(zcatid) + "-" + JSON.stringify(zitemid) + "-" + JSON.stringify(zmmxtypeid) )

      if (zsubid==="All") {
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + zcatid + '&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid)
        .then(res => {
          if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zcatid, zitemid, zmmxtypeid])}
          })
        commit('mmx_details_id_mut', [zcatid, zitemid, zmmxtypeid, 'All'])
      } else {
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + zcatid + '&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid + '&sub_id=eq.' + zsubid)
        .then(res => {
          if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zcatid, zitemid, zmmxtypeid])}
          })
        commit('mmx_details_id_mut', [zcatid, zitemid, zmmxtypeid, zsubid])
      }
        // axios.get(
        //   'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + zcatid + '&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid
        // )
        // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/text_detail_v2?select=val&cat_id=eq.9&id=in.(' + a + ')' )
        // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/text_detail_v2?select=val&cat_id=eq.9&id=in.(2,5)' )
          // .then(res => {
          //   if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zcatid, zitemid, zmmxtypeid])}
          //   })
      // commit('mmx_details_id_mut', [zcatid, zitemid, zmmxtypeid])
    },



    zsongtext_details_act: ({commit, state}, payload) => {
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


  }
})
