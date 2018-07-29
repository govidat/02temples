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

import { messages2 } from './mastersUT/messages2.js';
import { node1_messages } from './mastersUT/node1_messages.js';
import { node2_messages } from './mastersUT/node2_messages.js';
import { node3_messages } from './mastersUT/node3_messages.js';


// import {saint2, saint_hier, saint_hier_desc, ism_saint} from './mastersUT/saints.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: languages,
    messages2: messages2,
    // saint-details
    node1_messages: node1_messages,
    node2_messages: node2_messages,
    node3_messages: node3_messages,

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

    temple_saint: temple_saint,

    temple: temple,
    temple_hier: temple_hier,
    ism_temple: ism_temple,
    pps_temple: pps_temple,
    // temple_desc: temple_desc,
    // temple_ism: temple_ism,
    // temple_ism_old: temple_ism_old,

    // temple_pps: temple_pps,
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
    ism_pps: ism_pps,

    // saint_detail: saint_detail,
    // temple_detail: temple_detail,

    songsDetails: [],
    songsDetailsId: [],

    // ism_saint: ism_saint,


  },

  getters: {

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
