<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-content lazy-validation>
    <loading :active.sync="isLoading" :is-full-page="true" loader="bars" color="orange"> </loading>
    <p class="font-weight-bold text-xs-center">
      Register your security deposit application<br />
      by filling out the form below
    </p>
    <v-stepper v-model="step">
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="formUser" lazy-validation>
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
                      return-masked-value
                      mask="+###########"
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
                      single-line
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
                      return-masked-value
                      mask="+###########"
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
                <v-btn class="primary--text custom-round" to="/">
                  Cancel
                </v-btn>
                <v-btn class="secondary--text custom-round" color="primary" @click="validateUser">
                  Next
                </v-btn>
              </v-layout>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="formLease" lazy-validation>
            <v-container>
              <h1>Lease Application Details:</h1>
              <div class="section">
                <v-layout row wrap>
                  <v-flex xs12 sm4>
                    <v-label>Ejari Contract/Certificate No:</v-label>
                    <v-text-field
                      v-model="leaseApplicationDetails.contractNo"
                      :rules="contractNoRules"
                      class="custom-round"
                      single-line
                      outline
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
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
                          single-line
                          outline
                          required
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="leaseApplicationDetails.contractStartDate"
                        scrollable
                        no-title
                        light
                        @input="menu1 = false"
                        :max="leaseApplicationDetails.contractEndDate"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-label>Property Sizes:</v-label>
                    <v-text-field
                      v-model="leaseApplicationDetails.propertySize"
                      :rules="propertyRule"
                      class="custom-round"
                      suffix="m2"
                      single-line
                      outline
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-label>Property Address:</v-label>
                    <v-text-field
                      v-model="leaseApplicationDetails.address"
                      :rules="addressRules"
                      class="custom-round"
                      single-line
                      outline
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
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
                          single-line
                          outline
                          required
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="leaseApplicationDetails.contractEndDate"
                        scrollable
                        no-title
                        light
                        @input="menu2 = false"
                        :min="leaseApplicationDetails.contractStartDate"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-label>Annual Rent:</v-label>
                    <v-layout row wrap>
                      <v-flex xs12 class="remove-padding">
                        <v-text-field
                          v-model="leaseApplicationDetails.annualRent"
                          single-line
                          outline
                          required
                          class="custom-round inputPrice remove-margin"
                          :rules="annualRule"
                          type="number"
                        >
                          <template v-slot:append-outer>
                            <v-select
                              v-model="leaseApplicationDetails.currencyType"
                              :items="currency_list"
                              outline
                              single-line
                            >
                            </v-select>
                          </template>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-label>Premise No. (DEWA):</v-label>
                    <v-text-field
                      v-model="leaseApplicationDetails.premiseNo"
                      :rules="premiseNoRules"
                      class="custom-round"
                      single-line
                      outline
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-label>Property Usage</v-label>
                    <v-select
                      :items="property_usage"
                      v-model="leaseApplicationDetails.propertyUsage"
                      :rules="propertyRule"
                      single-line
                      outline
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-label>Total Contract Value:</v-label>
                    <v-layout row wrap>
                      <v-flex xs12 class="remove-padding">
                        <v-text-field
                          v-model="leaseApplicationDetails.securityDepositAmount"
                          :rules="securityDepositRules"
                          class="custom-round inputPrice remove-margin"
                          type="number"
                          min="1"
                          max="100"
                          single-line
                          outline
                          required
                        >
                          <template v-slot:append-outer>
                            <v-select
                              v-model="leaseApplicationDetails.currencyType"
                              :items="currency_list"
                              outline
                              single-line
                            >
                            </v-select>
                          </template>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </div>
            </v-container>
            <v-container mt-3>
              <v-layout row>
                <span class="company-name">Blockrent</span>
                <v-spacer class="hidden-sm-and-down"></v-spacer>
                <v-btn class="primary--text custom-round" @click="step = 1">
                  Back
                </v-btn>
                <v-btn class="secondary--text custom-round" color="primary" @click="validateLease">
                  Next
                </v-btn>
              </v-layout>
            </v-container>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog v-model="depositDialog" persistent max-width="700">
      <v-card dark>
        <v-form ref="form" lazy-validation>
          <v-card-title class="headline primary--text">Security Deposit Details:</v-card-title>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6>
              <v-container>
                <v-layout row wrap>
                  <v-flex>
                    <v-label>Terms:</v-label>
                    <v-select
                      :items="terms_list"
                      v-model="depositDetails.term"
                      single-line
                      outline
                      :rules="termRules"
                      placeholder="Select the term"
                      v-on:change="changeTerm"
                    ></v-select>
                  </v-flex>
                  <v-flex>
                    <v-label>Amount:</v-label>
                    <v-text-field
                      v-model="depositDetails.amount"
                      :rules="amountRules"
                      :readonly="isPercent"
                      class="inputPrice"
                      type="number"
                      single-line
                      outline
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 sm6>
              <v-container>
                <v-layout row wrap>
                  <v-flex v-if="isPercent">
                    <v-label>%:</v-label>
                    <v-text-field
                      v-model="depositDetails.termPercent"
                      class="inputPrice"
                      type="number"
                      single-line
                      outline
                      return-masked-value
                      mask="##"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-btn class="black--text custom-round" color="primary" outline @click="depositDialog = false">Back</v-btn>
            <v-btn class="black--text custom-round" color="primary" @click="validate">Submit</v-btn>
          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="platform" persistent max-width="700">
      <v-card dark>
        <v-card-title class="headline primary--text">Awesome!</v-card-title>
        <v-layout row wrap align-center>
          <v-flex xs12 sm7 class="subheading">
            <v-card-text>
              Thanks for submitting your application, We've just sent a confirmation email to both the Tenant & Landlord
              / Property owner.
            </v-card-text>
            <v-card-text>
              Once your application is confirmed, you can manage your application & security deposits.
            </v-card-text>
          </v-flex>
          <v-flex xs12 sm5>
            <v-responsive>
              <v-img :src="require('@/assets/img/undraw_confirmation.svg')"></v-img>
            </v-responsive>
          </v-flex>
        </v-layout>
        <div class="text-xs-center">
          <v-btn class="black--text" color="primary" @click="platform = false" to="/">OK</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'RegistrationForm',
  data() {
    return {
      platform: false,
      depositDialog: false,
      step: 1,
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
        securityDepositAmount: '',
        propertyUsage: '',
        annualRent: '',
        propertySize: '',
        currencyType: 'AED'
      },
      otherParty: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      },
      depositDetails: {
        term: '',
        amount: '',
        termPercent: ''
      },
      nameRules: [v => !!v || 'Name is required'],
      phoneNumberRules: [v => !!v || 'Phone number is required'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
      dateRules: [v => !!v || 'Date is required'],
      addressRules: [v => !!v || 'Address is required'],
      contractNoRules: [v => !!v || 'Ejari Contract/Certificate No. is required'],
      premiseNoRules: [v => !!v || 'Premise No.(DEWA) is required'],
      securityDepositRules: [v => !!v || 'Total Contract Value is required'],
      termRules: [v => !!v || 'Term is required'],
      amountRules: [v => !!v || 'Amount is required'],
      percentRules: [v => !!v || 'Percent is required'],
      contractRules: [v => !!v || 'Contract Value is required'],
      propertyRule: [v => !!v || 'Property Size is required'],
      annualRule: [v => !!v || 'Annual Rent is required'],
      propertyUsage: [v => !!v || 'Property Usage is required'],
      menu1: false,
      menu2: false,
      phone: 'phone',
      isLoading: false,
      terms_list: ['Fixed Amount', '% of Contract Value'],
      property_usage: ['Residential', 'Commercial', 'Industrial'],
      currency_list: ['AED', 'USD', 'GBP', 'AUD'],
      isPercent: false,
      min_date: '',
      max_date: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.$store
          .dispatch('registerApplication', {
            registrationForm: {
              personalDetails: this.personalDetails,
              leaseApplicationDetails: this.leaseApplicationDetails,
              otherParty: this.otherParty,
              depositDetails: this.depositDetails
            }
          })
          .then(() => {
            this.isLoading = false
            this.platform = true
            //this.$router.push('/')
          })
          .catch(err => {
            this.isLoading = false
            console.log(err)
          })
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    validateUser() {
      //if (this.$refs.formUser.validate()) {
        this.step = 2
      //}
    },
    validateLease() {
      //if (this.$refs.formLease.validate()) {
        this.depositDialog = true
      //}
    },
    changeTerm(sel) {
      this.isPercent = sel === this.terms_list[1]
    },
    closeAlert() {
      this.platform = false
      this.$router.push('/')
    }
  },
  watch: {
    'depositDetails.termPercent': function(val) {
      this.depositDetails.amount =
        (parseFloat(val) / 100).toFixed(2) * parseFloat(this.leaseApplicationDetails.securityDepositAmount).toFixed(2)
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
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.v-stepper {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
