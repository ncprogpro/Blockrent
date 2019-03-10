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
            <v-btn color="primary" @click="isLogin = true">Login</v-btn>
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
    <v-dialog v-model="isLogin" persistent max-width="450">
      <v-card color="yground">
        <div align="right">
          <v-btn icon @click="isLogin = false">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-flex xl12 sm4 offset-sm4>
          <v-responsive>
            <v-img :src="require('@/assets/img/undraw_for_sale_viax.svg')"></v-img>
          </v-responsive>
        </v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-flex xs12 sm10 offset-sm1 py-2 mt-5>
            <v-label>Username:</v-label>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              solo
              single-line
              required
              light
              color="grey darken-3"
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm10 offset-sm1 py-2>
            <v-label>Password:</v-label>
            <v-text-field
              v-model="password"
              type="password"
              solo
              single-line
              required
              :rules="passwordRules"
              light
              color="grey darken-3"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm10 offset-sm1>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="white--text" dark :disabled="!valid" flat="flat" @click="submit">
                Login
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      platform: false,
      isLogin: false,
      email: '',
      password: '',
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be greater than 6 characters'
      ]
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
