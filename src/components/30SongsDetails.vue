<template>
<div>
  <!-- <div v-for="lang in allLang"> -->
  <v-card>
    <v-card-text v-if="(isongsDb.song_text || []).length > 0">
      <p v-for="line in isongsDb.song_text">
          {{line}}
      </p>
    </v-card-text>
  </v-card>
  <!-- Table -->
  <!-- <table v-if="(isongsDb.song_word || []).length > 0">
    <tr
      v-for="itemTbl in isongsDb.song_word.map(function(e, i) { return [e, isongsDb.word_meaning[i]];}) ">
      <td>{{ itemTbl[0,0] }}</td>
      <td>{{ itemTbl[0,1] }}</td>
    </tr>
  </table> -->

  <table v-if="(isongsDb.song_word || []).length > 0">
    <tr>
      <th></th>
      <th>{{"="}}</th>
    </tr>

    <tr
      v-for="(item, index) in isongsDb.song_word">
      <td>{{ item }}</td>
      <td>{{ isongsDb.word_meaning[index] || [] }}</td>
    </tr>
  </table>
  <!-- Details -->
  <v-card v-if="(isongsDb.expln_header_text || []).length > 0"
          v-for="subDetail in isongsDb.expln_header_text">
    <v-card-title v-if="(subDetail[0] || []).length >0">
      <span v-for="line in subDetail[0]"> {{line}}</span>
    </v-card-title>
    <v-card-text  v-if="(subDetail[1] || []).length >0">
      <span v-for="line in subDetail[1]"> {{line}}</span>
    </v-card-text>
  </v-card>
  <!-- </div> -->
</div>

</template>
<script>


export default {
  props: ['isongsDb']

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
