<template>
  <div>
    <!-- {{cat_id}} / {{itemid}} / {{mmx_type_id}} / {{sub_id}} -->
    <!-- {{textObject}} -->
    <v-card-title>
      {{textObject["header"]}}
    </v-card-title>
    <v-card-text>
      <p v-for="j in textObject['item']">{{j}}</p>

      <template>{{$t('desc.' + 'm09')}} : {{(playcounter % zloop)+1}} / {{zloop}} </template>
      <template v-if="splitchoice == 1 && this.zsplit.length > 1">{{$t('desc.' + 'm10')}} : {{~~(playcounter/zloop) + 1}} / {{Math.max(this.zsplit.length-1, 1)}}</template>
      <template v-else-if="splitchoice == 2 && this.zsplit.length > 1">{{$t('desc.' + 'm11')}} : {{~~(playcounter/zloop) + 1}} / {{Math.max(this.zsplit.length-1, 1)}}</template>

    </v-card-text>
    <!-- play_circle_filled/ pause_circle_filled -->
    <!-- <v-btn flat icon color="indigo" v-on:click="zswitch"> -->
    <!-- <v-icon v-if="! playRequested">play_circle_filled</v-icon>
      <v-icon v-else>chevron_left</v-icon> -->
    <!-- <v-card>
    <v-sheet> -->
      <!-- <v-layout row wrap> -->
    <v-toolbar color="grey accent-4" dark>
      <v-toolbar-items>

        <v-btn  :color="playRequested ? 'red' : 'cyan'" v-on:click="zswitch">
          <template v-if="! playRequested" >{{$t('desc.' + 'm01')}}<v-icon>play_circle_filled</v-icon></template>
          <template v-else>{{$t('desc.' + 'm02')}}<v-icon>stop</v-icon></template>
          <!-- <template v-else>{{$t('desc[' + /' + 'm02' + /' + ']')}}<v-icon>stop</v-icon></template> -->
        </v-btn>
        <v-spacer></v-spacer>
      <!-- <v-radio-group v-model="splitchoice" row>
        <div v-for="item in splitchoice_options" :key="item.text">
          <v-radio :label="$t('desc.' + item.text)" :value="item.value"></v-radio>
        </div>
      </v-radio-group> -->
      <!-- <v-col class="d-flex" cols="12" sm="6"> -->
        <v-select v-model="zplaybackrate" :items=zplaybackrate_options>
          <template slot="selection" slot-scope='{ item }'>
            {{$t('desc.' + item.text)}}
          </template>
          <template slot='item' slot-scope='{ item }'>
            {{$t('desc.' + item.text)}}
          </template>
          <template slot="label">{{$t('desc.' + 'm16')}}</template>
        </v-select>

      <!-- </v-col> -->
        <v-text-field v-model="zloop" outlined>
          <template slot="label">{{$t('desc.' + 'm09')}}</template>
        </v-text-field>
        <v-text-field v-model="zloop_gap_sec" outlined>
          <template slot="label">{{$t('desc.' + 'm17')}}</template>
        </v-text-field>
        <!-- display this splitchoice, only of there are more than one item to show in max_splitchoice -->
          <v-select v-if="max_splitchoice_options.length > 1" v-model="splitchoice" :items=max_splitchoice_options>
            <template slot="selection" slot-scope='{ item }'>
              {{$t('desc.' + item.text)}}
            </template>
            <template slot='item' slot-scope='{ item }'>
              {{$t('desc.' + item.text)}}
            </template>
            <template slot="label">{{$t('desc.' + 'm15')}}</template>
          </v-select>

      <!-- <input v-model="zloop" placeholder="No of loops"> -->
      <!-- <input v-model="zloop_gap_sec" placeholder="Seconds between loops"> -->
      </v-toolbar-items>
    </v-toolbar>
    <!-- </v-layout> -->

  <!-- </v-sheet>
</v-card> -->
    <!-- <v-layout row wrap>
      <v-flex xs12 sm4 md4 v-for="item in splitchoice_options" :key="item.id">
        <v-checkbox v-model="splitchoice" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
      </v-flex>
    </v-layout> -->


    <!-- <v-btn @click="snackbar_aud = true"><v-icon>language</v-icon>Options</v-btn> -->
    <zaudplr v-if="playRequested" :itemid = itemid :mmx_type_id = 3 :sub_id = sub_id :zsplit = zsplit :maxcounter = maxcounter v-on:playedout="zswitch" @playcounterevent="playcounter= $event"></zaudplr>
  </div>
</template>
<script>
import zaudplr from './45audplr'
import { mapState } from 'vuex'

  export default {
    props: ['itemid', 'mmx_type_id', 'sub_id'],
    data () {return {
      playRequested: false,
      // snackbar_aud: false,
      splitchoice_options: [
        //splitchoice 1 = by word, 2 = by line 3 = none
          {text: 'm06', value: 1},
          {text: 'm07', value: 2},
          {text: 'm08', value: 3}
        ],
      zplaybackrate_options: [
          //playbackRate
          {text: 'm12', value: 0.5},
          {text: 'm13', value: 0.75},
          {text: 'm14', value: 1}
        ],

      playcounter: 0,
      // splitchoice: 1,
      // zloop: 5,
    }},

    watch: {
      splitchoice : function() {
        if (this.playRequested) {
          this.playRequested = ! this.playRequested
          setTimeout(() => this.playRequested = true, 1000)
        }
      },
      zloop : function() {
        if (this.playRequested) {
          this.playRequested = ! this.playRequested
          setTimeout(() => this.playRequested = true, 1000)
        }
      },

      zplaybackrate : function() {
        if (this.playRequested) {
          this.playRequested = ! this.playRequested
          setTimeout(() => this.playRequested = true, 1000)
        }
      },

    },


    methods: {
      zswitch: function () {this.playRequested = ! this.playRequested; this.playcounter=0},
    },

    components: {zaudplr},

    computed: {
      ...mapState(['mmx_shell']),

      textObject: function () {
        return this.$t('server'+'['+this.itemid+']'+'['+this.mmx_type_id+']'+'['+this.sub_id+']' )
      },

      splitchoice: {
        get () {return (this.$store.state.splitchoice)},
        set (value) {this.$store.commit('upd_splitchoice', value)}
      },

      zloop: {
        get () {return (this.$store.state.zloop)},
        set (value) {this.$store.commit('upd_zloop', value)}
      },

      zloop_gap_sec: {
        get () {return (this.$store.state.zloop_gap_sec)},
        set (value) {this.$store.commit('upd_zloop_gap_sec', value)}
      },


      zsplit_word: function () {
        // return this.$store.state.mmx_shell[this.itemid][this.mmx_type_id][this.sub_id]['split_word']
        return (((((this.$store.state.mmx_shell || [])[this.itemid] || [])[this.mmx_type_id] || [])[this.sub_id] || [])['split_word'] || [])
      },
      zsplit_line: function () {
        // return this.$store.state.mmx_shell[this.itemid][this.mmx_type_id][this.sub_id]['split_word']
        return (((((this.$store.state.mmx_shell || [])[this.itemid] || [])[this.mmx_type_id] || [])[this.sub_id] || [])['split_line'] || [])
      },
// this is to initiate zsplit. Else it can be same as the default value
      zsplit: function() {
        if (this.splitchoice == 1 && this.zsplit_word.length > 0) { return this.zsplit_word}
        else if (this.splitchoice == 2 && this.zsplit_line.length > 0) {return this.zsplit_line}
        else { return [] }
      },

      maxcounter: function() {
        // if the splitchoice =2, then split.length=0; to get a min value of 1
        return this.zloop*(Math.max(this.zsplit.length-1, 1))
      },

      zplaybackrate: {
        get () {return (this.$store.state.zplaybackrate)},
        set (value) {this.$store.commit('upd_zplaybackrate', value)}
      },
      // based on length of zsplit_word and zplit_line determine max_splitchoice_options

      max_splitchoice_options: function() {
        var t1 = this.splitchoice_options
        // remove option 1
        if (this.zsplit_word.length < 2) { t1 = t1.filter(x => x.value != 1 )}
        if (this.zsplit_line.length < 2) { t1 = t1.filter(x => x.value != 2 )}
        return t1
      }



    },
  }
</script>
