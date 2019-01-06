<template>
  <div>
    <v-container grid-list-sm fluid fill-height>
    <v-layout wrap>
      <v-flex xs4 v-for="elem in images" :key="elem.key">
                <v-card>
                  <v-img
                      :src= "'data:image/png;base64, ' + elem.img"
                      height="125"
                      contain
                    >
                  </v-img>
                    <!-- <v-card-title class="title">still to test {{elem.sub_id}}</v-card-title> -->
                    <!-- <v-card-title class="title">{{$t('desc.' + elem.sub_id)}} </v-card-title> -->
                    <v-card-title class="title">{{$t('cat'+cat_id+'['+imageid+']'+'['+elem.sub_id+']')}} </v-card-title>
                </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>
<script>

import axios from 'axios'


  export default {
    props: ['imageid', 'cat_id'],
    // not able to use imagepath value in the method and hence created mutiple components
    // i18n: {
    //   messages:
    //   {
    //     en : {desc: {2 : "en_image text 2_2", 1 : "en_image text 1", 3 : "en_image text 2_3"}},
    //     ta : {desc: {2 : "ta_image text 2_2", 1 : "ta_image text 2_1", 3 : "ta_image text 2_3"}},
    //     te : {desc: {1 : "te_image text 2_1", 3 : "te_image text 2_3", 2 : "te_image text 2_2"}}
    //   }
    // },

    data () {
      return {
        images: [],
         // messages: { "en" : [{"2" : "en_image text 2_2"}, {"1" : "en_image text 1"}, {"3" : "en_image text 2_3"}], "ta" : [{"2" : "ta_image text 2_2"}, {"1" : "ta_image text 2_1"}, {"3" : "ta_image text 2_3"}], "te" : [{"1" : "te_image text 2_1"}, {"3" : "te_image text 2_3"}, {"2" : "te_image text 2_2"}] }
       }
    } ,
    created() {
      //do something after creating vue instance
      // alert("messages" + this.i18n.messages.ta)
      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/img_detail_v?select=img,sub_id&cat_id=eq.' + this.cat_id + '&id=eq.' + this.imageid)
                // ,{headers: {'Content-Type': 'application/vnd.pgrst.object+json', 'Content-Type': 'application/octet-stream'}}
                // version for base64 single/ multiple images
                .then(response => {
                  for (var i = 0; i < response.data.length; i++) {
                    // this.images.push(Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64'))
                    this.images.push({sub_id: response.data[i].sub_id, img: Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64')})
                  }
                })

    },

    // methods: {
    //   // for getting any static image from the app
    //   image(id, pic) {
    //     return require('../assets/img/lores/temples/' + id + '/'+ pic + '.jpg')
    //   },
    // },

  }
</script>
