<template>
  <v-app>
    <v-toolbar flat color="grey" class="search-toolbar">
      <v-text-field xs12 sm5
        light
        solo
        append-icon="fa-search"
        placeholder="Type Keyword..."
        class="search-application"
      ></v-text-field>
      <v-btn color="yground" class="black--text">
        <v-icon left dark>mdi-plus</v-icon>
        Submit an Application
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container grid-list-lg light fluid>
      <v-layout row wrap>
        <v-flex xs12 v-for="(property, idx) in properties" :key="idx">
          <v-card tile flat class="card-border">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-card-text>
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
                          <v-btn flat @click="viewProperty(property)" class="primary--text flat-remove-padding"
                            >View Application</v-btn
                          >
                        </v-layout>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md3>
                        <v-container>
                          <v-layout column align-end justify-end>
                            <div class="font-weight-bold text-right" align="right">Ejari Contract/Certificate No.:</div>
                            <div align="right">{{ property.contractNo }}</div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-container text-align="right">
                          <v-layout column align-end justify-end>
                            <div class="font-weight-bold" align="right">Tenant name:</div>
                            <div align="right">{{ property.tenantName }}</div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-container>
                          <v-layout column align-end justify-end>
                            <div class="font-weight-bold" align="right">Contract Period:</div>
                            <div align="right">
                              {{ property.leaseStartDate.toDateString() }} to {{ property.leaseEndDate.toDateString() }}
                            </div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                      <v-flex xs12 sm6 md3 class="deposit-status">
                        <v-container>
                          <v-layout column align-end justify-end>
                            <span class="font-weight-bold">Status: </span>
                            <span class="text-capitalize">{{ property.depositStatus.toString() }}</span>
                            <span v-if="property.depositStatus === 'Deposit Paid'">
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
          <v-card tile flat class="card-border">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-card-text>{{ property.lastModified.toDateString() }}</v-card-text>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-card-text>
                    <v-layout row wrap justify-end align-end>
                      <v-flex xs12 sm6 md3>
                        <v-layout align-center justify-end>
                          <v-icon class="mx-1" v-if="property.depositStatus === 'Deposit Paid'" color="blue"
                            >mdi-check</v-icon
                          >
                          <v-icon class="mr-1" v-else color="red">mdi-alert-circle</v-icon>
                          <span class="subheading">{{ property.depositStatus }}</span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-layout align-center justify-end>
                          <v-icon class="mx-1" v-if="property.applicationStatus === 'Application Active'" color="blue"
                            >mdi-check</v-icon
                          >
                          <v-icon class="mr-1" v-else color="red">mdi-alert-circle</v-icon>
                          <span class="subheading">{{ property.applicationStatus }}</span>
                        </v-layout>
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
  </v-app>
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
          depositStatus: 'Deposit Paid',
          applicationStatus: 'Application Active',
          lastModified: new Date()
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
          depositStatus: 'Deposit Paid',
          applicationStatus: 'Application Disable',
          lastModified: new Date()
        }
      ]
    }
  },
  methods: {
    viewProperty(property) {
      //const userId = this.$route.params.userId
      const propertyId = property.propertyId
      const path = `/home/detail/${propertyId}`
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
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
