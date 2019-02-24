<template>
  <div>
    <v-expansion-panel>
        <v-expansion-panel-content v-if="! ismmxLoading">
          <div slot="header">Audios</div>
          <!-- <template v-if="! isLoading && $te('9.2.expln' )"> -->
          <template>
            <v-container grid-list-sm fluid fill-height>
            <v-layout wrap>
              <v-flex xs4 v-for="elem in audios" :key="elem.key">
                        <v-card>

                          <figcaption>Listen to the T-Rex:</figcaption>
                          <!-- <audio
                              controls
                              :src= "'data:audio/mp3;base64, ' + elem.mmx"
                          >
                          </audio> -->

                          <aplayer
                            autoplay: false 
                            :music="{
                              src: 'data:audio/mp3;base64, ' + elem.mmx
                            }"
                          />

                          <!-- <v-img
                              :src= "'data:audio/mpeg;base64, ' + elem.mmx"
                              height="125"
                              contain
                            >
                          </v-img> -->
                            <!-- <v-card-title class="title">{{$t('cat'+cat_id+'['+mmxid+']'+'['+elem.sub_id+']')}} </v-card-title> -->
                        </v-card>
              </v-flex>
            </v-layout>
          </v-container>

          </template>
        </v-expansion-panel-content>
    </v-expansion-panel>


  </div>
</template>
<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import Aplayer from 'vue-aplayer'
import axios from 'axios'


  export default {
    props: ['mmxid', 'cat_id'],
    // not able to use imagepath value in the method and hence created mutiple components
    // i18n: {
    //   messages:
    //   {
    //     en : {desc: {2 : "en_image text 2_2", 1 : "en_image text 1", 3 : "en_image text 2_3"}},
    //     ta : {desc: {2 : "ta_image text 2_2", 1 : "ta_image text 2_1", 3 : "ta_image text 2_3"}},
    //     te : {desc: {1 : "te_image text 2_1", 3 : "te_image text 2_3", 2 : "te_image text 2_2"}}
    //   }
    // },

    components: {
        Aplayer
      },


    data () {
      return {
        audios: [],
         // messages: { "en" : [{"2" : "en_image text 2_2"}, {"1" : "en_image text 1"}, {"3" : "en_image text 2_3"}], "ta" : [{"2" : "ta_image text 2_2"}, {"1" : "ta_image text 2_1"}, {"3" : "ta_image text 2_3"}], "te" : [{"1" : "te_image text 2_1"}, {"3" : "te_image text 2_3"}, {"2" : "te_image text 2_2"}] }
       }
    } ,
    created() {
      //do something after creating vue instance
      // alert("messages" + this.i18n.messages.ta)
      this.$store.dispatch('ismmxLoadingAct', true)
      alert("messages turning ismmxLoading true")
      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_detail_v?select=mmx,sub_id&cat_id=eq.' + this.cat_id + '&id=eq.' + this.mmxid)
                // ,{headers: {'Content-Type': 'application/vnd.pgrst.object+json', 'Content-Type': 'application/octet-stream'}}
                // version for base64 single/ multiple audios
                .then(response => {
                  for (var i = 0; i < response.data.length; i++) {
                    // this.audios.push(Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64'))
                    this.audios.push({sub_id: response.data[i].sub_id, mmx: Buffer.from(response.data[i].mmx.replace(/\\x/g,''), 'hex').toString('base64')})
                  }
                  this.$store.dispatch('ismmxLoadingAct', false)
                })
                alert("messages turning ismmxLoading false")

    },

    computed: {
      ...mapState(
        ['ismmxLoading']
      )
    },

    // methods: {
    //   // for getting any static image from the app
    //   image(id, pic) {
    //     return require('../assets/img/lores/temples/' + id + '/'+ pic + '.jpg')
    //   },
    // },

  }
</script>
