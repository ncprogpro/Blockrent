<template>
  <v-app>
    <loading :active.sync="isLoading" :is-full-page="true" loader="bars" color="orange"> </loading>
    <v-toolbar flat color="grey" class="search-toolbar">
      <div class="headline yground--text pl-3">{{ application.address }}</div>
      <v-spacer></v-spacer>
      <div class="headline">
        <v-card-text title class="white--text border pa-2">
          Security Deposit Held: {{ application.total_contract_value }}
        </v-card-text>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-x>
        <template v-slot:activator="{ on }">
          <v-btn color="yground" class="white--text" v-on="on">
            Action
            <v-icon right dark>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-card class="border-style" flat>
          <v-list>
            <v-list-tile v-for="(item, index) in drop_actions" :key="index" @click="">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-container fluid>
            <v-card flat>
              <div class="card-content">
                <detail-carousel :starting-image="0" :images="images"></detail-carousel>
              </div>
            </v-card>
          </v-container>
        </v-flex>
        <v-flex xs12 sm6>
          <v-container fluid>
            <div class="display-1 yground--text mb-2">Application Details</div>
            <v-layout row wrap pb-3>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Ejari Contract/Certificate No:</div>
                <div>{{ application.ejari_no }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Premise No (Dewa):</div>
                <div>{{ application.premis_no }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Annual Rent:</div>
                <div>{{ application.annual_rent }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Contract Period:</div>
                <div>
                  {{ new Date(application.start_date).toDateString() }} to
                  {{ new Date(application.end_date).toDateString() }}
                </div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Property Type:</div>
                <div>{{ application.property_usage }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Total Contract Value:</div>
                <div>{{ application.total_contract_value }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Tenant Name:</div>
                <div>{{ application.tenant_name }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Landlord/Property Owner:</div>
                <div>{{ application.owner_name }}</div>
              </v-flex>
              <v-flex xs12 sm6 lg4 pb-2>
                <div class="font-weight-bold">Property Size:</div>
                <div>{{ application.property_size }}</div>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-btn class="secondary--text" color="yground" large>Update</v-btn>
              <v-spacer class="hidden-sm-and-down"></v-spacer>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
    <application-updates :updates="property.updates"></application-updates>
  </v-app>
</template>

<script>
import ApplicationUpdates from '../components/ApplicationUpdates'
import DetailCarousel from '../components/DetailCarousel'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'DetailView',
  components: { ApplicationUpdates, DetailCarousel, Loading },
  props: ['applicationid'],
  data() {
    return {
      property: {
        propertyId: 1,
        address: '24 / 1 Ward Avenue Potts Point NSW 2011',
        depositValue: '$20000',
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
      },
      images: [
        {
          id: '1',
          big: require('@/images/p1.jpeg'),
          thumb: require('@/images/thumbs/p1.jpeg')
        },
        {
          id: '2',
          big: require('@/images/p2.jpeg'),
          thumb: require('@/images/thumbs/p2.jpeg')
        },
        {
          id: '3',
          big: require('@/images/p3.jpeg'),
          thumb: require('@/images/thumbs/p3.jpeg')
        },
        {
          id: '4',
          big: require('@/images/p4.jpeg'),
          thumb: require('@/images/thumbs/p4.jpeg')
        }
      ],
      drop_actions: [{ title: 'Top-up' }, { title: 'Submit Request' }],
      application: {},
      isLoading: true
    }
  },
  mounted() {
    this.$store
      .dispatch('getApplicationDetail', {appId: this.applicationid})
      .then(resp => {
        this.isLoading = false
        this.setApplicationDetail(resp.data)
      })
      .catch(err => {
        this.isLoading = false
      })
  },
  methods: {
    setApplicationDetail(payload) {
      this.application = payload
    }
  }
}
</script>

<style scoped>
@import "../assets/css/carousel.css";
</style>
