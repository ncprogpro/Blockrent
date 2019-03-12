<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" color="yground">
          <v-flex xl12 sm4 offset-sm4>
            <v-responsive>
              <v-img :src="require('@/assets/img/undraw_for_sale_viax.svg')"></v-img>
            </v-responsive>
          </v-flex>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be greater than 6 characters'
      ]
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('userLogin', {
            email: this.email,
            password: this.password
          })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped>
.custom-round.v-input .v-input__slot {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background-color: white;
}
.custom-round {
  color: white;
}
</style>
