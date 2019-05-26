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
                    <ztext3 :textObject="$t('server'+'['+cat_id+']'+'['+itemid+']'+'[' + mmx_type_id+ ']'+'['+i+']')"></ztext3>

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
// import i18n from '../i18n'

  export default {
    props: ['itemid', 'cat_id', 'mmx_type_id'],
    data () {
      return {
       }
    } ,
    created() {
      //do something after creating vue instance

      // if "itemid" is not in stores avlblMmxsId then proceed as before
      // else do not get it again
      // (((test || {}).level1 || {}).level2 || {}).level3;
      //190324 if (((this.avlblMmxsId[this.cat_id] || [])[this.itemid] || []).indexOf(this.mmx_type_id) < 0) {
      if ((((this.avlblMmxsId[this.cat_id] || 'N')[this.itemid] || 'N')[this.mmx_type_id] || 'N') == 'N') {
      // it is not reactive to directly check on mmxs - if (Object.keys(this.mmxs).length == 0 ) {
      // send 'All' if we want all sub_ids to be pulled at one go, else send on sub_id
        this.$store.dispatch('mmx_details_act', [this.cat_id, this.itemid, this.mmx_type_id, 'All' ])

      }

    },
    components: {
      ztext3
    },
    computed: {
      ...mapState(
        ['ismmxLoading', 'avlblMmxsId', 'mmx_cms']
      ),
      mmxs: function () {
        // this returns an object like {1: "mmxa", 2: "mmxb"...}
      // (((test || {}).level1 || {}).level2 || {}).level3;
        // var t1 = ((((this.$store.state.mmx_cms || {})[this.cat_id] || {})[this.itemid] || {})[this.mmx_type_id] || {})
        // return this.$store.state.mmx_cms[this.cat_id][this.itemid][this.mmx_type_id]
        return ((((this.$store.state.mmx_cms || {})[this.cat_id] || {})[this.itemid] || {})[this.mmx_type_id] || {})
      },

    }
  }
</script>
