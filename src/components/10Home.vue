<template>
  <v-carousel>
    <!-- <template v-for="(lang,i) in allLang">
      <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"> -->
    <template v-for="lang in allLang">
      <v-carousel-item v-for="item in items" :src="item.src">
          <h1 >{{item.header[lang]}}</h1>
          <h3>{{item.text[lang]}}</h3>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>
<script>
  export default {
    props: ['mainLang', 'allLang'],
    data () {
      return {
        items: [
          {header: {English: "Hello Header English", Tamil: "Hello Header Tamil", Telugu: "Hello Header Telugu"},
           text: {English: "Hello Text English", Tamil: "Hello Text Tamil", Telugu: "Hello Text Telugu"},
            src: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
          },
          {header: {English: "Hello2 Header English", Tamil: "Hello2 Header Tamil", Telugu: "Hello2 Header Telugu"},
           text: {English: "Hello2 Text English", Tamil: "Hello2 Text Tamil", Telugu: "Hello2 Text Telugu"},
            src: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
          },
        ],
      }
    },
  }
</script>
