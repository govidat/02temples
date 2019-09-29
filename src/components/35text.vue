<template>
  <div>
            <!-- get the object keys in order of priority -->
            <!-- {{ Object.keys(textObject).sort(function(a,b){return textObject[a]["sort_no"] - textObject[b]["sort_no"]})}} -->
            <v-card v-for="i in Object.keys(textObject).sort(function(a,b){return textObject[a]['sort_no'] - textObject[b]['sort_no']})">
              <v-card-title>
                {{textObject[i]["header"]}}
              </v-card-title>
              <v-card-text>
                <!-- some song text have lrc time in [0:00.00] format. They need to be removed before display -->
                <p v-for="j in textObject[i]['item']">{{j.replace(/\[.*?\]/g, '')}}</p>
                <!-- <p v-for="j in textObject[i]['item']">{{j}}</p> -->
              </v-card-text>
            </v-card>
  </div>
</template>
<script>


  export default {
    props: ['textObject'],
  }
</script>
