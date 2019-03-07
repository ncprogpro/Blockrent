<template>
  <div>
    <v-container>
      <div class="title primary--text mb-5">{{ property.address }}</div>
      <v-layout row wrap>
        <v-flex xs12 sm5>Column 1 (Picture)</v-flex>
        <v-flex xs12 sm7>
          <v-container>
            <div class="display-1 primary--text mb-2">Application Details</div>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <span class="font-weight-bold">Ejari Contract/Certificate No: </span>{{ property.contractNo }}
              </v-flex>
              <v-flex xs12 sm6>
                <span class="font-weight-bold">Premise No (Dewa): </span>{{ property.premiseNo }}
              </v-flex>
              <v-flex xs12 sm6>
                <span class="font-weight-bold">Contract Period: </span>
                <div>{{ property.leaseStartDate.toDateString() }} to {{ property.leaseEndDate.toDateString() }}</div>
              </v-flex>
              <v-flex xs12 sm6>
                <span class="font-weight-bold">Landlord/Property Owner: </span>{{ property.ownerName }}
              </v-flex>
              <v-flex xs12 sm6> <span class="font-weight-bold">Tenant Name: </span>{{ property.tenantName }} </v-flex>
            </v-layout>
            <v-layout row>
              <v-spacer class="hidden-sm-and-down"></v-spacer>
              <v-btn class="secondary--text" color="primary" large>Request</v-btn>
              <v-btn class="secondary--text" color="primary" large>Withdraw</v-btn>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
    <application-updates :updates="property.updates"></application-updates>
  </div>
</template>

<script>
import ApplicationUpdates from '../components/ApplicationUpdates'
export default {
  name: 'Property',
  components: { ApplicationUpdates },
  data() {
    return {
      property: {
        propertyId: 1,
        address: '24 / 1 Ward Avenue Potts Point NSW 2011',
        image: 'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1',
        contractNo: '123456789',
        premiseNo: '123456789',
        tenantName: 'Ameen Ramadan-Jradi',
        ownerName: 'John Kazal',
        leaseStartDate: new Date(),
        leaseEndDate: new Date(),
        status: 'Deposit Paid',
        updates: [
          {
            description: 'John Kazal (Owner) has requested to update Application Details',
            date: new Date(),
            status: 'confirmed'
          },
          {
            description: 'Ameen Ramadan-Jradi (Tenant) has requested to update Application Details',
            date: new Date(),
            status: 'declined'
          },
          {
            description: 'John Kazal (Owner) has requested more funds',
            date: new Date(),
            status: 'accepted'
          },
          {
            description: 'John Kazal (Owner) has requested to terminate application',
            date: new Date(),
            status: 'waiting'
          }
        ]
      }
    }
  }
}
</script>

<style scoped></style>
