<template>
  <div>
    <template v-if="! ismmxLoading">
      <v-container grid-list-sm fluid fill-height>
      <v-layout wrap>
        <v-card>
            <template v-if="playcounter < maxcounter && playRequested">
              <aplayer
                :key=playcounter
                autoplay showLrc mutex
                v-on:play="zeventplay"
                v-on:pause="playcounter += 1"
                v-on:timeupdate="timecounter"
                ref="zapl"
                :music="{src: 'data:audio/mp3;base64, ' + mmxs,
                         lrc: zlrc,
                title: ' ',
                artist: ' ', 
                }"/>
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
    props: ['itemid', 'mmx_type_id', 'sub_id', 'zsplit', 'maxcounter', 'zlrc'],
    components: {
        Aplayer
      },

    data () {
      return {
        // splitchoice 1 = by word, 2 = by line 3 = none. This is to be built into a component
        // splitchoice: 3,
        playcounter: 0,
        // ztitle: 'VishnuSahasranamam',
        // zartist: 'MSS',
        playRequested: true,
        zplaytime: 0
       }
    } ,

// emit an intimation that the it has played out its full quota.
    watch: {
      playcounter : function() {
      this.playRequested = false
      setTimeout(() => this.playRequested = true, this.zloop_gap_sec*1000)
      this.$emit('playcounterevent', this.playcounter)
      if (this.playcounter >= this.maxcounter) { this.$emit('playedout'); this.$emit('playcounterevent', 0) }
      },
    },

    methods: {
      zswitch: function () {this.playRequested = ! this.playRequested},

      zeventplay() {
        // This is to set the playbackRate and volume
        this.$refs.zapl.audio.playbackRate = this.zplaybackrate;
        this.$refs.zapl.audio.volume = 1;
        this.$refs.zapl.audio.currentTime = this.zsplit[~~(this.playcounter/this.zloop)] || 0;
        // above || 0 is to handle no split requirement

      },
      timecounter() {
        if (this.$refs.zapl.audio.currentTime >= this.zsplit[~~(this.playcounter/this.zloop) + 1]) {
          this.$refs.zapl.audio.pause()
        }

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

    },

    computed: {
      ...mapState(['ismmxLoading', 'avlblMmxsId', 'mmx_cms', 'splitchoice', 'zloop', 'zloop_gap_sec', 'zplaybackrate']),
      mmxs: function () {
        // return is a file of audio at sub_id level
        return ((((this.$store.state.mmx_cms || "")[this.itemid] || "")[this.mmx_type_id] || "")[this.sub_id] || "")
      },
    },

  }
</script>
