<template>
  <div>
    <div v-if="sourceFile.length == 0">
      <v-alert type="warning" :value="true">
            Data not selected yet. Please select atleast one item using the filter panel on the left.
      </v-alert>

        <!-- <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Data not selected yet</div>
            <v-card-text>Please select atleast one item using the filter panel on the left</v-card-text>
          </v-card-title>
        </v-card> -->
    </div>
    <div v-if="calcLength > 1" class="text-xs-center">
      <v-pagination :length=calcLength v-model="page" :total-visible="7"></v-pagination>
    </div>
    <v-expansion-panel>
      <template v-for="lang in allLang">
        <v-expansion-panel-content v-for="item in sourceFilePage">
          <div slot="header">{{item.Id}} - {{item.Name[lang]}} </div>
          <template v-if="templesDetails.findIndex(itm => itm.Id ===  item.Id) >= 0">
            <!-- Hello {{ templesDetails.find(itm => (itm.Id ===  item.Id))}} -->
            <z1Details  :idetailsDb="templesDetails.find(itm => (itm.Id ===  item.Id))" :allLang="allLang"></z1Details>
          </template>


          <!-- <v-card v-for="subitem in item.Details[lang]">
            <v-card-title v-if="Object.keys(subitem.Header || {}).length >0">{{subitem.Header}}</v-card-title>
            <v-card-text v-if="Object.keys(subitem.Text || {}).length >0">
                {{subitem.Text}}
            </v-card-text>
          </v-card> -->
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
        templesDetails: 'templesDetailsGet'
        }),
      calcLength: function () {
        // alert("length" + Math.ceil(this.sourceFile.length / this.itemspp))
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
