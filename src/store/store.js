import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { languages } from './customize.js'
import {ism, pps, pps_ism } from './mastersUT/General.js'
import {saint, saint_hier, ism_saint, saint_temple, } from './mastersUT/saints.js'

import {temple, temple_hier, ism_temple, temple_pps} from './mastersUT/temples.js'
import {song, song_hier, ism_song, temple_song, saint_song} from './mastersUT/songs.js'
import {saint_detail} from './mastersUT/saintdetail.js';
import {temple_detail} from './mastersUT/templedetail.js';

// import {saint2, saint_hier, saint_hier_desc, ism_saint} from './mastersUT/saints.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: languages,

    add_ln_id: [],
    all_ln_id : ['en'],
    // header_desc: header_desc,

    ism: ism,
    // ism_desc: ism_desc,

    saint: saint,
    saint_hier: saint_hier,
    ism_saint: ism_saint,

    // saint_desc: saint_desc,
    // saint_ism: saint_ism,
    // saint_ism_old: saint_ism_old,

    saint_temple: saint_temple,

    temple: temple,
    temple_hier: temple_hier,
    ism_temple: ism_temple,

    // temple_desc: temple_desc,
    // temple_ism: temple_ism,
    // temple_ism_old: temple_ism_old,

    temple_pps: temple_pps,
    song: song,
    song_hier: song_hier,
    ism_song: ism_song,

    // song_desc: song_desc,
    // song_ism: song_ism,
    // song_ism_old: song_ism_old,

    saint_song: saint_song,
    temple_song: temple_song,

    pps: pps,
    // pps_desc: pps_desc,
    pps_ism: pps_ism,

    saint_detail: saint_detail,
    temple_detail: temple_detail,

    songsDetails: [],
    songsDetailsId: [],

    // ism_saint: ism_saint,


  },

  getters: {

    // idea tabname is a variable passed eg saint; in the state action and mutation has been created for 'initStore'
    // this initStore has mapping of state.map_desc.get(saint) = state.get_saint_desc
    // this initStore action has been triggered in the main.js
    // get_desc2: (state, getters) => (item) => {
    //   // itemid, main_ln_id, default_ln_id, default desc, tabname
    //   // alert ("Hello from desc3" + tabname + JSON.stringify(state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == main_ln_id))))
    //   alert ("Hello from desc2")
    //   return getters.get_desc(item, state.main_ln_id, 1, "NA", 'header')
    // },
    //
    // // get_desc3: (state, getters) => (itemid, main_ln_id, def_ln_id, def_desc, tabname) => {
    // get_desc3: (state, getters) => {
    //   // itemid, main_ln_id, default_ln_id, default desc, tabname
    //   // alert ("Hello from desc3" + tabname + JSON.stringify(state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == main_ln_id))))
    //   alert ("Hello from desc3")
    //   return getters.get_desc(1, state.main_ln_id, 1, "NA", 'header')
    // },

    // get_desc2: (state, getters) => (itemid, def_ln_id, def_desc, tabname) => {
    //   // itemid, main_ln_id, default_ln_id, default desc, tabname
    //   var y = {};
    //   y.desc = def_desc;
    //   return (
    //     (
    //     state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == state.main_ln_id)) ||
    //     state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == def_ln_id)) ||
    //     y
    //     ).desc
    //   )
    // },

    // get_desc: (state, getters) => (itemid, def_ln_id, def_desc, tabname) => {
    //   var y = {};
    //   y.desc = def_desc;
    //   return (
    //     (
    //     state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == state.main_ln_id)) ||
    //     state.map_desc.get(tabname).find(itm => (itm.id == itemid && itm.ln_id == def_ln_id)) ||
    //     y
    //     ).desc
    //   )
    // },

// idea saint and table have a _detail. This is displayed in the respective pages. DRY code below
    // get_detail: (state, getters) => (itemid, tabname) => {
    //   // itemid, all_ln_id[], tabname(string)
    //   return (
    //     state.map_detail.get(tabname).filter(itm => (itm.id ===  itemid) && state.all_ln_id.includes(itm.ln_id)) || []
    //   )
    // },

    // get_ism: (state, getters) => (hierpath) => {
    //   // [parentid] , [null]
    //     // alert("Hello from get_ism")
    //     return state.ism.filter( item => hierpath.includes(item.h_path));
    // },

// get node based on p_id array and then by a superior table state.map_nodeid.get(supernode)
// sample ('node1', [0], 'node1_0', 'node0', 'id', 'to_id', sel_ism ) for saintbyism
    // get_node: (state, getters) => (sourcenode, p_id_arr, linktab, supernode, linktab_id_is_source, sel_supernode ) => {
    //
    //   var sel_supernode_id = sel_supernode.map(x => x.id)
    //   // get source by the parent id array
    //   var source_by_p_id = state.map_node.get(sourcenode).filter( item => p_id_arr.includes(item.p_id))
    //   // from the link table filter the records that match the selected supernode ids
    //   var link_by_supernode = state.map_node.get(linktab).filter(item => sel_supernode_id.includes(linktab_id_is_source ? item.to_id : item.id))
    //   // now get the source node ids from the above selTemples
    //   var sourceid_link = link_by_supernode.map(item => linktab_id_is_source ? item.id : item.to_id )
    //   // next filter the sourcenode by the above step
    //   var source_by_supernode = state.map_node.get(sourcenode).filter(item => sourceid_link.includes(item.id))
    //   // now get the common denominator of the source by parent and the above step
    //   var zcommon = source_by_p_id.filter(value => -1 !== source_by_supernode.indexOf(value))
    //   // alert ("sel_supernode_id" + JSON.stringify(sel_supernode_id))
    //   // alert ("state.map_node.get(sourcenode)" + JSON.stringify(state.map_node.get(sourcenode)))
    //   // alert ("state.map_node.get(linktab)" + JSON.stringify(state.map_node.get(linktab)))
    //   // alert ("link_by_supernode" + JSON.stringify(link_by_supernode))
    //   // alert ("sourceid_link" + JSON.stringify(sourceid_link))
    //   // alert ("source_by_supernode" + JSON.stringify(source_by_supernode))
    //   // alert ("zcommon" + JSON.stringify(zcommon))
    //
    //   return zcommon;
    //
    //
    // },


    // get_saint: (state, getters) => (parentarr, ismarr) => {
    //   // [parentid] , [{id: 1, p_id: 0}]
    //     var saint_ism_byism = state.saint_ism_old.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var saintid_byism = saint_ism_byism.map(x => x.saint_id);
    //     var saint_byism = state.saint.filter(item => saintid_byism.includes(item.id))
    //     var saint_byism_byparent = saint_byism.filter( item => parentarr.includes(item.p_id));
    //     // alert ("get_saint" + JSON.stringify(saint_byism_byparent))
    //     return saint_byism_byparent;
    //     // return [{id:1},{id:2},{id:3}];
    // },

    // get_temple: (state, getters) => (parentarr, ismarr) => {
    //   // [parentid] , [{id: 1, p_id: 0}]
    //     var temple_ism_byism = state.temple_ism_old.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var templeid_byism = temple_ism_byism.map(x => x.temple_id);
    //     var temple_byism = state.temple.filter(item => templeid_byism.includes(item.id))
    //     var temple_byism_byparent = temple_byism.filter( item => parentarr.includes(item.p_id));
    //     // alert ("get_temple" + JSON.stringify(temple_byism_byparent))
    //     return temple_byism_byparent;
    //     // return [{id:1},{id:2},{id:3}];
    // },

    // get_temple2: (state, getters) => (parentarr, ppsarr) => {
    //   // [parentid] , [{id: 1, p_id: 0}]
    //     var temple_pps_bypps = state.temple_pps.filter( item => ppsarr.map(x => x.id).includes(item.pps_id));
    //     var templeid_bypps = temple_pps_bypps.map(x => x.temple_id);
    //     var temple_bypps = state.temple.filter(item => templeid_bypps.includes(item.id))
    //     var temple_bypps_byparent = temple_bypps.filter( item => parentarr.includes(item.p_id));
    //     return temple_bypps_byparent;
    //     // return [{id:1},{id:2},{id:3}];
    // },


    // get_song: (state, getters) => (parentarr, ismarr) => {
    //   // [parentid] , [{id: 1, p_id: 0}]
    //     var song_ism_byism = state.song_ism_old.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var songid_byism = song_ism_byism.map(x => x.song_id);
    //     var song_byism = state.song.filter(item => songid_byism.includes(item.id))
    //     var song_byism_byparent = song_byism.filter( item => parentarr.includes(item.p_id));
    //     // alert ("get_song" + JSON.stringify(song_byism_byparent))
    //     return song_byism_byparent;
    //     // return [{id:1},{id:2},{id:3}];
    // },

    // get_song2: (state, getters) => (saintarr, templearr, ismarr) => {
    //   // [{saint}], [{templeid}] , [{id: ismid, p_id: 0}]
    //     var song_ism_byism = state.song_ism_old.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var songid_byism = song_ism_byism.map(x => x.song_id);
    //     var songid_bysaint = state.saint_song.filter(item => saintarr.map(x => x.id).includes(item.saint_id)).map(x => x.song_id);
    //     var songid_bytemple = state.temple_song.filter( item => templearr.map(x => x.id).includes(item.temple_id)).map(x => x.song_id);
    //     var songid = songid_bytemple.filter(value => -1 !== songid_bysaint.indexOf(value)).filter(value => -1 !== songid_byism.indexOf(value))
    //     var song_by = state.song.filter(item => songid.includes(item.id))
    //
    //     return song_by;
    //     // return [{id:1},{id:2},{id:3}];
    // },

    // get_song3: (state, getters) => (templearr, ismarr) => {
    //   // [{saint}], [{templeid}] , [{id: ismid, p_id: 0}]
    //     var song_ism_byism = state.song_ism_old.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var songid_byism = song_ism_byism.map(x => x.song_id);
    //     // var songid_bysaint = state.saint_song.filter(item => saintarr.map(x => x.id).includes(item.saint_id)).map(x => x.song_id);
    //     var songid_bytemple = state.temple_song.filter( item => templearr.map(x => x.id).includes(item.temple_id)).map(x => x.song_id);
    //     var songid = songid_bytemple.filter(value => -1 !== songid_byism.indexOf(value))
    //     var song_by = state.song.filter(item => songid.includes(item.id))
    //
    //     return song_by;
    //     // return [{id:1},{id:2},{id:3}];
    // },
    //
    // get_saint3: (state, getters) => (templearr, ismarr) => {
    //   // [{saint}], [{templeid}] , [{id: ismid, p_id: 0}]
    //     var saint_ism_byism = state.saint_ism_old.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var saintid_byism = saint_ism_byism.map(x => x.saint_id);
    //     // var songid_bysaint = state.saint_song.filter(item => saintarr.map(x => x.id).includes(item.saint_id)).map(x => x.song_id);
    //     var saintid_bytemple = state.saint_temple.filter( item => templearr.map(x => x.id).includes(item.temple_id)).map(x => x.saint_id);
    //     var saintid = saintid_bytemple.filter(value => -1 !== saintid_byism.indexOf(value))
    //     var saint_by = state.saint.filter(item => saintid.includes(item.id))
    //
    //     return saint_by;
    //     // return [{id:1},{id:2},{id:3}];
    // },
    //
    //
    //
    // get_pps: (state, getters) => (parentarr, ismarr) => {
    //   // [parentid] , [{id: 1, p_id: 0}]
    //     var pps_ism_byism = state.pps_ism.filter( item => ismarr.map(x => x.id).includes(item.ism_id));
    //     var ppsid_byism = pps_ism_byism.map(x => x.pps_id);
    //     var pps_byism = state.pps.filter(item => ppsid_byism.includes(item.id))
    //     var pps_byism_byparent = pps_byism.filter( item => parentarr.includes(item.p_id));
    //     return pps_byism_byparent;
    //     // return [{id:1},{id:2},{id:3}];
    // },


  },

  mutations: {

      initStore (state) {
        // using the Map set and get function to refer subsequently
        state.map_desc = new Map();
        // state.map_desc.set('header', state.header_desc).set('node0', state.ism_desc).set('node1', state.saint_desc).set('node2', state.temple_desc).set('node3', state.song_desc).set('node4', state.pps_desc);
        state.map_desc.set('node2', state.temple_desc).set('node3', state.song_desc);
        state.map_detail = new Map();
        state.map_detail.set('node1', state.saint_detail).set('node2', state.temple_detail);
        state.map_node = new Map();
        state.map_node.set('node0', state.ism).set('node1', state.saint).set('node2', state.temple).set('node3', state.song).set('node1_0', state.saint_ism).set('node2_0', state.temple_ism).set('node3_0', state.song_ism);
      },

      update_locale (state, payload) {
          // state.main_ln_id = payload;
          // var x = [payload];
          state.add_ln_id = state.add_ln_id.filter(x => x != payload);
          state.all_ln_id = [payload].concat(state.add_ln_id);
        },

      update_add_ln (state, payload) {
          state.add_ln_id = payload[0];
          // var x = [state.main_ln_id];
          // state.all_ln_id = [state.main_ln_id].concat(payload);
          state.all_ln_id = [payload[1]].concat(payload[0]);
        },



    songsDetailsMut (state, payload) {
      // payload 0 is the array of Details
      // payload 1 is the Id number that is getting added
        state.songsDetails.push(payload[0]);

        if (state.songsDetailsId.indexOf(payload[1]) === -1) {
            state.songsDetailsId.push(payload[1]);
        };
        // state.songsDetailsId.push(payload[1]);
      }
  },

  actions: {
    initStore: ({commit}) => {
      commit('initStore');
    },

    // update_main_ln: ({commit}, payload) => {
    //   alert ("hellp from methods")
    //   commit('update_main_ln', payload);
    // },


    songsDetailsAct: ({commit, state}, payload) => {
      // payload is an array of Ids from sourceFilePage
      // alert("from action - payload" + payload)
      payload.forEach(function(element) {
        // alert("from action - songsDetailsId element " + element + "state" + state.songsDetailsId)
        const a = element
//0524        rObj = [];
        //0524 var rObj = {};
        //0524        rObj["Id"] = a;
        //0524        rObj["Content"] = [];
        // const asongsDetails = []
        // axios.get('https://templesvuet.firebaseio.com/mSongsDetails.json?orderBy="Id"&equalTo=' + a )
        // axios.get('https://templesvuet.firebaseio.com/wsongsDetails.json?orderBy="song_id"&equalTo=' + a )
        axios.get('http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/songdetail?song_id=eq.' + a )
          .then(res => {
            const data = res.data
            for (let key in data) {
              if ( data[key] !== null && Object.keys(data[key]).length >0) {
                commit('songsDetailsMut', [data[key], a])
                // const sdetail = data[key]
                // alert( "sdetail" + sdetail.Ln + Object.keys(sdetail).length)
//0524                rObj.push(sdetail)
                //0524              rObj["Content"].push(sdetail)
              }
//0524            }
            // console.log(asongsDetails.length)
//0524            if (rObj.length >0) {
            //0524            if (rObj["Content"].length >0) {
//0524              if (sdetail.length >0) {
//0524                commit('songsDetailsMut', [sdetail, a])
//0524              }
//0524              commit('songsDetailsMut', [rObj, a])
//0524            }
            }
//0524          .catch(error => console.log(error))
          })
      // before commit the mutation a check is done for lenght. else undefined objects where gettin in
      })
    }
  }
})
