<template>
  <v-form>
    <p class="font-weight-bold text-xs-center">
      Fill in your bank details for deposit,<br />
      refund or payment
    </p>
    <v-container>
      <h1>Personal Bank details:</h1>
      <div class="section">
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              v-model="personalDetails.bankName"
              :rules="bankNameRules"
              label="Bank Name:"
              placeholder=" "
              outline
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="personalDetails.bsb"
              :rules="bsbRules"
              label="BSB:"
              placeholder=" "
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="personalDetails.accountNumber"
              :rules="accountNumberRules"
              label="Account Number:"
              placeholder=" "
              outline
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <v-container mt-3>
      <v-layout row reverse>
        <v-btn class="secondary--text" color="primary" @click="submit" large>Submit</v-btn>
        <v-btn class="primary--text" color="secondary" to="/" large>Add Later</v-btn>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <span class="company-name">BlockRent.io</span>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'RegistrationForm',
  data() {
    return {
      valid: false,
      personalDetails: {
        bankName: '',
        bsb: '',
        accountNumber: ''
      },
      bankNameRules: [v => !!v || 'Name is required'],
      bsbRules: [v => !!v || 'Phone number is required'],
      accountNumberRules: [v => !!v || 'E-mail is required']
    }
  },
  methods: {
    async submit() {
      console.log('Submitting...')
      console.log(this.personalDetails)

      // const response = await axios.patch('206.189.209.201:8000/api/v1/users', this.personalDetails)
      //
      // console.log(response)

      this.$router.push('dashboard')
    }
  }
}
</script>

<style scoped>
h1 {
  color: orange;
  margin-bottom: 1rem;
}
p {
  font-size: 1.5rem;
}
.section {
  border: 2px solid orange;
  padding: 1rem;
}
.company-name {
  font-size: 2rem;
  font-weight: bold;
  color: var(--v-primary-base);
}
</style>
