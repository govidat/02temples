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
            <v-list-tile-content>{{$t('stat_message.' + '1')}}</v-list-tile-content></v-list-tile></v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- 10 - node0/ ism 20 - radios -->
      <v-list>
        <v-list-group v-for="item in [{id: 10, model: false},{id: 20, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content> <v-list-tile-title>
              {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <zfilter3 v-if="item.id == 10" :headerinput= "[ 5, 10]" :items="ism" :selected.sync="sel_node0" :msg= "'node0_desc'" ></zfilter3>
          <!-- following is a radio button selection of radio options -->
          <template v-if="item.id == 20">
            <v-container fluid><v-radio-group v-model="radios" :mandatory="false" v-for="elem in [21,22,23]">
                <v-radio :label="$t('stat_message.' + elem)" :value="elem"></v-radio></v-radio-group></v-container></template>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

      <!-- if radios=21, then 30saint, 40temples, 50songs ; radios=22 then selList30 -->
      <v-list v-if="radios == 21">
        <v-list-group v-for="item in [{id: 30, model: false},{id: 40, model: false},{id: 50, model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- Sublist => 30 Saints 40 Temples 50 Songs-->
          <template v-if="item.id == 30">
            <!-- Sublist : 31 for Saint-Group 30 for Saints-->
            <v-list-group v-for="item in [{id: 31, model: false},{id: 30, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- Sublist : 31 for Saint-Group 30 for Saints-->
              <!-- first get for hierarchy -->
              <zfilter3 v-if="item.id == 31" :headerinput= "[ 5, 31]"
              :items="saint_hier.filter(x => max_node1h.includes(x.id) && x.path.length == 1)"
              :selected.sync="f10sel_node1h[0]"
              :msg= "'node1h_desc'" ></zfilter3>

              <!-- then for the node -->
              <zfilter3 v-if="item.id == 30" :headerinput= "[ 5, 30]"
              :items="saint.filter(itm => itm.h_path.some(r => f10sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node1"
              :msg= "'node1_desc'" ></zfilter3>

              <!-- <zfilter3 v-if="item.id == 30" :headerinput= "[ 5, 30]" :items="get_node('node1',f10sel_node1[0].map(x => x.id), 'node1_0', 'node0', true, sel_node0)" :selected.sync="f10sel_node1[1]" :node= "'node1'"></zfilter3> -->
            </v-list-group>
          </template>
          <!-- Sublist of 40 Temples -->
          <template v-if="item.id == 40">
            <!-- Sublist => 42 State 41 District 40 Temple-->
            <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- first get for hierarchy -->
              <zfilter3 v-if="item.id == 42" :headerinput= "[ 5, 42]"
              :items="temple_hier.filter(x => max_node2h.includes(x.id) && x.path.length == 1)"
              :selected.sync="f10sel_node2h[0]"
              :msg= "'node2h_desc'" ></zfilter3>
              <zfilter3 v-if="item.id == 41" :headerinput= "[ 5, 41]"
              :items="temple_hier.filter(x => max_node2h.includes(x.id) && x.path.length == 2 && x.path.some(r => f10sel_node2h[0].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node2h[1]"
              :msg= "'node2h_desc'" ></zfilter3>

              <!-- then for the node .slice(-1)[0] -->
              <zfilter3 v-if="item.id == 40" :headerinput= "[ 5, 40]"
              :items="temple.filter(itm => itm.h_path.some(r => f10sel_node2h[1].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node2"
              :msg= "'node2_desc'" ></zfilter3>

            </v-list-group>
          </template>
          <!-- Sublist of 2030 -->
          <template v-if="item.id == 50">
            <!-- Sublist => 52 Songs Grp 51 Song Comp 50 Song-->
            <v-list-group v-for="item in [{id: 52, model: false},{id: 51, model: false},{id: 50, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- first get for hierarchy -->
              <zfilter3 v-if="item.id == 52" :headerinput= "[ 5, 52]"
              :items="song_hier.filter(x => max_node3h.includes(x.id) && x.path.length == 1)"
              :selected.sync="f10sel_node3h[0]"
              :msg= "'node3h_desc'" ></zfilter3>
              <zfilter3 v-if="item.id == 51" :headerinput= "[ 5, 51]"
              :items="song_hier.filter(x => max_node3h.includes(x.id) && x.path.length == 2 && x.path.some(r => f10sel_node3h[0].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node3h[1]"
              :msg= "'node3h_desc'" ></zfilter3>

              <!-- then for the node -->
              <zfilter3 v-if="item.id == 50" :headerinput= "[ 5, 50]"
              :items="song.filter(itm => itm.h_path.some(r => f10sel_node3h[1].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f10sel_node3"
              :msg= "'node3_desc'" ></zfilter3>
            </v-list-group>
          </template>
        </v-list-group>
      </v-list>

      <v-list v-if="radios == 22">
        <v-list-group v-for="item in [{id: 30, model: false},{id: 40, model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- Sublist => 30 Saints 40 Temples -->
          <template v-if="item.id == 30">
            <!-- Sublist : 31 for Saint-Group 30 for Saints-->
            <v-list-group v-for="item in [{id: 31, model: false},{id: 30, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- Sublist : 31 for Saint-Group 30 for Saints-->
              <!-- first get for hierarchy -->
              <zfilter3 v-if="item.id == 31" :headerinput= "[ 5, 31]"
              :items="saint_hier.filter(x => max_node1h.includes(x.id) && x.path.length == 1)"
              :selected.sync="f20sel_node1h[0]"
              :msg= "'node1h_desc'" ></zfilter3>

              <!-- then for the node -->
              <zfilter3 v-if="item.id == 30" :headerinput= "[ 5, 30]"
              :items="saint.filter(itm => itm.h_path.some(r => f20sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))"
              :selected.sync="f20sel_node1"
              :msg= "'node1_desc'" ></zfilter3>
            </v-list-group>
          </template>
          <!-- Sublist of 40 Temples -->
          <template v-if="item.id == 40">
            <!-- Sublist => 42 State 41 District 40 Temple-->
            <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
                <!-- first get for hierarchy -->
                <zfilter3 v-if="item.id == 42" :headerinput= "[ 5, 42]"
                :items="temple_hier.filter(x => max_node2h.includes(x.id) && x.path.length == 1)"
                :selected.sync="f20sel_node2h[0]"
                :msg= "'node2h_desc'" ></zfilter3>
                <zfilter3 v-if="item.id == 41" :headerinput= "[ 5, 41]"
                :items="temple_hier.filter(x => max_node2h.includes(x.id) && x.path.length == 2 && x.path.some(r => f20sel_node2h[0].map(a => a.id).indexOf(r) >=0))"
                :selected.sync="f20sel_node2h[1]"
                :msg= "'node2h_desc'" ></zfilter3>

                <!-- then for the node .slice(-1)[0] -->
                <zfilter3 v-if="item.id == 40" :headerinput= "[ 5, 40]"
                :items="temple.filter(itm => itm.h_path.some(r => f20sel_node2h[1].map(a => a.id).indexOf(r) >=0))"
                :selected.sync="f20sel_node2"
                :msg= "'node2_desc'" ></zfilter3>

            </v-list-group>
          </template>

        </v-list-group>
      </v-list>

      <v-list v-else-if="radios == 23">
        <!-- 43 PPS 40 Temples -->
        <v-list-group v-for="item in [{id: 43, model: false},{id: 40, model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- 43 node4 is pps -->
          <zfilter3 v-if="item.id == 43" :headerinput= "[ 5, 43]"
          :items="pps.filter(x => max_node4.includes(x.id))" :selected.sync="sel_node4" :msg= "'node4_desc'" ></zfilter3>
            <!-- <zfilter3 v-if="item.id == 43" :headerinput= "[ 5, 43]" :items="get_pps([0],sel_node0)" :selected.sync="f30sel_node4[0]" :node= "'node4'" :msg ="'node4_desc'"></zfilter3> -->

            <template v-if="item.id == 40">
              <!-- Sublist => 42 State 41 District 40 Temple-->
              <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}</v-list-tile-title></v-list-tile-content></v-list-tile>
                <!-- first get for hierarchy -->
                <zfilter3 v-if="item.id == 42" :headerinput= "[ 5, 42]"
                :items="temple_hier.filter(x => max_node2h_pps.includes(x.id) && x.path.length == 1)"
                :selected.sync="f30sel_node2h[0]"
                :msg= "'node2h_desc'" ></zfilter3>
                <zfilter3 v-if="item.id == 41" :headerinput= "[ 5, 41]"
                :items="temple_hier.filter(x => max_node2h_pps.includes(x.id) && x.path.length == 2 && x.path.some(r => f30sel_node2h[0].map(a => a.id).indexOf(r) >=0))"
                :selected.sync="f30sel_node2h[1]"
                :msg= "'node2h_desc'" ></zfilter3>

                <!-- then for the node .slice(-1)[0] -->
                <zfilter3 v-if="item.id == 40" :headerinput= "[ 5, 40]"
                :items="temple.filter(itm => itm.h_path.some(r => f30sel_node2h[1].map(a => a.id).indexOf(r) >=0))"
                :selected.sync="f30sel_node2"
                :msg= "'node2_desc'" ></zfilter3>

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
        {{$t('stat_message.' + '0')}}
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
                {{$t('stat_message.' + item.id)}}
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
      <div v-if="ztool=='Saints'"><zsaints :sourceFile="selSaints()" :node = "'node1'" ></zsaints></div>
      <div v-else-if="ztool=='Temples'"><ztemples :sourceFile="selTemples()" :node = "'node2'"></ztemples></div>
      <div v-else-if="ztool=='Songs'"><zsongs  :sourceFile="selSongs()"></zsongs></div>
      <!-- <div v-else-if="ztool=='Songs'"><zsongs  :sourceFile="selSongs()" :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zsongs></div> -->
      <div v-else-if="ztool=='About'"><HelloWorld/></div>
      <div v-else-if="ztool=='Contact'"><HelloWorld/></div>
      <div v-else><zHome></zHome></div>
      <!-- <div v-else><zHome :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zHome></div> -->
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Govidat &copy; 2018</span>
      <!-- f10sel_node2h[0]: {{ f10sel_node2h[0] }}
      f10sel_node2h_id : {{ f10sel_node2h.slice(-1)[0].map(a => a.id) }}
      f10sel_node2: {{ f10sel_node2}} -->
    </v-footer>
  </v-app>
</template>

<script>

import HelloWorld from './components/HelloWorld'
import zfilter3 from './components/03filter'

import zHome from './components/10Home'
import zsaints from './components/20saints'
import ztemples from './components/25temples'
import zsongs from './components/30Songs'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'


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

      radios: 21,

      ztool: 0,
      toggle_exclusive: 0,

      sel_node0: [{ "id": 1, "h_path": [] }],

      f10sel_node1h: [[]],
      f10sel_node1: [],

      // node2: temple
      f10sel_node2h: [[],[]],
      f10sel_node2: [],

      // node3: song
      f10sel_node3h: [[{ "id": 1, "path": [ 1 ] } ],[{ "id": 11, "path": [ 1, 11 ] }]],
      f10sel_node3: [{id: 667, h_path: [1, 11]}],

      // node1: saint
      f20sel_node1h: [[]],
      f20sel_node1: [],

      // node2: temple
      f20sel_node2h: [[],[]],
      f20sel_node2: [],

      // node4: pps
      sel_node4: [],
      // node2: temple by pps
      f30sel_node2h: [[],[]],
      f30sel_node2: [],

      ztoolbar1: [
          {id: 99, menu: 'Home'},
          {id: 30, menu: 'Saints'},
          {id: 40, menu: 'Temples'},
          {id: 50, menu: 'Songs'},
          {id: 97, menu: 'About'},
          {id: 98, menu: 'Contact'}
        ],

    }
  },
  name: 'App',
  watch: {
    main_ln_id : function () {
      this.$store.commit('update_locale', this.$i18n.locale)
    },

    // IDEA: if ism is changed subsequently F10, F20 , f30 should be filtered should be revaluate
    sel_node0 : function () {
      for (var i = 0; i < this.f10sel_node1h.length; i++) {
        this.f10sel_node1h[i] = this.f10sel_node1h[i].filter( item => this.max_node1h.includes(item.id));
      }
      this.f10sel_node1 = this.f10sel_node1.filter(itm => itm.h_path.some(r => this.f10sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      for (var i = 0; i < this.f10sel_node2h.length; i++) {
        this.f10sel_node2h[i] = this.f10sel_node2h[i].filter( item => this.max_node2h.includes(item.id));
      };
      this.f10sel_node2 = this.f10sel_node2.filter(itm => itm.h_path.some(r => this.f10sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      for (var i = 0; i < this.f10sel_node3h.length; i++) {
        this.f10sel_node3h[i] = this.f10sel_node3h[i].filter( item => this.max_node3h.includes(item.id));
      };
      this.f10sel_node3 = this.f10sel_node3.filter(itm => itm.h_path.some(r => this.f10sel_node3h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      for (var i = 0; i < this.f20sel_node1h.length; i++) {
        this.f20sel_node1h[i] = this.f20sel_node1h[i].filter( item => this.max_node1h.includes(item.id));
      }
      this.f20sel_node1 = this.f20sel_node1.filter(itm => itm.h_path.some(r => this.f20sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      for (var i = 0; i < this.f20sel_node2h.length; i++) {
        this.f20sel_node2h[i] = this.f20sel_node2h[i].filter( item => this.max_node2h.includes(item.id));
      };
      this.f20sel_node2 = this.f20sel_node2.filter(itm => itm.h_path.some(r => this.f20sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

      this.sel_node4 = this.sel_node4.filter(item => this.max_node4.includes(item.id))
      // code to filter out f30sel_node2h..
      for (var i = 0; i < this.f30sel_node2h.length; i++) {
        this.f30sel_node2h[i] = this.f30sel_node2h[i].filter( item => this.max_node2h_pps.includes(item.id));
      };
      // code to filter out f30sel_node2..
      this.f30sel_node2 = this.f30sel_node2.filter(itm => itm.h_path.some(r => this.f30sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))

    },

    f10sel_node1h : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node1h.length; i++) {
          this.f10sel_node1h[i] = this.f10sel_node1h[i].filter(
            item => item.path.some(r =>
                                      Array.from
                                      (new Set((
                                        this.f10sel_node1h[i-1]
                                        .map(a => a.path))
                                        .reduce((acc, a) => acc.concat(a),[])
                                        ))
                                        .indexOf(r) >=0)
          );
        };
        this.f10sel_node1 = this.f10sel_node1.filter(itm => itm.h_path.some(r => this.f10sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      },
      deep: true
    },

    f10sel_node2h : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node2h.length; i++) {
          this.f10sel_node2h[i] = this.f10sel_node2h[i].filter(
            item => item.path.some(r =>
                                      Array.from
                                      (new Set((
                                        this.f10sel_node2h[i-1]
                                        .map(a => a.path))
                                        .reduce((acc, a) => acc.concat(a),[])
                                        ))
                                        .indexOf(r) >=0)
          );
        };
        this.f10sel_node2 = this.f10sel_node2.filter(itm => itm.h_path.some(r => this.f10sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      },
      deep: true
    },

    f10sel_node3h : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node3h.length; i++) {
          this.f10sel_node3h[i] = this.f10sel_node3h[i].filter(
            item => item.path.some(r =>
                                      Array.from
                                      (new Set((
                                        this.f10sel_node3h[i-1]
                                        .map(a => a.path))
                                        .reduce((acc, a) => acc.concat(a),[])
                                        ))
                                        .indexOf(r) >=0)
          );
        };
        this.f10sel_node3 = this.f10sel_node3.filter(itm => itm.h_path.some(r => this.f10sel_node3h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      },
      deep: true
    },

    f20sel_node1h : {
      handler: function () {
        for (var i = 1; i < this.f20sel_node1h.length; i++) {
          this.f20sel_node1h[i] = this.f20sel_node1h[i].filter(
            item => item.path.some(r =>
                                      Array.from
                                      (new Set((
                                        this.f20sel_node1h[i-1]
                                        .map(a => a.path))
                                        .reduce((acc, a) => acc.concat(a),[])
                                        ))
                                        .indexOf(r) >=0)
          );
        };
        this.f20sel_node1 = this.f20sel_node1.filter(itm => itm.h_path.some(r => this.f20sel_node1h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      },
      deep: true
    },

    f20sel_node2h : {
      handler: function () {
        for (var i = 1; i < this.f20sel_node2h.length; i++) {
          this.f20sel_node2h[i] = this.f20sel_node2h[i].filter(
            item => item.path.some(r =>
                                      Array.from
                                      (new Set((
                                        this.f20sel_node2h[i-1]
                                        .map(a => a.path))
                                        .reduce((acc, a) => acc.concat(a),[])
                                        ))
                                        .indexOf(r) >=0)
          );
        };
        this.f20sel_node2 = this.f20sel_node2.filter(itm => itm.h_path.some(r => this.f20sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      },
      deep: true
    },


    sel_node4 : function () {
      // code to filter out f30sel_node2h..
      for (var i = 0; i < this.f30sel_node2h.length; i++) {
        this.f30sel_node2h[i] = this.f30sel_node2h[i].filter( item => this.max_node2h_pps.includes(item.id));
      };
      // code to filter out f30sel_node2..
      this.f30sel_node2 = this.f30sel_node2.filter(itm => itm.h_path.some(r => this.f30sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
    },

    f30sel_node2h : {
      handler: function () {
        for (var i = 1; i < this.f30sel_node2h.length; i++) {
          this.f30sel_node2h[i] = this.f30sel_node2h[i].filter(
            item => item.path.some(r =>
                                      Array.from
                                      (new Set((
                                        this.f30sel_node2h[i-1]
                                        .map(a => a.path))
                                        .reduce((acc, a) => acc.concat(a),[])
                                        ))
                                        .indexOf(r) >=0)
          );
        };
        this.f30sel_node2 = this.f30sel_node2.filter(itm => itm.h_path.some(r => this.f30sel_node2h.slice(-1)[0].map(a => a.id).indexOf(r) >=0))
      },
      deep: true
    },
  },
  components: {
    HelloWorld,
    zfilter3,
    zHome,
    zsaints,
    ztemples,
    // zSaints,
    // zTemples,
    zsongs
  },
  computed: {
    ...mapState(
      ['languages', 'ism',
        'saint', 'saint_hier','ism_saint', 'temple_saint', 'temple', 'temple_hier', 'ism_temple', 'pps_temple', 'song', 'song_hier', 'ism_song',
        'saint_song', 'temple_song', 'pps', 'ism_pps', 'all_ln_id'

      ]
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

    max_node1h: function () {
      // based on sel_node0 accumulate the hier paths
      // accumulate to-id (saint_id) from ism_saint where id is in sel_node0_id
      var acc1 = Array.from
              (new Set((
              this.ism_saint.filter(itm => this.sel_node0.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate h_path id from saint where id is in previous step
      var acc2 = Array.from
              (new Set((
              this.saint.filter(itm => acc1.includes(itm.id))
              .map(a => a.h_path))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      return acc2;
    },

    max_node2h: function () {
      // based on sel_node0 accumulate the hier paths
      // accumulate to-id (saint_id) from ism_saint where id is in sel_node0_id
      var acc1 = Array.from
              (new Set((
              this.ism_temple.filter(itm => this.sel_node0.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate h_path id from saint where id is in previous step
      var acc2 = Array.from
              (new Set((
              this.temple.filter(itm => acc1.includes(itm.id))
              .map(a => a.h_path))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      return acc2;
    },

    max_node3h: function () {
      // based on sel_node0 accumulate the hier paths
      // accumulate to-id (saint_id) from ism_saint where id is in sel_node0_id
      var acc1 = Array.from
              (new Set((
              this.ism_song.filter(itm => this.sel_node0.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate h_path id from saint where id is in previous step
      var acc2 = Array.from
              (new Set((
              this.song.filter(itm => acc1.includes(itm.id))
              .map(a => a.h_path))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      return acc2;
    },

    max_node2h_pps: function () {
      // based on sel_node4 (pps) accumulate the hier paths
      // accumulate to-id (saint_id) from ism_saint where id is in sel_node0_id
      var acc1 = Array.from
              (new Set((
              this.pps_temple.filter(itm => this.sel_node4.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate h_path id from saint/temple where id is in previous step
      var acc2 = Array.from
              (new Set((
              this.temple.filter(itm => acc1.includes(itm.id))
              .map(a => a.h_path))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      return acc2;
    },

    max_node4: function () {
      // based on sel_node0 accumulate the pps ids
      var acc1 = Array.from
              (new Set((
              this.ism_pps.filter(itm => this.sel_node0.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      return acc1;
    },

    // f20sel_node3: song - auto selected based on node 1 and node 2
    f20sel_node3 : function () {
      // accumulate to_id (song_id) from saint_song
      var acc1 = Array.from
              (new Set((
              this.saint_song.filter(itm => this.f20sel_node1.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
      // accumulate to_id (song_id) from temple_song
      var acc2 = Array.from
              (new Set((
              this.temple_song.filter(itm => this.f20sel_node2.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));

      // take the common of acc1 and acc2
      var acc3 = acc1.filter(value => -1 !== acc2.indexOf(value));

      return acc3;

    },

    // f30sel_node3 and 1 : song / saint- auto selected based on node 2 - pps
    f30sel_node1 : function () {
      // accumulate to_id (saint_id) from temple_saint
      return Array.from
              (new Set((
              this.temple_saint.filter(itm => this.f30sel_node2.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
    },

    f30sel_node3 : function () {
      // accumulate to_id (song_id) from temple_song
      return Array.from
              (new Set((
              this.temple_song.filter(itm => this.f30sel_node2.map(x => x.id).includes(itm.id))
              .map(a => a.to_id))
              .reduce((acc, a) => acc.concat(a),[])
              ));
    },

    // get hierarcy height of node1
    // f10node1h_depth: function () {
    //   if (this.max_node1h.length == 0) {
    //     return 0
    //   } else {
    //     return Math.max(...(this.saint_hier.filter(itm => itm.path.some(r => this.max_node1h.indexOf(r) >=0))
    //       .map(el => el.path.length)));
    //     // return this.saint_hier.filter(itm => itm.path.some(r => this.max_node1h.indexOf(r) >=0)).reduce(function (result, val) {
    //     //         return Math.max(result, val.path.length);
    //     //     }, 0);
    //
    //   }
    // },

  },

  methods: {
    // handle_node0(positionid, payload) {
    //   this.sel_node0.splice(positionid, 1, payload);
    //   // this.selIsmsId = payload.map(x => x.id)
    // },

    selSaints: function () {
      // Return id array
      if (this.radios == 21) { return this.f10sel_node1.map(a => a.id) }
      else if (this.radios == 22) { return this.f20sel_node1.map(a => a.id) }
      else if (this.radios == 23) { return this.f30sel_node1 }
    },

    selTemples: function () {
      if (this.radios == 21) { return this.f10sel_node2.map(a => a.id) }
      else if (this.radios == 22) { return this.f20sel_node2.map(a => a.id) }
      else if (this.radios == 23) { return this.f30sel_node2.map(a => a.id) }
    },
    selSongs: function () {
      if (this.radios == 21) { return this.f10sel_node3.map(a => a.id) }
      else if (this.radios == 22) { return this.f20sel_node3 }
      else if (this.radios == 23) { return this.f30sel_node3 }
    },

  }
}
</script>
