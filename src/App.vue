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
        <v-list><v-list-tile><v-list-tile-action><v-icon>{{zicons['t01']}}</v-icon></v-list-tile-action>
            <v-list-tile-content>{{$t('desc.' + 't01')}}</v-list-tile-content></v-list-tile></v-list>


      </v-toolbar>
      <v-divider></v-divider>
      <!-- 10 - node0/ ism 20 - radios -->

      <v-list>
        <v-list-group v-for="item in ['t10','t20']" :key="item" :prepend-icon="zicons[item]" no-action>
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
        <!-- <v-list-group v-for="item in [{id: 't10', model: false},{id: 't20', model: false}]" :key="item.id" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile> -->
          <zfilter4 v-if="! isentityLoading && item == 't10'" :headerinput= "[ 't05', 't10']" :itemsid="max_ism_id" :selected.sync="sel_ism" :msg= "'entity'" ></zfilter4>
          <!-- following is a radio button selection of radio options -->
          <template v-if="item == 't20'">
            <v-container fluid><v-radio-group v-model="radios1" :mandatory="true">
              <v-radio :label="$t('desc.' + 't21')" :value="'t21'"></v-radio>
              <template v-if="radios1 == 't21'">

                <v-flex xs12 sm4 md4 offset-xs1 v-for="(elem, index) in ['t30','t40','t50']">
                    <v-checkbox v-model="sateso" :label="$t('desc.' + elem)" :value="elem" :key="index" :hide-details="index !== (['t30','t40','t50'].length - 1)"
                    :rules="[() => rules.atLeastOneView(sateso)]"></v-checkbox>
                </v-flex>
                <p></p>
                </p>
                <v-divider></v-divider>
              </template>

              <v-radio :label="$t('desc.' + 't23')" :value="'t23'"></v-radio>
            </v-radio-group></v-container></template>
        </v-list-group>
      </v-list>




      <!-- <v-list>
        <v-list-group v-for="item in [{id: 't10', model: false},{id: 't20', model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content> <v-list-tile-title>
              <v-icon>{{zicons[item.id]}}</v-icon>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <zfilter4 v-if="! isentityLoading && item.id == 't10'" :headerinput= "[ 't05', 't10']" :itemsid="max_ism_id" :selected.sync="sel_ism" :msg= "'entity'" ></zfilter4>
          <template v-if="item.id == 't20'">
            <v-container fluid><v-radio-group v-model="radios" :mandatory="false" v-for="elem in ['t21','t22','t23']">
                <v-radio :label="$t('desc.' + elem)" :value="elem"></v-radio></v-radio-group></v-container></template>
        </v-list-group>
      </v-list> -->
      <v-divider></v-divider>

      <v-list v-if="radios1 == 't21'">
        <!-- <v-list-group v-for="item in [{id: 't30', model: false},{id: 't40', model: false},{id: 't50', model: false}]" :key="item.id" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile> -->
        <v-list-group v-for="item in sateso.slice().sort()" :key="item" :prepend-icon="zicons[item]" no-action>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <v-list v-if="item == 't30'" class='zsub-group'>
            <v-list-group v-for="item in [{id: 't31', model: false},{id: 't30', model: false}]" :key="item.id" v-model="item.model"  :prepend-icon="zicons[item.id]" no-action>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't31'" :headerinput= "[ 't05', 't31']" :itemsid="max_vw1_saintgrp_id" :selected.sync="sel_vw1_saintgrp" :msg= "'entity'" ></zfilter4>
              <zfilter4 v-if="! isentityLoading && item.id == 't30'" :headerinput= "[ 't05', 't30']" :itemsid="max_vw1_saintgrp_saint_id" :selected.sync="sel_vw1_saintgrp_saint" :msg= "'entity'" ></zfilter4>
            </v-list-group>
          </v-list>
          <v-list v-if="item == 't40'" class='zsub-group'>
            <v-list-group v-for="item in [{id: 't42', model: false},{id: 't41', model: false},{id: 't40', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']" :itemsid="max_vw1_state_id" :selected.sync="sel_vw1_state" :msg= "'entity'" ></zfilter4>
              <zfilter4 v-if="! isentityLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']" :itemsid="max_vw1_state_dist_id" :selected.sync="sel_vw1_state_dist" :msg= "'entity'" ></zfilter4>
              <zfilter4 v-if="! isentityLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']" :itemsid="max_vw1_state_dist_temp_id" :selected.sync="sel_vw1_state_dist_temp" :msg= "'entity'" ></zfilter4>
            </v-list-group>
          </v-list>
          <v-list v-if="item == 't50'" class='zsub-group'>
            <v-list-group v-for="item in [{id: 't53', model: false},{id: 't52', model: false},{id: 't51', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't53'" :headerinput= "[ 't05', 't53']" :itemsid="max_vw1_songln_id" :selected.sync="sel_vw1_songln" :msg= "'entity'" ></zfilter4>
              <zfilter4 v-if="! isentityLoading && item.id == 't52'" :headerinput= "[ 't05', 't52']" :itemsid="max_vw1_songln_songgrp_id" :selected.sync="sel_vw1_songln_songgrp" :msg= "'entity'" ></zfilter4>
              <zfilter4 v-if="! isentityLoading && item.id == 't51'" :headerinput= "[ 't05', 't51']" :itemsid="max_vw1_songln_songgrp_songcomp_id" :selected.sync="sel_vw1_songln_songgrp_songcomp" :msg= "'entity'" ></zfilter4>
            </v-list-group>
          </v-list>
        </v-list-group>
      </v-list>
      <!-- <v-list v-if="radios == 't22'">
        <v-list-group v-for="item in [{id: 't30', model: false},{id: 't40', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <v-list v-if="item.id == 't30'" class='zsub-group'>
            <v-list-group v-for="item in [{id: 't31', model: false},{id: 't30', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter4 v-if="! isentityLoading && item.id == 't31'" :headerinput= "[ 't05', 't31']" :itemsid="max_vw2_saintgrp_id" :selected.sync="sel_vw2_saintgrp" :msg= "'entity'" ></zfilter4>
              <zfilter4 v-if="! isentityLoading && item.id == 't30'" :headerinput= "[ 't05', 't30']" :itemsid="max_vw2_saintgrp_saint_id" :selected.sync="sel_vw2_saintgrp_saint" :msg= "'entity'" ></zfilter4>
            </v-list-group>
          </v-list>
          <v-list v-if="item.id == 't40'" class='zsub-group'>
            <v-list-group v-for="item in [{id: 't42', model: false},{id: 't41', model: false},{id: 't40', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
                <zfilter4 v-if="! isentityLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']" :itemsid="max_vw2_state_id" :selected.sync="sel_vw2_state" :msg= "'entity'" ></zfilter4>
                <zfilter4 v-if="! isentityLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']" :itemsid="max_vw2_state_dist_id" :selected.sync="sel_vw2_state_dist" :msg= "'entity'" ></zfilter4>
                <zfilter4 v-if="! isentityLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']" :itemsid="max_vw2_state_dist_temp_id" :selected.sync="sel_vw2_state_dist_temp" :msg= "'entity'" ></zfilter4>
            </v-list-group>
          </v-list>
        </v-list-group>
      </v-list> -->

      <v-list v-if="radios1 == 't23'">
        <v-list-group v-for="item in [{id: 't43', model: false},{id: 't40', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
            <zfilter4 v-if="! isentityLoading && item.id == 't43'" :headerinput= "[ 't05', 't43']" :itemsid="max_vw3_pps_id" :selected.sync="sel_vw3_pps" :msg= "'entity'" ></zfilter4>
            <v-list v-if="item.id == 't40'" class='zsub-group'>
              <v-list-group v-for="item in [{id: 't42', model: false},{id: 't41', model: false},{id: 't40', model: false}]" v-model="item.model" :prepend-icon="zicons[item.id]" no-action>
                  <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>{{$t('desc.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
                <zfilter4 v-if="! isentityLoading && item.id == 't42'" :headerinput= "[ 't05', 't42']" :itemsid="max_vw3_pps_state_id" :selected.sync="sel_vw3_pps_state" :msg= "'entity'" ></zfilter4>
                <zfilter4 v-if="! isentityLoading && item.id == 't41'" :headerinput= "[ 't05', 't41']" :itemsid="max_vw3_pps_state_dist_id" :selected.sync="sel_vw3_pps_state_dist" :msg= "'entity'" ></zfilter4>
                <zfilter4 v-if="! isentityLoading && item.id == 't40'" :headerinput= "[ 't05', 't40']" :itemsid="max_vw3_pps_state_dist_temp_id" :selected.sync="sel_vw3_pps_state_dist_temp" :msg= "'entity'" ></zfilter4>
              </v-list-group>
            </v-list>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" extended height=40 >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{$t('desc.' + 't00')}}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- place for language selection block if required -->
      <v-btn @click="snackbar_lan = true">
              <v-icon>language</v-icon>Aதతె...
      </v-btn>
      <v-snackbar v-model="snackbar_lan" :right=true :timeout=6000 :top=true :vertical=true :auto-height=true>
                <p>{{$t('desc.t81')}}</p>
                <v-radio-group v-model="$i18n.locale" row background-color="white">
                  <div v-for="item in languages" :key="item.key">
                    <v-radio :label="item.text" :value="item.value"></v-radio>
                  </div>
                </v-radio-group>
                <!-- <p>{{$t('desc.t82')}}</p>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4 v-for="item in languages" :key="item.key">
                    <v-checkbox v-model="ln_song" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
                  </v-flex>
                </v-layout>
                <p>{{$t('desc.t83')}}</p>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4 v-for="item in languages" :key="item.key">
                    <v-checkbox v-model="ln_song_meaning" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
                  </v-flex>
                </v-layout>
                <p>{{$t('desc.t84')}}</p>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4 v-for="item in languages" :key="item.key">
                    <v-checkbox v-model="ln_song_explanation" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
                  </v-flex>
                </v-layout> -->

            <v-btn color="blue" @click="snackbar_lan = false">
              <v-icon>{{zicons['t85']}}</v-icon>{{$t('desc.t85')}}
            </v-btn>
      </v-snackbar>


      <v-tabs color="transparent" right slot="extension">
        <v-tabs-slider color="blue"></v-tabs-slider>
        <!-- <v-tab v-for="(item, j) in ztoolbar1" :key="j" @click.stop="ztool = item.menu"> -->
        <!-- <v-tab v-for="item in ztoolbar1" @click.stop="ztool = item.menu">
                {{$t('desc.' + item.id)}}
                <v-icon>{{zicons[item.id]}}</v-icon>
        </v-tab> -->
        <v-tab v-for="item in ztoolbar2" @click.stop="ztool = item">
                {{$t('desc.' + item)}}
                <v-icon>{{zicons[item]}}</v-icon>
        </v-tab>

      </v-tabs>
    </v-toolbar>
    <v-content>
      <!-- Select the component based on ztool value pass on the id's of sel-->
      <div v-if="ztool=='t30'"><zsaints :sourceFile="sel_saint_id"></zsaints></div>
      <div v-else-if="ztool=='t40'"><ztemples :sourceFile="sel_temple_id"></ztemples></div>
      <div v-else-if="ztool=='t50'"><zsongs  :sourceFile="sel_song_id"></zsongs></div>
      <!-- <div v-else-if="ztool=='About'"><HelloWorld/></div>
      <div v-else-if="ztool=='Contact'"><HelloWorld/></div> -->
      <div v-else><zHome></zHome></div>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Govidat &copy; 2018</span>
      <!-- {{sel_saint_id.length}} -->
      <v-spacer></v-spacer>

      <v-btn @click="snackbar_about = true">{{$t('desc.' + 't97')}}</v-btn>
      <v-snackbar v-model="snackbar_about" :timeout=6000 :bottom=true :vertical=true :auto-height=true :multi-line=true>
        <p>
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        </p>
        <v-btn color="blue" @click="snackbar_about = false">
              Close
        </v-btn>
      </v-snackbar>
      <v-btn @click="snackbar_contact = true">{{$t('desc.' + 't98')}}<v-icon>{{zicons['t98']}}</v-icon></v-btn>
      <v-snackbar v-model="snackbar_contact" :timeout=6000 :bottom=true :vertical=true :auto-height=true :multi-line=true>
        Some lines of text about contacting us
        <v-btn color="blue" @click="snackbar_contact = false">
              Close
        </v-btn>
      </v-snackbar>

    </v-footer>
  </v-app>
</template>

<script>

import HelloWorld from './components/HelloWorld'
import zfilter4 from './components/04filter'
import zHome from './components/10Home'
import ztemples from './components/20temples'
import zsaints from './components/20saints'
import zsongs from './components/20songs'
import { mapState } from 'vuex'

export default {

  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      iconup: 'keyboard_arrow_up',
      icondn: 'keyboard_arrow_down',
      miniVariant: false,

      radios: "",
      radios1: "",
      ztool: 0,
      toggle_exclusive: 0,

      // sel is in the form of [{id: 1}, {id: 2}]
      sel_ism: [{id: 101}],
      // sel_vw1_saintgrp: [{id: 500}],
      // sel_vw1_saintgrp_saint: [{id: 105}],
      // sel_vw1_state: [{id: 504}],
      // sel_vw1_state_dist: [{id: 505}],
      // sel_vw1_state_dist_temp: [{id: 110}],
      // sel_vw1_songgrp: [{id: 508}],
      // sel_vw1_songgrp_songcomp: [{id: 510}],

      sel_vw1_saintgrp: [],
      sel_vw1_saintgrp_saint: [],
      sel_vw1_state: [],
      sel_vw1_state_dist: [],
      sel_vw1_state_dist_temp: [],
      sel_vw1_songln: [{id: 518}],
      sel_vw1_songln_songgrp: [{id: 517}],
      sel_vw1_songln_songgrp_songcomp: [],


      // sel_vw2_saintgrp: [{id: 500}],
      // sel_vw2_saintgrp_saint: [{id: 105}],
      // sel_vw2_state: [{id: 504}],
      // sel_vw2_state_dist: [{id: 505}],
      // sel_vw2_state_dist_temp: [{id: 110}],

      sel_vw3_pps: [{id: 103}],
      sel_vw3_pps_state: [{id: 504}],
      sel_vw3_pps_state_dist: [{id: 505}],
      sel_vw3_pps_state_dist_temp: [{id: 109}],

      // ztoolbar1: [
      //     {id: 't99', menu: 'Home'},
      //     {id: 't30', menu: 'Saints'},
      //     {id: 't40', menu: 'Temples'},
      //     {id: 't50', menu: 'Songs'},
      //     // {id: 't97', menu: 'About', icon: 'phone'},
      //     // {id: 't98', menu: 'Contact', icon: 'phone'}
      //   ],
      // ztoolbar2 : [],
      snackbar_lan: false,
      snackbar_about: false,
      snackbar_contact: false,
// better to keep an initial value for sateso for the rule below to work properly
      sateso: ['t30','t40','t50'],
      rules: {atLeastOneView: (sateso) => sateso.length > 0 || 'At least one item should be selected',},
    }
  },
  name: 'App',

  watch: {
    // IDEA: if sel is changed subsequent filters should be revaluated
    sel_ism : function () {
      this.sel_vw1_saintgrp = this.sel_vw1_saintgrp.filter(itm => this.max_vw1_saintgrp_id.includes(itm.id))
      this.sel_vw1_state = this.sel_vw1_state.filter(itm => this.max_vw1_state_id.includes(itm.id))
      this.sel_vw1_songln = this.sel_vw1_songln.filter(itm => this.max_vw1_songln_id.includes(itm.id))

      // this.sel_vw1_songgrp = this.sel_vw1_songgrp.filter(itm => this.max_vw1_songgrp_id.includes(itm.id))

      // this.sel_vw2_saintgrp = this.sel_vw2_saintgrp.filter(itm => this.max_vw2_saintgrp_id.includes(itm.id))
      // this.sel_vw2_state = this.sel_vw2_state.filter(itm => this.max_vw2_state_id.includes(itm.id))

      this.sel_vw3_pps = this.sel_vw3_pps.filter(itm => this.max_vw3_pps_id.includes(itm.id))
    },
    sateso : function () {
      if (this.sateso.indexOf('t30') <0) {this.sel_vw1_saintgrp = []}
      if (this.sateso.indexOf('t40') <0) {this.sel_vw1_state = []}
      if (this.sateso.indexOf('t50') <0) {this.sel_vw1_songln = []}
    },

    sel_vw1_saintgrp : function () {this.sel_vw1_saintgrp_saint = this.sel_vw1_saintgrp_saint.filter(itm => this.max_vw1_saintgrp_saint_id.includes(itm.id))},
    sel_vw1_state : function () {this.sel_vw1_state_dist = this.sel_vw1_state_dist.filter(itm => this.max_vw1_state_dist_id.includes(itm.id))},
    sel_vw1_state_dist : function () {this.sel_vw1_state_dist_temp = this.sel_vw1_state_dist_temp.filter(itm => this.max_vw1_state_dist_temp_id.includes(itm.id))},

    sel_vw1_songln : function () {this.sel_vw1_songln_songgrp = this.sel_vw1_songln_songgrp.filter(itm => this.max_vw1_songln_songgrp_id.includes(itm.id))},
    sel_vw1_songln_songgrp : function () {this.sel_vw1_songln_songgrp_songcomp = this.sel_vw1_songln_songgrp_songcomp.filter(itm => this.max_vw1_songln_songgrp_songcomp_id.includes(itm.id))},
    // sel_vw1_songgrp : function () {this.sel_vw1_songgrp_songcomp = this.sel_vw1_songgrp_songcomp.filter(itm => this.max_vw1_songgrp_songcomp_id.includes(itm.id))},

    // sel_vw2_saintgrp : function () {this.sel_vw2_saintgrp_saint = this.sel_vw2_saintgrp_saint.filter(itm => this.max_vw2_saintgrp_saint_id.includes(itm.id))},
    // sel_vw2_state : function () {this.sel_vw2_state_dist = this.sel_vw2_state_dist.filter(itm => this.max_vw2_state_dist_id.includes(itm.id))},
    // sel_vw2_state_dist : function () {this.sel_vw2_state_dist_temp = this.sel_vw2_state_dist_temp.filter(itm => this.max_vw2_state_dist_temp_id.includes(itm.id))},

    sel_vw3_pps : function () {this.sel_vw3_pps_state = this.sel_vw3_pps_state.filter(itm => this.max_vw3_pps_state_id.includes(itm.id))},
    sel_vw3_pps_state : function () {this.sel_vw3_pps_state_dist = this.sel_vw3_pps_state_dist.filter(itm => this.max_vw3_pps_state_dist_id.includes(itm.id))},
    sel_vw3_pps_state_dist : function () {this.sel_vw3_pps_state_dist_temp = this.sel_vw3_pps_state_dist_temp.filter(itm => this.max_vw3_pps_state_dist_temp_id.includes(itm.id))},

  },
  components: { HelloWorld, zfilter4, zHome, zsaints, ztemples, zsongs },
  computed: {
    ...mapState(
      ['languages','node', 'song_range','isnodeLoading', 'isentityLoading', 'zicons']
    ),


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
    max_vw1_saintgrp_id: function () {
      var zcat = 81
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
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

    max_vw1_state_id: function () {
      var zcat = 92
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    max_vw1_state_matrix_id: function () {
      var zsel_id = this.sel_vw1_state.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
    max_vw1_state_dist_id: function () {
      var zcat = 91
      var fil1 = this.max_vw1_state_matrix_id
      var fil2 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },
    max_vw1_state_dist_matrix_id: function () {
      var zsel_id = this.sel_vw1_state_dist.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
    max_vw1_state_dist_temp_id: function () {
      var zcat = 9
      var fil1 = this.max_vw1_state_dist_matrix_id
      var fil2 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },

    max_vw1_songln_id: function () {
      var zcat = 153
      var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    max_vw1_songln_matrix_id: function () {
      var zsel_id = this.sel_vw1_songln.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
    max_vw1_songln_songgrp_id: function () {
      var zcat = 152
      var fil1 = this.max_vw1_songln_matrix_id
      // var fil1 = this.max_ism_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    max_vw1_songln_songgrp_matrix_id: function () {
      var zsel_id = this.sel_vw1_songln_songgrp.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
    max_vw1_songln_songgrp_songcomp_id: function () {
      var zcat = 151
      var fil1 = this.max_vw1_songln_songgrp_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },

    // max_vw1_songgrp_id: function () {
    //   var zcat = 152
    //   var fil1 = this.max_ism_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm))
    //   return t2_id
    // },
    // max_vw1_songgrp_matrix_id: function () {
    //   var zsel_id = this.sel_vw1_songgrp.map(x=> x.id)
    //   return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    // },
    // max_vw1_songgrp_songcomp_id: function () {
    //   var zcat = 151
    //   var fil1 = this.max_vw1_songgrp_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm))
    //   return t2_id
    // },
    sel_vw1_songln_songgrp_songcomp_song_id : function () {
      // based on songln_songgrp_songcomp selection, generate the song id's from song_range
      var t1_id = this.sel_vw1_songln_songgrp_songcomp.map(x => x.id)
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

    // max_vw2_saintgrp_id: function () {
    //   var zcat = 81
    //   var fil1 = this.max_ism_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm))
    //   return t2_id
    // },
    // max_vw2_saintgrp_matrix_id: function () {
    //   var zsel_id = this.sel_vw2_saintgrp.map(x=> x.id)
    //   return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    // },
    // max_vw2_saintgrp_saint_id: function () {
    //   var zcat = 8
    //   var fil1 = this.max_vw2_saintgrp_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm))
    //   return t2_id
    // },
    // max_vw2_state_id: function () {
    //   var zcat = 92
    //   var fil1 = this.max_ism_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm))
    //   return t2_id
    // },
    // max_vw2_state_matrix_id: function () {
    //   var zsel_id = this.sel_vw2_state.map(x=> x.id)
    //   return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    // },
    // max_vw2_state_dist_id: function () {
    //   var zcat = 91
    //   var fil1 = this.max_vw2_state_matrix_id
    //   var fil2 = this.max_ism_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
    //   return t2_id
    // },
    // max_vw2_state_dist_matrix_id: function () {
    //   var zsel_id = this.sel_vw2_state_dist.map(x=> x.id)
    //   return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    // },
    // max_vw2_state_dist_temp_id: function () {
    //   var zcat = 9
    //   var fil1 = this.max_vw2_state_dist_matrix_id
    //   var fil2 = this.max_ism_matrix_id
    //   var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
    //   var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
    //   return t2_id
    // },
    // sel_vw2_saint_temp_song_id : function () {
    //   // accumulate to_id (song_id) from saint_song
    //   var t1_id = this.sel_vw2_saintgrp_saint.map(x => x.id)
    //   var t2_id = this.song_range
    //   var t3_id = this.sel_vw2_state_dist_temp.map(x => x.id)
    //   var acc1 = Array.from
    //           (new Set((
    //           t2_id.filter(itm => t1_id.includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           )).sort((a, b) => a - b)
    //
    //   // accumulate to_id (song_id) from temple_song
    //   var acc2 = Array.from
    //           (new Set((
    //           t2_id.filter(itm => t3_id.includes(itm.id))
    //           .map(a => a.to_id))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           .map(a => Array.from(new Array(a[1] - a[0] +1), (x, i) => i + a[0]))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           )).sort((a, b) => a - b)
    //
    //   // take the common of acc1 and acc2
    //   var acc3 = acc1.filter(value => -1 !== acc2.indexOf(value))
    //   return acc3
    //   // function compareNumbers(a, b) {
    //   //   return a - b;
    //   // }
    //   //
    //   // return acc3.sort(compareNumbers);
    //
    // },

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
    max_vw3_pps_state_id: function () {
      var zcat = 92
      var fil1 = this.max_vw3_pps_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm))
      return t2_id
    },
    max_vw3_pps_state_matrix_id: function () {
      var zsel_id = this.sel_vw3_pps_state.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
    max_vw3_pps_state_dist_id: function () {
      var zcat = 91
      var fil1 = this.max_vw3_pps_state_matrix_id
      var fil2 = this.max_vw3_pps_matrix_id
      var t1_id = this.node.filter(itm => itm.cat_id == zcat).map(a => a.id).sort((a, b) => a - b)
      var t2_id = t1_id.filter(itm=> fil1.includes(itm)).filter(itm=> fil2.includes(itm))
      return t2_id
    },
    max_vw3_pps_state_dist_matrix_id: function () {
      var zsel_id = this.sel_vw3_pps_state_dist.map(x=> x.id)
      return Array.from(new Set((this.node.filter(itm => zsel_id.includes(itm.id)).map(a => a.matrix)).reduce((acc, a) => acc.concat(a),[]))).sort((a, b) => a - b)
    },
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

    // based on the view selection pass the selected id
    sel_saint_id: function () {
      var t1_id = this.sel_vw1_saintgrp_saint.map(a => a.id).sort((a, b) => a - b)
      // var t2_id = this.sel_vw2_saintgrp_saint.map(a => a.id).sort((a, b) => a - b)
      var t3_id = this.sel_vw3_pps_state_dist_temp_saint_id
      if (this.radios1 == "t21") { return t1_id }       // passing an array of objects with id, d_id etc...
      // else if (this.radios1 == "t22") { return t2_id }  // passing an array of objects with id, d_id etc...
      else if (this.radios1 == "t23") { return t3_id }  // passing an array of objects with id, d_id etc...
      else { return []}
    },
    sel_temple_id: function () {
      var t1_id = this.sel_vw1_state_dist_temp.map(a => a.id).sort((a, b) => a - b)
      // var t2_id = this.sel_vw2_state_dist_temp.map(a => a.id).sort((a, b) => a - b)
      var t3_id = this.sel_vw3_pps_state_dist_temp.map(a => a.id).sort((a, b) => a - b)
      if (this.radios1 == "t21") { return t1_id }       // passing an array of objects with id, d_id etc...
      // else if (this.radios1 == "t22") { return t2_id }  // passing an array of objects with id, d_id etc...
      else if (this.radios1 == "t23") { return t3_id }  // passing an array of objects with id, d_id etc...
      else { return []}
    },
    sel_song_id: function () {
      var t1_id = this.sel_vw1_songln_songgrp_songcomp_song_id
      // var t2_id = this.sel_vw2_saint_temp_song_id
      var t3_id = this.sel_vw3_pps_state_dist_temp_song_id
      if (this.radios1 == "t21") { return t1_id }       // passing an array of objects with id, d_id etc...
      // else if (this.radios1 == "t22") { return t2_id }  // passing an array of objects with id, d_id etc...
      else if (this.radios1 == "t23") { return t3_id }  // passing an array of objects with id, d_id etc...
      else { return []}
    },

    // ln_song: {
    //   get () {return (this.$store.state.ln_song.length != 0 ? this.$store.state.ln_song : [this.$i18n.locale])},
    //   set (value) {this.$store.commit('upd_ln_song', value)}
    // },
    // ln_song_meaning: {
    //   get () {return (this.$store.state.ln_song_meaning.length != 0 ? this.$store.state.ln_song_meaning : [this.$i18n.locale])},
    //   set (value) {this.$store.commit('upd_ln_song_meaning', value)}
    // },
    // ln_song_explanation: {
    //   get () {return (this.$store.state.ln_song_explanation.length != 0 ? this.$store.state.ln_song_explanation : [this.$i18n.locale])},
    //   set (value) {this.$store.commit('upd_ln_song_explanation', value)}
    // },

    ztoolbar2: function () {
        var t1 = []
        if (this.sel_saint_id.length > 0) {t1 = t1.concat('t30')}
        if (this.sel_temple_id.length > 0) {t1 = t1.concat('t40')}
        if (this.sel_song_id.length > 0) {t1 = t1.concat('t50')}
        return ['t99'].concat(t1.sort())
      },

  },

  methods: {}
}
</script>

<style> *{ text-transform: none !important; }
/* .v-list__group__header--active.v-list__group__header--zsub-group .v-list__group__header__prepend-icon .v-icon {
  -webkit-transform: rotate(-180deg);
          transform: rotate(-180deg);
} */
/* zsub-group class is introduced for nested lists. This is to get the indentation of the icon to the right. In standard there is no indentation. In standard, list-tile is indented by 72 px, this has been reduced in this style*/
.zsub-group .v-list__group__header .v-list__group__header__prepend-icon .v-icon {
  margin-left: 10px;
}
.zsub-group .v-list__tile {
    padding-left: 20px;
}
 </style>
