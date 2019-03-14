<template>
  <v-app dark>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//import AppToolbar from '@/components/AppToolbar'
//import SideMenu from '@/components/SideMenu'

export default {
  name: 'App',
  components: {
    //SideMenu
  }
}
</script>

<style lang="css">
@import '~font-awesome/css/font-awesome.css';
</style>
