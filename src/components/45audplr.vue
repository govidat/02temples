<template>
  <div>
    <template v-if="! ismmxLoading">
      <v-container grid-list-sm fluid fill-height>
      <v-layout wrap>
        <v-card>
            <template v-if="playcounter < maxcounter && playRequested">
              <!-- <template v-if="splitchoice != 3">{{$t('desc.' + 'm10')}} : {{~~(playcounter/zloop) + 1}} / {{Math.max(this.zsplit.length-1, 1)}}</template>
              <template>{{$t('desc.' + 'm09')}} : {{(playcounter % zloop)+1}} / {{zloop}} </template> -->
              <!-- playcounter {{playcounter}} /  maxcounter {{maxcounter}} / Wordno {{~~(playcounter/zloop) + 1}} / Start/endtime {{zsplit[~~(playcounter/zloop)]}} / {{zsplit[~~(playcounter/zloop) + 1]}} -->
                <!-- :music="{src: 'data:audio/mp3;base64, ' + mmxs + '#t=' + zsplit[~~(playcounter/zloop)] + ',' + zsplit[~~(playcounter/zloop) + 1] , -->
              <aplayer
                :key=playcounter
                autoplay showLrc mutex
                v-on:play="zeventplay"
                v-on:pause="playcounter += 1"
                v-on:timeupdate="timecounter"
                ref="zapl"
                :music="{src: 'data:audio/mp3;base64, ' + mmxs,
                         lrc: zlrc,
                         title: ztitle,
                         artist: zartist,

                }"/>
                <!-- {{zplaytime}} -->
              <!-- <audio
                :key=playcounter controls autoplay
                v-on:pause="playcounter += 1"
                :src = "'data:audio/mp3;base64, ' + mmxs">
              </audio> -->
            </template>
            <v-btn v-if="playcounter <= maxcounter" v-on:click="zswitch">
              <template v-if="! playRequested">{{$t('desc.' + 'm04')}}<v-icon>play_circle_filled</v-icon></template>
              <template v-else>{{$t('desc.' + 'm05')}}<v-icon>pause_circle_filled</v-icon></template>
            </v-btn>
        </v-card>
      </v-layout>
      </v-container>
    </template>
    <template v-else>
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import Aplayer from 'vue-aplayer'
import axios from 'axios'


  export default {
    props: ['itemid', 'mmx_type_id', 'sub_id', 'zsplit', 'maxcounter'],
    components: {
        Aplayer
      },

    data () {
      return {
        // splitchoice 1 = by word, 2 = by line 3 = none. This is to be built into a component
        // splitchoice: 3,
        playcounter: 0,
        // zloop: 20,
        // zlrc: '[00:00.05]APlayer\n[00:01.01]is\n[00:02.00]amazing',
        zlrc: '[00:01.00]ॐ [00:03.50]विश्वं [00:04.00]विष्णु: [00:04.40]वषट्कारो [00:06.00]भूत-भव्य-भवत-प्रभुः [00:08.20]भूत-कृत [00:09.00]भूत-भृत[00:09.70] भावो भूतात्मा [00:10.40]भूतभावनः',
        ztitle: 'VishnuSahasranamam',
        zartist: 'MSS',
        playRequested: true,
        zplaytime: 0
       }
    } ,
    // https://stackoverflow.com/questions/48388877/vue-js-how-i-can-bind-the-playbackrate-of-a-html5-video-element
    // directives: {
    //   zplbrate(el, binding) {
    //     this.$refs.zap.el.playbackRate = binding.value;
    //   }
    // },


// emit an intimation that the it has played out its full quota.
    watch: {
      playcounter : function() {
      this.playRequested = false
      setTimeout(() => this.playRequested = true, this.zloop_gap_sec*1000)
      this.$emit('playcounterevent', this.playcounter)
      if (this.playcounter >= this.maxcounter) { this.$emit('playedout'); this.$emit('playcounterevent', 0) }
      },

      // splitchoice: function() {
      //   if (this.splitchoice == 1 && this.zsplit_word.length > 0) { zsplit = this.zsplit_word}
      //   else if (this.splitchoice == 2 && this.zsplit_line.length > 0) {zsplit = this.zsplit_line}
      //   else { zsplit =[] }
      // },
    },

    methods: {
      zswitch: function () {this.playRequested = ! this.playRequested},

      zeventplay() {
        // This is to set the playbackRate and volume
        this.$refs.zapl.audio.playbackRate = this.zplaybackrate;
        this.$refs.zapl.audio.volume = 1;
        this.$refs.zapl.audio.currentTime = this.zsplit[~~(this.playcounter/this.zloop)] || 0;
        // above || 0 is to handle no split requirement
        // alert("hello from zplbrate")

      },
      timecounter() {
        if (this.$refs.zapl.audio.currentTime >= this.zsplit[~~(this.playcounter/this.zloop) + 1]) {
          this.$refs.zapl.audio.pause()
        }

        // this.zplaytime = this.$refs.zapl.audio.currentTime
        // alert("currentTime" + this.$refs.zapl.audio.currentTime)
      },

    },


    created() {
      // for audio the check is at sub_id level
      // if "sub_id itemid" is not in stores avlblMmxsId then proceed as before
      // else do not get it again
      // (((test || {}).level1 || {}).level2 || {}).level3;
      if ((((this.avlblMmxsId[this.itemid] || 'N')[this.mmx_type_id] || 'N')[this.sub_id] || 'N') == 'N') {
        this.$store.dispatch('mmx_details_act', [this.itemid, this.mmx_type_id, this.sub_id])
      }

      // set playbackRate
      // this.$refs.zapl.audio.playbackRate = 2.0

    },

    computed: {
      ...mapState(['ismmxLoading', 'avlblMmxsId', 'mmx_cms', 'splitchoice', 'zloop', 'zloop_gap_sec', 'zplaybackrate']),
      mmxs: function () {
        // return is a text of audio at sub_id level
        return ((((this.$store.state.mmx_cms || "")[this.itemid] || "")[this.mmx_type_id] || "")[this.sub_id] || "")
      },



    },

  }
</script>
