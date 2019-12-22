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
    <v-toolbar color="grey accent-4" dark>
      <v-toolbar-items>

        <v-btn  :color="playRequested ? 'red' : 'cyan'" v-on:click="zswitch">
          <template v-if="! playRequested" >{{$t('desc.' + 'm01')}}<v-icon>play_circle_filled</v-icon></template>
          <template v-else>{{$t('desc.' + 'm02')}}<v-icon>stop</v-icon></template>
          <!-- <template v-else>{{$t('desc[' + /' + 'm02' + /' + ']')}}<v-icon>stop</v-icon></template> -->
        </v-btn>
        <v-spacer></v-spacer>
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

          <!-- select the langauge choice for lrc  -->
        <v-select v-model="ln_song_lyrics" :items=ln_sanscript>
          <template slot="selection" slot-scope='{ item }'>
            {{item.text}}
          </template>
          <template slot='item' slot-scope='{ item }'>
            {{item.text}}
          </template>
          <template slot="label">{{$t('desc.' + 't87')}}</template>
        </v-select>
      </v-toolbar-items>
    </v-toolbar>
    <zaudplr v-if="playRequested" :itemid = itemid :mmx_type_id = 3 :sub_id = sub_id :zsplit = zsplit :maxcounter = maxcounter :zlrc = zlrc v-on:playedout="zswitch" @playcounterevent="playcounter= $event"></zaudplr>
  </div>
</template>
<script>
import zaudplr from './45audplr'
import { mapState } from 'vuex'
import Sanscript from '@sanskrit-coders/sanscript';

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
      ...mapState(['mmx_shell', 'song_details', 'ln_song_lyrics', 'ln_sanscript']),

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
      },

      ln_song_lyrics: {
        get () {return (this.$store.state.ln_song_lyrics)},
        set (value) {this.$store.commit('upd_ln_song_lyrics', value)}
      },


      zlrc: function () {
        // expected outcome is '[00:01]ॐ [00:03]विश्वं [00:04]विष्णु: [00:04]वषट्कारो [00:06]भूत-भव्य-भवत-प्रभुः [00:08]भूत-कृत [00:09]भूत-भृत[00:09] भावो भूतात्मा [00:10]भूतभावनः'

        var t3_song = ""
        // get the song from song_details
        var t1_song_details_900 = (((this.$store.state.song_details || {})[this.itemid] || {})[900] || {})
        if (Object.keys(t1_song_details_900).length > 0) {
          var t1_song_lang = Object.keys(t1_song_details_900)[0]
          // get the song
          var t2_song_details_item_array =  t1_song_details_900[t1_song_lang][0].item || []
          // combine into one string
          var t2_song_string = t2_song_details_item_array.join(' ')
          if (t2_song_string.length > 0) {
            // get the seconds details from mmx_shell already computed as zsplit_word
            // transform zplit_word array to {"%0%": "[0.01]", "%1%": "[4.01]" }
            // return {"%0%": "[0.01]", "%1%": "[4.01]" }
            var t2_zsplit_word_object = {}
            if (this.zsplit_word.length > 0) {
              // var y = [0.01, 5.01]
              var y = this.zsplit_word
              t2_zsplit_word_object =
              y.reduce(function(result, item, index) {
                var key = "%"+index+"%"
                var val = new Date(item * 1000).toISOString().substr(14, 5)
                result[key] = "["+val+"]";
                return result;
                // this gives an output like {"%0%": "[0.01]", "%1%": "[4.01]" } which is what we want in lrc
              }, {})
            }
            // merge song and zsplit_word
            var j = t2_song_string
            var z = t2_zsplit_word_object
            // some song text have lrc placeholder %n% format. They need to be removed before display -->
            var k = j.replace(/\%.*?\%/g, function(all) { return z[all] || all})
            // remove unsused "%n%"
            // some song text have lrc placeholder %n% format. They need to be removed before display -->
            k = k.replace(/\%.*?\%/g, '')
            // now transliterate to the required language
            // alert(this.ln_song_lyrics[0] != t1_song_lang)
            if (this.ln_song_lyrics[0] != t1_song_lang) {
                var sanscript_from = this.ln_sanscript.filter(item => item.value == t1_song_lang)[0].script
                var sanscript_to = this.ln_sanscript.filter(item => item.value == this.ln_song_lyrics)[0].script
                k = Sanscript.t(k, sanscript_from, sanscript_to)
            }
            t3_song = k
          }
        }
        return t3_song
      },
    },
  }
</script>
