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
      <div v-if="zmmx=='Map'"><zmap :mapcoords=mapcoords></zmap></div>
      <div v-else-if="zmmx=='Photos'"><zimg :itemid=d_id :cat_id=cat_id></zimg></div>
      <div v-else-if="zmmx=='Audios'"><zaud :itemid=d_id :cat_id=cat_id :cms_shell = mmx_cms_shell[3]></zaud></div>
      <!-- <div v-else-if="zmmx=='Videos'"><zvideo  :sourceFile="selSongs()" :cat_id=15></zvedio></div> -->
    </v-card>
  </div>
</template>
<script>

// import { mapState } from 'vuex'
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
        sub_id: [],
        mmx_cms_shell: {}
      }
    },
    created() {
      //get the shell content from mmx_cms . later the binary files will be called
      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_shell_v2?select=val&cat_id=eq.' + this.cat_id + '&id=eq.' + this.d_id)
                .then(response => {
                  for (var i = 0; i < response.data.length; i++) {
                    Object.assign(this.mmx_cms_shell,response.data[i].val)
                  }

                  if (Object.keys(this.mmx_cms_shell[2]).length > 0) {
                    if (this.sub_id.indexOf('t92') == -1) {
                      this.sub_id.push('t92')
                    }
                  } else {
                    this.sub_id = this.sub_id.filter(item => item != 't92')
                  }

                  if (Object.keys(this.mmx_cms_shell[3]).length > 0) {
                    if (this.sub_id.indexOf('t93') == -1) {
                      this.sub_id.push('t93')
                    }
                  } else {
                    this.sub_id = this.sub_id.filter(item => item != 't93')
                  }
                })

          if (Object.keys(this.mapcoords).length > 0) {
            if (this.sub_id.indexOf('t95') == -1) {
              this.sub_id.push('t95')
            }
          } else {
            this.sub_id = this.sub_id.filter(item => item != 't95')
            // alert("length is 0" + JSON.stringify(this.sub_id))
          }
    },

    watch: {
//      mapcoords : {
//        immediate: true,
//        handler: function () {
//            alert("from watch" + JSON.stringify(this.mapcoords))
//          if (Object.keys(this.mapcoords).length > 0) {
//            if (this.sub_id.indexOf('t95') == -1) {
//              this.sub_id.push('t95')
//            }
//          } else {
//            this.sub_id = this.sub_id.filter(item => item != 't95')
//            // alert("length is 0" + JSON.stringify(this.sub_id))
//          }

//          }
//        },

//        mmx_cms_shell : {
//          immediate: true,
//          handler: function () {
//            alert("from watch" + JSON.stringify(this.mmx_cms_shell))
//            if (Object.keys(this.mmx_cms_shell[2]).length > 0) {
//              if (this.sub_id.indexOf('t92') == -1) {
//                this.sub_id.push('t92')
//              }
//            } else {
//              this.sub_id = this.sub_id.filter(item => item != 't92')
//            }
//            if (Object.keys(this.mmx_cms_shell[3]).length > 0) {
//              if (this.sub_id.indexOf('t93') == -1) {
//                this.sub_id.push('t93')
//              }
//            } else {
//              this.sub_id = this.sub_id.filter(item => item != 't93')
//            }
//            },
//            deep: true
//          },

//        imglen : {
//          immediate: true,
//          handler: function () {
//            if (this.imglen > 0) {
//              if (this.sub_id.indexOf('t94') == -1) {
//                this.sub_id.push('t94')
//              }
//            } else {
//              this.sub_id = this.sub_id.filter(item => item != 't94')
//              }
//            }
//          },

//          audlen : {
//            immediate: true,
//            handler: function () {
//              if (this.audlen > 0) {
//                if (this.sub_id.indexOf('t95') == -1) {
//                  this.sub_id.push('t95')
//                }
//              } else {
//                this.sub_id = this.sub_id.filter(item => item != 't95')
//                }
//              }
//            },


    },
    components: {
      zimg,
      zmap,
      zaud
    },

    computed: {
      zmmxbar2: function () {
        return this.zmmxbar1.filter(x => this.sub_id.indexOf(x.id) !== -1)
      },

//      sub_id: function () {
//        let z1 = []
//        if (Object.keys(this.mmx_cms_shell[2]).length > 0) {
//            if (this.sub_id.indexOf('t92') == -1) {
//                this.sub_id.push('t92')
//              }
//            } else {
//                this.sub_id = this.sub_id.filter(item => item != 't92')
//            }
//      },

      // map category is 5
      mapcoords: function () {
        let z1 = {}
        if (this.$te('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[5]'+'[0]', 'en')) {
          let latlon = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[5]'+'[0]', 'en')
          // location details in en as well as selected language
          let location_en = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[5]'+'[1]', 'en')
          let location_ln = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[5]'+'[1]')

          if (Object.keys(latlon).length > 0) {
            // this.sub_id.push('t93')
            z1.lat = Number(latlon.item[0])
            z1.lon = Number(latlon.item[1])
          }
          if (Object.keys(location_ln || location_en).length > 0) {
            z1.locname = location_ln.header || location_en.header
            z1.locdesc = location_ln.item[0] || location_en.item[0]
          }
        }
        return z1
      },

      // get if photos related text are available for this cat_id and d_id combination from the text.
      // if available then pass this onwards and show Photos icon in the mmx bar
      // img category = 2
//      imglen: function () {
//        let z1 = 0

//        if (
//          this.$te('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[2]', 'en') ||
//          this.$te('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[2]')
//          ) {
//          let imgdesc_en = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[2]', 'en')
//          let imgdesc_ln = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[2]')
//          z1 = Object.keys(imgdesc_ln || imgdesc_en).length
//        }
//        return z1
//      },

      // get if photos related text are available for this cat_id and d_id combination from the text.
      // if available then pass this onwards and show Photos icon in the mmx bar
      // aud category = 3
//      audlen: function () {
//        let z1 = 0
//        if (
//          this.$te('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[3]', 'en') ||
//          this.$te('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[3]')
//          ) {
//          let desc_en = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[3]', 'en')
//          let desc_ln = this.$t('server'+'['+this.cat_id+']'+'['+this.d_id+']'+'[3]')
//          z1 = Object.keys(desc_ln || desc_en).length
//        }
//        return z1
//      },


    },
  }
</script>
