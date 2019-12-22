<template>
  <div>
<p>
  {{$t('desc.' + 'e03')}}
</p>
    <v-card v-for="i in Object.keys(cms_shell).sort(function(a,b){return cms_shell[a]['lang'] - cms_shell[b]['lang']})">
      <v-card-title>
        Audio Language : {{cms_shell[i]["lang"]}} By - {{cms_shell[i]["author"]}}
      </v-card-title>
      <zaudtext :itemid = itemid :mmx_type_id = mmx_type_id :sub_id = i ></zaudtext>
    </v-card>
  </div>
</template>
<script>
import zaudtext from './45audtext'

  export default {
    props: ['itemid', 'cms_shell', 'mmx_type_id'],
    components: {zaudtext},
    computed: {},
  }
</script>
