<template>
  <v-app>
    <v-app-bar app mt-0 id="app-bar" dark>
      <img v-bind:src="require('./assets/logo-infecto-clinicos.png')" alt="">
      <v-spacer></v-spacer>

      <v-btn color='#3e89d3d1' v-on:click="otra()" icon to="/">
        <v-icon>mdi-home</v-icon>
        <v-tooltip activator="parent" location="bottom">Inicio</v-tooltip>
      </v-btn>

      <v-btn color='#3e89d3d1' v-on:click="otra()" icon :to="{ name: 'login' }">
        <v-icon>mdi-login</v-icon>
        <v-tooltip activator="parent" location="bottom">Ingresar</v-tooltip>
      </v-btn>

    </v-app-bar>



    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from "../src/store/index.js";


export default {
  data: () => ({
    name: 'App'
  }),
  methods: {
    otra() {
      localStorage.clear()
    }

  }
}
</script>
<style scoped>
#app-bar {
  background-color: #81818173;
  font-family: "Roboto Slab Bold";
  height: 1183px;
  width: 100%;
  min-height: 80px;
  text-align: center;
}

img {
  max-width: 100%;
  max-height: 50px;
}
</style>
