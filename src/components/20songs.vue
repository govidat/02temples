<template>
  <div>
    <div v-if="sourceFile.length == 0">
      <v-alert type="warning" :value="true">
          {{$t('desc.' + 'e01')}}
            <!-- Data not selected yet. Please select atleast one item using the filter panel on the left. -->
      </v-alert>
    </div>
    <div v-if="calcLength > 1" class="text-xs-center">
      <v-pagination :length=calcLength v-model="page" :total-visible="7"></v-pagination>
      <v-btn @click="snackbar_song_lan = true" absolute right>
              <v-icon>short_text</v-icon>Aதతె...
      </v-btn>

    </div>

    <v-snackbar v-model="snackbar_song_lan" :right=true :timeout=6000 :top=true :vertical=true :auto-height=true>
              <p>{{$t('desc.t82')}}</p>
              <v-layout row wrap>
                <v-flex xs12 sm4 md4 v-for="item in languages" :key="item.key">
                  <v-checkbox v-model="ln_song" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
                </v-flex>
              </v-layout>
              <p>{{$t('desc.t83')}}</p>
              <v-layout row wrap>
                <v-flex xs12 sm4 md4 v-for="item in languages" :key="item.key">
                  <v-checkbox v-model="ln_song_meaning" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
                </v-flex>
              </v-layout>
              <p>{{$t('desc.t84')}}</p>
              <v-layout row wrap>
                <v-flex xs12 sm4 md4 v-for="item in languages" :key="item.key">
                  <v-checkbox v-model="ln_song_explanation" :label="item.text" :value="item.value" row background-color="white"></v-checkbox>
                </v-flex>
              </v-layout>

          <v-btn color="blue" @click="snackbar_song_lan = false">
            <v-icon>{{zicons['t85']}}</v-icon>{{$t('desc.t85')}}
          </v-btn>
    </v-snackbar>

    <v-expansion-panel>
        <v-expansion-panel-content v-for="item in sourceFilePage" v-if="! isLoading">
          <div slot="header">{{ item - song_numbering.filter(itm => (itm.id_lo <= item && item <= itm.id_hi))[0].id_lo}}</div>
          <!-- <template v-if="! isLoading && $te('server'+'['+item+']'+'[1]')"> -->
          <template v-if="song_details[item] != null">
            <!-- <template v-for="ln in ln_song" > -->
              <ztext2 v-for="ln in ln_song" v-if="song_details[item] != null && song_details[item][900] != null && song_details[item][900][ln] != null" :textObject="song_details[item][900][ln]"></ztext2>
              <!-- <ztext2 v-if="song_details[item] != null && song_details[item][900] != null && song_details[item][900][ln] != null" :textObject="song_details[item][900][ln]"></ztext2> -->
            <!-- </template> -->
            <ztext2 v-for="ln in ln_song" v-if="song_details[item] != null && song_details[item][905] != null && song_details[item][905][ln] != null" :textObject="song_details[item][905][ln]"></ztext2>
            <ztext2 v-for="ln in ln_song_meaning" v-if="song_details[item] != null && song_details[item][910] != null && song_details[item][910][ln] != null" :textObject="song_details[item][910][ln]"></ztext2>
            <ztext2 v-for="ln in ln_song_explanation" v-if="song_details[item] != null && song_details[item][920] != null && song_details[item][920][ln] != null" :textObject="song_details[item][920][ln]"></ztext2>
            <!-- <ztext2 :textObject="$t('server'+'['+item+']'+'[1]')"></ztext2> -->
            <zmmx :id = item></zmmx>
          </template>
          <template v-else>
            <v-alert type="warning" :value="true">
              {{$t('desc.' + 'e02')}}
                  <!-- Oops ! No Data available for this selection ! -->
            </v-alert>
          </template>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import zmmx from './40mmx'
import ztext2 from './35text'

  export default {
    props: ['sourceFile'],

    data () { return {
      page: 1,
      itemspp: 5,
      snackbar_song_lan: false,
    }},
    watch: {
      sourceFilePage : {
        immediate: true,
        handler: function () {
          let remxObjId = []

          remxObjId = this.sourceFilePage.filter(a => this.avlblDetailsId.indexOf(a) < 0);
          if (remxObjId.length > 0) {this.$store.dispatch('song_details_act', remxObjId)};
    }}},
    components: {zmmx,ztext2},
    computed: {
      ...mapState(['isLoading', 'avlblDetailsId', 'song_numbering', 'song_details', 'ln_song', 'ln_song_meaning', 'ln_song_explanation', 'zicons', 'languages']),

      calcLength: function () {
        return Math.ceil(this.sourceFile.length / this.itemspp)
      },
      // Based on the page selection, filter the source file
      sourceFilePage: function() {
        return this.sourceFile.slice((this.page-1)*this.itemspp , this.page*this.itemspp)
      },

      ln_song: {
        get () {return (this.$store.state.ln_song.length != 0 ? this.$store.state.ln_song : [this.$i18n.locale])},
        set (value) {this.$store.commit('upd_ln_song', value)}
      },
      ln_song_meaning: {
        get () {return (this.$store.state.ln_song_meaning.length != 0 ? this.$store.state.ln_song_meaning : [this.$i18n.locale])},
        set (value) {this.$store.commit('upd_ln_song_meaning', value)}
      },
      ln_song_explanation: {
        get () {return (this.$store.state.ln_song_explanation.length != 0 ? this.$store.state.ln_song_explanation : [this.$i18n.locale])},
        set (value) {this.$store.commit('upd_ln_song_explanation', value)}
      },


    },
  }
</script>
