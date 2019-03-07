<template>
  <v-toolbar app dark color="grey darken-3" style="padding-left: 0">
    <!--<v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>-->
    <!--<v-spacer class="hidden-md-and-up"></v-spacer>-->
    <v-toolbar-title class="primary--text" to="/register">{{ appTitle }}</v-toolbar-title>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn color="primary" flat>Account</v-btn>
    <v-btn color="primary" flat>Support</v-btn>
    <v-btn color="primary" flat to="/sign-in">SIGN IN</v-btn>
    <v-btn color="primary" to="/register">REGISTER</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  data() {
    return {
      appTitle: 'BlockRent.io'
    }
  }
}
</script>

<style scoped></style>
