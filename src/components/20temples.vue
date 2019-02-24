<template>
  <div>
    <div v-if="sourceFile.length == 0">
      <v-alert type="warning" :value="true">
            Data not selected yet. Please select atleast one item using the filter panel on the left.
      </v-alert>
    </div>
    <div v-if="calcLength > 1" class="text-xs-center">
      <v-pagination :length=calcLength v-model="page" :total-visible="7"></v-pagination>
    </div>
    <v-expansion-panel>
        <v-expansion-panel-content v-for="item in sourceFilePage" v-if="! isLoading">
          <div slot="header">{{item.d_id}} - {{$t('desc.' + item.id)}} </div>
          <template v-if="! isLoading && $te('server'+'['+cat_id+']'+'['+item.d_id+']'+'[1]')">
            <ztext2 :textObject="$t('server'+'['+cat_id+']'+'['+item.d_id+']'+'[1]')"></ztext2>
            <zmmx :cat_id = cat_id :d_id = item.d_id></zmmx>
          </template>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import zmmx from './40mmx'
import ztext2 from './35text'

  export default {
    props: ['sourceFile', 'cat_id'],

    data () {
      return {
        page: 1,
        itemspp: 5,
      }
    },
    watch: {
      sourceFile : {
        immediate: true,
        handler: function () {
          let remxObjId = []
          if (this.cat_id == 15) {
            remxObjId = this.sourceFilePage.filter(a => this.avlblDetailsId[this.cat_id].indexOf(a) < 0);
          } else {
            remxObjId = this.sourceFilePage.filter(a => this.avlblDetailsId[this.cat_id].indexOf(a.d_id) < 0)
                            .map(a => a.d_id);
          }
          if (remxObjId.length > 0) {
              this.$store.dispatch('text_details_act', [remxObjId, this.cat_id])
          };
        }
      },
    },
    components: {
      zmmx,
      ztext2
    },
    computed: {
      ...mapState(
        ['isLoading', 'avlblDetailsId']
      ),

      calcLength: function () {
        return Math.ceil(this.sourceFile.length / this.itemspp)
      },
      // Based on the page selection, filter the source file
      sourceFilePage: function() {
        return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      }
    },
  }
</script>
