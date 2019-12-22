<template>
<!-- 'sanscript_from', 'sanscript_to' these two props are to be passed if any transilteration is required-->

  <div>

            <!-- get the object keys in order of priority -->
            <!-- {{ Object.keys(textObject).sort(function(a,b){return textObject[a]["sort_no"] - textObject[b]["sort_no"]})}} -->
      <!-- check if transliteration is required. then according pass the texts  -->

            <v-card v-for="i in Object.keys(textObject).sort(function(a,b){return textObject[a]['sort_no'] - textObject[b]['sort_no']})">
              <v-card-title>
                <template v-if="sanscript_from == sanscript_to">
                  <!-- Transcript not required -->
                  {{textObject[i]["header"]}}
                </template>
                <template v-else>
                  <!-- Transcript required -->
                  {{$Sanscript.t(textObject[i]["header"],sanscript_from, sanscript_to)}}
                </template>
              </v-card-title>
              <v-card-text>
                <!-- some song text have lrc time in [0:00.00] format. They need to be removed before display -->
                <!-- <p v-for="j in textObject[i]['item']">{{j.replace(/\[.*?\]/g, '')}}</p> -->
                <p v-for="j in textObject[i]['item']">
                  <template v-if="sanscript_from == sanscript_to">
                    <!-- Transcript not required -->
                    <!-- some song text have lrc placeholder %z0% format. They need to be removed before display -->
                    {{j.replace(/\%.*?\%/g, '')}}
                  </template>
                  <template v-else>
                    <!-- Transcript required -->
                    {{$Sanscript.t(j.replace(/\%.*?\%/g, ''),sanscript_from, sanscript_to)}}
                  </template>
                </p>
              </v-card-text>
            </v-card>
  </div>
</template>
<script>


  export default {
    props: ['textObject', 'sanscript_from', 'sanscript_to'],

  }
</script>
