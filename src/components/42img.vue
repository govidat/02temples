<template>
  <div>
    <div v-if="! ismmxLoading">
      <v-container grid-list-sm fluid fill-height>
      <v-layout wrap >
        <!-- <v-flex xs4 v-for="elem in mmxs[mmx_type_id]" :key="elem.key"> -->
        <!-- mmxs is an object with multiple entries like {1: [], 2:[]...} -->
        <v-flex xs4 v-for="i in Object.keys(mmxs)">
                  <v-card>
                    <v-img :src= "'data:image/png;base64, '
                    + mmxs[i]"
                    height="125"
                    contain>
                   </v-img>
                    <!-- <ztext3 :textObject="$t('server'+'['+cat_id+']'+'['+itemid+']'+'[' + mmx_type_id+ ']'+'['+i+']')"></ztext3> -->
                    <ztext3 :textObject="$t('server'+'['+itemid+']'+'[' + mmx_type_id+ ']'+'['+i+']')"></ztext3>

                  </v-card>
        </v-flex>
      </v-layout>
      </v-container>
    </div>
    <div v-else class="text-xs-center">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </div>

</template>
<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import axios from 'axios'
import ztext3 from './42imgtext'

  export default {
    props: ['itemid', 'mmx_type_id'],
    data () {return {}} ,
    created() {
      // if "itemid" is not in stores avlblMmxsId then proceed as before
      // else do not get it again
      // (((test || {}).level1 || {}).level2 || {}).level3;
      if (((this.avlblMmxsId[this.itemid] || 'N')[this.mmx_type_id] || 'N') == 'N') {
      // it is not reactive to directly check on mmxs - if (Object.keys(this.mmxs).length == 0 ) {
      // send 'All' if we want all sub_ids to be pulled at one go, else send on sub_id
        this.$store.dispatch('mmx_details_act', [this.itemid, this.mmx_type_id, 'All' ])
      }

    },
    components: {ztext3},
    computed: {
      ...mapState(['ismmxLoading', 'avlblMmxsId', 'mmx_cms']),
      mmxs: function () {
      // (((test || {}).level1 || {}).level2 || {}).level3;
        return (((this.$store.state.mmx_cms || {})[this.itemid] || {})[this.mmx_type_id] || {})
    }}
  }
</script>
