<template>
  <v-container class="grey">
    <h1 class="primary--text">Your Properties</h1>
    <v-container grid-list-lg light>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="(property, idx) in properties" :key="idx">
          <v-card>
            <v-responsive>
              <v-img :aspect-ratio="16 / 9" max-height="150px" :src="property.image"></v-img>
            </v-responsive>

            <v-card-text>
              <div class="title primary--text my-3">{{ property.address }}</div>

              <div>
                <div>
                  <span class="font-weight-bold">Ejari Contract/Certificate No.: </span>{{ property.contractNo }}
                </div>
                <div>
                  <span class="font-weight-bold">Contract Period: </span>{{ property.leaseStartDate.toDateString() }} to
                  {{ property.leaseEndDate.toDateString() }}
                </div>
                <div><span class="font-weight-bold">Tenant name: </span>{{ property.tenantName }}</div>
                <div class="mt-5 deposit-status">
                  <span class="font-weight-bold">Status: </span>
                  <span class="text-capitalize">{{ property.status.toString() }}</span>
                  <span v-if="property.status === 'Deposit Paid'">
                    <v-icon class="mx-1" color="green">mdi-checkbox-marked-circle</v-icon>
                  </span>
                  <span v-else>
                    <v-icon class="mx-1" color="red">mdi-alert-circle</v-icon>
                  </span>
                  <v-btn class="secondary--text" color="primary" @click="viewProperty(property)">
                    View
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="text-xs-right mx-5">
      <v-btn fab dark large color="indigo">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
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
.deposit-status {
  color: lightgreen;
  font-size: 1.5rem;
}
</style>
