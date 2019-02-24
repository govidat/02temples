<template>
  <div>
    <v-card-title>
      {{textObject["header"]}}
    </v-card-title>
    <v-card-text>
      <p v-for="j in textObject['item']">{{j}}</p>
    </v-card-text>
  </div>
</template>
<script>


  export default {
    props: ['textObject'],
  }
</script>
