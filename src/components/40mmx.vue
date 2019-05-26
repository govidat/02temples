<template>
  <div v-if="sub_id.length > 0">
    <!-- {{mmx_cms_shell}} -->
    <v-tabs centered color="cyan" dark icons-and-text>
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tab v-for="item in zmmxbar2" @click.stop="zmmx = item.menu">
              {{$t('desc.' + item.id)}}
              <v-icon>{{item.icon1}}</v-icon>
              <!-- {{$t('server'+'['+cat_id+']'+'['+d_id+']'+'[5]'+'[0]', 'en')}} -->
      </v-tab>
    </v-tabs>
    <v-card>
      <!-- Select the component based on zmmx value pass on the id's of sel-->
      <!--  mmx_type_id 2 Image; 3 Audio... It is passed from here to the components zimg and zaud-->
      <div v-if="zmmx=='Map'"><zmap :mapcoords=map_coords[cat_id][d_id] :mmx_type_id=5 :itemid=d_id :cat_id=cat_id></zmap></div>
      <div v-else-if="zmmx=='Photos'"><zimg :itemid=d_id :cat_id=cat_id :mmx_type_id=2></zimg></div>
      <div v-else-if="zmmx=='Audios'"><zaud :itemid=d_id :cat_id=cat_id :mmx_type_id=3 :cms_shell = mmx_shell[cat_id][d_id][3]></zaud></div>
      <!-- <div v-else-if="zmmx=='Videos'"><zvideo  :sourceFile="selSongs()" :cat_id=15></zvideo></div> -->
    </v-card>
  </div>
</template>
<script>

import { mapState } from 'vuex'
// import { mapActions } from 'vuex'
import axios from 'axios'
import zimg from './42img'
import zmap from './41map'
import zaud from './45aud'

  export default {
    props: ['cat_id', 'd_id'],

    data () {
      return {
        zmmx: '',
        zmmxbar1: [
            {id: 't92', icon1: 'photo', menu: 'Photos'},
            {id: 't93', icon1: 'mp3', menu: 'Audios'},
            {id: 't94', icon1: 'movie', menu: 'Videos'},
            {id: 't95', icon1: 'map', menu: 'Map'}
          ],
        sub_id: []
//        mmx_cms_shell: {}
      }
    },
    created() {
      // based on the map_coords values in store, decide the sub_id that are relevant
      if (Object.keys((this.map_coords[this.cat_id] || {})[this.d_id] || {}).length > 0) {
        if (this.sub_id.indexOf('t95') == -1) {
          this.sub_id.push('t95')
        }
      } else {
        this.sub_id = this.sub_id.filter(item => item != 't95')
      }
      // based on the mmx_shell values in store, decide the sub_id that are relevant
      // [2] = image ; t92
//      if (Object.keys(this.mmx_shell[this.cat_id][this.d_id][2] || {}).length > 0) {
      if (Object.keys(((this.mmx_shell[this.cat_id] || {})[this.d_id] || {})[2] || {}).length > 0) {
        if (this.sub_id.indexOf('t92') == -1) {
          this.sub_id.push('t92')
        }
      } else {
        this.sub_id = this.sub_id.filter(item => item != 't92')
      }

      // [3] = audios ; t93
//      if (Object.keys(this.mmx_shell[this.cat_id][this.d_id][3] || {}).length > 0) {
      if (Object.keys(((this.mmx_shell[this.cat_id] || {})[this.d_id] || {})[3] || {}).length > 0) {
        if (this.sub_id.indexOf('t93') == -1) {
          this.sub_id.push('t93')
        }
      } else {
        this.sub_id = this.sub_id.filter(item => item != 't93')
      }

      // [4] = videos ; t94
//      if (Object.keys(this.mmx_shell[this.cat_id][this.d_id][4] || {}).length > 0) {
      if (Object.keys(((this.mmx_shell[this.cat_id] || {})[this.d_id] || {})[4] || {}).length > 0) {
        if (this.sub_id.indexOf('t94') == -1) {
          this.sub_id.push('t94')
        }
      } else {
        this.sub_id = this.sub_id.filter(item => item != 't94')
      }

    },

    watch: {
    },
    components: {
      zimg,
      zmap,
      zaud
    },

    computed: {
      ...mapState(
        ['map_coords', 'mmx_shell']
      ),
      zmmxbar2: function () {
        return this.zmmxbar1.filter(x => this.sub_id.indexOf(x.id) !== -1)
      },

    },
  }
</script>
