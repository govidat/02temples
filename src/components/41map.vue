<template>
  <div>
    <!-- <v-container grid-list-sm fluid fill-height>
    <v-layout wrap>
      <v-flex>
        <v-card> -->
      <!-- <v-container class="pa-0" fluid fill-height>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-title>
                <div>
                  <span>Interactive Map</span><br>
                </div>
              </v-card-title> -->
              <l-map
                ref="map"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                style="height: 300px"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
                >
                <l-tile-layer
                  :url="url"
                  :attribution="attribution"/>
                <l-marker :lat-lng="marker">
                  <l-popup>
                    <div @click="popupClick">
                      {{this.mapcoords.locname}}
                      <p v-show="showParagraph">
                        {{this.mapcoords.locdesc}}
                      </p>
                    </div>
                  </l-popup>
                </l-marker>
              </l-map>
            <!-- </v-card>
      </v-flex>
    </v-layout>
  </v-container> -->

  </div>
</template>
<script>

import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
// import 'leaflet/dist/leaflet.css'

  export default {
    props: ['mapcoords'],

    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
      },

    data () {
      return {
        zoom: 13,
        center: L.latLng(this.mapcoords.lat, this.mapcoords.lon),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(this.mapcoords.lat, this.mapcoords.lon),
        currentZoom: 13,
        currentCenter: L.latLng(this.mapcoords.lat, this.mapcoords.lon),
        showParagraph: true,
        mapOptions: {
          zoomSnap: 0.5
        }
       }
    } ,
    // created() {
    // },

    // mounted() {
    //   this.$nextTick(() => {
    //     this.map = this.$refs.map.mapObject // work as expected
    //   });
    //   // setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
    // },

    methods: {
      zoomUpdate (zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate (center) {
        this.currentCenter = center;
      },
      showLongText () {
        this.showParagraph = !this.showParagraph;
      },
      popupClick () {
        alert('Popup Click!');
      },

      // onResize() {
      //   alert("hello");
      //   this.$refs.map.mapObject.invalidateSize();
      // }

    },

  }
</script>
<style>
 /* @import '../../node_modules/leaflet/dist/leaflet.css'; */

</style>
