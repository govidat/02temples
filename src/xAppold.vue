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
              <!-- this just diplays "Selections" as left column1 header -->
              <!-- itemid, main_ln_id, default_ln_id, default desc -->
              {{ getheaderdesc(1, main_ln_id, 1, "NA") }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- try for a simpler filtering methods -->
      <!-- 10 - node0/ ism 20 - radios -->
      <v-list>
        <v-list-group v-for="item in [{id: 10, model: false},{id: 20, model: false}]" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content> <v-list-tile-title>
                  <!-- itemid, main_ln_id, default_ln_id, default desc -->
                  {{ getheaderdesc(item.id, main_ln_id, 1, "NA") }}
                </v-list-tile-title></v-list-tile-content></v-list-tile>

          <!-- 10 node0 is ism -->
          <zFilter v-if="item.id == 10" :headerinput= "[ 5, 10]" :items="getism([0],[])" :selected="sel_node0[0]" :main_ln_id="main_ln_id" :tab_desc= "ism_desc" @message="handle_node0(0, ...arguments)"></zFilter>
          <!-- following is a readio button selection of radio options -->
          <template v-if="item.id == 20">
            <v-container fluid>
              <v-radio-group v-model="radios" :mandatory="false" v-for="elem in [21,22,23]">
                <v-radio :label="getheaderdesc(elem, main_ln_id, 1, 'NA')" :value="elem"></v-radio>
              </v-radio-group>
            </v-container>
          </template>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

      <!-- if radios=21, then 30saint,40temples, 50songs ; radios=22 then selList30 -->
      <v-list v-if="radios == 21">
        <v-list-group v-for="item in [{id: 30, model: false},{id: 40, model: false},{id: 50, model: false}]"
        v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{ getheaderdesc(item.id, main_ln_id, 1, "NA") }}
          </v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- Sublist => 30 Saints 40 Temples 50 Songs-->
          <template v-if="item.id == 30">
            <!-- Sublist : 31 for Saint-Group 30 for Saints-->
            <v-list-group v-for="item in [{id: 31, model: false},{id: 30, model: false}]"
              v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{ getheaderdesc(item.id, main_ln_id, 1, "NA") }}
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- Sublist of 2010  : 31 for Saint-Group 30 for Saints-->
              <!-- <zFilterN v-if="item.id == -2" :headers="id_header" :items="getsaint([0],sel_node0[sel_node0_bomheight - 1])" :selected="f10sel_node1[0]" :main_ln_id="main_ln_id" :tab_desc= "saint_desc" @message="handlef10_node1(0, ...arguments)"></zFilterN> -->
              <zFilter v-if="item.id == 31" :headerinput= "[ 5, 31]" :items="getsaint([0],sel_node0[sel_node0_bomheight - 1])" :selected="f10sel_node1[0]" :main_ln_id="main_ln_id" :tab_desc= "saint_desc" @message="handlef10_node1(0, ...arguments)"></zFilter>
              <!-- getsaint(parentarr, ismarr) ; getsaint([0],[1]-->
              <!-- <zFilterN v-if="item.id == -3" :headers="id_header" :items="getsaint(f10sel_node1[0].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected="f10sel_node1[1]" :main_ln_id="main_ln_id" :tab_desc= "saint_desc" @message="handlef10_node1(1, ...arguments)"></zFilterN> -->
              <zFilter v-if="item.id == 30" :headerinput= "[ 5, 30]" :items="getsaint(f10sel_node1[0].map(x => x.id),sel_node0[sel_node0_bomheight - 1])" :selected="f10sel_node1[1]" :main_ln_id="main_ln_id" :tab_desc= "saint_desc" @message="handlef10_node1(1, ...arguments)"></zFilter>
              <!-- <zFilterN v-if="item.title.Id == 201020" :headers="headerSaint" :items="f10maxSaints" :selected="f10selSaints" :main_ln_id="main_ln_id" @message="handlef10Saint"></zFilterN> -->
            </v-list-group>
          </template>
          <!-- Sublist of 30 Temples -->
          <template v-if="item.id == 2020">
            <!-- Sublist => 42 State 41 District 40 Temple-->
            <v-list-group v-for="item in [{id: 42, model: false},{id: 41, model: false},{id: 40, model: false}]" v-model="item.model" :key="item.title.Id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                    <!--0607 {{ item.title[main_ln_id] }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- <zFilterN v-if="item.title.Id == 202010" :headers="headerState" :items="f10maxStates" :selected="f10selStates" :main_ln_id="main_ln_id" @message="handlef10State"></zFilterN>
              <zFilterN v-if="item.title.Id == 202020" :headers="headerDistrict" :items="f10maxDistricts" :selected="f10selDistricts" :main_ln_id="main_ln_id" @message="handlef10District"></zFilterN>
              <zFilterN v-if="item.title.Id == 202030" :headers="headerTemple" :items="f10maxTemples" :selected="f10selTemples" :main_ln_id="main_ln_id" @message="handlef10Temple"></zFilterN> -->
            </v-list-group>
          </template>
          <!-- Sublist of 2030 -->
          <template v-if="item.id == 2030">
            <v-list-group v-for="item in selList2030" v-model="item.model" :key="item.title.Id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                    <!--0607 {{ item.title[mainLang] }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- <zFilterN v-if="item.title.Id == 203010" :headers="headerSongsGr1" :items="f10maxSongsGr1" :selected="f10selSongsGr1" :main_ln_id="main_ln_id" @message="handlef10SongsGr1"></zFilterN>
              <zFilterN v-if="item.title.Id == 203020" :headers="headerSongsComp" :items="f10maxSongsComp" :selected="f10selSongsComp" :main_ln_id="main_ln_id" @message="handlef10SongsComp"></zFilterN> -->
              <!-- <zFilterN v-if="item.title.Id == 203030" :headers="headerSong" :items="f10maxSongs" :selected="f10selSongs" :mainLang="mainLang" @message="handlef10Song"></zFilterN> -->
            </v-list-group>
          </template>
        </v-list-group>
      </v-list>

      <v-list v-if="radios == 22">
        <v-list-group v-for="item in sel_list_30" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
          <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                {{ getseldesc(item.id, main_ln_id, 1, "NA") }}
                <!-- 0607{{ item.title[mainLang] }} -->
          </v-list-tile-title></v-list-tile-content></v-list-tile>
          <!-- Sublist of 3010 -->
          <template v-if="item.id == 3010">
            <v-list-group v-for="item in selList3010" v-model="item.model" :key="item.title.Id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                    <!-- 0607{{ item.title[mainLang] }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- Sublist of 2010 -->
              <!-- <zFilterN v-if="item.title.Id == 301010" :headers="headerSaintsGr1" :items="f20maxSaintsGr1" :selected="f20selSaintsGr1" :main_ln_id="main_ln_id" @message="handlef20SaintsGr1"></zFilterN>
              <zFilterN v-if="item.title.Id == 301020" :headers="headerSaint" :items="f20maxSaints" :selected="f20selSaints" :main_ln_id="main_ln_id" @message="handlef20Saint"></zFilterN> -->
            </v-list-group>
          </template>
          <!-- Sublist of 2020 -->
          <template v-if="item.id == 3020">
            <v-list-group v-for="item in selList3020" v-model="item.model" :key="item.title.Id" :prepend-icon="item.model ? iconup : icondn" append-icon="" sub-group>
              <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
                    <!-- 0607{{ item.title[mainLang] }} -->
              </v-list-tile-title></v-list-tile-content></v-list-tile>
              <!-- <zFilterN v-if="item.title.Id == 302010" :headers="headerState" :items="f20maxStates" :selected="f20selStates" :main_ln_id="main_ln_id" @message="handlef20State"></zFilterN>
              <zFilterN v-if="item.title.Id == 302020" :headers="headerDistrict" :items="f20maxDistricts" :selected="f20selDistricts" :main_ln_id="main_ln_id" @message="handlef20District"></zFilterN>
              <zFilterN v-if="item.title.Id == 302030" :headers="headerTemple" :items="f20maxTemples" :selected="f20selTemples" :main_ln_id="main_ln_id" @message="handlef20Temple"></zFilterN> -->
            </v-list-group>
          </template>
        </v-list-group>
      </v-list>

      <v-list v-else-if="radios == 23">

        <v-list-group v-for="item in sel_list_40" v-model="item.model" :key="item.id" :prepend-icon="item.model ? iconup : icondn" append-icon="">
            <v-list-tile slot="activator"><v-list-tile-content><v-list-tile-title>
              {{ getseldesc(item.id, main_ln_id, 1, "NA") }}
              <!-- 0607{{ item.title[mainLang] }} -->
            </v-list-tile-title></v-list-tile-content></v-list-tile>

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
        <!-- itemid, main_ln_id, default_ln_id, default desc -->
        {{ getseldesc(0, main_ln_id, 1, "NA") }}
        <!-- <zlntext :lndesc="title.find(itm => itm.ln_id == main_ln_id)"></zlntext> -->
        <!-- {{title[mainLang]}} -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Badge is used only of the badge num value is > 0 -->
      <!-- Pass the ztool value. Based on this component is selected below.       -->
      <!-- <v-btn-toggle v-model="toggle_exclusive">
      </v-btn-toggle> -->
      <!-- <v-tabs color="transparent" right>
        <v-tab> -->
      <!-- <v-tooltip bottom> -->
        <v-card height='40px' flat color="transparent">
          <v-select
            :items="languages"
            v-model="mlang"
            label="Language"
          ></v-select>
        </v-card>
        <!-- <span>Main Language</span>
      </v-tooltip> -->

      <v-card height='40px' flat color="transparent">
        <v-select
          label="Add Languages"
          :items="filLanguages"
          v-model="alang"
          multiple
        ></v-select>
      </v-card>


        <!-- </v-tab>
      </v-tabs> -->

      <v-tabs color="transparent" right slot="extension">
        <!-- <v-tab v-for="(item, j) in ztoolbar1" :key="j" @click.stop="ztool = item.menu"> -->
        <v-tab v-for="item in ztoolbar1" @click.stop="ztool = item.menu">
          {{ getseldesc(item.id, main_ln_id, 1, "NA") }}
          <!--0607 {{ item.title[mainLang]}} -->
          <v-badge v-if="item.badgeNum>0">
            <span slot="badge">{{item.badgeNum}}</span>
          </v-badge>
        </v-tab>

        <v-tab v-for="item in ztoolbar2" @click.stop="ztool = item.menu">
          {{ getseldesc(item.id, main_ln_id, 1, "NA") }}
          <!--0607 {{ item.title[mainLang]}} -->
        </v-tab>
      </v-tabs>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <!-- Select the component based on ztool value -->
      <div v-if="ztool=='Saints'"><zSaints :sourceFile="selSaints" :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zSaints></div>
      <div v-else-if="ztool=='Temples'"><zTemples :sourceFile="selTemples" :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zTemples></div>
      <div v-else-if="ztool=='Songs'"><zSongs  :sourceFile="selSongs" :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zSongs></div>
      <div v-else-if="ztool=='About'"><HelloWorld/></div>
      <div v-else-if="ztool=='Contact'"><HelloWorld/></div>
      <div v-else><zHome :main_ln_id="main_ln_id" :all_ln_id="all_ln_id"></zHome></div>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Govidat &copy; 2018</span>
      selIsmsIdid: {{this.sel_node0[0].map(x => x.id)}}
      f10sel_node1[0]:  {{this.f10sel_node1[0]}}
      f10sel_node1_id[0]:  {{ this.f10sel_node1[0].map(x => x.id) }}
      f10sel_node1[1]:  {{this.f10sel_node1[1]}}
      f10sel_node1_id[1]:  {{ this.f10sel_node1[1].map(x => x.id) }}

    </v-footer>
  </v-app>
</template>

<script>
// import zlntext from './components/00lntext'
import HelloWorld from './components/HelloWorld'
import zFilter from './components/01Filter'
import zFilterN from './components/01FilterNew'
import zHome from './components/10Home'
import zSaints from './components/20Saints'
import zTemples from './components/25Temples'
import zSongs from './components/30Songs'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
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

      // tab_desc: this.sel_desc,
      // title: "Temples, Saints and Divine Songs of Hinduism",

      // title: {English: "Temples, Saints and Divine Songs of Hinduism",
      //         Tamil: "இந்து மத கோயில்கள், ரிஷிகள் மற்றும் தெய்வீக பாடல்கள் ",
      //         Telugu: "హిందూ మతం దేవాలయాలు, రిషీలు మరియు దైవిక పాటలు"},
      // title: [
      //   {ln_id: 1, desc: "Temples, Saints and Divine Songs of Hinduism"},
      //   {ln_id: 2, desc:  "இந்து மத கோயில்கள், ரிஷிகள் மற்றும் தெய்வீக பாடல்கள்"},
      //   {ln_id: 3, desc:  "హిందూ మతం దేవాలయాలు, రిషీలు మరియు దైవిక పాటలు"}
      // ],

      // pushed to store
      // filterTitle: {English: "Selections",
      //               Tamil: "தேர்வுகள்",
      //               Telugu: "సెలక్షన్స్"},

      // filterList: [{title: {Id: 10, English: "States", Tamil: "மாநிலங்கள்", Telugu: "స్టేట్స్"}, model: false},
      //         {title: {Id: 20, English: "En-Regions", Tamil: "Ta-Regions", Telugu: "Te-Regions"}, model: false},
      //         {title: {Id: 30, English: "Saints", Tamil: "ரிஷிகள்", Telugu: "Te-Saints"}, model: false},
      //         {title: {Id: 40, English: "Temples", Tamil: "கோயில்கள்", Telugu: "Te-Temples"}, model: false}
      //       ],
      //
      // selList10: [
      //   {title: {Id: 10, English: "Ism", Tamil: "வகை", Telugu: "రకం"}, model: false},
      //   {title: {Id: 20, English: "Views", Tamil: "அறிக்கை காட்சி", Telugu: "నివేదిక వీక్షణు"}, model: false}
      //   ],

      // headerIsm: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: "Ism", Tamil: "வகை", Telugu: "రకం" }, align: 'left', value: 'Name' }
      //   ],
        // { "Id": 1, "Name": { "English": "Vaishnavism", "Tamil": "வைணவ", "Telugu": "వైష్ణవ" } }

      selIsmsId: [1],
      sel_ism_id: [1],

      radios: 21,
      // item_radio: [
      //   { id: 1, Label: {English: 'Saints; Temples; Songs', Tamil: 'ரிஷிகள்; கோயில்கள் ; பாடல்கள்', Telugu: 'రిషీల; దేవాలయాల; పాటల'} },
      //   { id: 2, Label: {English: 'Songs - Temple/Saint wise', Tamil: 'பாடல்கள் - கோயில்கள்/ரிஷிகள் வாரியாக', Telugu: 'పాటల - దేవాలయాల/రిషీల జ్ఞానం'} },
      //   { id: 3, Label: {English: 'Temples sung by Saints', Tamil: 'பாடல் பெற்ற ஸ்தலங்கள்', Telugu: 'ఋషి పాడిన ఆలయాలు'} }
      // ],

      // itemsRadio: [
      //   { Value: 1, Label: {English: 'Saints; Temples; Songs', Tamil: 'ரிஷிகள்; கோயில்கள் ; பாடல்கள்', Telugu: 'రిషీల; దేవాలయాల; పాటల'} },
      //   { Value: 2, Label: {English: 'Songs - Temple/Saint wise', Tamil: 'பாடல்கள் - கோயில்கள்/ரிஷிகள் வாரியாக', Telugu: 'పాటల - దేవాలయాల/రిషీల జ్ఞానం'} },
      //   { Value: 3, Label: {English: 'Temples sung by Saints', Tamil: 'பாடல் பெற்ற ஸ்தலங்கள்', Telugu: 'ఋషి పాడిన ఆలయాలు'} }
      // ],

      // if radios=1, then selList20 ; radios=2 then selList30...
      // selList20 is on Saints;Temples;Songs
      // selList20: [
      //   {title: {Id: 2010, English: "Saints", Tamil: "ரிஷிகள்", Telugu: "రిషీల"}, model: false},
      //   {title: {Id: 2020, English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, model: false},
      //   {title: {Id: 2030, English: "Songs", Tamil: "பாடல்கள்", Telugu: "సాంగ్స్"}, model: false}
      //   ],

      // sel_list_20: [
      //   // 30 for Saints 40 for Temples 50 Songs all main nodes
      //   {id: 30, model: false},
      //   {id: 40, model: false},
      //   {id: 50, model: false}
      //  ],

      // [
      //     {title: {Id: 2010, English: "Saints", Tamil: "ரிஷிகள்", Telugu: "రిషీల"}, model: false},
      //     {title: {Id: 2020, English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, model: false},
      //     {title: {Id: 2030, English: "Songs", Tamil: "பாடல்கள்", Telugu: "సాంగ్స్"}, model: false}
      //     ],


      sel_list_2010: [
        // -2 for SaintsGroup -3 for Saints
        {id: -2, model: false},
        {id: -3, model: false}
       ],
        // selList2010: [
        //   {title: {Id: 201010, English: "Saints-Group", Tamil: "ரிஷிகள்-தொகுப்பு", Telugu: "రిషీల-సమూహము"}, model: false},
        //   {title: {Id: 201020, English: "Saints", Tamil: "ரிஷிகள்", Telugu: "రిషీల"}, model: false}
        //   ],
        selList2020: [
          {title: {Id: 202010, English: "States", Tamil: "மாநிலங்கள்", Telugu: "రాష్ట్రాలు"}, model: false},
          {title: {Id: 202020, English: "Districts", Tamil: "மாவட்டங்கள்", Telugu: "జిల్లాలు"}, model: false},
          {title: {Id: 202030, English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, model: false}
          ],
        selList2030: [
          {title: {Id: 203010, English: "Songs-Group", Tamil: "பாடல்கள்-தொகுப்பு", Telugu: "సాంగ్స్-సమూహము"}, model: false},
          {title: {Id: 203020, English: "Songs-Comp", Tamil: "பாடல்கள்-துணை தொகுப்பு", Telugu: "సాంగ్స్-ఉప గుంపు"}, model: false}
          // ,
          // {title: {Id: 203030, English: "Songs", Tamil: "பாடல்கள்", Telugu: "Te-Songs"}, model: false}
          ],


      // selList30 is on Songs - Temple/Saint wise
      // selList30: [
      //   {title: {Id: 3010, English: "Saints", Tamil: "ரிஷிகள்", Telugu: "రిషీల"}, model: false},
      //   {title: {Id: 3020, English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, model: false},
      //   ],
      sel_list_30: [
        // 30 for Saints 40 for Temples 50 - Songs to be derived
        {id: 30, model: false},
        {id: 40, model: false}
       ],


        selList3010: [
          {title: {Id: 301010, English: "Saints-Group", Tamil: "ரிஷிகள்-தொகுப்பு", Telugu: "రిషీల-సమూహము"}, model: false},
          {title: {Id: 301020, English: "Saints", Tamil: "ரிஷிகள்", Telugu: "రిషీల"}, model: false}
          ],
        selList3020: [
          {title: {Id: 302010, English: "States", Tamil: "மாநிலங்கள்", Telugu: "రాష్ట్రాలు"}, model: false},
          {title: {Id: 302020, English: "Districts", Tamil: "மாவட்டங்கள்", Telugu: "జిల్లాలు"}, model: false},
          {title: {Id: 302030, English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, model: false}
          ],

        // selList40 is on Padal petra sthalangal
      sel_list_40: [
        // 41 - Padal petra sthalangal
        {id: 41, model: false}
       ],

      // selList40: [
      //   {title: {Id: 4010, English: "Temples sung by Saints", Tamil: "பாடல் பெற்ற ஸ்தலங்கள", Telugu: "ఋషి పాడిన ఆలయాల"}, model: false},
      //   {title: {Id: 4020, English: "States", Tamil: "மாநிலங்கள்", Telugu: "రాష్ట్రాలు"}, model: false},
      //   {title: {Id: 4030, English: "Districts", Tamil: "மாவட்டங்கள்", Telugu: "జిల్లాలు"}, model: false},
      //   {title: {Id: 4040, English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, model: false}
      //   ],

      headerPps: [
        { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
        { text: {English: "Temples sung by Saints", Tamil: "பாடல் பெற்ற ஸ்தலங்கள", Telugu: "ఋషి పాడిన ఆలయాల" }, align: 'left', value: 'Name' }
        ],
      // get the toolbar Selection
      ztool: 0,
      toggle_exclusive: 0,

      // f30selIsmsId: [1],
      f30selPpss: [],
      f30selPpssId: [],

      f30selStates: [],
      f30selStatesId: [],
      f30selDistricts: [],
      f30selDistrictsId: [],
      f30selTemples: [],
      f30selTemplesId: [],

      sel_node0_bomheight: 1,
      sel_node0: [[{ id: 1}]],
      // first manually determine the depth of the parent child relationship / BOM
      f10sel_node1_bomheight: 2,
      f10sel_node1: [[],[]],
      // for(var a = [];a.length < 10; a.push([]));
      // for(var f10sel_node1 = [];f10sel_node1.length < f10_saint_level; f10sel_node1.push([]));

      // Array.from({length: N}, () => [])
      // f10sel_node1 = Array.from({length: f10_saint_level}, () => []),
      // f10sel_node1: [[]],
      // f10sel_node1_id: [],

      // f10selSaintsGr1Id: [],
      // f10selSaints: [],
      // f10selSaintsId: [],
      // f10selStates: [],
      // f10selStatesId: [],
      // f10selDistricts: [],
      // f10selDistrictsId: [],
      // f10selTemples: [],
      // f10selTemplesId: [],
      //
      // f10selSongsGr1: [],
      // f10selSongsGr1Id: [],
      // f10selSongsComp: [],
      // f10selSongsCompId: [],
      //
      // f20selSaintsGr1: [],
      // f20selSaintsGr1Id: [],
      // f20selSaints: [],
      // f20selSaintsId: [],
      // f20selStates: [],
      // f20selStatesId: [],
      // f20selDistricts: [],
      // f20selDistrictsId: [],
      // f20selTemples: [],
      // f20selTemplesId: [],
      //
      // headerState: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'States', Tamil: 'மாநிலங்கள்', Telugu: 'రాష్ట్రాలు' }, align: 'left', value: 'Name' }
      //   ],
      // headerDistrict: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'Districts', Tamil: 'மாவட்டங்கள்', Telugu: 'జిల్లాలు' }, align: 'left', value: 'Name' }
      //   ],
      // headerRegion: [
      //     { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //     { text: {English: 'Regions', Tamil: 'பண்டைய மண்டலங்கள்', Telugu: 'పురాతన ప్రాంతాలు' }, align: 'left', value: 'Name' }
      //     ],
      // headerTemple: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'Temples', Tamil: 'கோயில்கள்', Telugu: 'దేవాలయాలు' }, align: 'left', value: 'Name' }
      //   ],
      // headerSaintsGr1: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'SaintGroup', Tamil: 'ரிஷிகள்-தொகுப்பு', Telugu: 'రిషీల-సమూహము' }, align: 'left', value: 'Name' }
      //   ],
      // headerSaint: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'Saint', Tamil: 'ரிஷிகள்', Telugu: 'రిషీల' }, align: 'left', value: 'Name' }
      //   ],
      // headerSongsGr1: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'Song-Group', Tamil: 'பாடல்கள்-தொகுப்பு', Telugu: 'సాంగ్స్-సమూహము' }, align: 'left', value: 'Name' }
      //   ],
      // headerSongsComp: [
      //   { text: {English: 'Id', Tamil: 'எண்', Telugu: 'సంఖ్య' }, align: 'left', sortable: true, value: 'Id'},
      //   { text: {English: 'Comp', Tamil: 'பாடல்கள்-துணை தொகுப்பு', Telugu: 'సాంగ్స్-ఉప గుంపు' }, align: 'left', value: 'Name' }
      //   ],
      mlang: 1,
      alang: [2],
    }
  },
  name: 'App',
  watch: {

    // IDEA: if ism is changed subsequently F10, F20 , f30 should be filtered should be revaluate
    // selIsmsId : function () {
    //   this.f30selPpss = this.f30selPpss.filter( item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   this.f30selPpssId = this.f30selPpss.map(x => x.Id);
    //
    //
    //   let f10maxStatesId = this.f10maxStates.map(x => x.Id);
    //   this.f10selStates = this.f10selStates.filter( item => f10maxStatesId.includes(item.Id));
    //   this.f10selStatesId = this.f10selStates.map(x => x.Id);
    //
    //   this.f10selSongsGr1 = this.f10selSongsGr1.filter( item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   this.f10selSongsGr1Id = this.f10selSongsGr1.map(x => x.Id);
    //
    //   this.f20selSaintsGr1 = this.f20selSaintsGr1.filter( item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   this.f20selSaintsGr1Id = this.f20selSaintsGr1.map(x => x.Id);
    //
    //   let f20maxStatesId = this.f20maxStates.map(x => x.Id);
    //   this.f20selStates = this.f20selStates.filter( item => f20maxStatesId.includes(item.Id));
    //   this.f20selStatesId = this.f20selStates.map(x => x.Id);
    // },

    sel_node0 : function () {
      this.f10sel_node1[0] = this.f10sel_node1[0].filter( item => this.getsaint([0],this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
    },

    f10sel_node1 : {
      handler: function () {
        for (var i = 1; i < this.f10sel_node1_bomheight; i++) {
          this.f10sel_node1[i] = this.f10sel_node1[i].filter( item => this.getsaint(this.f10sel_node1[i-1].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
        }
      },
      // this.f10sel_node1[1] = this.f10sel_node1[1].filter( item => this.getsaint(this.f10sel_node1[0].map(x => x.id),this.sel_node0[this.sel_node0_bomheight - 1]).includes(item));
      deep: true
    },

    // f10selSaintsGr1Id : function () {
    //   let f10maxSaintsId = this.f10maxSaints.map(x => x.id);
    //   this.f10selSaints = this.f10selSaints.filter( item => f10maxSaintsId.includes(item.id));
    //   this.f10selSaintsId = this.f10selSaints.map(x => x.id);
    // },
    // f10selStatesId : function () {
    //   let f10maxDistrictsId = this.f10maxDistricts.map(x => x.Id);
    //   this.f10selDistricts = this.f10selDistricts.filter( item => f10maxDistrictsId.includes(item.Id));
    //   this.f10selDistrictsId = this.f10selDistricts.map(x => x.Id);
    // },
    // f10selDistrictsId : function () {
    //   let f10maxTemplesId = this.f10maxTemples.map(x => x.Id);
    //   this.f10selTemples = this.f10selTemples.filter( item => f10maxTemplesId.includes(item.Id));
    //   this.f10selTemplesId = this.f10selTemples.map(x => x.Id);
    // },
    //
    // f10selSongsGr1Id : function () {
    //   let f10maxSongsCompId = this.f10maxSongsComp.map(x => x.Id);
    //   this.f10selSongsComp = this.f10selSongsComp.filter( item => f10maxSongsCompId.includes(item.Id));
    //   this.f10selSongsCompId = this.f10selSongsComp.map(x => x.Id);
    // },
    // f10selSongsCompId : function () {
    //   this.f10selSongs = this.f10selSongs.filter( item => this.f10maxSongsId.includes(item.Id));
    //   // this.f10selSongsId = this.f10selSongs.map(x => x.Id);
    // },
    //
    // f20selSaintsGr1Id : function () {
    //   let f20maxSaintsId = this.f20maxSaints.map(x => x.Id);
    //   this.f20selSaints = this.f20selSaints.filter( item => f20maxSaintsId.includes(item.Id));
    //   this.f20selSaintsId = this.f20selSaints.map(x => x.Id);
    // },
    // f20selStatesId : function () {
    //   let f20maxDistrictsId = this.f20maxDistricts.map(x => x.Id);
    //   this.f20selDistricts = this.f20selDistricts.filter( item => f20maxDistrictsId.includes(item.Id));
    //   this.f20selDistrictsId = this.f20selDistricts.map(x => x.Id);
    // },
    // f20selDistrictsId : function () {
    //   let f20maxTemplesId = this.f20maxTemples.map(x => x.Id);
    //   this.f20selTemples = this.f20selTemples.filter( item => f20maxTemplesId.includes(item.Id));
    //   this.f20selTemplesId = this.f20selTemples.map(x => x.Id);
    // },
    // f30selPpssId : function () {
    //   let f30maxStatesId = this.f30maxStates.map(x => x.Id);
    //   this.f30selStates = this.f30selStates.filter( item => f30maxStatesId.includes(item.Id));
    //   this.f30selStatesId = this.f30selStates.map(x => x.Id);
    // },
    // f30selStatesId : function () {
    //   let f30maxDistrictsId = this.f30maxDistricts.map(x => x.Id);
    //   this.f30selDistricts = this.f30selDistricts.filter( item => f30maxDistrictsId.includes(item.Id));
    //   this.f30selDistrictsId = this.f30selDistricts.map(x => x.Id);
    // },
    // f30selDistrictsId : function () {
    //   let f30maxTemplesId = this.f30maxTemples.map(x => x.Id);
    //   this.f30selTemples = this.f30selTemples.filter( item => f30maxTemplesId.includes(item.Id));
    //   this.f30selTemplesId = this.f30selTemples.map(x => x.Id);
    // },

    mlang: function () {
        this.alang = this.alang.filter(item => item !== this.mlang);
        //
        // this.alang = [];
    }
  },
  components: {
    HelloWorld,
    zFilter,
    zFilterN,
    zHome,
    zSaints,
    zTemples,
    zSongs
  },
  computed: {
    ...mapState(
      ['languages', 'header_desc', 'sel_desc', 'sel_list_10', 'id_header', 'ism', 'ism_desc', 'radio', 'radio_desc',
        'saint', 'saint_desc', 'saint_ism'
      ]
    ),

    ...mapGetters({
    // languages: 'languagesGet',
    // title: 'title_get',
    // itemsIsm: 'ismsMasterGet',

    getism: 'get_ism',
    getheaderdesc: 'get_header_desc',
    getseldesc: 'get_sel_desc',
    getradiodesc: 'get_radio_desc',
    getsaintdesc: 'get_saint_desc',
    getsaint: 'get_saint',

    // itemsPps: 'ppssMasterGet',
    // itemsState: 'statesMasterGet',
    // itemsDistrict: 'districtsMasterGet',
    // itemsRegion: 'regionsMasterGet',
    // itemsSaint: 'saintsMasterGet',
    // itemsSaintGr1: 'saintsGr1MasterGet',
    // itemsTemple: 'templesMasterGet',
    // itemsSong: 'songsMasterGet',
    // itemsSongGr1: 'songsGr1MasterGet',
    // itemsSongComp: 'songsCompGet',
    // tempSongDetails: 'songsDetailsGet'
    }),

    // tab_desc: function () {
    //     return this.sel_desc;
    // },


    main_ln_id: function () {
        let y = this.mlang;
        return [y];
    },
    filLanguages: function () {
        return this.languages.filter(item => item.value !== this.mlang);
    },
    all_ln_id: function () {
      return this.main_ln_id.concat(this.alang);
    },

    // f10maxStates: function () {
    //   let f10temples = this.itemsTemple.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   let f10StatesId =  Array.from
    //                       (new Set(
    //                         (f10temples
    //                         .map(a => a.StateId))
    //                         .reduce((acc, a) => acc.concat(a),[])
    //                         )
    //                       );
    //   return this.itemsState.filter(item => f10StatesId.includes(item.Id) );
    // },
    //
    // f10maxDistricts: function () {
    //   let f10temples = this.itemsTemple.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   let f10DistrictsId =  Array.from
    //                       (new Set(
    //                         (f10temples
    //                         .map(a => a.DistrictId))
    //                         .reduce((acc, a) => acc.concat(a),[])
    //                         )
    //                       );
    //   return this.itemsDistrict.filter(item => f10DistrictsId.includes(item.Id) && this.f10selStatesId.includes(item.StateId) );
    // },
    //
    // f10maxTemples: function () {
    //   return this.itemsTemple.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)) && this.f10selDistrictsId.includes(item.DistrictId) && this.f10selStatesId.includes(item.StateId) );
    // },

    // f10maxSongsGr1: function () {
    //   return this.itemsSongGr1.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    // },
    // f10maxSongsComp: function () {
    //   return this.itemsSongComp.filter(item => this.f10selSongsGr1Id.includes(item.SongGr1Id));
    // },
    //
    // // selSongsId to be generated based on the selSongsCompId. sort on Id
    // f10maxSongs: function () {
    //   return this.itemsSong.filter(item => this.f10selSongsCompId.includes(item.CompId));
    // },
    // f10maxSongsId: function () {
    //   return this.f10maxSongs.map(x => x.Id);
    // },
    //
    // f10selSongs: function () {
    //   return this.f10maxSongsId;
    // },
    //
    //
    // f20maxSaintsGr1: function () {
    //   return this.itemsSaintGr1.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    // },
    // f20maxSaints: function () {
    //   return this.itemsSaint.filter(item => this.f20selSaintsGr1Id.includes(item.SaintGr1Id));
    // },
    // // f20maxStates is based on temples that have the selectedIsmId
    // f20maxStates: function () {
    //   let f20temples = this.itemsTemple.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   let f20StatesId =  Array.from
    //                       (new Set(
    //                         (f20temples
    //                         .map(a => a.StateId))
    //                         .reduce((acc, a) => acc.concat(a),[])
    //                         )
    //                       );
    //   return this.itemsState.filter(item => f20StatesId.includes(item.Id) );
    // },
    //
    // f20maxDistricts: function () {
    //   let f20temples = this.itemsTemple.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    //   let f20DistrictsId =  Array.from
    //                       (new Set(
    //                         (f20temples
    //                         .map(a => a.DistrictId))
    //                         .reduce((acc, a) => acc.concat(a),[])
    //                         )
    //                       );
    //   return this.itemsDistrict.filter(item => f20DistrictsId.includes(item.Id) && this.f20selStatesId.includes(item.StateId) );
    // },
    //
    // f20maxTemples: function () {
    //   return this.itemsTemple.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)) && this.f20selDistrictsId.includes(item.DistrictId) && this.f20selStatesId.includes(item.StateId) );
    // },
    // // selSongsId to be generated based on the selSaints and selTemples.
    //
    // f20maxSongsId: function () {
    //   let f20selTemplesSongId = this.f20selTemples
    //                         .map(a => a.SongId.map(b => b))
    //                         .reduce((acc, a) => acc.concat(a),[]);
    //   let songSaintsId = f20selTemplesSongId.filter(item =>
    //                                                     this.itemsSong.find(x => x.Id === item).SaintId
    //                                                     .some(v => this.f20selSaintsId.includes(v)));
    //   // let f20selTemplesSongs = this.itemsSong.filter(item => f20selTemplesSongId.includes(item.Id) );
    //   // let f20maxSongs = f20selTemplesSongs.filter(item => item.SaintId.some(v => this.f20selSaintsId.includes(v)))
    //   // return this.f20maxSongs.map(x => x.Id);
    //   return songSaintsId;
    // },
    //
    // f20selSongs: function () {
    //   return this.f20maxSongsId;
    //   // based on song id , link to Comp file and get the details. sort on Id
    //   //0525 return this.f20maxSongsId.map(x => {
    //   //     var rObj = {};
    //   //     rObj["Id"] = x;
    //   //     rObj["CompDetails"] = this.itemsSongComp.find(itm => itm.Id === this.itemsSong.find(itm => itm.Id === x).CompId) || [];
    //   //     return rObj;
    //   // })
    // },
    //
    // //For f30 or third option of Radio Button - which is by Padal Petr sthalangal or PPS
    // // set the status of f30 after each level of selections
    //
    // f30maxPpss: function () {
    //   return this.itemsPps.filter(item => item.IsmId.some(v => this.selIsmsId.includes(v)));
    // },
    //
    // f30maxStates: function () {
    //   let f30statesId = this.f30selPpss
    //                         .map(a => a.StateId.map(b => b))
    //                         .reduce((acc, a) => acc.concat(a),[]);
    //   return this.itemsState.filter(item => f30statesId.includes(item.Id));
    // },
    //
    //
    // f30maxDistricts: function () {
    //   let f30districtsId = this.f30selPpss
    //                         .map(a => a.DistrictId.map(b => b))
    //                         .reduce((acc, a) => acc.concat(a),[]);
    //   return this.itemsDistrict.filter(item => f30districtsId.includes(item.Id) && this.f30selStatesId.includes(item.StateId) );
    // },
    //
    // f30maxTemples: function () {
    //   let f30templesId = this.f30selPpss
    //                         .map(a => a.TempleId.map(b => b))
    //                         .reduce((acc, a) => acc.concat(a),[]);
    //   return this.itemsTemple.filter(item => f30templesId.includes(item.Id) && this.f30selDistrictsId.includes(item.DistrictId) && this.f30selStatesId.includes(item.StateId) );
    // },
    // // saints is based on the sel temples
    // f30selSaints: function () {
    //   let f30saintsId = this.f30selTemples
    //                         .map(a => a.SaintId.map(b => b))
    //                         .reduce((acc, a) => acc.concat(a),[]);
    //   return this.itemsSaint.filter(item => f30saintsId.includes(item.Id) );
    // },
    //
    // // selSongsId to be generated based on the selTemplesId. sort on Id
    // f30selSongsId: function () {
    //   return Array.from
    //           (new Set((
    //           this.f30selTemples
    //           .map(a => a.SongId))
    //           .reduce((acc, a) => acc.concat(a),[])
    //           ));
    // },
    //
    // f30selSongs: function () {
    //   return this.f30selSongsId;
    //   // based on song id , link to Comp file and get the details. sort on Id
    //   //0525 return this.f30selSongsId.map(x => {
    //   //     var rObj = {};
    //   //     rObj["Id"] = x;
    //   //     rObj["CompDetails"] = this.itemsSongComp.find(itm => itm.Id === this.itemsSong.find(itm => itm.Id === x).CompId) || [];
    //   //     return rObj;
    //   // })
    // },

    // selSaints, selTemples and selSongs are determined by the radios values
    selSaints: function () {
      if (this.radios == 1) { return this.f10selSaints }
      else if (this.radios == 2) { return this.f20selSaints }
      else if (this.radios == 3) { return this.f30selSaints }
    },

    selTemples: function () {
      if (this.radios == 1) { return this.f10selTemples }
      else if (this.radios == 2) { return this.f20selTemples }
      else if (this.radios == 3) { return this.f30selTemples }
    },
    selSongs: function () {
      if (this.radios == 1) { return this.f10selSongs }
      else if (this.radios == 2) { return this.f20selSongs }
      else if (this.radios == 3) { return this.f30selSongs }
    },

    ztoolbar1 () {
      let list = [
        // {title: {English: "Home", Tamil: "முகப்பு பக்கம்", Telugu: "హోమ్ పేజీ"}, menu: 'Home', badgeNum: 0},
        // {title: {English: "Saints", Tamil: "ரிஷிகள்", Telugu: "రిషీల"}, menu: 'Saints', badgeNum: this.selSaints.length },
        // {title: {English: "Temples", Tamil: "கோயில்கள்", Telugu: "దేవాలయాలు"}, menu: 'Temples', badgeNum: this.selTemples.length },
        // {title: {English: "Songs", Tamil: "பாடல்கள்", Telugu: "సాంగ్స్"}, menu: 'Songs', badgeNum: this.selSongs.length }
        {id: 99, menu: 'Home', badgeNum: 0},
        {id: 30, menu: 'Saints', badgeNum: 0 },
        {id: 40, menu: 'Temples', badgeNum: 0 },
        {id: 50, menu: 'Songs', badgeNum: 0 }
      ];
      return list;
    },
    ztoolbar2 () {
      let list = [
        // {title: {English: "About", Tamil: "எங்களை பற்றி", Telugu: "మా గురించి"}, menu: 'About'},
        // {title: {English: "Contact", Tamil: "தொடர்புக்கு", Telugu: "సంప్రదించండి"}, menu: 'Contact'}
        {id: 97, menu: 'About'},
        {id: 98, menu: 'Contact'}

      ];
      return list;
    }
  },

  methods: {

    // fn_tab_desc: function (itemid, main_ln, def_ln, def_desc) {
    //   // itemid, main_ln_id, default_ln_id, default desc
    //   var y = {desc: def_desc};
    //   return (
    //     (
    //     this.sel_desc.find(itm => (itm.id == itemid && itm.ln_id == main_ln)) ||
    //     this.sel_desc.find(itm => (itm.id == itemid && itm.ln_id == def_ln)) ||
    //     y
    //     ).desc
    //   )
    // },

    handle_node0(positionid, payload) {
      this.sel_node0.splice(positionid, 1, payload);
      this.selIsmsId = payload.map(x => x.id)
      // this.sel_node0.map(x => x.id)
      // this.sel_ism_id = payload
      // this.selIsmsId = payload.map(x => x.Id)
    },
    handlef10_node1(positionid, payload) {
      // alert ("payload" + JSON.stringify(payload));
      // plain = does not make it reactive. splice makes it reactive
      this.f10sel_node1.splice(positionid, 1, payload);
      // this.f10sel_node1[positionid] = payload;
      // alert ("f10sel_node1[positionid]" + JSON.stringify(this.f10sel_node1[positionid]));
      // alert ("payload[0]" + JSON.stringify(payload[0]));
      // alert ("payload" + payload.length)
      // alert ("position passed" + position + "payload" + payload)
      // this.f10sel_node1_id[position] = payload.map(x => x.id)
    },
    handlef10Saint(payload) {
      this.f10selSaints = payload
      this.f10selSaintsId = payload.map(x => x.id)
    },
    // handlef10State(payload) {
    //   this.f10selStates = payload
    //   this.f10selStatesId = payload.map(x => x.Id)
    // },
    // handlef10District(payload) {
    //   this.f10selDistricts = payload
    //   this.f10selDistrictsId = payload.map(x => x.Id)
    // },
    // handlef10Temple(payload) {
    //   // alert("Hello")
    //   this.f10selTemples = payload
    //   this.f10selTemplesId = payload.map(x => x.Id)
    // },
    // handlef10SongsGr1(payload) {
    //   this.f10selSongsGr1 = payload
    //   this.f10selSongsGr1Id = payload.map(x => x.Id)
    // },
    // handlef10SongsComp(payload) {
    //   this.f10selSongsComp = payload
    //   this.f10selSongsCompId = payload.map(x => x.Id)
    // },
    // handlef20SaintsGr1(payload) {
    //   this.f20selSaintsGr1 = payload
    //   this.f20selSaintsGr1Id = payload.map(x => x.Id)
    // },
    // handlef20Saint(payload) {
    //   this.f20selSaints = payload
    //   this.f20selSaintsId = payload.map(x => x.Id)
    // },
    // handlef20State(payload) {
    //   this.f20selStates = payload
    //   this.f20selStatesId = payload.map(x => x.Id)
    // },
    // handlef20District(payload) {
    //   this.f20selDistricts = payload
    //   this.f20selDistrictsId = payload.map(x => x.Id)
    // },
    // handlef20Temple(payload) {
    //   // alert("Hello")
    //   this.f20selTemples = payload
    //   this.f20selTemplesId = payload.map(x => x.Id)
    // },
    // handlef30Pps(payload) {
    //   this.f30selPpss = payload
    //   this.f30selPpssId = payload.map(x => x.Id)
    // },
    // handlef30State(payload) {
    //   this.f30selStates = payload
    //   this.f30selStatesId = payload.map(x => x.Id)
    // },
    // handlef30District(payload) {
    //   this.f30selDistricts = payload
    //   this.f30selDistrictsId = payload.map(x => x.Id)
    // },
    // handlef30Temple(payload) {
    //   this.f30selTemples = payload
    //   this.f30selTemplesId = payload.map(x => x.Id)
    // },

  }
}
</script>
