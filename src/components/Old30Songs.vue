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
      <v-expansion-panel-content v-for="(item,i) in sourceFilePage" :key="i">
        <div slot="header">
          {{item.Id}}
          <!-- check if it has got valid CompDetails from the previous step -->
          <span v-if="Object.keys(item.CompDetails).length >0" v-for="lang in allLang">
            - {{item.CompDetails.Name[lang]}}            
            <!-- - {{item.CompDetails.Saint[lang]}} / {{item.CompDetails.Name[lang]}} -->
          </span>
        </div>
        <!-- {{songsDetails.find(itm => itm.Id ===  item.Id)}} -->
        <!-- <template v-if="false"> -->
        <template v-if="Object.keys(songsDetails.find(itm => itm.Id ===  item.Id) || {}).length > 0">
          <!-- Part 1 - Songs -->
          <v-card v-for="lang in allLang">
              <!-- To avoid empty lines, do a check for available values item.SongDetails.Song[lang] -->
              <v-card-text v-if="(songsDetails.find(itm => itm.Id ===  item.Id).Song[lang] || []).length >0">
                <p v-for="line in songsDetails.find(itm => itm.Id ===  item.Id).Song[lang]" >
                  {{line}}
                </p>
              </v-card-text>
          </v-card>
          <!-- Part 2 - Tables -->
          <!-- Provided for two column tables -->
          <template
            v-if="(songsDetails.find(itm => itm.Id ===  item.Id).Tables || []).length >0"
            v-for="table in songsDetails.find(itm => itm.Id ===  item.Id).Tables">
            <v-card v-for="lang in allLang">
              <table v-if="(table.Text[lang] || []).length >0">
                <tr>
                  <th v-for="headTbl in table.Header[lang]">{{headTbl}}</th>
                </tr>
                <tr
                  v-for="itemTbl in (table.Text[lang])[0].map(function(e, i) { return [e, (table.Text[lang][1])[i]];}) ">
                  <td>{{ itemTbl[0,0] }}</td>
                  <td>{{ itemTbl[0,1] }}</td>
                </tr>
              </table>
            </v-card>
          </template>

          <template v-for="lang in allLang">
            <v-card v-for="subDetail in songsDetails.find(itm => itm.Id ===  item.Id).Details">
              <v-card-title v-if="Object.keys(subDetail.Header[lang] || {}).length >0">
                {{subDetail.Header[lang]}}
              </v-card-title>
              <v-card-text  v-if="Object.keys(subDetail.Text[lang] || {}).length >0">
                <span v-for="line in subDetail.Text[lang]"> {{line}}</span>
              </v-card-text>
            </v-card>
          </template>
        </template>
        <template v-else>
          <v-alert type="warning" :value="true">
                No data available for this selection.
          </v-alert>
        </template>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  props: ['sourceFile', 'mainLang', 'allLang'],
  data () {
    return {
      page: 1,
      itemspp: 5,
      item: 0
    }
  },
  computed: {
    ...mapGetters({
      songsDetails: 'songsDetailsGet'
      }),
    calcLength: function () {
        // alert("length" + Math.ceil(this.sourceFile.length / this.itemspp))
      return Math.ceil(this.sourceFile.length / this.itemspp)
    },
    sourceFilePage: function() {
      // trigger action to get mSongsDetails from firebase
      // return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      let xObj = this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      let xObjId = xObj.map(a => a.Id)
      // pass the list of Ids to Action
      this.$store.dispatch('songsDetailsAct', xObjId)
      // return the sliced sourcefile as page - this will display the header of the songs
      return xObj
    }
  }
}
</script>
<style scoped>
table {
  border: 1px solid black;
  font: 16px ;
}
th {
  background-color: rgb(228, 240, 245);
}
th,td {
  border: 1px solid black;
  padding:4px 6px;
}
</style>
Name
