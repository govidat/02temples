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

                  <!-- <v-img
                    :src= "'data:image/png;base64, ' + image2"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    :src= "'data:image/png;base64, ' + image2"

                  > -->
                  <img
                    :src= "image2" :height=60
                    ></img>


                    <!-- <img v-for="elem in images" :key="elem.key"
                      :src= "'data:image/png;base64, ' + elem"
                      ></img> -->

                    <!-- <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout> -->
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

  export default {
    props: ['imagepath', 'imageid'],
    // not able to use imagepath value in the method and hence created mutiple components

    data () {
       return {
         image2: '',
         images: [],
       }
     },
    // watch: {
    // },
    created() {
      //do something after creating vue instance
      var binaryData = []
      // this.numofimages = 0
      // this.image2 = ''
      // this.images = []
      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/imgtemple2?select=img&id=eq.5&sub_id=eq.1',
                    {
                                // responseType: 'arraybuffer',
                                // responseType: 'blob',
                                // responseType: 'stream',
                      headers: {'Content-Type': 'application/vnd.pgrst.object+json',
                                'Content-Type': 'application/octet-stream'}
                    }
                    )
                // .then(response => {this.numofimages = (response.data.length)})

                // .then(response => binaryData.push(response.data[0].img))
                .then(response => {
                  binaryData.push(response.data[0].img);
                  this.image2 = (URL.createObjectURL(new Blob(binaryData, {type: 'application/octet-stream'})));
                  console.log(this.image2)
                })
                // .then(response => {this.image2 = 'data:image/jpg;base64,'.concat(Buffer.from(response.data[0].img.replace(/\\x/g,''), 'hex').toString('base64'))})

                // ok version for base64 conversion for one image
                // .then(response => {this.image2 = (Buffer.from(response.data[0].img.replace(/\\x/g,''), 'hex').toString('base64'))})

                // version for base64 single/ multiple images
                // .then(response => {
                //   for (var i = 0; i < response.data.length; i++) {
                //     this.images.push(Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64'))
                //   }
                // })



                // .then(response => {this.image2 = window.URL.createObjectURL(new Blob(binaryData.push(response.data[0].img), {type: 'application/octet-stream'}))})
    },

    methods: {
      image(id, pic) {
        // return require('../assets/img/lores/temples/' + '2/'+ id + '.jpg')
        return require('../assets/img/lores/temples/' + id + '/'+ pic + '.jpg')
      },
    },

    computed: {
    },
  }
</script>
