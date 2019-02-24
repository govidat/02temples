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

    <!-- <v-tabs color="transparent" fixed-tabs>
      <v-tab v-for="item in sourceFilePage" @click.stop="zitem = item">
              {{item}}
      </v-tab>
    </v-tabs>
    <div v-if="zitem >0">
      <z1songs :item = "zitem" ></z1songs>
    </div> -->

    <v-expansion-panel>
      <v-expansion-panel-content v-for="(item,i) in sourceFilePage" :key="i">
        <div slot="header">
          {{item}}
        </div>
        <template v-if="! isLoading">

          <template v-if="$te('cat'+cat_id+'['+item+']'+'.song_text')">
            <v-card v-for="i in $t('cat'+cat_id+'['+item+']'+'.song_text').length">
                <v-card-text>
                      {{$t('cat'+cat_id+'['+item+']'+'.song_text')[i-1]}}
                </v-card-text>
            </v-card>
          </template>
          <template v-if="$te('cat'+cat_id+'['+item+']'+'.song_word')">
            <table v-if="$t('cat'+cat_id+'['+item+']'+'.song_word').length >0">
              <tr>
                <th></th>
                <th>{{"="}}</th>
              </tr>
              <tr v-for="i in $t('cat'+cat_id+'['+item+']'+'.song_word').length">
                <td>{{ $t('cat'+cat_id+'['+item+']'+'.song_word')[i-1] }}</td>
                <td>{{ $t('cat'+cat_id+'['+item+']'+'.song_word')[i-1] }}</td>
              </tr>
            </table>
          </template>
          <template v-if="$te('cat'+cat_id+'['+item+']'+'.expln_header_text')">
            <v-card v-for="i in $t('cat'+cat_id+'['+item+']'+'.expln_header_text').length">
              <v-card-title>
                {{$t('cat'+cat_id+'['+item+']'+'.expln_header_text')[i-1][0][0]}}
              </v-card-title>
              <v-card-text v-for="j in $t('cat'+cat_id+'['+item+']'+'.expln_header_text')[i-1][1].length">
                {{$t('cat'+cat_id+'['+item+']'+'.expln_header_text')[i-1][1][j-1]}}
              </v-card-text>
            </v-card>
          </template>

          <!-- Add English explanation to other language pages -->
          <template v-if="$i18n.locale != 'en'">
            <template v-if="$te('cat'+cat_id+'['+item+']'+'.expln_header_text' , 'en')">
              <v-card v-for="i in $t('cat'+cat_id+'['+item+']'+'.expln_header_text' , 'en').length">
                <v-card-title>
                  {{$t('cat'+cat_id+'['+item+']'+'.expln_header_text' , 'en')[i-1][0][0]}}
                </v-card-title>
                <v-card-text v-for="j in $t('cat'+cat_id+'['+item+']'+'.expln_header_text' , 'en')[i-1][1].length">
                  {{$t('cat'+cat_id+'['+item+']'+'.expln_header_text' , 'en')[i-1][1][j-1]}}
                </v-card-text>
              </v-card>
            </template>

          </template>
          <!-- <z1songs :item = "item" ></z1songs> -->
        </template>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

// import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
// import z1songs from './30songsdetails'

export default {
  // here sourceFile is selSongs - this has id and some comp Details
  // details of the songs are pulled in this comp from songsDetails

  // store songsDetails will have a multiple lines. each line is for a songid. each line will have multiple obkects for the songid - one for Tamil, one for English...
  // get all the entries in the songsDetails merged into one array of objects
  // check if the array has an entry for a song id. if not trigger an action to get it from firebase and update songsDetails
  // in the comp above check for a particula songId and lang
  props: ['sourceFile', 'cat_id'],
  // props: ['sourceFile', 'mainLang', 'allLang'],
  data () {
    return {
      page: 1,
      itemspp: 5,
      // item: 0,
      // zitem: 0
      // i18n: {messages: {}},

    }
  },

  watch: {

    sourceFile : {
      immediate: true,
      handler: function () {
        let remxObjId = this.sourceFilePage.filter(a => this.songsDetailsId.indexOf(a) < 0);
        // alert("remxObjId" + JSON.stringify(remxObjId))
        if (remxObjId.length > 0) {
            this.$store.dispatch('songtext_details_act', [remxObjId, 15])
            // this.$store.dispatch('songsDetailsAct', remxObjId)  - THIS IS OLD. SIMPLIFIED AS ABOVE
        };
      }
    },

  },
  // components: {
  //   z1songs
  // },


  computed: {
    ...mapState(
      ['songsDetailsId', 'isLoading']
    ),
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
