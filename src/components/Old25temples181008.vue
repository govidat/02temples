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
      <!-- <template v-for="lang in allLang" && $te('temple_expln_header_text.' + item)> -->
        <v-expansion-panel-content v-for="item in sourceFilePage">
          <div slot="header">{{item.d_id}} - {{$t('desc.' + item.id)}}</div>
          <template v-if="! isLoading && $te('temple_expln_header_text.' + item.d_id)">
            <!-- <zimages :imagepath="'../static/img/lores/temples/2/1.jpg'"></zimages> -->
            <zimages :imageid=item.d_id :cat_id=9></zimages>
            <v-card v-for="i in $t('temple_expln_header_text.' + item.d_id).length">
              <v-card-title>
                {{$t('temple_expln_header_text.' + item.d_id)[i-1][0][0]}}
              </v-card-title>
              <v-card-text v-for="j in $t('temple_expln_header_text.' + item.d_id)[i-1][1].length">
                {{$t('temple_expln_header_text.' + item.d_id)[i-1][1][j-1]}}
              </v-card-text>
            </v-card>
          </template>

          <!-- <v-card v-for="i in $t('temple_detail.' + item).length">
              <v-card-title>
                    {{$t('temple_detail.' + item)[i-1][0]}}
              </v-card-title>
              <v-card-text>
                    {{$t('temple_detail.' + item)[i-1][1]}}
              </v-card-text>
          </v-card> -->

        </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import zimages from './25templesimgbase64'

  export default {
    props: ['sourceFile'],

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
          let remxObjId = this.sourceFilePage.filter(a => this.templesDetailsId.indexOf(a.d_id) < 0)
                          .map(a => a.d_id);
           // alert("remxObjId" + remxObjId.toString())
          if (remxObjId.length > 0) {
              this.$store.dispatch('text_details_act', remxObjId)
              // this.$store.dispatch('templesDetailsAct', remxObjId)
          };
        }
      },
    },
    components: {
      zimages
    },
    computed: {
      ...mapState(
        ['templesDetailsId', 'isLoading']
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
