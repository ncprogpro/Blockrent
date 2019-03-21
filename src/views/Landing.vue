<template>
  <v-container fluid class="landing-page">
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
              <v-btn class="black--text" color="white" outline @click="submitApplication" block>
                Submit Your Application
              </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isLogin" persistent max-width="500">
      <v-card>
        <v-card color="yground" class="login-panel">
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
          <v-flex lazy-validation xl12 sm8 offset-sm2>
            <v-form ref="form" v-model="valid">
              <v-flex xs-12 mt-3>
                <v-alert :value="alert" type="warning" mt-3>Username or password is incorrect</v-alert>
              </v-flex>
              <v-flex xs12 mt-3>
                <v-label>Username:</v-label>
                <v-text-field
                  v-model="email"
                  :rules="usernameRules"
                  solo
                  single-line
                  required
                  light
                  color="grey darken-3"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
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
              <v-flex xs12 pb-3>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="white--text" dark :disabled="!valid" flat="flat" @click="submitLogin">
                    Login
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-form>
          </v-flex>
        </v-card>
        <v-card light class="login-panel">
          <v-flex xl12 sm8 offset-sm2>
            <v-responsive>
              <v-img :src="require('@/assets/img/Dubai_id.svg')"></v-img>
            </v-responsive>
          </v-flex>
        </v-card>
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
      valid: false,
      alert: false,
      email: '',
      password: '',
      usernameRules: [v => !!v || 'Username is required'],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be greater than 6 characters'
      ]
    }
  },
  beforeDestroy() {
    document.getElementById('app').classList.remove('landing-page')
  },
  methods: {
    submitApplication() {
      this.$router.push('registration')
    },
    async submitLogin() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('userLogin', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.isLogin = false
            this.$router.push('/dashboard')
          })
          .catch(err => {
            if (err.response.status == 401) {
              this.alert = true
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.login-panel {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}
</style>
