<template>
  <v-app dark>
    <app-toolbar></app-toolbar>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/AppToolbar'

export default {
  name: 'App',
  components: {
    AppToolbar
  }
}
</script>

<style></style>
