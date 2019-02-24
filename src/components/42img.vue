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
                  <ztext3
                    :textObject="
                      $t('server'+'['+cat_id+']'+'['+itemid+']'+'[2]'+'['+elem.sub_id+']')
                      "
                    ></ztext3>

                </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>
<script>

import axios from 'axios'
import ztext3 from './42imgtext'
// import i18n from '../i18n'

  export default {
    props: ['itemid', 'cat_id'],
    data () {
      return {
        images: [],
       }
    } ,
    created() {
      //do something after creating vue instance
      axios
                .get(
                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_cms_v?select=mmx,sub_id&cat_id=eq.' + this.cat_id + '&id=eq.' + this.itemid + '&mmx_type_id=eq.' +2)
//                  'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/img_detail_v?select=img,sub_id&cat_id=eq.' + this.cat_id + '&id=eq.' + this.itemid)
                // ,{headers: {'Content-Type': 'application/vnd.pgrst.object+json', 'Content-Type': 'application/octet-stream'}}
                // version for base64 single/ multiple images
                .then(response => {
                  for (var i = 0; i < response.data.length; i++) {
                    // this.images.push(Buffer.from(response.data[i].img.replace(/\\x/g,''), 'hex').toString('base64'))
                    this.images.push({sub_id: response.data[i].sub_id, img: Buffer.from(response.data[i].mmx.replace(/\\x/g,''), 'hex').toString('base64')})
                  }
                })

    },
    components: {
      ztext3
    },

  }
</script>
