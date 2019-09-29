<!--  though 20saints and 20temples have the same construct, wil have to keep it as two separate.
 they call a component zmmx and this is not reactive to the change in the parent-->

<template>
  <div>
    <div v-if="sourceFile.length == 0">
      <v-alert type="warning" :value="true">
          {{$t('desc.' + 'e01')}}
            <!-- Data not selected yet. Please select atleast one item using the filter panel on the left. -->
      </v-alert>
    </div>
    <div v-if="calcLength > 1" class="text-xs-center">
      <v-pagination :length=calcLength v-model="page" :total-visible="7"></v-pagination>
    </div>

    <v-expansion-panel>
        <v-expansion-panel-content v-for="item in sourceFilePage" v-if="! isLoading">
          <div slot="header">{{node.filter(x => x.id == item)[0].d_id}} - {{$t('entity.' + item)}}</div>
          <template v-if="! isLoading && $te('server'+'['+item+']'+'[1]')">
            <ztext2 :textObject="$t('server'+'['+item+']'+'[1]')"></ztext2>
            <zmmx :id = item></zmmx>
          </template>
          <template v-else>
            <v-alert type="warning" :value="true">
              {{$t('desc.' + 'e02')}}
                  <!-- Oops ! No Data available for this selection ! -->
            </v-alert>
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
    props: ['sourceFile'],

    data () {
      return {
        page: 1,
        itemspp: 5,
      }
    },
    watch: {
//        sourceFile : function () {
//          let remxObjId = []
//          remxObjId = this.sourceFile.filter(a => this.avlblDetailsId.indexOf(a) < 0);
//          if (remxObjId.length > 0) {this.$store.dispatch('text_details_act', remxObjId)};
//        },

      sourceFilePage : {
        immediate: true,
        handler: function () {
          let remxObjId = []
          remxObjId = this.sourceFilePage.filter(a => this.avlblDetailsId.indexOf(a) < 0);
          if (remxObjId.length > 0) {this.$store.dispatch('text_details_act', remxObjId)};
        }
      },
    },
    components: { zmmx, ztext2},
    computed: {
      ...mapState(['isLoading', 'avlblDetailsId', 'node']),

      calcLength: function () {
        return Math.ceil(this.sourceFile.length / this.itemspp)
      },
      // Based on the page selection, filter the source file
      sourceFilePage: function() {return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)}
    },
  }
</script>
