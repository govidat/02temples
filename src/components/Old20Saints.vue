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
      <template v-for="lang in allLang">
        <v-expansion-panel-content v-for="item in sourceFilePage">
          <div slot="header">{{item.Id}} - {{item.Name[lang]}}</div>
          <template v-if="saintsDetails.findIndex(itm => itm.Id ===  item.Id) >= 0">
            <z1Details  :idetailsDb="saintsDetails.find(itm => (itm.Id ===  item.Id))" :allLang="allLang"></z1Details>
          </template>
        </v-expansion-panel-content>
      </template>
    </v-expansion-panel>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import z1Details from './20SaintTempDetails'
  export default {
    props: ['sourceFile', 'mainLang', 'allLang'],

    data () {
      return {
        page: 1,
        itemspp: 5,
      }
    },
    computed: {
      ...mapGetters({
        saintsDetails: 'saintsDetailsGet'
        }),
      calcLength: function () {
        return Math.ceil(this.sourceFile.length / this.itemspp)
      },
      // Based on the page selection, filter the source file
      sourceFilePage: function() {
        return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      }
    },
    components: {
        z1Details
    }
  }
</script>
