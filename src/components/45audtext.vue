<template>
  <div>
    <!-- {{cat_id}} / {{itemid}} / {{mmx_type_id}} / {{sub_id}} -->
    <!-- {{textObject}} -->
    <v-card-title>
      {{textObject["header"]}}
    </v-card-title>
    <v-card-text>
      <p v-for="j in textObject['item']">{{j}}</p>
    </v-card-text>
    <v-btn flat icon color="indigo" v-on:click="zswitch">
              <v-icon v-if="! playRequested">play_circle_filled</v-icon>
              <v-icon v-else>pause_circle_filled</v-icon>
    </v-btn>
    <zaudplr v-if="playRequested" :cat_id = cat_id :itemid = itemid :mmx_type_id = 3 :sub_id = sub_id></zaudplr>
  </div>
</template>
<script>
import zaudplr from './45audplr'

  export default {
    props: ['cat_id', 'itemid', 'mmx_type_id', 'sub_id'],
    data () {
      return {
        playRequested: false,
      }
    },
    methods: {
      zswitch: function () {
        this.playRequested = ! this.playRequested
      },
    },

    components: {
      zaudplr,
    },

    computed: {
      textObject: function () {
        return this.$t('server'+'['+this.cat_id+']'+'['+this.itemid+']'+'['+this.mmx_type_id+']'+'['+this.sub_id+']' )
      },
    },



  }
</script>
