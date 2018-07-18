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
          <div slot="header">{{item.id}} - {{get_desc(item.id, 'en', 'NA', node)}}</div>
          <!-- <v-card v-for="item in saint_detail.filter(itm => (itm.id ===  item.id) && all_ln_id.includes(itm.ln_id))"> -->
          <!-- all_ln_id has been added below, just to make it reactive within the component -->
          <v-card v-for="item in get_detail(item.id, node, all_ln_id)">
            <template v-for= "subitem in item.detail">
              <v-card-title v-if="(subitem[0] || '').length >0">
                <template v-for= "subsubitem in subitem[0]">
                    {{subsubitem}}
                </template>
              </v-card-title>
              <v-card-text  v-if="(subitem[1] || []).length >0">
                <template v-for= "subsubitem in subitem[1]">
                    {{subsubitem}}
                </template>
              </v-card-text>
            </template>
          </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    props: ['sourceFile', 'node'],

    data () {
      return {
        page: 1,
        itemspp: 5,
      }
    },
    computed: {
      ...mapState(
        ['all_ln_id']
      ),
      ...mapGetters({
        get_desc: 'get_desc',
        get_detail: 'get_detail',
        // get_saint_desc: 'get_saint_desc',
        }),
      calcLength: function () {
        return Math.ceil(this.sourceFile.length / this.itemspp)
      },
      // Based on the page selection, filter the source file
      sourceFilePage: function() {
        return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      }
    },
    // components: {
    //     z1Details
    // }
  }
</script>
