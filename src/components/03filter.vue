<template>
  <div>
    <v-card>
      <!-- serach is displayed only if number of items are > 5 -->
      <v-card-title v-if="items.length > 5">
         <v-spacer></v-spacer>
         <v-text-field
           append-icon="search"
           label="Search"
           single-line
           hide-details
           v-model="search"
         ></v-text-field>
      </v-card-title>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :search="search"
        select-all
        :pagination.sync="pagination"
        item-key="id"
        class="elevation-1"
      >
<!-- Adding -       hide-actions : removes the pagination display. Not able to include this conditionally -->

        <template slot="headers" slot-scope="props">
          <tr>
            <!-- checkbox select all to be disabled if any search is active -->
            <th v-if="search.length==0">
              <v-checkbox
                primary
                hide-details
                @click.native="toggleAll"
                :input-value="props.all"
                :indeterminate="props.indeterminate"
              ></v-checkbox>
            </th>
            <th v-else>
              <v-checkbox
                disabled
                indeterminate
              ></v-checkbox>
            </th>
            <th
              v-for="header in headers"
              :key="header.value"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon v-if="header.sortable" small>arrow_upward</v-icon>
              <!-- Call the function to display in the required language -->
              <!-- {{ 'hello' }} -->
              {{ get_desc(header.id, 'en', 'NA', 'header') }}
              <!-- itemid, main_ln_id, default_ln_id, default desc, tab_name -->
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <!-- <tr :active="props.selected" @click="props.selected = !props.selected"> -->
          <tr :active="props.selected" @click="props.selected = !props.selected ; itemselected();">
            <td>
              <v-checkbox
                primary
                hide-details
                :input-value="props.selected"
              ></v-checkbox>
            </td>
            <td>{{ props.item.id }}</td>
            <!-- <td>{{ props.item.Name[mainLang] }}</td> -->
            <td>
              <!-- Call the function to display in the required language -->
              {{ get_desc(props.item.id, 'en', 'NA', node ) }}
            </td>
            <!-- <td class="text-xs-right">{{ props.item.calories }}</td> -->
          </tr>

        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
<!-- xxx to be deleted       -->
      <!-- {{this.mainLang}} -->
      <!-- {{items.length}} -->
      {{ this.selected }}
      <!-- {{ this.selected2 }} -->

      <!-- {{ this.search }} -->
    </v-card>
  </div>

</template>

<script>
// import zlntext from '../components/00lntext'
// import { fn_desc } from '../myMixin'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
// import { mapState } from 'vuex'

  export default {

    props: ['value', 'headerinput', 'items', 'selected', 'node'],

    // mixins: [fn_desc],

    data: () => ({
      pagination: {
        sortBy: 'id'
      },
      // return {
      //   selected: this.selected2
      // },
      // selected: this.selected2 || [],
      // selected: this.selected2.slice(0) || [],

      // selected: [],
      search: '',

    }),

    computed: {
      // ...mapState(
      //   ['header_desc']
      // ),

      ...mapGetters({
      // getheaderdesc: 'get_header_desc',
      get_desc: 'get_desc',
      }),

      headers: function () {
        return [
          { id: this.headerinput[0], align: 'left', sortable: true, value: 'id'},
          { id: this.headerinput[1], align: 'left', value: 'name' }
        ];
      }
    },


    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.items.slice()
        this.$emit('update:selected', this.selected)
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },

      itemselected () {
        this.$emit('update:selected', this.selected)
      }
    },

    // computed: {
    //   ...mapState(
    //     ['sel_desc']
    //   )
    // }

    // components: {
    //   zlntext
    // }
  }
</script>
