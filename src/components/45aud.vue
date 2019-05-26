<template>
  <div>
            <!-- get the object keys in order of priority -->
            <!-- {{ Object.keys(textObject).sort(function(a,b){return textObject[a]["sort_no"] - textObject[b]["sort_no"]})}} -->
            <!-- {{cms_shell}} {{Object.keys(cms_shell)}} {{cms_shell[1]["lang"]}} -->

            <v-card v-for="i in Object.keys(cms_shell).sort(function(a,b){return cms_shell[a]['lang'] - cms_shell[b]['lang']})">
              <v-card-title>
                Audio Language : {{cms_shell[i]["lang"]}} By - {{cms_shell[i]["author"]}}
              </v-card-title>
              <zaudtext :cat_id = cat_id :itemid = itemid :mmx_type_id = mmx_type_id :sub_id = i ></zaudtext>
            </v-card>

            <!-- <v-card v-for="i in Object.keys(textObject).sort(function(a,b){return textObject[a]['sort_no'] - textObject[b]['sort_no']})">
              <v-card-title>
                {{textObject[i]["header"]}}
              </v-card-title>
              <v-card-text>
                <p v-for="j in textObject[i]['item']">{{j}}</p>
              </v-card-text>
            </v-card> -->
  </div>
</template>
<script>
import zaudtext from './45audtext'

  export default {
    props: ['itemid','cat_id', 'cms_shell', 'mmx_type_id'],

    components: {
      zaudtext,
    },

    computed: {
      // textObject: function () {
      //   return this.$t('server'+'['+this.cat_id+']'+'['+this.itemid+']'+'[this.mmx_type_id]')
      // },
    },

  }
</script>
