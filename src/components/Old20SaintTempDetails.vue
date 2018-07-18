<template>
<div>
  <div v-for="lang in allLang">
  <v-card v-if="(idetailsDb[lang].Details || []).length > 0"
          v-for="subDetail in idetailsDb[lang].Details">
    <v-card-title v-if="(subDetail.Header || '').length >0">
      {{subDetail.Header}}
    </v-card-title>
    <v-card-text  v-if="(subDetail.Text || []).length >0">
      {{subDetail.Text}}
    </v-card-text>
  </v-card>
  </div>
</div>

</template>
<script>


export default {
  props: ['idetailsDb']

}
</script>
