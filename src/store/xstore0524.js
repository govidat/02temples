import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { mlanguages } from './customize.js'

import {mismsMaster, mppssMaster, msaintsGr1Master} from './mastersPRD/General.js'
import {mstatesMaster} from './mastersPRD/States.js'
import {mdistrictsMaster} from './mastersUT/Districts.js'
// import {mregionsMaster} from './mastersUT/Regions.js'
import {msaintsMaster} from './mastersUT/Saints.js'
import {msaintsDetails} from './mastersUT/SaintsDetails.js';
import {mtemplesMaster} from './mastersUT/Temples.js'
import {mtemplesDetails} from './mastersUT/TemplesDetails.js';
import {msongsMaster} from './mastersUT/Songs.js'
import {msongsComp, msongsGr1Master} from './mastersUT/SongsGrp.js'

// import {msongsDetails} from './mastersUT/SongsDetails.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languages: mlanguages,
    ismsMaster: mismsMaster,
    ppssMaster: mppssMaster,
    statesMaster: mstatesMaster,
    districtsMaster: mdistrictsMaster,
    // regionsMaster: mregionsMaster,
    saintsMaster: msaintsMaster,
    saintsDetails: msaintsDetails,
    saintsGr1Master: msaintsGr1Master,
    templesMaster: mtemplesMaster,
    templesDetails: mtemplesDetails,
    songsMaster: msongsMaster,
    // songsDetails: msongsDetails,
    songsDetails: [],
    songsDetailsId: [],
    songsComp: msongsComp,
    songsGr1Master: msongsGr1Master
  },

  getters: {
    languagesGet: state => {
      return state.languages;
    },
    ismsMasterGet: state => {
      return state.ismsMaster;
    },
    ppssMasterGet: state => {
      return state.ppssMaster;
    },
    statesMasterGet: state => {
      return state.statesMaster;
    },
    districtsMasterGet: state => {
      return state.districtsMaster;
    },
    // regionsMasterGet: state => {
    //   return state.regionsMaster;
    // },
    saintsMasterGet: state => {
      return state.saintsMaster;
    },
    saintsDetailsGet: state => {
      return state.saintsDetails;
    },
    saintsGr1MasterGet: state => {
      return state.saintsGr1Master;
    },
    templesMasterGet: state => {
      return state.templesMaster;
    },
    templesDetailsGet: state => {
      return state.templesDetails;
    },
    songsMasterGet: state => {
      return state.songsMaster;
    },
    songsDetailsGet: state => {
      return state.songsDetails;
    },
    songsDetailsIdGet: state => {
      return state.songsDetailsId;
    },

    songsCompGet: state => {
      return state.songsComp;
    },
    songsGr1MasterGet: state => {
      return state.songsGr1Master;
    },

  },

  mutations: {
    songsDetailsMut (state, payload) {
      // payload 0 is the array of Details
      // payload 1 is the Id number that is getting added
        state.songsDetails.push(payload[0]);
        state.songsDetailsId.push(payload[1]);
      }
  },

  actions: {
    songsDetailsAct: ({commit}, payload) => {
      // payload is an array of Ids from sourceFilePage
      payload.forEach(function(element) {
        const a = element
        var rObj = {};
        rObj["Id"] = a;
        rObj["Content"] = [];

        // const asongsDetails = []
        // axios.get('https://templesvuet.firebaseio.com/mSongsDetails.json?orderBy="Id"&equalTo=' + a )
        axios.get('https://templesvuet.firebaseio.com/vsongsDetails.json?orderBy="Id"&equalTo=' + a )
          .then(res => {
            // console.log(res)
            const data = res.data
            for (let key in data) {
              // console.log(data[key])
              if ( data[key] !== null) {
                const sdetail = data[key]
                rObj["Content"].push(sdetail)
              }
            }
            // console.log(asongsDetails.length)
            if (rObj["Content"].length >0) {
              commit('songsDetailsMut', [rObj, a])
            }
          })
          .catch(error => console.log(error))
      })
      // before commit the mutation a check is done for lenght. else undefined objects where gettin in
    }
  }
})
