import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {isObject, mergeDeep} from '../helper.js'
import { languages } from './customize.js'
// import {node, node_matrix, song_range } from './mastersUT/General.js'
// import {node_matrix, song_range, cat_master } from './mastersUT/General.js'
// import {cat_master } from './mastersUT/General.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: languages,

// One level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new language is introduced
// this is to get entity descriptions after initiating the session
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

// One level deep has to be maintained while initiation, to take care of nested objects
// Add to this when new cat_id is introduced
    // mmx_cms: {
    //   8: {},
    //   9: {},
    //   15: {}
    // },
    mmx_cms: {},

    map_coords: {},

    // map_coords: {
    //   8: {},
    //   9: {},
    //   15: {}
    // },

    mmx_shell: {},


    // mmx_shell: {
    //   8: {},
    //   9: {},
    //   15: {}
    // },

    node: [],
    song_range: [],
    song_numbering: [],
    isnodeLoading: false,
    isentityLoading: false,
    // node gets loaded from backend. to re render the zfilter3 codes, using this flag to toggle to true and then false.
    // similar to the usage in isLoading flag for saints, temples and songs

    avlblDetailsId: [],
    // avlblDetailsId: {8: [], 9: [], 15: []},
//  data to be updated as {catid: {mmxid: [itemid...]}}
// using below, as it is not reactive to directly check the mmx_cms
    // avlblMmxsId: {8: {}, 9: {}, 15: {}},
    avlblMmxsId: {},
    isLoading: false,
    ismmxLoading: false,

    // node_matrix: node_matrix,
    // song_range: song_range,
    // cat_master: cat_master,
  },

  getters: {

  },

  mutations: {

      initnodemut (state, payload) {
      // alert("payload" + JSON.stringify(payload))
          state.node = payload;
          if (state.isnodeLoading) {
            state.isnodeLoading = false
          };
      },

      init_entity_mut (state, payload) {
          var t1 = payload[0].val
          state.entity_desc_messages = mergeDeep(state.entity_desc_messages, t1)
          if (state.isentityLoading) {
            state.isentityLoading = false
          };
      },

      song_range_mut (state, payload) {
          state.song_range = payload;
      },

      song_numbering_mut (state, payload) {
          state.song_numbering = payload;
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
      },

      map_coords_mut (state, payload) {
        // payload is an array. each element has a val. each val is an object {cat_id: id : {coords}}
        var t1 = {}
        for (var i =0; i < payload.length; i++) {
          var zt1 = payload[i].val
          var t1 = Object.assign(t1, zt1)
        }
        state.map_coords = mergeDeep(state.map_coords, t1)
      },

      mmx_shell_mut (state, payload) {
        // payload is an array. each element has a val. each val is an object {cat_id: id : {coords}}
        var t1 = {}
        for (var i =0; i < payload.length; i++) {
          var zt1 = payload[i].val
          var t1 = Object.assign(t1, zt1)
        }
        state.mmx_shell = mergeDeep(state.mmx_shell, t1)
      },


      mmx_details_mut (state, payload) {
        // payload is an array. - [res.data, zcatid, zitemid, zmmxtypeid]
        //190324 var t1 = []  - Get it as an object/ can also be used when sub_id wise accessed from server
        var t1 = {}
        for (var i = 0; i < payload[0].length; i++) {
          // idea is to get an object like {sub_id: []...}
          var zsubid = payload[0][i].sub_id
          var zt1 = {[zsubid]: Buffer.from(payload[0][i].mmx.replace(/\\x/g,''), 'hex').toString('base64')}
          var t1 = Object.assign(t1, zt1)
        }

        // idea is to get an object like {8: {2: {2: {1: []}}}}
        //updateObj = { data: { [rowIdx]: { [prop]: {$set: val} } } };
        // const t1 = { [payload[0]]: { [payload[2]]: [payload[1]]}}
        // const t2 = {[payload[1]]: {[payload[2]]: { [payload[3]]: t1 }} }
        const t2 = {[payload[1]]: { [payload[2]]: t1 }}
        state.mmx_cms = mergeDeep(state.mmx_cms, t2)

        if (state.ismmxLoading) {
          state.ismmxLoading = false
        };
      },

      // text_details_id_mut (state, payload) {
      //   state.avlblDetailsId[payload[1]] = Array.from(new Set(state.avlblDetailsId[payload[1]].concat(payload[0])));
      // },
      text_details_id_mut (state, payload) {
        state.avlblDetailsId = Array.from(new Set(state.avlblDetailsId.concat(payload)));
      },


      mmx_details_id_mut (state, payload) {
        // payload is [zitemid, zmmxtypeid , 'All'/ zsubid]
        //updateObj = { data: { [rowIdx]: { [prop]: {$set: val} } } };
        var t1 = {}
        if (payload[2] ==="All") {
          //190324 t1 = { [payload[0]]: { [payload[2]]: [payload[1]]}}
          // t1 = { [payload[0]]: { [payload[1]]: {[payload[2]]: 'y'}}}
          t1 = { [payload[0]]: {[payload[1]]: 'y'}}
        } else {
          //190324 t1 = { [payload[0]]: { [payload[2]]: {[payload[1]]: [payload[3]] }}}
          // t1 = { [payload[0]]: { [payload[1]]: {[payload[2]]: {[payload[3]]: 'y'} }}}
          t1 = { [payload[0]]: {[payload[1]]: {[payload[2]]: 'y'} }}
        }
        state.avlblMmxsId = mergeDeep(state.avlblMmxsId, t1)
        // state.avlblDetailsId[payload[1]] = Array.from(new Set(state.avlblDetailsId[payload[1]].concat(payload[0])));
      },


      isnodeLoadingMut (state, payload) {
          state.isnodeLoading = payload;
      },

      isentityLoadingMut (state, payload) {
          state.isentityLoading = payload;
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
//      axios.get('https://templesvuet.firebaseio.com/General_fb_node.json')
      // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/hierview?')
      // axios.get('/hierview')
      axios.get('/node_matrix_v')
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

    init_entity_act: ({commit}) => {
     commit('isentityLoadingMut', true)
      // axios.get('/entity_desc_v')
      //   .then(res => {
      //     const data = res.data
      //     commit('init_entity_mut', data)
      //   })
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
      // const b = payload[1]
      // expected value ; cat_id 8/9
      // get the text details from mmx_text_v
      axios.all([
          // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_text_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')'),
          // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/map_coords_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')'),
          // axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_shell_v2?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
          // axios.get('/mmx_text_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')'),
          // axios.get('/map_coords_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')'),
          // axios.get('/mmx_cms_shell_v2?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
          axios.get('/mmx_text_v11?select=val&id=in.(' + a + ')'),
          axios.get('/map_coords_v11?select=val&id=in.(' + a + ')'),
          axios.get('/mmx_cms_shell_v12?select=val&id=in.(' + a + ')' )
        ])
        .then(axios.spread((res1, res2, res3) => {
          // do something with both responses
          if (res1.data.length > 0) {
            commit('text_details_mut', res1.data)
          }
          commit('text_details_id_mut', payload)
          // commit('text_details_id_mut', payload[0])
          if (res2.data.length > 0) {
            // alert("map coords" + JSON.stringify(res))
            commit('map_coords_mut', res2.data)
          }

          if (res3.data.length > 0) {
            // alert("mmx_shell" + JSON.stringify(res))
            commit('mmx_shell_mut', res3.data)
          }
        }));

      //   axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_text_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
      //     .then(res => {
      //       if (res.data.length > 0) {
      //         commit('text_details_mut', res.data)
      //       }
      //     })
      //   commit('text_details_id_mut', payload)
      // // get the map_coords details from mmx_text_v
      //   axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/map_coords_v?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
      //     .then(res => {
      //       if (res.data.length > 0) {
      //         // alert("map coords" + JSON.stringify(res))
      //         commit('map_coords_mut', res.data)
      //       }
      //     })
      // // get the shell details from mmx_cms_v2
      //   axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_shell_v2?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
      //     .then(res => {
      //       if (res.data.length > 0) {
      //         // alert("mmx_shell" + JSON.stringify(res))
      //         commit('mmx_shell_mut', res.data)
      //       }
      //     })




    },

    song_details_act: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      commit('isLoadingMut', true)
      // get a string of numbers of the payload to pass it on to axios as an IN condition
      const a = payload.toString()
      // expected value 2,5,6
        axios.get('/song_text_v11?select=val&id=in.(' + a + ')')
        .then(res => {
          if (res.data.length > 0) {
            commit('text_details_mut', res.data)
          }
          commit('text_details_id_mut', payload)
        })

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
        // axios.get('/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + zcatid + '&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid)
        axios.get('/mmx_cms_v11?select=mmx,sub_id&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid)
        .then(res => {
          // if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zcatid, zitemid, zmmxtypeid])}
          if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zitemid, zmmxtypeid])}
          })
        // commit('mmx_details_id_mut', [zcatid, zitemid, zmmxtypeid, 'All'])
        commit('mmx_details_id_mut', [zitemid, zmmxtypeid, 'All'])
      } else {
        // axios.get('/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + zcatid + '&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid + '&sub_id=eq.' + zsubid)
        axios.get('/mmx_cms_v11?select=mmx,sub_id&id=eq.' + zitemid + '&mmx_type_id=eq.' + zmmxtypeid + '&sub_id=eq.' + zsubid)
        .then(res => {
          // if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zcatid, zitemid, zmmxtypeid])}
          if (res.data.length > 0) {commit('mmx_details_mut', [res.data, zitemid, zmmxtypeid])}
          })
        // commit('mmx_details_id_mut', [zcatid, zitemid, zmmxtypeid, zsubid])
        commit('mmx_details_id_mut', [zitemid, zmmxtypeid, zsubid])
      }
    },


  }
})
