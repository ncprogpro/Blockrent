<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app light>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" hide-overlay app clipped dark stateless>
      <v-list dense>
        <v-list-tile to="/registration">
          <v-list-tile-action>
            <v-icon class="yground--text">mdi-checkbox-marked-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Submit an Application</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/dashboard/list">
          <v-list-tile-action>
            <v-icon class="yground--text">mdi-file-document-box-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Applications</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="dashboard-toolbar" clipped-left clipped-right fixed app>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-img :src="require('@/assets/img/Dashboard_logo.svg')"></v-img>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-toolbar-side-icon @click.stop="mini = !mini" class="yground--text"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-badge overlap>
        <span slot="badge">0</span>
        <v-btn icon @click="rightDrawer = !rightDrawer">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
      <v-btn icon>
        <v-icon size="24">fa-user</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon size="24">fa-book</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-btn icon @click="submitLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="rightDrawer" app right clipped dark class="update-bar" temporary>
      <v-flex pl-3 style="height: 100%">
        <v-list class="left-border">
          <template>
            <v-list-tile>
              <v-list-tile-action>
                <v-list-tile-title>
                  <span class="text-xs-justify">UPDATES</span>
                </v-list-tile-title>
              </v-list-tile-action>
            </v-list-tile>
          </template>
          <v-divider></v-divider>
          <v-card flat>
            <v-layout row wrap>
              <v-flex xs12 v-for="item in updates" class="bottom-border right-border">
                <v-card flat>
                  <v-layout justify-space-between>
                    <v-card-title>
                      {{ item.name }}
                      {{ item.text }}
                    </v-card-title>
                    <v-card-actions>
                      <a>View</a>
                    </v-card-actions>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-list>
      </v-flex>
    </v-navigation-drawer>
    <template>
      <router-view></router-view>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      drawer: true,
      rightDrawer: false,
      mini: true,
      right: null,
      updates: [
        {
          name: 'Ameen Ramadan',
          text: 'has deposited 3000AED',
          last_modified: '1 hours ago'
        },
        {
          name: 'John Kazal',
          text: 'has requestd for a 3000AED top-up',
          last_modified: '2 hours ago'
        }
      ]
    }
  },
  methods: {
    async submitLogout() {
      this.$store
        .dispatch('userLogout')
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>
</style>
