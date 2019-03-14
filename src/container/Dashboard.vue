<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app light>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" hide-overlay app clipped dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Submit an Application</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>mdi-file-document-box-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Applications</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="dashboard-toolbar" clipped-left fixed app>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-img :src="require('@/assets/img/Dashboard_logo.svg')"></v-img>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-text-field light solo append-icon="fa-search" placeholder="Type Keyword..."></v-text-field>
      <v-badge overlap>
        <template v-slot:badge>
          <span>0</span>
        </template>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
      <v-btn icon>
        <v-icon size="24">fa-user</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-face-profile</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      drawer: true,
      mini: true,
      right: null
    }
  }
}
</script>

<style scoped>
</style>
