<template>
<div>

  <template v-if="$te('song_text.' + item)">
    <v-card v-for="i in $t('song_text.' + item).length">
        <v-card-text>
              {{$t('song_text.' + item)[i-1]}}
        </v-card-text>
    </v-card>
  </template>

  <template v-if="$te('song_word.' + item)">
    <table v-if="$t('song_word.' + item).length >0">
      <tr>
        <th></th>
        <th>{{"="}}</th>
      </tr>
      <tr v-for="i in $t('song_word.' + item).length">
        <td>{{ $t('song_word.' + item)[i-1] }}</td>
        <td>{{ $t('word_meaning.' + item)[i-1] }}</td>
      </tr>
    </table>
  </template>
<!-- for single header_text as in verw -->
  <template v-if="$te('expln_header_text.' + item)">
    <v-card v-for="i in $t('expln_header_text.' + item).length">
      <v-card-title>
        {{$t('expln_header_text.' + item)[i-1][0][0]}}
      </v-card-title>
      <v-card-text v-for="j in $t('expln_header_text.' + item)[i-1][1].length">
        {{$t('expln_header_text.' + item)[i-1][1][j-1]}}
      </v-card-text>
    </v-card>
  </template>
<!-- for separate header and text as in verx -->
  <!-- <template v-if="$te('expln_text.' + item)">
    <v-card v-for="i in $t('expln_text.' + item).length">
      <v-card-title v-if="$te('expln_header.' + item)[i-1]">
        {{$t('expln_header.' + item)[i-1]}}
      </v-card-title>
      <v-card-text v-for="j in $t('expln_text.' + item)[i-1].length">
        {{$t('expln_text.' + item)[i-1][j-1]}}
      </v-card-text>
    </v-card>
  </template> -->

</div>

</template>
<script>


export default {
  props: ['item']

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
