<template>
  <div>
    <!-- {{ "HELLO FROM 45AUDPLR"}}
    {{cat_id}} / {{itemid}} / {{mmx_type_id}} / {{sub_id}} -->
    <!-- <v-expansion-panel>
        <v-expansion-panel-content v-if="! ismmxLoading"> -->
        <!-- <v-expansion-panel-content> -->
          <!-- <div slot="header">Audios</div> -->
          <template v-if="! ismmxLoading">
            <v-container grid-list-sm fluid fill-height>
            <v-layout wrap>
              <v-flex xs4 v-for="elem in audios" :key="elem.key">
                        <v-card>

                          <figcaption>Listen to the T-Rex:</figcaption>
                          <aplayer
                            autoplay: false
                            :music="{
                              src: 'data:audio/mp3;base64, ' + elem.mmx
                            }"
                          />
                        </v-card>
              </v-flex>
            </v-layout>
          </v-container>

          </template>
        <!-- </v-expansion-panel-content>
    </v-expansion-panel> -->


  </div>
</template>
<script>

// import { mapState } from 'vuex'
// import { mapActions } from 'vuex'
import Aplayer from 'vue-aplayer'
import axios from 'axios'


  export default {
    // props: ['mmxid', 'cat_id'],
    props: ['cat_id', 'itemid', 'mmx_type_id', 'sub_id'],
    components: {
        Aplayer
      },


    data () {
      return {
        audios: [],
        ismmxLoading: false
       }
    } ,
    created() {
      //do something after creating vue instance
      // this.$store.dispatch('ismmxLoadingAct', true)
      // alert("messages turning ismmxLoading true")
      this.ismmxLoading = true
      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + this.cat_id + '&id=eq.' + this.itemid + '&mmx_type_id=eq.' + this.mmx_type_id + '&sub_id=eq.' + this.sub_id)
                // ,{headers: {'Content-Type': 'application/vnd.pgrst.object+json', 'Content-Type': 'application/octet-stream'}}
                // version for base64 single/ multiple audios
                .then(response => {
                  for (var i = 0; i < response.data.length; i++) {
                    // this.audios.push(Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64'))
                    this.audios.push({sub_id: response.data[i].sub_id, mmx: Buffer.from(response.data[i].mmx.replace(/\\x/g,''), 'hex').toString('base64')})
                  }
                  this.ismmxLoading = false
                  // this.$store.dispatch('ismmxLoadingAct', false)
                })
                // alert("messages turning ismmxLoading false")

    },

    computed: {
      // ...mapState(
      //   ['ismmxLoading']
      // )
    },

    // methods: {
    //   // for getting any static image from the app
    //   image(id, pic) {
    //     return require('../assets/img/lores/temples/' + id + '/'+ pic + '.jpg')
    //   },
    // },

  }
</script>
