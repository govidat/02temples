<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app>
      <v-toolbar extended height=40>
        <v-list><v-list-tile><v-list-tile-action><v-icon>filter</v-icon></v-list-tile-action>
            <v-list-tile-content>{{$t('desc.' + 't01')}}</v-list-tile-content></v-list-tile></v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- 10 - node0/ ism 20 - radios -->
      <v-list>
        <v-list-group v-for="item in [{id: 't10', model: false},{id: 't20', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content> <v-list-tile-title>
              {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't10'" :headerinput= "[ 't05', 't10']" :items="node.filter(x=> x.cat_id==5)" :selected.sync="sel_node0" :msg= "'entity'" ></zfilter3> -->
          <zfilter4 v-if="! isentityLoading && item.id == 't10'" :headerinput= "[ 't05', 't10']" :itemsid="max_ism_id" :selected.sync="sel_ism" :msg= "'entity'" ></zfilter4>
          <!-- following is a radio button selection of radio options -->
          <template v-if="item.id == 't20'">
            <v-container fluid><v-radio-group v-model="radios" :mandatory="false" v-for="elem in ['t21','t22','t23']">
                <v-radio :label="$t('desc.' + elem)" :value="elem"></v-radio></v-radio-group></v-container></template>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

      <!-- if radios=21, then 30saint, 40temples, 50songs ; radios=22 then selList30 -->
      <!-- Sublist => 30 Saints 40 Temples 50 Songs-->
      <!-- Sublist : 31 for Saint-Group 30 for Saints-->
      <!-- Sublist of 40 Temples -->
        <!-- Sublist => 42 State 41 District 40 Temple-->
        <!-- Sublist of 2030 -->
        <!-- Sublist => 52 Songs Grp 51 Song Comp 50 Song-->

      <v-list v-if="radios == 't21'">
        <v-list-group v-for="item in [{id: 't30', model: false},{id: 't40', model: false},{id: 't50', model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <template v-if="item.id == 't30'">
            <v-list-group v-for="item in [{id: 't31', model: false},{id: 't30', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't31'" :headerinput= "[ 't05', 't31']" :itemsid="max_vw1_saintgrp_id" :selected.sync="sel_vw1_saintgrp" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't31'" :headerinput= "[ 't05', 't31']"
              :items="node.filter(x => max_nodeh.includes(x.id) && x.path.length == 1 && x.cat_id == 11)"
              :selected.sync="f10sel_node1h[0]"
              :msg= "'entity'" ></zfilter3> -->
              <zfilter4 v-if="! isentityLoading && item.id == 't30'" :headerinput= "[ 't05', 't30']" :itemsid="max_vw1_saintgrp_saint_id" :selected.sync="sel_vw1_saintgrp_saint" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't30'" :headerinput= "[ 't05', 't30']"
              :items="node.filter(itm => itm.path.some(r => f10sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0) && itm.cat_id == 8)"
              :selected.sync="f10sel_node1"
              :msg= "'entity'" ></zfilter3> -->
            </v-list-group>
          </template>
          <template v-if="item.id == 't40'">
            <v-list-group v-for="item in [{id: 't42', model: false},{id: 't41', model: false},{id: 't40', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']" :itemsid="max_vw1_state_id" :selected.sync="sel_vw1_state" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']"
              :items="node.filter(x => max_nodeh.includes(x.id) && x.cat_id == 12 && x.path.length == 1)"
              :selected.sync="f10sel_node2h[0]"
              :msg= "'entity'" ></zfilter3> -->
              <zfilter4 v-if="! isentityLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']" :itemsid="max_vw1_state_dist_id" :selected.sync="sel_vw1_state_dist" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']"
              :items="node.filter(x => max_nodeh.includes(x.id) && x.path.length == 2 && x.path.some(r => f10sel_node2h[0].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node2h[1]"
              :msg= "'entity'" ></zfilter3> -->
              <zfilter4 v-if="! isentityLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']" :itemsid="max_vw1_state_dist_temp_id" :selected.sync="sel_vw1_state_dist_temp" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']"
              :items="node.filter(itm => itm.path.some(r => f10sel_node2h[1].map(a => a.id).indexOf(r) >=0) && itm.cat_id == 9)"
              :selected.sync="f10sel_node2"
              :msg= "'entity'" ></zfilter3> -->

            </v-list-group>
          </template>

          <template v-if="item.id == 't50'">
            <v-list-group v-for="item in [{id: 't52', model: false},{id: 't51', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't52'" :headerinput= "[ 't05', 't52']" :itemsid="max_vw1_songgrp_id" :selected.sync="sel_vw1_songgrp" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't52'" :headerinput= "[ 't05', 't52']"
              :items="node.filter(x => max_nodeh.includes(x.id) && x.cat_id == 13 && x.path.length == 1)"
              :selected.sync="f10sel_node3h[0]"
              :msg= "'entity'" ></zfilter3> -->
              <zfilter4 v-if="! isentityLoading && item.id == 't51'" :headerinput= "[ 't05', 't51']" :itemsid="max_vw1_songgrp_songcomp_id" :selected.sync="sel_vw1_songgrp_songcomp" :msg= "'entity'" ></zfilter4>
              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't51'" :headerinput= "[ 't05', 't51']"
              :items="node.filter(x => max_nodeh.includes(x.id) && x.path.length == 2 && x.path.some(r => f10sel_node3h[0].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node3h[1]"
              :msg= "'entity'" ></zfilter3> -->
            </v-list-group>
          </template>
        </v-list-group>
      </v-list>
      <!-- Sublist => 30 Saints 40 Temples -->
      <!-- Sublist : 31 for Saint-Group 30 for Saints-->
      <!-- Sublist of 40 Temples -->
      <!-- Sublist => 42 State 41 District 40 Temple-->

      <v-list v-if="radios == 't22'">
        <v-list-group v-for="item in [{id: 't30', model: false},{id: 't40', model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <template v-if="item.id == 't30'">
            <v-list-group v-for="item in [{id: 't31', model: false},{id: 't30', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't31'" :headerinput= "[ 't05', 't31']" :itemsid="max_vw2_saintgrp_id" :selected.sync="sel_vw2_saintgrp" :msg= "'entity'" ></zfilter4>

              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't31'" :headerinput= "[ 't05', 't31']"
              :items="node.filter(x => max_nodeh.includes(x.id) && x.path.length == 1 && x.cat_id == 11)"
              :selected.sync="f20sel_node1h[0]"
              :msg= "'entity'" ></zfilter3> -->
              <zfilter4 v-if="! isentityLoading && item.id == 't30'" :headerinput= "[ 't05', 't30']" :itemsid="max_vw2_saintgrp_saint_id" :selected.sync="sel_vw2_saintgrp_saint" :msg= "'entity'" ></zfilter4>

              <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't30'" :headerinput= "[ 't05', 't30']"
              :items="node.filter(itm => itm.path.some(r => f20sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0) && itm.cat_id == 8)"
              :selected.sync="f20sel_node1"
              :msg= "'entity'" ></zfilter3> -->
            </v-list-group>
          </template>

          <template v-if="item.id == 't40'">
            <v-list-group v-for="item in [{id: 't42', model: false},{id: 't41', model: false},{id: 't40', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
                <zfilter4 v-if="! isentityLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']" :itemsid="max_vw2_state_id" :selected.sync="sel_vw2_state" :msg= "'entity'" ></zfilter4>
                <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']"
                :items="node.filter(x => max_nodeh.includes(x.id) && x.cat_id == 12 && x.path.length == 1)"
                :selected.sync="f20sel_node2h[0]"
                :msg= "'entity'" ></zfilter3> -->
                <zfilter4 v-if="! isentityLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']" :itemsid="max_vw2_state_dist_id" :selected.sync="sel_vw2_state_dist" :msg= "'entity'" ></zfilter4>
                <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']"
                :items="node.filter(x => max_nodeh.includes(x.id) && x.path.length == 2 && x.path.some(r => f20sel_node2h[0].map(a => a.id).indexOf(r) >=0))"
                :selected.sync="f20sel_node2h[1]"
                :msg= "'entity'" ></zfilter3> -->
                <zfilter4 v-if="! isentityLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']" :itemsid="max_vw2_state_dist_temp_id" :selected.sync="sel_vw2_state_dist_temp" :msg= "'entity'" ></zfilter4>
                <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']"
                :items="node.filter(itm => itm.path.some(r => f20sel_node2h[1].map(a => a.id).indexOf(r) >=0) && itm.cat_id == 9)"
                :selected.sync="f20sel_node2"
                :msg= "'entity'" ></zfilter3> -->

            </v-list-group>
          </template>

        </v-list-group>
      </v-list>

<!--  temples sung by saints t23-->
<!-- 43 PPS 40 Temples -->
<!-- 43 node4 is pps -->
<!-- Sublist => 42 State 41 District 40 Temple-->
      <v-list v-if="radios == 't23'">
      <!-- <v-list v-else-if="radios == 't23'"> -->
        <v-list-group v-for="item in [{id: 't43', model: false},{id: 't40', model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <zfilter4 v-if="! isentityLoading && item.id == 't43'" :headerinput= "[ 't05', 't43']" :itemsid="max_vw3_pps_id" :selected.sync="sel_vw3_pps" :msg= "'entity'" ></zfilter4>

          <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't43'" :headerinput= "[ 't05', 't43']"
          :items="node.filter(x => max_nodeh.includes(x.id) && x.cat_id == 93)"
          :selected.sync="sel_node4" :msg= "'entity'" ></zfilter3> -->
            <template v-if="item.id == 't40'">
              <v-list-group v-for="item in [{id: 't42', model: false},{id: 't41', model: false},{id: 't40', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
                <zfilter4 v-if="! isentityLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']" :itemsid="max_vw3_pps_state_id" :selected.sync="sel_vw3_pps_state" :msg= "'entity'" ></zfilter4>
                <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']"
                :items="node.filter(x => max_nodeh_pps.includes(x.id) && x.path.length == 1)"
                :selected.sync="f30sel_node2h[0]"
                :msg= "'entity'" ></zfilter3> -->
                <zfilter4 v-if="! isentityLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']" :itemsid="max_vw3_pps_state_dist_id" :selected.sync="sel_vw3_pps_state_dist" :msg= "'entity'" ></zfilter4>
                <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']"
                :items="node.filter(x => max_nodeh_pps.includes(x.id) && x.path.length == 2 && x.path.some(r => f30sel_node2h[0].map(a => a.id).indexOf(r) >=0))"
                :selected.sync="f30sel_node2h[1]"
                :msg= "'entity'" ></zfilter3> -->
                <zfilter4 v-if="! isentityLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']" :itemsid="max_vw3_pps_state_dist_temp_id" :selected.sync="sel_vw3_pps_state_dist_temp" :msg= "'entity'" ></zfilter4>
                <!-- <zfilter3 v-if="! isnodeLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']"
                :items="node.filter(itm => itm.path.some(r => f30sel_node2h[1].map(a => a.id).indexOf(r) >=0) && itm.cat_id == 9)"
                :selected.sync="f30sel_node2"
                :msg= "'entity'" ></zfilter3> -->

              </v-list-group>
            </template>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" extended height=40>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        {{$t('desc.' + 't00')}}
        <!-- {{$t("stat_message.title")}} -->
        <!-- {{ get_desc(0, 'en', 'NA', 'header') }} -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Badge is used only of the badge num value is > 0 -->
      <!-- Pass the ztool value. Based on this component is selected below.       -->
      <!-- <v-btn-toggle v-model="toggle_exclusive">
      </v-btn-toggle> -->
      <!-- <v-tabs color="transparent" right>
        <v-tab> -->
      <!-- <v-tooltip bottom> -->
        <!-- <v-card height='40px' flat color="transparent">
          <v-select :items="languages" v-model="mlang" label="Language"></v-select>
        </v-card> -->
        <v-card height='40px' flat color="transparent">
          <v-select :items="languages" v-model="$i18n.locale" label="Language"></v-select>
          <!-- <v-select :items="languages" v-model="main_ln_id" label="Language" @input="update_main_ln"></v-select> -->
        </v-card>
        <!-- with i18n add lannguages seems irrelevant -->
        <!-- <v-card height='40px' flat color="transparent">
          <v-select  :items="languages.filter(item => item.value !== $i18n.locale)" v-model="add_ln_id" multiple label="Add Languages"></v-select>
        </v-card> -->


      <v-tabs color="transparent" right slot="extension">
        <!-- <v-tab v-for="(item, j) in ztoolbar1" :key="j" @click.stop="ztool = item.menu"> -->
        <v-tab v-for="item in ztoolbar1" @click.stop="ztool = item.menu">
                {{$t('desc.' + item.id)}}
          <!-- <v-badge v-if="item.badgeNum>0">
            <span slot="badge">{{item.badgeNum}}</span>
          </v-badge> -->
        </v-tab>

      </v-tabs>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <!-- Select the component based on ztool value pass on the id's of sel-->
      <div v-if="ztool=='Saints'"><zsaints :sourceFile="sel_saint_id"></zsaints></div>
      <div v-else-if="ztool=='Temples'"><ztemples :sourceFile="sel_temple_id"></ztemples></div>
      <!-- <div v-else-if="ztool=='Temples'"><ztemples :sourceFile="selTemples()" :cat_id=9></ztemples></div> -->
      <div v-else-if="ztool=='Songs'"><zsongs  :sourceFile="sel_song_id"></zsongs></div>
      <!-- <div v-else-if="ztool=='Songs'"><zsongs  :sourceFile="selSongs()" :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zsongs></div> -->
      <div v-else-if="ztool=='About'"><HelloWorld/></div>
      <div v-else-if="ztool=='Contact'"><HelloWorld/></div>
      <div v-else><zHome></zHome></div>
      <!-- <div v-else><zHome :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zHome></div> -->
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Govidat &copy; 2018</span>
      <!-- {{max_ism_id}}
      {{sel_ism}} -->
      <!-- {{ sel_saint_id}}
      {{ sel_temple_id}}
      {{ sel_song_id}} -->
      <!-- {{ sel_vw1_songgrp }}
      {{ sel_vw1_songgrp_songcomp }}
      {{ sel_vw1_songgrp_songcomp_song_id }} -->
    </v-footer>
  </v-app>
</template>

<script>

import HelloWorld from './components/HelloWorld'
import zfilter3 from './components/03filter'
import zfilter4 from './components/04filter'
import zHome from './components/10Home'
// import ztext from './components/20text'
import ztemples from './components/20temples'
import zsaints from './components/20saints'
import zsongs from './components/20songs'
// import ztemples from './components/25temples'
// import zsongs from './components/30songs'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'
// import { fn_desc } from './myMixin'
// import {max_id} from './helper.js'

export default {
  // mixins: [fn_desc],

  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      iconup: 'keyboard_arrow_up',
      icondn: 'keyboard_arrow_down',
      miniVariant: false,

      radios: "t23",

      ztool: 0,
      toggle_exclusive: 0,

      // sel_node0: [{id: 101, d_id: 1, cat_id: 5, path: []}],
      // sel_node0: [],
      // for the vurtify to work sel_ism will be an array of type [{id: 1}, {id: 2}]

      // sel is in the form of [{id: 1}, {id: 2}]
      sel_ism: [{id: 101}],
      sel_vw1_saintgrp: [{id: 500}],
      sel_vw1_saintgrp_saint: [{id: 105}],
      sel_vw1_state: [{id: 504}],
      sel_vw1_state_dist: [{id: 505}],
      sel_vw1_state_dist_temp: [{id: 110}],
      sel_vw1_songgrp: [{id: 508}],
      sel_vw1_songgrp_songcomp: [{id: 510}],
      // sel_vw1_songgrp_songcomp_song: [],

      sel_vw2_saintgrp: [{id: 500}],
      sel_vw2_saintgrp_saint: [{id: 105}],
      sel_vw2_state: [{id: 504}],
      sel_vw2_state_dist: [{id: 505}],
      sel_vw2_state_dist_temp: [{id: 110}],

      sel_vw3_pps: [{id: 103}],
      sel_vw3_pps_state: [{id: 504}],
      sel_vw3_pps_state_dist: [{id: 505}],
      sel_vw3_pps_state_dist_temp: [{id: 109}],

      // f10sel_node1h: [[]],
      // f10sel_node1: [],

      // node2: temple
      // f10sel_node2h: [[],[]],
      // f10sel_node2: [],

      // node3: song
      // f10sel_node3h: [[],[]],
      // f10sel_node3: [],  this is computed

      // node1: saint
      // f20sel_node1h: [[]],
      // f20sel_node1: [],

      // node2: temple
      // f20sel_node2h: [[],[]],
      // f20sel_node2: [],

      // node4: pps
      // sel_node4: [],
      // f30sel_node2h: [[],[]],
      // f30sel_node2: [],
      // sel_node4: [{ "cat_id": 93, "d_id": 1, "id": 103, "path": [ 103 ] } ],
      // f30sel_node2h: [[{ "cat_id": 92, "d_id": 2, "id": 504, "path": [ 504 ] } ],[{ "cat_id": 91, "d_id": 1, "id": 505, "path": [ 504, 505 ] } ]],
      // f30sel_node2: [{ "cat_id": 9, "d_id": 2, "id": 109, "path": [ 504, 505 ] } ],

      ztoolbar1: [
          {id: 't99', menu: 'Home'},
          {id: 't30', menu: 'Saints'},
          {id: 't40', menu: 'Temples'},
          {id: 't50', menu: 'Songs'},
          {id: 't97', menu: 'About'},
          {id: 't98', menu: 'Contact'}
        ],

    }
  },
  name: 'App',

  // mounted() {
  //      this.$store.dispatch('initnode')
  // },

  watch: {
    // main_ln_id : function () {
    //   this.$store.commit('update_locale', this.$i18n.locale)
    // },
    sel_ism : function () {
      this.sel_vw1_saintgrp = this.sel_vw1_saintgrp.filter(itm => this.max_vw1_saintgrp_id.includes(itm.id))
      this.sel_vw1_state = this.sel_vw1_state.filter(itm => this.max_vw1_state_id.includes(itm.id))
      this.sel_vw1_songgrp = this.sel_vw1_songgrp.filter(itm => this.max_vw1_songgrp_id.includes(itm.id))

      this.sel_vw2_saintgrp = this.sel_vw2_saintgrp.filter(itm => this.max_vw2_saintgrp_id.includes(itm.id))
      this.sel_vw2_state = this.sel_vw2_state.filter(itm => this.max_vw2_state_id.includes(itm.id))

      this.sel_vw3_pps = this.sel_vw3_pps.filter(itm => this.max_vw3_pps_id.includes(itm.id))
    },

    sel_vw1_saintgrp : function () {
      this.sel_vw1_saintgrp_saint = this.sel_vw1_saintgrp_saint.filter(itm => this.max_vw1_saintgrp_saint_id.includes(itm.id))
    },
    sel_vw1_state : function () {
      this.sel_vw1_state_dist = this.sel_vw1_state_dist.filter(itm => this.max_vw1_state_dist_id.includes(itm.id))
    },
    sel_vw1_state_dist : function () {
      this.sel_vw1_state_dist_temp = this.sel_vw1_state_dist_temp.filter(itm => this.max_vw1_state_dist_temp_id.includes(itm.id))
    },

    sel_vw2_saintgrp : function () {
      this.sel_vw2_saintgrp_saint = this.sel_vw2_saintgrp_saint.filter(itm => this.max_vw2_saintgrp_saint_id.includes(itm.id))
    },
    sel_vw2_state : function () {
      this.sel_vw2_state_dist = this.sel_vw2_state_dist.filter(itm => this.max_vw2_state_dist_id.includes(itm.id))
    },
    sel_vw2_state_dist : function () {
      this.sel_vw2_state_dist_temp = this.sel_vw2_state_dist_temp.filter(itm => this.max_vw2_state_dist_temp_id.includes(itm.id))
    },

    sel_vw1_songgrp : function () {
      this.sel_vw1_songgrp_songcomp = this.sel_vw1_songgrp_songcomp.filter(itm => this.max_vw1_songgrp_songcomp_id.includes(itm.id))
    },

    sel_vw3_pps : function () {
      this.sel_vw3_pps_state = this.sel_vw3_pps_state.filter(itm => this.max_vw3_pps_state_id.includes(itm.id))
    },

    sel_vw3_pps_state : function () {
      this.sel_vw3_pps_state_dist = this.sel_vw3_pps_state_dist.filter(itm => this.max_vw3_pps_state_dist_id.includes(itm.id))
    },
    sel_vw3_pps_state_dist : function () {
      this.sel_vw3_pps_state_dist_temp = this.sel_vw3_pps_state_dist_temp.filter(itm => this.max_vw3_pps_state_dist_temp_id.includes(itm.id))
    },



    // IDEA: if ism is changed subsequently F10, F20 , f30 should be filtered should be revaluate
    // sel_node0 : function () {
      // for (var i = 0; i < this.f10sel_node1h.length; i++) {
      //   this.f10sel_node1h[i] = this.f10sel_node1h[i].filter( item => this.max_nodeh.includes(item.id) && item.cat_id == 11);
      // }
      // this.f10sel_node1 = this.f10sel_node1.filter(itm => itm.path.some(r => this.f10sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      //
      // for (var i = 0; i < this.f10sel_node2h.length; i++) {
      //   this.f10sel_node2h[i] = this.f10sel_node2h[i].filter( item => this.max_nodeh.includes(item.id) && item.cat_id == 12);
      // };
      // this.f10sel_node2 = this.f10sel_node2.filter(itm => itm.path.some(r => this.f10sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      //
      // for (var i = 0; i < this.f10sel_node3h.length; i++) {
      //   this.f10sel_node3h[i] = this.f10sel_node3h[i].filter( item => this.max_nodeh.includes(item.id) && item.cat_id == 13);
      // };
      // this.f10sel_node3 = this.f10sel_node3.filter(itm => itm.path.some(r => this.f10sel_node3h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      // for (var i = 0; i < this.f20sel_node1h.length; i++) {
      //   this.f20sel_node1h[i] = this.f20sel_node1h[i].filter( item => this.max_nodeh.includes(item.id) && item.cat_id == 11);
      // }
      // this.f20sel_node1 = this.f20sel_node1.filter(itm => itm.path.some(r => this.f20sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      //
      // for (var i = 0; i < this.f20sel_node2h.length; i++) {
      //   this.f20sel_node2h[i] = this.f20sel_node2h[i].filter( item => this.max_nodeh.includes(item.id) && this.cat_id == 12);
      // };
      // this.f20sel_node2 = this.f20sel_node2.filter(itm => itm.path.some(r => this.f20sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      // this.sel_node4 = this.sel_node4.filter(item => this.max_nodeh.includes(item.id))
      // code to filter out f30sel_node2h..
      // for (var i = 0; i < this.f30sel_node2h.length; i++) {
      //   this.f30sel_node2h[i] = this.f30sel_node2h[i].filter( item => this.max_nodeh_pps.includes(item.id));
      // };
      // code to filter out f30sel_node2..
      // this.f30sel_node2 = this.f30sel_node2.filter(itm => itm.path.some(r => this.f30sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      // commit('isLoadingMut', true)
      // commit('isLoadingMut', false)
    // },

    // f10sel_node1h : {
    //   handler: function () {
    //     for (var i = 1; i < this.f10sel_node1h.length; i++) {
    //       this.f10sel_node1h[i] = this.f10sel_node1h[i].filter(
    //         item => item.path.some(r =>
    //                                   Array.from
    //                                   (new Set((
    //                                     this.f10sel_node1h[i-1]
    //                                     .map(a => a.path))
    //                                     .reduce((acc, a) => acc.concat(a),[])
    //                                     ))
    //                                     .indexOf(r) >=0)
    //       );
    //     };
    //     this.f10sel_node1 = this.f10sel_node1.filter(itm => itm.path.some(r => this.f10sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    //   },
    //   deep: true
    // },
    //
    // f10sel_node2h : {
    //   handler: function () {
    //     for (var i = 1; i < this.f10sel_node2h.length; i++) {
    //       this.f10sel_node2h[i] = this.f10sel_node2h[i].filter(
    //         item => item.path.some(r =>
    //                                   Array.from
    //                                   (new Set((
    //                                     this.f10sel_node2h[i-1]
    //                                     .map(a => a.path))
    //                                     .reduce((acc, a) => acc.concat(a),[])
    //                                     ))
    //                                     .indexOf(r) >=0)
    //       );
    //     };
    //     this.f10sel_node2 = this.f10sel_node2.filter(itm => itm.path.some(r => this.f10sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    //   },
    //   deep: true
    // },
    //
    // f10sel_node3h : {
    //   handler: function () {
    //     for (var i = 1; i < this.f10sel_node3h.length; i++) {
    //       this.f10sel_node3h[i] = this.f10sel_node3h[i].filter(
    //         item => item.path.some(r =>
    //                                   Array.from
    //                                   (new Set((
    //                                     this.f10sel_node3h[i-1]
    //                                     .map(a => a.path))
    //                                     .reduce((acc, a) => acc.concat(a),[])
    //                                     ))
    //                                     .indexOf(r) >=0)
    //       );
    //     };
    //     // this.f10sel_node3 = this.f10sel_node3.filter(itm => itm.path.some(r => this.f10sel_node3h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    //   },
    //   deep: true
    // },

    // f20sel_node1h : {
    //   handler: function () {
    //     for (var i = 1; i < this.f20sel_node1h.length; i++) {
    //       this.f20sel_node1h[i] = this.f20sel_node1h[i].filter(
    //         item => item.path.some(r =>
    //                                   Array.from
    //                                   (new Set((
    //                                     this.f20sel_node1h[i-1]
    //                                     .map(a => a.path))
    //                                     .reduce((acc, a) => acc.concat(a),[])
    //                                     ))
    //                                     .indexOf(r) >=0)
    //       );
    //     };
    //     this.f20sel_node1 = this.f20sel_node1.filter(itm => itm.path.some(r => this.f20sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    //   },
    //   deep: true
    // },

    // f20sel_node2h : {
    //   handler: function () {
    //     for (var i = 1; i < this.f20sel_node2h.length; i++) {
    //       this.f20sel_node2h[i] = this.f20sel_node2h[i].filter(
    //         item => item.path.some(r =>
    //                                   Array.from
    //                                   (new Set((
    //                                     this.f20sel_node2h[i-1]
    //                                     .map(a => a.path))
    //                                     .reduce((acc, a) => acc.concat(a),[])
    //                                     ))
    //                                     .indexOf(r) >=0)
    //       );
    //     };
    //     this.f20sel_node2 = this.f20sel_node2.filter(itm => itm.path.some(r => this.f20sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    //   },
    //   deep: true
    // },


    // sel_node4 : function () {
    //   // code to filter out f30sel_node2h..
    //   for (var i = 0; i < this.f30sel_node2h.length; i++) {
    //     this.f30sel_node2h[i] = this.f30sel_node2h[i].filter( item => this.max_nodeh_pps.includes(item.id));
    //   };
    //   // code to filter out f30sel_node2..
    //   this.f30sel_node2 = this.f30sel_node2.filter(itm => itm.path.some(r => this.f30sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    // },

    // f30sel_node2h : {
    //   handler: function () {
    //     for (var i = 1; i < this.f30sel_node2h.length; i++) {
    //       this.f30sel_node2h[i] = this.f30sel_node2h[i].filter(
    //         item => item.path.some(r =>
    //                                   Array.from
    //                                   (new Set((
    //                                     this.f30sel_node2h[i-1]
    //                                     .map(a => a.path))
    //                                     .reduce((acc, a) => acc.concat(a),[])
    //                                     ))
    //                                     .indexOf(r) >=0)
    //       );
    //     };
    //     this.f30sel_node2 = this.f30sel_node2.filter(itm => itm.path.some(r => this.f30sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    //   },
    //   deep: true
    // },
  },
  components: {
    HelloWorld,
    zfilter3,
    zfilter4,
    zHome,
    // ztext,
    zsaints,
    ztemples,

    // zSaints,
    // zTemples,
    zsongs
  },
  computed: {
    ...mapState(
      // ['languages','node', 'node_matrix', 'song_range','isnodeLoading', 'isentityLoading', 'node1_messages', 'node2_messages']
      ['languages','node', 'song_range','isnodeLoading', 'isentityLoading']
    ),

    // ...mapGetters({
    // }),
    main_ln_id : function () {
      return this.$i18n.locale;
    },
    // add_ln_id: {
    //   get () {
    //     return this.$store.state.add_ln_id
    //   },
    //   set (payload) {
    //     this.$store.commit('update_add_ln', [payload, this.$i18n.locale])
    //   }
    // },

    // max_id(source_array, criteria_field_name, criteria_field_value)
    // max_ism_id: function () {
    //   max_id(this.node, {cat_id: 5})
    // },
    // max_ism_id: max_id(this.node, {cat_id: 5}),

      // get all objects from node where cat_id =5
    max_ism_id: function () {
      var zcat = 5
      var tx_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      return tx_id },
      // return Array.from(new Set((this.node.filter(itm => itm.cat_id == 5).map(a => a.id)).reduce((acc, a) => acc.concat(a),[])))},
      // based on sel_ism get all the matrix items
    max_ism_matrix_id: function () {
      var zsel_id = this.sel_ism.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b);
    },
    // for view1 saintgrp 81, saint 8, state 92, district 91, temple 9, songgrp 152, songcomp 151, song 15
    max_vw1_saintgrp_id: function () {
      var zcat = 81
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    // based on sel_xxx get all the matrix items
    max_vw1_saintgrp_matrix_id: function () {
      var zsel_id = this.sel_vw1_saintgrp.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
    max_vw1_saintgrp_saint_id: function () {
      var zcat = 8
      var fil1 = this.max_vw1_saintgrp_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    sel_saint_id: function () {
      var t1_id = this.sel_vw1_saintgrp_saint.map(a => a.id).sort((a, b) => a - b)
      var t2_id = this.sel_vw2_saintgrp_saint.map(a => a.id).sort((a, b) => a - b)
      var t3_id = this.sel_vw3_pps_state_dist_temp_saint_id
      if (this.radios == "t21") { return t1_id }       // passing an array of objects with id, d_id etc...
      else if (this.radios == "t22") { return t2_id }  // passing an array of objects with id, d_id etc...
      else if (this.radios == "t23") { return t3_id }  // passing an array of objects with id, d_id etc...
    },
    sel_temple_id: function () {
      var t1_id = this.sel_vw1_state_dist_temp.map(a => a.id).sort((a, b) => a - b)
      var t2_id = this.sel_vw2_state_dist_temp.map(a => a.id).sort((a, b) => a - b)
      var t3_id = this.sel_vw3_pps_state_dist_temp.map(a => a.id).sort((a, b) => a - b)
      if (this.radios == "t21") { return t1_id }       // passing an array of objects with id, d_id etc...
      else if (this.radios == "t22") { return t2_id }  // passing an array of objects with id, d_id etc...
      else if (this.radios == "t23") { return t3_id }  // passing an array of objects with id, d_id etc...
    },

    sel_song_id: function () {
      var t1_id = this.sel_vw1_songgrp_songcomp_song_id
      var t2_id = this.sel_vw2_saint_temp_song_id
      var t3_id = this.sel_vw3_pps_state_dist_temp_song_id
      if (this.radios == "t21") { return t1_id }       // passing an array of objects with id, d_id etc...
      else if (this.radios == "t22") { return t2_id }  // passing an array of objects with id, d_id etc...
      else if (this.radios == "t23") { return t3_id }  // passing an array of objects with id, d_id etc...
    },

    max_vw1_state_id: function () {
      var zcat = 92
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    // based on sel_vw3... get all the matrix items
    max_vw1_state_matrix_id: function () {
      var zsel_id = this.sel_vw1_state.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },

    // based on above get all the max values of t41 (districts)
    // that is filter id's by t41 cat_id=91 then the intersect with above

    max_vw1_state_dist_id: function () {
      var zcat = 91
      var fil1 = this.max_vw1_state_matrix_id
      var fil2 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },

    // based on sel_vw3... get all the matrix items
    max_vw1_state_dist_matrix_id: function () {
      var zsel_id = this.sel_vw1_state_dist.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },


    // based on above get all the max values of t40 (temples)
    // that is filter id's by t40 cat_id=9 then the intersect with above
    max_vw1_state_dist_temp_id: function () {
      var zcat = 9
      var fil1 = this.max_vw1_state_dist_matrix_id
      var fil2 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },
    // for view1 saintgrp 81, saint 8, state 92, district 91, temple 9, songgrp 152, songcomp 151, song 15
    max_vw1_songgrp_id: function () {
      var zcat = 152
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    // based on sel_xxx get all the matrix items
    max_vw1_songgrp_matrix_id: function () {
      var zsel_id = this.sel_vw1_songgrp.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },

    max_vw1_songgrp_songcomp_id: function () {
      var zcat = 151
      var fil1 = this.max_vw1_songgrp_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    sel_vw1_songgrp_songcomp_song_id : function () {
      // based on songgrp_songcomp selection, generate the song id's from song_range
      var t1_id = this.sel_vw1_songgrp_songcomp.map(x => x.id)
      var t2_id = this.song_range
      return Array.from
              (new Set((
              t2_id.filter(itm => t1_id.includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
              .reduce((acc, a) => acc.concat(a),[])
              )).sort((a, b) => a - b)
    },

    // for view2 saintgrp 81, saint 8, state 92, district 91, temple 9
    max_vw2_saintgrp_id: function () {
      var zcat = 81
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    // based on sel_xxx get all the matrix items
    max_vw2_saintgrp_matrix_id: function () {
      var zsel_id = this.sel_vw2_saintgrp.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },

    max_vw2_saintgrp_saint_id: function () {
      var zcat = 8
      var fil1 = this.max_vw2_saintgrp_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    max_vw2_state_id: function () {
      var zcat = 92
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    // based on sel_vw3... get all the matrix items
    max_vw2_state_matrix_id: function () {
      var zsel_id = this.sel_vw2_state.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },

    // based on above get all the max values of t41 (districts)
    // that is filter id's by t41 cat_id=91 then the intersect with above

    max_vw2_state_dist_id: function () {
      var zcat = 91
      var fil1 = this.max_vw2_state_matrix_id
      var fil2 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },

    // based on sel_vw3... get all the matrix items
    max_vw2_state_dist_matrix_id: function () {
      var zsel_id = this.sel_vw2_state_dist.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },

    // based on above get all the max values of t40 (temples)
    // that is filter id's by t40 cat_id=9 then the intersect with above
    max_vw2_state_dist_temp_id: function () {
      var zcat = 9
      var fil1 = this.max_vw2_state_dist_matrix_id
      var fil2 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },

    sel_vw2_saint_temp_song_id : function () {
      // accumulate to_id (song_id) from saint_song
      var t1_id = this.sel_vw2_saintgrp_saint.map(x => x.id)
      var t2_id = this.song_range
      var t3_id = this.sel_vw2_state_dist_temp.map(x => x.id)
      var acc1 = Array.from
              (new Set((
              t2_id.filter(itm => t1_id.includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
              .reduce((acc, a) => acc.concat(a),[])
              )).sort((a, b) => a - b)

      // accumulate to_id (song_id) from temple_song
      var acc2 = Array.from
              (new Set((
              t2_id.filter(itm => t3_id.includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
              .reduce((acc, a) => acc.concat(a),[])
              )).sort((a, b) => a - b)

      // take the common of acc1 and acc2
      var acc3 = acc1.filter(value => -1 !== acc2.indexOf(value))
      return acc3
      // function compareNumbers(a, b) {
      //   return a - b;
      // }
      //
      // return acc3.sort(compareNumbers);

    },

    // based on above get all the max values of t43 (temples sung by saints)
    // that is filter id's by t43 cat_id=93 then the intersect with above
    max_vw3_pps_id: function () {
      var zcat = 93
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
      // var tx_id = Array.from
      //         (new Set((
      //         this.node.filter(itm => itm.cat_id == 93)
      //         .map(a => a.id))
      //         .reduce((acc, a) => acc.concat(a),[])
      //         ))
      //       .sort((a, b) => a - b);
      // return tx_id.filter(itm=> this.max_ism_matrix_id.includes(itm))
    },
    // based on sel_vw3_pps get all the matrix items
    max_vw3_pps_matrix_id: function () {
      var zsel_id = this.sel_vw3_pps.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)

      // return Array.from
      //         (new Set((
      //         this.node.filter(itm => sel_id.includes(itm.id))
      //         .map(a => a.matrix))
      //         .reduce((acc, a) => acc.concat(a),[])
      //       ))
      //       .sort((a, b) => a - b);
    },

    // based on above get all the max values of t42 (states)
    // that is filter id's by t42 cat_id=92 then the intersect with above
    max_vw3_pps_state_id: function () {
      var zcat = 92
      var fil1 = this.max_vw3_pps_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    // based on sel_vw3... get all the matrix items
    max_vw3_pps_state_matrix_id: function () {
      var zsel_id = this.sel_vw3_pps_state.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },

    // based on above get all the max values of t41 (districts)
    // that is filter id's by t41 cat_id=91 then the intersect with above

    max_vw3_pps_state_dist_id: function () {
      var zcat = 91
      var fil1 = this.max_vw3_pps_state_matrix_id
      var fil2 = this.max_vw3_pps_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },

    // based on sel_vw3... get all the matrix items
    max_vw3_pps_state_dist_matrix_id: function () {
      var zsel_id = this.sel_vw3_pps_state_dist.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },


    // based on above get all the max values of t40 (temples)
    // that is filter id's by t40 cat_id=9 then the intersect with above
    max_vw3_pps_state_dist_temp_id: function () {
      var zcat = 9
      var fil1 = this.max_vw3_pps_state_dist_matrix_id
      var fil2 = this.max_vw3_pps_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },

    // select songs based on temples selected
    sel_vw3_pps_state_dist_temp_song_id : function () {
      // based on songgrp_songcomp selection, generate the song id's from song_range
      var t1_id = this.sel_vw3_pps_state_dist_temp.map(x => x.id)
      var t2_id = this.song_range
      return Array.from
              (new Set((
              t2_id.filter(itm => t1_id.includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
              .reduce((acc, a) => acc.concat(a),[])
              )).sort((a, b) => a - b)
    },

    // select saints based on temples selected
    sel_vw3_pps_state_dist_temp_saint_id : function () {
      // get all the selected temples
      var zsel_id = this.sel_vw3_pps_state_dist_temp.map(x => x.id)
      var max_temp_matrix_id = Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b);
      // zcat of saint = 8
      var zcat = 8
      var fil1 = max_temp_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    max_nodeh: function () {
      // based on sel_node0 accumulate the hier paths
      // accumulate to-id (node/hier) from node_matrix where id is in sel_node0_id
      var acc1 = Array.from
              (new Set((
              this.node_matrix.filter(itm => this.sel_node0.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate path id from node where id is in previous step
      var acc2 = Array.from
              (new Set((
              this.node.filter(itm => acc1.includes(itm.id))
              .map(a => a.path))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate path id from hier where id is in first step
      var acc3 = Array.from
              (new Set((
              this.node.filter(itm => acc1.includes(itm.id))
              .map(a => a.path))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      return acc2.concat(acc3);
    },

    max_nodeh_pps: function () {
      // based on sel_node4 (pps) accumulate the hier paths
      // accumulate to-id (saint_id) from ism_saint where id is in sel_node0_id
      var acc1 = Array.from
              (new Set((
              this.node_matrix.filter(itm => this.sel_node4.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate path id from saint/temple where id is in previous step
      var acc2 = Array.from
              (new Set((
              this.node.filter(itm => acc1.includes(itm.id))
              .map(a => a.path))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      return acc2;
    },

    // f10sel_node3 : function () {
    //   // based on f10sel_node3h selection, generate the song id's from song_range
    //   return Array.from
    //           (new Set((
    //           this.song_range.filter(itm => this.f10sel_node3h[this.f10sel_node3h.length -1].map(x => x.id).includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           ));
    // },



    // f20sel_node3: song - auto selected based on node 1 and node 2
    // f20sel_node3 : function () {
    //   // accumulate to_id (song_id) from saint_song
    //   var acc1 = Array.from
    //           (new Set((
    //           this.song_range.filter(itm => this.f20sel_node1.map(x => x.id).includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           ));
    //   // accumulate to_id (song_id) from temple_song
    //   var acc2 = Array.from
    //           (new Set((
    //           this.song_range.filter(itm => this.f20sel_node2.map(x => x.id).includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           ));
    //
    //   // take the common of acc1 and acc2
    //   var acc3 = acc1.filter(value => -1 !== acc2.indexOf(value));
    //   function compareNumbers(a, b) {
    //     return a - b;
    //   };
    //
    //   return acc3.sort(compareNumbers);
    //
    // },

    // f30sel_node3 and 1 : song / saint- auto selected based on node 2 - pps
    // f30sel_node1 : function () {
    //   // accumulate to_id (saint_id) from temple_saint
    //
    //   return Array.from
    //           (new Set((
    //           this.node_matrix.filter(itm => this.f30sel_node2.map(x => x.id).includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => this.node.filter(itm => itm.id === a))
    //           .reduce((acc, a) => acc.concat(a),[])     // returing the entry in node
    //           ));
    // },

    // f30sel_node3 : function () {
    //
    //   return Array.from
    //           (new Set((
    //           this.song_range.filter(itm => this.f30sel_node2.map(x => x.id).includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           ));
    // },

  },

  methods: {
    // handle_node0(positionid, payload) {
    //   this.sel_node0.splice(positionid, 1, payload);
    //   // this.selIsmsId = payload.map(x => x.id)
    // },

    // selSaints: function () {
    //   // Return id array
    //   if (this.radios == "t21") { return this.f10sel_node1 }       // passing an array of objects with id, d_id etc...
    //   else if (this.radios == "t22") { return this.f20sel_node1 }  // passing an array of objects with id, d_id etc...
    //   else if (this.radios == "t23") { return this.f30sel_node1 }  // passing an array of objects with id, d_id etc...
    // },
    //
    // selTemples: function () {
    //   //this.f10sel_node2.map(a => a.d_id)
    //   // we are passing an array of objects with id, d_id etc...
    //   if (this.radios == "t21") { return this.f10sel_node2 } // passing an array of objects with id, d_id etc...
    //   else if (this.radios == "t22") { return this.f20sel_node2 } // passing an array of objects with id, d_id etc...
    //   else if (this.radios == "t23") { return this.f30sel_node2 } // passing an array of objects with id, d_id etc...
    // },
    // selSongs: function () {
    //   if (this.radios == "t21") { return this.f10sel_node3 }   // set of song_ids generated at run time
    //   else if (this.radios == "t22") { return this.f20sel_node3 }
    //   else if (this.radios == "t23") { return this.f30sel_node3 }
    // },

  }
}
</script>
