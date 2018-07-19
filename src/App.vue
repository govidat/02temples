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
        <v-list>
          <v-list-tile>
            <v-list-tile-action><v-icon>filter</v-icon></v-list-tile-action>
            <v-list-tile-content>
              {{$t('stat_message.' + '1')}}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- 10 - node0/ ism 20 - radios -->
      <v-list>
        <v-list-group v-for="item in [{id: 10, model: false},{id: 20, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content> <v-list-tile-title>
              {{$t('stat_message.' + item.id)}}
                </v-list-tile-title></v-list-tile-content></v-list-tile>

          <!-- 10 node0 is ism @update:selected="handle_node0(0, ...arguments)" get_ism([0],[]) get_ism_cp-->
          <zfilter3 v-if="item.id == 10" :headerinput= "[ 5, 10]" :items="get_ism([0],[])" :selected.sync="sel_node0[0]" :node= "'node0'" :msg= "'node0_desc'" ></zfilter3>
          <!-- following is a radio button selection of radio options -->
          <template v-if="item.id == 20">
            <v-container fluid>
              <v-radio-group v-model="radios" :mandatory="false" v-for="elem in [21,22,23]">
                <v-radio :label="$t('stat_message.' + elem)" :value="elem"></v-radio>
                <!-- <v-radio :label="get_desc(elem, 1, 'NA', 'header')" :value="elem"></v-radio> -->
              </v-radio-group></v-container>
          </template>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

      <!-- if radios=21, then 30saint, 40temples, 50songs ; radios=22 then selList30 -->
      <v-list v-if="radios == 21">
        <v-list-group v-for="item in [{id: 30, model: false},{id: 40, model: false},{id: 50, model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
          </v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- Sublist => 30 Saints 40 Temples 50 Songs-->
          <template v-if="item.id == 30">
            <!-- Sublist : 31 for Saint-Group 30 for Saints-->
            <v-list-group v-for="item in [{id: 31, model: false},{id: 30, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- Sublist of 2010  : 31 for Saint-Group 30 for Saints-->
              <zfilter3 v-if="item.id == 31" :headerinput= "[ 5, 31]" :items="get_node('node1', [0], 'node1_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node1[0]" :node= "'node1'" ></zfilter3>
              <zfilter3 v-if="item.id == 30" :headerinput= "[ 5, 30]" :items="get_node('node1',f10sel_node1[0].map(x => x.id), 'node1_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node1[1]" :node= "'node1'"></zfilter3>
<!-- first get for hierarchy -->

<!-- then for the node -->


            </v-list-group>
          </template>
          <!-- Sublist of 40 Temples -->
          <template v-if="item.id == 40">
            <!-- Sublist => 42 State 41 District 40 Temple-->
            <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- <zfilter v-if="item.id == 40" :headerinput= "[ 5, 40]" :items="get_temple(f10sel_node2[1].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected="f10sel_node2[2]" :main_ln_id="main_ln_id" :node= "'node2'" @message="handlef10_node2(2, ...arguments)"></zfilter> -->
              <zfilter3 v-if="item.id == 42" :headerinput= "[ 5, 42]" :items="get_node('node2', [0], 'node2_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node2[0]" :node= "'node2'"></zfilter3>
              <zfilter3 v-if="item.id == 41" :headerinput= "[ 5, 41]" :items="get_node('node2', f10sel_node2[0].map(x => x.id), 'node2_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node2[1]" :node= "'node2'"></zfilter3>
              <zfilter3 v-if="item.id == 40" :headerinput= "[ 5, 40]" :items="get_node('node2', f10sel_node2[1].map(x => x.id), 'node2_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node2[2]" :node= "'node2'"></zfilter3>
            </v-list-group>
          </template>
          <!-- Sublist of 2030 -->
          <template v-if="item.id == 50">
            <!-- Sublist => 52 Songs Grp 51 Song Comp 50 Song-->
            <v-list-group v-for="item in [{id: 52, model: false},{id: 51, model: false},{id: 50, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
            <!-- <v-list-group v-for="item in selList2030" v-model="item.model" :key="item.title.Id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group> -->
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- <zfilter v-if="item.id == 50" :headerinput= "[ 5, 50]" :items="get_song(f10sel_node3[1].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected="f10sel_node3[2]" :main_ln_id="main_ln_id" :node= "'node3'" @message="handlef10_node3(2, ...arguments)"></zfilter> -->
              <zfilter3 v-if="item.id == 52" :headerinput= "[ 5, 52]" :items="get_node('node3', [0], 'node3_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node3[0]" :node= "'node3'"></zfilter3>
              <zfilter3 v-if="item.id == 51" :headerinput= "[ 5, 51]" :items="get_node('node3', f10sel_node3[0].map(x => x.id), 'node3_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node3[1]" :node= "'node3'"></zfilter3>
              <zfilter3 v-if="item.id == 50" :headerinput= "[ 5, 50]" :items="get_node('node3', f10sel_node3[1].map(x => x.id), 'node3_0', 'node0', true, sel_node0[sel_node0_bomheight - 1])" :selected.sync="f10sel_node3[2]" :node= "'node3'"></zfilter3>

            </v-list-group>
          </template>
        </v-list-group>
      </v-list>

      <v-list v-if="radios == 22">
        <v-list-group v-for="item in [{id: 30, model: false},{id: 40, model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
          </v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- Sublist => 30 Saints 40 Temples 50 Songs-->
          <template v-if="item.id == 30">
            <!-- Sublist : 31 for Saint-Group 30 for Saints-->
            <v-list-group v-for="item in [{id: 31, model: false},{id: 30, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- Sublist of 2010  : 31 for Saint-Group 30 for Saints-->
              <zfilter3 v-if="item.id == 31" :headerinput= "[ 5, 31]" :items="get_saint([0],sel_node0[sel_node0_bomheight - 1])" :selected.sync="f20sel_node1[0]" :node= "'node1'"></zfilter3>
              <zfilter3 v-if="item.id == 30" :headerinput= "[ 5, 30]" :items="get_saint(f20sel_node1[0].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected.sync="f20sel_node1[1]" :node= "'node1'"></zfilter3>
            </v-list-group>
          </template>
          <!-- Sublist of 40 Temples -->
          <template v-if="item.id == 40">
            <!-- Sublist => 42 State 41 District 40 Temple-->
            <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <zfilter3 v-if="item.id == 42" :headerinput= "[ 5, 42]" :items="get_temple([0],sel_node0[sel_node0_bomheight - 1])" :selected.sync="f20sel_node2[0]" :node= "'node2'"></zfilter3>
              <zfilter3 v-if="item.id == 41" :headerinput= "[ 5, 41]" :items="get_temple(f20sel_node2[0].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected.sync="f20sel_node2[1]" :node= "'node2'"></zfilter3>
              <zfilter3 v-if="item.id == 40" :headerinput= "[ 5, 40]" :items="get_temple(f20sel_node2[1].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected.sync="f20sel_node2[2]" :node= "'node2'"></zfilter3>
              <!-- <zFilterN v-if="item.title.Id == 202030" :headers="headerTemple" :items="f10maxTemples" :selected="f10selTemples" :main_ln_id="main_ln_id" @message="handlef10Temple"></zFilterN> -->
            </v-list-group>
          </template>

        </v-list-group>
      </v-list>

      <v-list v-else-if="radios == 23">
<!-- 43 PPS 40 Temples -->
        <v-list-group v-for="item in [{id: 43, model: false},{id: 40, model: false}]"
          v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
              <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
              <!-- 0607{{ item.title[mainLang] }} -->
            </v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- 43 node4 is pps -->
            <zfilter3 v-if="item.id == 43" :headerinput= "[ 5, 43]" :items="get_pps([0],sel_node0[sel_node0_bomheight - 1])" :selected.sync="f30sel_node4[0]" :node= "'node4'" :msg ="'node4_desc'"></zfilter3>

            <!-- <template v-if="item.id == 43">
              <v-list-group v-for="item in [{id: 43, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                  {{ get_header_desc(item.id, main_ln_id, 'en', 'NA') }}
                </v-list-tile-title></v-list-tile-content></v-list-tile>
              </v-list-group>
            </template> -->
            <!-- Sublist of 40 Temples -->
            <template v-if="item.id == 40">
              <!-- Sublist => 42 State 41 District 40 Temple-->
              <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
                <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{$t('stat_message.' + item.id)}}
                  <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
                </v-list-tile-title></v-list-tile-content></v-list-tile>
                <zfilter3 v-if="item.id == 42" :headerinput= "[ 5, 42]" :items="get_temple2([0],f30sel_node4[f30sel_node4_bomheight - 1])" :selected.sync="f30sel_node2[0]" :node= "'node2'"></zfilter3>
                <zfilter3 v-if="item.id == 41" :headerinput= "[ 5, 41]" :items="get_temple2(f30sel_node2[0].map(x => x.id),f30sel_node4[f30sel_node4_bomheight - 1])" :selected.sync="f30sel_node2[1]" :node= "'node2'"></zfilter3>
                <zfilter3 v-if="item.id == 40" :headerinput= "[ 5, 40]" :items="get_temple2(f30sel_node2[1].map(x => x.id),f30sel_node4[f30sel_node4_bomheight - 1])" :selected.sync="f30sel_node2[2]" :node= "'node2'"></zfilter3>
                <!-- <zFilterN v-if="item.title.Id == 202010" :headers="headerState" :items="f10maxStates" :selected="f10selStates" :main_ln_id="main_ln_id" @message="handlef10State"></zFilterN>
                <zFilterN v-if="item.title.Id == 202020" :headers="headerDistrict" :items="f10maxDistricts" :selected="f10selDistricts" :main_ln_id="main_ln_id" @message="handlef10District"></zFilterN>
                <zFilterN v-if="item.title.Id == 202030" :headers="headerTemple" :items="f10maxTemples" :selected="f10selTemples" :main_ln_id="main_ln_id" @message="handlef10Temple"></zFilterN> -->
              </v-list-group>
            </template>

          <!-- Sublist of 40 -->
          <!-- <zFilterN v-if="item.title.Id == 4010" :headers="headerPps" :items="f30maxPpss" :selected="f30selPpss" :main_ln_id="main_ln_id" @message="handlef30Pps"></zFilterN>
          <zFilterN v-if="item.title.Id == 4020" :headers="headerState" :items="f30maxStates" :selected="f30selStates" :main_ln_id="main_ln_id" @message="handlef30State"></zFilterN>
          <zFilterN v-if="item.title.Id == 4030" :headers="headerDistrict" :items="f30maxDistricts" :selected="f30selDistricts" :main_ln_id="main_ln_id" @message="handlef30District"></zFilterN>
          <zFilterN v-if="item.title.Id == 4040" :headers="headerTemple" :items="f30maxTemples" :selected="f30selTemples" :main_ln_id="main_ln_id" @message="handlef30Temple"></zFilterN> -->
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

        <v-card height='40px' flat color="transparent">
          <v-select  :items="languages.filter(item => item.value !== $i18n.locale)" v-model="add_ln_id" multiple label="Add Languages"></v-select>
        </v-card>
        <!-- <v-card height='40px' flat color="transparent">
          <v-select  :items="filLanguages" v-model="alang" multiple label="Add Languages"></v-select>
        </v-card> -->


      <v-tabs color="transparent" right slot="extension">
        <!-- <v-tab v-for="(item, j) in ztoolbar1" :key="j" @click.stop="ztool = item.menu"> -->
        <v-tab v-for="item in ztoolbar1" @click.stop="ztool = item.menu">
                {{$t('stat_message.' + item.id)}}
          <!-- {{ get_desc(item.id, 'en', 'NA', 'header') }} -->
          <!--0607 {{ item.title[mainLang]}} -->
          <!-- <v-badge v-if="item.badgeNum>0">
            <span slot="badge">{{item.badgeNum}}</span>
          </v-badge> -->
        </v-tab>

        <!-- <v-tab v-for="item in ztoolbar2" @click.stop="ztool = item.menu">
          {{ getseldesc(item.id, main_ln_id, 'en', 'NA') }}
        </v-tab> -->
      </v-tabs>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <!-- Select the component based on ztool value -->
      <div v-if="ztool=='Saints'"><zdetails :sourceFile="selSaints()" :node = "'node1'" ></zdetails></div>
      <div v-else-if="ztool=='Temples'"><zdetails :sourceFile="selTemples()" :node = "'node2'"></zdetails></div>
      <div v-else-if="ztool=='Songs'"><zSongs  :sourceFile="selSongs()" :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zSongs></div>
      <div v-else-if="ztool=='About'"><HelloWorld/></div>
      <div v-else-if="ztool=='Contact'"><HelloWorld/></div>
      <div v-else><zHome :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zHome></div>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Govidat &copy; 2018</span>
      <!-- sel_node0_id[0]:  {{ this.sel_node0[0].map(x => x.id) }}
      f10sel_node1_id[0]:  {{ this.f10sel_node1[0].map(x => x.id) }}
      f10sel_node1_id[1]:  {{ this.f10sel_node1[1].map(x => x.id) }}
      f30sel_node2[0]      :  {{this.f30sel_node2[this.f30sel_node2_bomheight - 1]}}
      selSaints: {{this.selSaints()}}
      selTemples : {{this.selTemples()}}
      selSongs: {{this.selSongs()}} -->
      main_ln_id: {{main_ln_id}}
      add_ln_id: {{add_ln_id}}
      all_ln_id: {{all_ln_id}}
    </v-footer>
  </v-app>
</template>

<script>
// import zlntext from './components/00lntext'
import HelloWorld from './components/HelloWorld'
// import zFilter from './components/01Filter'
// import zfilter from './components/02filter'
import zfilter3 from './components/03filter'

// import zFilterN from './components/01FilterNew'
import zHome from './components/10Home'
import zdetails from './components/20saints_temples_details'
// import zTemples from './components/25Temples'
import zSongs from './components/30Songs'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex';

// import { fn_desc } from './myMixin'
// this is a common code of a method to get the description as per language chosen

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


      // selIsmsId: [1],
      // sel_ism_id: [1],

      radios: 21,

      ztool: 0,
      toggle_exclusive: 0,

      // node0 : ism
      sel_node0_bomheight: 1,
      sel_node0: [[]],
      // first manually determine the depth of the parent child relationship / BOM
      // node1: saint
      f10sel_node1_bomheight: 2,
      f10sel_node1: [[],[]],
      // node2: temple
      f10sel_node2_bomheight: 3,
      f10sel_node2: [[],[],[]],
      // node3: song
      f10sel_node3_bomheight: 3,
      f10sel_node3: [[],[],[]],

      // node1: saint
      f20sel_node1_bomheight: 2,
      f20sel_node1: [[],[]],
      // node2: temple
      f20sel_node2_bomheight: 3,
      f20sel_node2: [[],[],[]],
      // node3: song - auto selected based on node 1 and node 2
      f20sel_node3_bomheight: 1,
      f20sel_node3: [[]],
      // node2: temple by pps
      f30sel_node2_bomheight: 3,
      f30sel_node2: [[],[],[]],
      // node4: pps
      f30sel_node4_bomheight: 1,
      f30sel_node4: [[]],
      // node1: saint derived on selection of pps and temples
      f30sel_node1_bomheight: 1,
      f30sel_node1: [[]],
      // node3: song - auto selected based on node 2 and node 4
      f30sel_node3_bomheight: 1,
      f30sel_node3: [[]],


      sel_node1: [[]],

      // mlang: 1,
      // alang: [2],

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

    // update_main_ln (payload) {
    //   this.$store.commit('update_main_ln', payload)
    // },



    // IDEA: if ism is changed subsequently F10, F20 , f30 should be filtered should be revaluate
    sel_node0 : function () {
      // alert ("sel_node0[0] " + JSON.stringify(this.sel_node0[0]))
      // alert ("f10sel_node1[0] before " + JSON.stringify(this.f10sel_node1[0]))
      for (var i = 0; i < this.f10sel_node1_bomheight; i++) {
        this.f10sel_node1[i] = this.f10sel_node1[i].filter( item => this.get_saint((this.f10sel_node1[i-1] || [{id: 0}]).map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      };
      // alert ("f10sel_node1[0] after " + JSON.stringify(this.f10sel_node1[0]))
      // this.f10sel_node1[0] = this.f10sel_node1[0].filter( item => this.get_saint([0],this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      for (var i = 0; i < this.f10sel_node2_bomheight; i++) {
        this.f10sel_node2[i] = this.f10sel_node2[i].filter( item => this.get_temple((this.f10sel_node2[i-1] || [{id: 0}]).map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      };
      // this.f10sel_node2[0] = this.f10sel_node2[0].filter( item => this.get_temple([0],this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      for (var i = 0; i < this.f10sel_node3_bomheight; i++) {
        this.f10sel_node3[i] = this.f10sel_node3[i].filter( item => this.get_song((this.f10sel_node3[i-1] || [{id: 0}]).map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      };
      // if (this.radios == 21) { this.selSaints = this.f10sel_node1[this.f10sel_node1_bomheight - 1] };

      for (var i = 0; i < this.f20sel_node1_bomheight; i++) {
        this.f20sel_node1[i] = this.f20sel_node1[i].filter( item => this.get_saint((this.f20sel_node1[i-1] || [{id: 0}]).map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      };
      // this.f10sel_node1[0] = this.f10sel_node1[0].filter( item => this.get_saint([0],this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      for (var i = 0; i < this.f20sel_node2_bomheight; i++) {
        this.f20sel_node2[i] = this.f20sel_node2[i].filter( item => this.get_temple((this.f20sel_node2[i-1] || [{id: 0}]).map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      };
      this.f20sel_node3[0] = this.get_song2(this.f20sel_node1[this.f20sel_node1_bomheight - 1],this.f20sel_node2[this.f20sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1]);

      for (var i = 0; i < this.f30sel_node4_bomheight; i++) {
        this.f30sel_node4[i] = this.f30sel_node4[i].filter( item => this.get_pps((this.f30sel_node4[i-1] || [{id: 0}]).map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      };
      this.f30sel_node3[0] = this.get_song3(this.f30sel_node2[this.f30sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1]);
      this.f30sel_node1[0] = this.get_saint3(this.f30sel_node2[this.f30sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1]);
      for (var i = 0; i < this.f30sel_node2_bomheight; i++) {
        this.f30sel_node2[i] = this.f30sel_node2[i].filter( item => this.get_temple2((this.f30sel_node2[i-1] || [{id: 0}]).map(x => x.id),this.f30sel_node4[this.f30sel_node4_bomheight - 1]).includes(item));
      };

    },

    f10sel_node1 : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node1_bomheight; i++) {
          this.f10sel_node1[i] = this.f10sel_node1[i].filter( item => this.get_saint(this.f10sel_node1[i-1].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
        }
      },
      deep: true
    },

    f10sel_node2 : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node2_bomheight; i++) {
          this.f10sel_node2[i] = this.f10sel_node2[i].filter( item => this.get_temple(this.f10sel_node2[i-1].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
        }
      },
      deep: true
    },
    f10sel_node3 : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node3_bomheight; i++) {
          this.f10sel_node3[i] = this.f10sel_node3[i].filter( item => this.get_song(this.f10sel_node3[i-1].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
        }
      },
      deep: true
    },

    f20sel_node1 : {
      handler: function () {
        for (var i = 1; i < this.f20sel_node1_bomheight; i++) {
          this.f20sel_node1[i] = this.f20sel_node1[i].filter( item => this.get_saint(this.f20sel_node1[i-1].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
        };
        this.f20sel_node3[0] = this.get_song2(this.f20sel_node1[this.f20sel_node1_bomheight - 1],this.f20sel_node2[this.f20sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1])
      },
      deep: true
    },

    f20sel_node2 : {
      handler: function () {
        for (var i = 1; i < this.f20sel_node2_bomheight; i++) {
          this.f20sel_node2[i] = this.f20sel_node2[i].filter( item => this.get_temple(this.f20sel_node2[i-1].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
        };
        this.f20sel_node3[0] = this.get_song2(this.f20sel_node1[this.f20sel_node1_bomheight - 1],this.f20sel_node2[this.f20sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1])
      },
      deep: true
    },

    f30sel_node4 : function () {
        for (var i = 0; i < this.f30sel_node2_bomheight; i++) {
          this.f30sel_node2[i] = this.f30sel_node2[i].filter( item => this.get_temple2((this.f30sel_node2[i-1] || [{id: 0}]).map(x => x.id),this.f30sel_node4[this.f30sel_node4_bomheight - 1]).includes(item));
        };
        this.f30sel_node3[0] = this.get_song3(this.f30sel_node2[this.f30sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1])
        this.f30sel_node1[0] = this.get_saint3(this.f30sel_node2[this.f30sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1])

    },


    f30sel_node2 : {
      handler: function () {
        for (var i = 1; i < this.f30sel_node2_bomheight; i++) {
          this.f30sel_node2[i] = this.f30sel_node2[i].filter( item => this.get_temple2(this.f30sel_node2[i-1].map(x => x.id),this.f30sel_node4[this.f30sel_node4_bomheight - 1]).includes(item));
        };
        this.f30sel_node3[0] = this.get_song3(this.f30sel_node2[this.f30sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1])
        this.f30sel_node1[0] = this.get_saint3(this.f30sel_node2[this.f30sel_node2_bomheight - 1], this.sel_node0[this.sel_node0_bomheight - 1])

      },
      deep: true
    },


    // mlang: function () {
    //     this.alang = this.alang.filter(item => item !== this.mlang);
        //
        // this.alang = [];
    // }
  },
  components: {
    HelloWorld,
    zfilter3,
    zHome,
    zdetails,
    // zSaints,
    // zTemples,
    zSongs
  },
  computed: {
    ...mapState(
      ['languages', 'ism',
        'saint', 'saint_ism', 'temple', 'temple_ism', 'song', 'song_ism',
        'saint_song', 'temple_song', 'pps', 'all_ln_id'

      ]
    ),

    ...mapGetters({

    get_ism: 'get_ism',
    // get_header_desc: 'get_header_desc',
    get_desc: 'get_desc',
    // get_desc2: 'get_desc2',
    // get_desc3: 'get_desc3',

    // getseldesc: 'get_sel_desc',
    // getradiodesc: 'get_radio_desc',
    // getsaintdesc: 'get_saint_desc',

    get_node: 'get_node',

    get_saint: 'get_saint',
    get_temple: 'get_temple',
    get_temple2: 'get_temple2',
    get_song: 'get_song',
    get_song2: 'get_song2',
    get_pps: 'get_pps',
    get_saint3: 'get_saint3',
    get_song3: 'get_song3',
    }),

    main_ln_id : function () {
      return this.$i18n.locale;
    },

    // main_ln_id: {
    //   get () {
    //     return this.$store.state.main_ln_id
    //   },
    //   set (payload) {
    //     this.$store.commit('update_main_ln', payload)
    //     this.$store.commit('update_add_ln', this.add_ln_id.filter(item => item != payload ))
    //   }
    // },

    add_ln_id: {
      get () {
        return this.$store.state.add_ln_id
      },
      set (payload) {
        this.$store.commit('update_add_ln', [payload, this.$i18n.locale])
      }
    },

    // get_ism_cp: function () {
    //   return this.get_ism([0],[]);
    // }
  },

  methods: {
    // update_main_ln (payload) {
    //   this.$store.commit('update_main_ln', payload)
    // },

    // ...mapActions([
    //   'update_main_ln'
    // ]),

    // handle_node0(positionid, payload) {
    //   this.sel_node0.splice(positionid, 1, payload);
    //   // this.selIsmsId = payload.map(x => x.id)
    // },
    // handlef10_node1(positionid, payload) {
    //   // alert ("payload" + JSON.stringify(payload));
    //   // plain = does not make it reactive. splice makes it reactive
    //   this.f10sel_node1.splice(positionid, 1, payload);
    // },
    // handlef10_node2(positionid, payload) {
    //   this.f10sel_node2.splice(positionid, 1, payload);
    // },
    // handlef10_node3(positionid, payload) {
    //   this.f10sel_node3.splice(positionid, 1, payload);
    // },
    // handlef20_node1(positionid, payload) {
    //   this.f20sel_node1.splice(positionid, 1, payload);
    // },
    // handlef20_node2(positionid, payload) {
    //   this.f20sel_node2.splice(positionid, 1, payload);
    // },
    // handlef30_node2(positionid, payload) {
    //   this.f30sel_node2.splice(positionid, 1, payload);
    // },
    // handlef30_node4(positionid, payload) {
    //   this.f30sel_node4.splice(positionid, 1, payload);
    // },



    selSaints: function () {
      // alert ("Hello from methods")
      if (this.radios == 21) { return this.f10sel_node1[this.f10sel_node1_bomheight - 1] }
      else if (this.radios == 22) { return this.f20sel_node1[this.f20sel_node1_bomheight - 1] }
      else if (this.radios == 23) { return this.f30sel_node1[this.f30sel_node1_bomheight - 1] }
    },

    selTemples: function () {
      if (this.radios == 21) { return this.f10sel_node2[this.f10sel_node2_bomheight - 1] }
      else if (this.radios == 22) { return this.f20sel_node2[this.f20sel_node2_bomheight - 1] }
      else if (this.radios == 23) { return this.f30sel_node2[this.f30sel_node2_bomheight - 1] }
    },
    selSongs: function () {
      if (this.radios == 21) { return this.f10sel_node3[this.f10sel_node3_bomheight - 1] }
      else if (this.radios == 22) { return this.f20sel_node3[this.f20sel_node3_bomheight - 1] }
      else if (this.radios == 23) { return this.f30sel_node3[this.f30sel_node3_bomheight - 1] }
    },



  }
}
</script>
