<template>
  <div>
    <v-card>
      <!-- search is displayed only if number of items are > 5 -->
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
              <span v-if="$te('desc.' + header.id)">
                {{$t('desc.' + header.id)}}
              </span>

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
            <td>{{ node.filter(itm => itm.id == props.item.id)[0].d_id }}</td>
            <td v-if="$te(msg + '.' + props.item.id)">
              {{$t(msg + '.' + props.item.id)}}
            </td>
          </tr>

        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </div>

</template>

<script>
// import zlntext from '../components/00lntext'
// import { fn_desc } from '../myMixin'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

  export default {

    props: ['value', 'headerinput', 'itemsid', 'selected', 'msg'],

    // mixins: [fn_desc],

    data: () => ({
      pagination: {
        sortBy: 'id'
      },
      search: '',

    }),

    computed: {
      ...mapState(['node']),

      headers: function () {
        return [
          { id: this.headerinput[0], align: 'left', sortable: true, value: 'id'},
          { id: this.headerinput[1], align: 'left', value: 'name' }
        ];
      },
      // vuetify expects an input object of the below form. Hence converting the simple id's to an object file
      items: function () { return this.itemsid.map(x=> ({id: x}))},
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

  }
</script>
