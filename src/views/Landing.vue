<template>
  <v-container>
    <v-layout justify-end column fill-height>
      <v-flex xs-12>
        <v-layout align-start justify-center column fill-height>
          <v-layout column align-start justify-end>
            <v-card-text class="display-2 font-weight-bold">Smart Tenancy</v-card-text>
            <v-card-text class="display-2 font-weight-bold">Secure Bonds</v-card-text>
            <v-card-text class="display-2 font-weight-bold">Blockchain for Real Estate</v-card-text>
          </v-layout>
          <v-layout align-center justify-center>
            <v-btn outline autocapitalize="on" @click="platform = true">Join the platform</v-btn>
            <v-btn color="primary">Login</v-btn>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog v-model="platform" persistent max-width="700">
      <v-card color="yground" class="text--primary">
        <div align="right">
          <v-btn icon @click="platform = false">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-layout row wrap align-center pb-3 pl-3 pr-3>
          <v-flex xs12 sm6>
            <v-responsive>
              <v-img :src="require('@/assets/img/submit_application.svg')"></v-img>
            </v-responsive>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card-text class="headline text-xs-right">
              Less hassle with security deposits when you apply for Blockrent.
            </v-card-text>
            <v-card-text class="text-xs-center">
              <v-btn class="black--text" color="white" outline @click="platform = false" block>
                Submit Your Application
              </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      platform: false
    }
  },
  beforeCreate() {
    document.getElementById('app').className += ' landing-page'
  },
  beforeDestroy() {
    document.getElementById('app').classList.remove('landing-page')
  }
}
</script>

<style scoped></style>
