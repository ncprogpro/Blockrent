<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-form ref="form" lazy-validation>
    <p class="font-weight-bold text-xs-center">
      Register your security deposit application<br />
      by filling out the form below
    </p>
    <v-container>
      <h1>Tenant details:</h1>
      <div class="section">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-label>First Name:</v-label>
            <v-text-field
              v-model="personalDetails.firstName"
              :rules="nameRules"
              class="custom-round"
              border-color="primary"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Last Name:</v-label>
            <v-text-field
              v-model="personalDetails.lastName"
              :rules="nameRules"
              class="custom-round"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Phone Number:</v-label>
            <v-text-field
              v-model="personalDetails.phoneNumber"
              :rules="phoneNumberRules"
              class="custom-round"
              :mask="phone"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Email:</v-label>
            <v-text-field
              v-model="personalDetails.email"
              :rules="emailRules"
              class="custom-round"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <v-container>
      <h1>Lease Application Details:</h1>
      <div class="section">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-label>Ejari Contract/Certificate No:</v-label>
            <v-text-field
              v-model="leaseApplicationDetails.contractNo"
              :rules="contractNoRules"
              class="custom-round"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Lease Contract Start Date:</v-label>
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="leaseApplicationDetails.contractStartDate"
                  :rules="dateRules"
                  class="custom-round"
                  solo
                  single-line
                  outline
                  required
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="leaseApplicationDetails.contractStartDate"
                no-title
                light
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Property Address:</v-label>
            <v-text-field
              v-model="leaseApplicationDetails.address"
              :rules="addressRules"
              class="custom-round"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Lease Contract End Date</v-label>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="leaseApplicationDetails.contractEndDate"
                  :rules="dateRules"
                  class="custom-round"
                  solo
                  single-line
                  outline
                  required
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="leaseApplicationDetails.contractEndDate" no-title light @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Security Deposit Amount:</v-label>
            <v-text-field
              v-model="leaseApplicationDetails.securityDepositAmount"
              :rules="securityDepositRules"
              class="custom-round"
              type="number"
              min="1"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Premise No. (DEWA):</v-label>
            <v-text-field
              v-model="leaseApplicationDetails.premiseNo"
              :rules="premiseNoRules"
              class="custom-round"
              type="number"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <v-container>
      <h1>Landlord/Owner Details:</h1>
      <div class="section">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-label>First name:</v-label>
            <v-text-field
              v-model="otherParty.firstName"
              :rules="nameRules"
              class="custom-round"
              solo
              singline-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Last name:</v-label>
            <v-text-field
              v-model="otherParty.lastName"
              :rules="nameRules"
              class="custom-round"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Phone number</v-label>
            <v-text-field
              v-model="otherParty.phoneNumber"
              :rules="phoneNumberRules"
              class="custom-round"
              :mask="phone"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-label>Email:</v-label>
            <v-text-field
              v-model="otherParty.email"
              :rules="emailRules"
              class="custom-round"
              solo
              single-line
              outline
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <v-container mt-3>
      <v-layout row>
        <span class="company-name">Blockrent</span>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <v-btn class="primary--text custom-round" to="/">Cancel</v-btn>
        <v-btn class="secondary--text custom-round" color="primary" @click="validate">Submit</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegistrationForm',
  data() {
    return {
      valid: false,
      personalDetails: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      },
      leaseApplicationDetails: {
        contractNo: '',
        contractStartDate: new Date().toISOString().substr(0, 10),
        contractEndDate: new Date().toISOString().substr(0, 10),
        address: '',
        premiseNo: '',
        securityDepositAmount: ''
      },
      otherParty: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      },
      nameRules: [v => !!v || 'Name is required'],
      phoneNumberRules: [v => !!v || 'Phone number is required'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
      dateRules: [v => !!v || 'Date is required'],
      addressRules: [v => !!v || 'Address is required'],
      contractNoRules: [v => !!v || 'Ejari Contract/Certificate No. is required'],
      premiseNoRules: [v => !!v || 'Premise No.(DEWA) is required'],
      securityDepositRules: [v => !!v || 'Security Deposit Amount is required'],
      menu1: false,
      menu2: false,
      phone: 'phone'
    }
  },
  methods: {
    async submit() {
      console.log('Submitting...')
      console.log({
        registrationForm: {
          personalDetails: this.personalDetails,
          leaseApplicationDetails: this.leaseApplicationDetails,
          otherParty: this.otherParty
        }
      })

      axios
        .post('http://127.0.0.1:8000/api/v1/registerApplication/', {
          registrationForm: {
            personalDetails: this.personalDetails,
            leaseApplicationDetails: this.leaseApplicationDetails,
            otherParty: this.otherParty
          },
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
      //
      // console.log(response)

      this.$router.push('thanks')
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.submit()
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: var(--v-primary-base);
  margin-bottom: 1rem;
}
p {
  font-size: 1.5rem;
}
.section {
  border: 2px solid var(--v-primary-base);
  padding: 1rem;
}
.company-name {
  font-size: 2rem;
  font-weight: bold;
  color: var(--v-primary-base);
}
.v-form .container .layout .flex {
  padding: 8px;
}
.custom-round .v-input__slot {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  border: 2px solid #fb8c00;
}
.custom-round.v-btn {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  border: 2px solid #fb8c00;
}
</style>
