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
          {{item}}
        </div>

        <template v-if="songsDetails.findIndex(itm => itm.song_id ===  item) >= 0">
          <template v-for="lang in allLang">
            <template v-if="songsDetails.findIndex(itm => (itm.song_id ===  item && itm.lang_text === lang)) >= 0">
              <z1Songs  :isongsDb="songsDetails.find(itm => (itm.song_id ===  item && itm.lang_text === lang))"></z1Songs>
            </template>
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
import z1Songs from './30SongsDetails'

export default {
  // here sourceFile is selSongs - this has id and some comp Details
  // details of the songs are pulled in this comp from songsDetails

  // store songsDetails will have a multiple lines. each line is for a songid. each line will have multiple obkects for the songid - one for Tamil, one for English...
  // get all the entries in the songsDetails merged into one array of objects
  // check if the array has an entry for a song id. if not trigger an action to get it from firebase and update songsDetails
  // in the comp above check for a particula songId and lang

  props: ['sourceFile', 'mainLang', 'allLang'],
  data () {
    return {
      page: 1,
      itemspp: 5,
      item: 0
    }
  },
  created() {
      // defaulted first page Action is triggered
      if (this.sourceFilePage.length > 0) {
          this.$store.dispatch('songsDetailsAct', this.sourceFilePage)
      };
  },

  watch: {
    sourceFilePage: function()  {
      // Whenever the page is changed, check for ids not in state and despatch Action
      let remxObjId = this.sourceFilePage.filter(a => this.songsDetailsId.indexOf(a) < 0);
      if (remxObjId.length > 0) {
          this.$store.dispatch('songsDetailsAct', remxObjId)
      };

    }
  },
  computed: {
    ...mapGetters({
      songsDetails: 'songsDetailsGet',
      songsDetailsId: 'songsDetailsIdGet'
      }),
    calcLength: function () {
        // alert("length" + Math.ceil(this.sourceFile.length / this.itemspp))
      return Math.ceil(this.sourceFile.length / this.itemspp)
    },

    sourceFilePage: function() {
      // trigger action to get mSongsDetails from firebase
      // return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
    },

  },

  components: {
      z1Songs
  }

}
</script>
