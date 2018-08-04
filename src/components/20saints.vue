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
      <!-- <template v-for="lang in allLang"> -->
        <v-expansion-panel-content v-for="item in sourceFilePage">
          <div slot="header">{{item}} - {{$t('saint_name.' + item)}}</div>
          <v-card v-for="i in $t('saint_detail.' + item).length">
            <!-- <template v-for= "subitem in item.detail"> -->
              <v-card-title>
                    {{$t('saint_detail.' + item)[i-1][0]}}
              </v-card-title>
              <v-card-text>
                    {{$t('saint_detail.' + item)[i-1][1]}}
              </v-card-text>
          </v-card>

        </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
  // import { mapState } from 'vuex'
  // import { mapGetters } from 'vuex'
  export default {
    props: ['sourceFile', 'node'],

    data () {
      return {
        page: 1,
        itemspp: 5,
      }
    },
    computed: {
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
