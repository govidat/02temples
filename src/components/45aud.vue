<template>
  <div>
    <!-- for provding additional options on Audio -->
        <!-- <v-tabs centered color="grey" dark icons-and-text>
          <v-tab>
            <v-btn @click="snackbar_aud = true">
                    <v-icon>language</v-icon>Options
            </v-btn>
          </v-tab>
        </v-tabs> -->

            <!-- get the object keys in order of priority -->
            <!-- {{ Object.keys(textObject).sort(function(a,b){return textObject[a]["sort_no"] - textObject[b]["sort_no"]})}} -->
            <!-- {{cms_shell}} {{Object.keys(cms_shell)}} {{cms_shell[1]["lang"]}} -->

      <v-card v-for="i in Object.keys(cms_shell).sort(function(a,b){return cms_shell[a]['lang'] - cms_shell[b]['lang']})">
        <v-card-title>
          Audio Language : {{cms_shell[i]["lang"]}} By - {{cms_shell[i]["author"]}}
        </v-card-title>
        <zaudtext :itemid = itemid :mmx_type_id = mmx_type_id :sub_id = i ></zaudtext>
      </v-card>


  </div>
</template>
<script>
import zaudtext from './45audtext'

  export default {
    props: ['itemid', 'cms_shell', 'mmx_type_id'],
//    data () {return {snackbar_aud: false}},
    components: {zaudtext},
    computed: {},
  }
</script>
