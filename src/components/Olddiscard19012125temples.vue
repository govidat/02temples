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
          <!-- <template v-if="! isLoading && $te('9.2.expln' )"> -->
          <!-- <template v-if="! isLoading && $te('cat'+cat_id+'['+item.d_id+']'+'.expln')">
            <zimages :imageid=item.d_id :cat_id=cat_id></zimages>
            <v-card v-for="i in $t('cat'+cat_id+'['+item.d_id+']'+'.expln').length">
              <v-card-title>
                {{$t('cat'+cat_id+'['+item.d_id+']'+'.expln')[i-1][0][0]}}
              </v-card-title>
              <v-card-text v-for="j in $t('cat'+cat_id+'['+item.d_id+']'+'.expln')[i-1][1].length">
                {{$t('cat'+cat_id+'['+item.d_id+']'+'.expln')[i-1][1][j-1]}}
              </v-card-text>
            </v-card> -->
            <!-- <zmap :lat=10.863960 :lon=78.689959 :locname="'Thiruvarangam'" :locdesc="'The Temple'"></zmap> -->
            <!-- <zaudios :mmxid=item.d_id :cat_id=cat_id></zaudios> -->
            <!-- <zmmx :sub_id="['t93', 't94']" :mapcoords=mapcoords></zmmx> -->
          <!-- </template> -->
        </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

// import { mapState } from 'vuex'
// import { mapActions } from 'vuex'
// import zimages from './25templesimgbase64'
// import zmap from './26map'
// import zaudios from './27audiobase64'
// import zmmx from './40mmx'
import axios from 'axios'
import {isObject, mergeDeep} from '../helper.js'

  export default {
    props: ['sourceFile', 'cat_id'],

    data () {
      return {
        page: 1,
        itemspp: 5,
        mapcoords: {lat: 10.863960, lon:78.689959, locname: 'aThiruvarangam', locdesc: 'aThe Temple'},

        detailsId: [],
        isLoading: false,
        ismmxLoading: false,

        // Onle level deep has to be maintained while initiation, to take care of nested objects
        // Add to this when new language is introduced
        messages: {
          en: {},
          ta: {},
          te: {}
        },
      }
    },
    watch: {
      sourceFile : {
        immediate: true,
        handler: function () {
          let remxObjId = this.sourceFilePage.filter(a => this.detailsId.indexOf(a.d_id) < 0)
                          .map(a => a.d_id);
           // alert("sourceFile" + JSON.stringify(this.sourceFile))
           // alert("remxObjId" + remxObjId.toString())
          if (remxObjId.length > 0) {
            this.isLoading = true
              // get a string of numbers of the payload to pass it on to axios as an IN condition
            const a = remxObjId.toString()
              // expected value 2,5,6
            const b = this.cat_id
            axios
              .get(
                'http://ec2-18-216-142-169.us-east-2.compute.amazonaws.com:3000/mmx_text_v2?select=val&cat_id=eq.'+ b + '&id=in.(' + a + ')' )
              .then(res => {
                alert("axios" + JSON.stringify(res.data))
                if (res.data.length > 0) {
                  // commit('text_details_mut', res.data)
                  // payload is an array. each element has a val. each val is an array of [{en:..}, {ta:..}, {te:..}]
                  // combine all objects of each val into a single object like [{en:..., ta:...}]
                  const payload = res.data
                  for (var i =0; i < payload.length; i++) {
                    var t1 =     payload[i].val.reduce(function(acc, x) {
                      for (var key in x) acc[key] = x[key];
                      return acc;
                      }, {})
                  // t1 = {en: {}, ta...}
                  // alert("before messages" + JSON.stringify(this.messages))
                  this.messages = mergeDeep(this.messages, t1)
                  // alert("after messages" + JSON.stringify(this.messages))
                  }

                  if (this.isLoading) {
                    this.isLoading = false
                  }
                  this.detailsId = Array.from(new Set(this.detailsId.concat(remxObjId)));
                }

              })

              //this.$store.dispatch('text_details_act', [remxObjId, this.cat_id])
              // this.$store.dispatch('templesDetailsAct', remxObjId)
          };
        }
      },
    },
    components: {
//      zimages,
//      zmap,
//      zaudios,
//      zmmx
    },
    computed: {
//      ...mapState(
//        ['templesDetailsId', 'isLoading']
//      ),

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
