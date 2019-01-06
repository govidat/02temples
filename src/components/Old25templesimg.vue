<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container grid-list-sm fluid>
            <v-layout justify-space-between row wrap>
              <v-flex
                v-for="n in 1"
                :key="n"
                xs4
                d-flex
              >
                <v-card flat tile class="d-flex">
                  <!-- <img
                    :src= "'data:image/png;base64, ' +
                    xbase64
                    "
                  ></img> -->
                  <img
                    :src= "image2"
                  ></img>

                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  <!-- </v-img> -->
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>

import axios from 'axios'

// import { mapState } from 'vuex'
// import { mapActions } from 'vuex'

  export default {
    props: ['imagepath', 'imageid'],
    // not able to use imagepath value in the method and hence created mutiple components

    data () {
       return {
         image2: ''
       }
     },
    // watch: {
    // },
    created() {
      //do something after creating vue instance
      // var binaryData = []
      this.image2 = ''

      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/imgtemple2?select=img&id=eq.2&sub_id=eq.1',
                    {
                      // responseType: 'arraybuffer',
                      // responseType: 'blob',
                      // responseType: 'stream',
                      headers: {'Content-Type': 'application/vnd.pgrst.object+json',
                                'Content-Type': 'application/octet-stream'
                                }
                    }
                  )
                // .then(response => console.log(response.data[0].img))
                .then(response => {this.image2 = 'data:image/jpg;base64,'.concat(Buffer.from(response.data[0].img.replace(/\\x/g,''), 'hex').toString('base64'))})
                // .then(response => {this.image2 = window.URL.createObjectURL(new Blob(binaryData.push(response.data[0].img)))})
    },

    methods: {
      image(id, pic) {
        // return require('../assets/img/lores/temples/' + '2/'+ id + '.jpg')
        return require('../assets/img/lores/temples/' + id + '/'+ pic + '.jpg')
      },


      // getBase64() {
      //   return axios
      //     .get(
      //       'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/imgtemple2?select=img&id=eq.2&sub_id=eq.1',
      //         {
      //           // responseType: 'arraybuffer',
      //           // responseType: 'blob',
      //           // responseType: 'stream',
      //           headers: {'Content-Type': 'application/vnd.pgrst.object+json',
      //                     'Content-Type': 'application/octet-stream'
      //                     }
      //         }
      //       )
      //     // .then(response => console.log(response.data[0].img))
      //     .then(response => (Buffer.from(response.data[0].img.replace(/\\x/g,''), 'hex').toString('base64')))
      //     // .then(response => console.log(URL.createObjectURL((response.data[0].img))))
      //
      // }
    },

    computed: {
      // ...mapState(
      //   ['templesDetailsId', 'isLoading']
      // ),
      //
      // calcLength: function () {
      //   return Math.ceil(this.sourceFile.length / this.itemspp)
      // },
      // // Based on the page selection, filter the source file
      // sourceFilePage: function() {
      //   return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      // }
      // image: function () {
      //   return require('"imagepath"')
      // }
    },
  }
</script>
