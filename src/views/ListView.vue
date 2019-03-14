<template>
  <v-container grid-list-lg light fluid>
    <v-layout row wrap>
      <v-flex xs12 v-for="(property, idx) in properties" :key="idx">
        <v-card tile flat class="card-border">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-card-text px-0>
                  <v-img max-height="150px" :src="property.image"></v-img>
                </v-card-text>
              </v-flex>
              <v-flex xs12 sm8>
                <v-card-text>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs12 sm6 md9>
                      <div class="title primary--text my-3">{{ property.address }}</div>
                    </v-flex>
                    <v-flex xs12 sm6 md3 justify-end align-end>
                      <v-layout align-end justify-end>
                        <v-btn flat @click="viewProperty(property)" class="primary--text flat-remove-padding">View Application</v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md3>
                      <v-container>
                        <v-layout column align-end justify-end>
                          <div class="font-weight-bold text-right">Ejari Contract/Certificate No.:</div>
                          <div>{{ property.contractNo }}</div>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-container text-align="right">
                        <v-layout column align-end justify-end>
                          <div class="font-weight-bold">Tenant name:</div>
                          <div>{{ property.tenantName }}</div>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-container>
                        <v-layout column align-end justify-end>
                          <div class="font-weight-bold">Contract Period:</div>
                          <div>
                            {{ property.leaseStartDate.toDateString() }} to {{ property.leaseEndDate.toDateString() }}
                          </div>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex xs12 sm6 md3 class="deposit-status">
                      <v-container>
                        <v-layout column align-end justify-end>
                          <span class="font-weight-bold">Status: </span>
                          <span class="text-capitalize">{{ property.status.toString() }}</span>
                          <span v-if="property.status === 'Deposit Paid'">
                            <v-icon class="mx-1" color="green">mdi-checkbox-marked-circle</v-icon>
                          </span>
                          <span v-else>
                            <v-icon class="mx-1" color="red">mdi-alert-circle</v-icon>
                          </span>
                        </v-layout>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ListView',
  data() {
    return {
      properties: [
        {
          propertyId: 1,
          address: '24 / 1 Ward Avenue Potts Point NSW 2011',
          image: 'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1',
          contractNo: '123456789',
          tenantName: 'Ameen Ramadan-Jradi',
          leaseStartDate: new Date(),
          leaseEndDate: new Date(),
          status: 'Deposit Paid'
        },
        {
          propertyId: 2,
          address: '20 George St, Sydney, NSW',
          image:
            'https://www.porterdavis.com.au/~/media/homes/verona/22/facades/verona-island-facade-classic.jpg?w=582&amp;h=320&amp;crop=1',
          contractNo: '123456789',
          tenantName: 'Taras Woronjanski',
          leaseStartDate: new Date(),
          leaseEndDate: new Date(),
          status: 'Deposit Paid'
        }
      ]
    }
  },
  methods: {
    viewProperty(property) {
      const userId = this.$route.params.userId
      const propertyId = property.propertyId
      const path = `/users/${userId}/properties/${propertyId}`
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
@import "~bootstrap/dist/css/bootstrap.min.css";
.flat-remove-padding {
  padding: 0;
  margin: 0;
}
.card-border {
  border: solid orange 1px;
}
.card-border .container {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
