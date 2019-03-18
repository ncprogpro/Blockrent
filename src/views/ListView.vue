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
      <v-btn color="yground" round class="black--text round" to="/registration">
        <v-icon left dark>mdi-plus</v-icon>
        Submit an Application
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container grid-list-lg light fluid>
      <v-toolbar>
        <div class="text-xs-center">
          <v-menu v-model="filter" :close-on-content-click="false" offset-y>
            <v-btn slot="activator" flat>
              Filter
              <v-icon right dark>mdi-menu-down</v-icon>
            </v-btn>
            <v-card class="multi-step-menu">
              <v-list>
                <v-list-tile @click="">
                  <v-list-tile-action>
                    <v-list-tile-title>Custom Filter</v-list-tile-title>
                  </v-list-tile-action>
                </v-list-tile>
                <v-menu offset-x>
                  <v-list-tile slot="activator">
                    <v-list-tile-title>Property Type:</v-list-tile-title>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile v-for="(property, idx) in propertyTypes" :key="idx" @click="">
                      <v-list-tile-title>{{ property.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-x>
                  <v-list-tile slot="activator">
                    <v-list-tile-title>Property Size:</v-list-tile-title>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile v-for="(property, idx) in propertySizes" :key="idx" @click="">
                      <v-list-tile-title>{{ property.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-list-tile v-for="(item, idx) in filter_list" :key="idx" @click="">
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile>
                <v-menu offset-x max-width="290px" min-width="290px">
                  <v-list-tile slot="activator">
                    <v-list-tile-title>Contact Start Date:</v-list-tile-title>
                  </v-list-tile>
                  <v-date-picker scrollable no-title light></v-date-picker>
                </v-menu>
                <v-menu offset-x max-width="290px" min-width="290px">
                  <v-list-tile slot="activator">
                    <v-list-tile-title>Contact End Date:</v-list-tile-title>
                  </v-list-tile>
                  <v-date-picker scrollable no-title light></v-date-picker>
                </v-menu>
                <v-list-tile @click="addressForm = true">
                  <v-list-tile-title>Region / Area / Address</v-list-tile-title>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn round color="yground" @click="saveFilter = true">Save Filter</v-btn>
                <v-btn round color="yground">Apply Filter</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-menu v-model="sort" :close-on-content-click="false" offset-y>
            <v-btn slot="activator" flat>
              Sort
              <v-icon right dark>mdi-menu-down</v-icon>
            </v-btn>
          </v-menu>
          <div style="display: inline-block;">
            <input-tag v-model="tags" class="filter-tagging"></input-tag>
          </div>
        </div>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12 v-for="(property, idx) in properties" :key="idx">
          <v-card tile flat class="card-border">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm4 md3 lg2>
                  <v-card-text max-height="150px">
                    <img :src="property.image" alt="" width="100%"/>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 sm8 md9 lg10>
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
    <v-dialog v-model="addressForm" persistent max-width="500">
      <v-card light style="border: solid 1px #FBBA23;">
        <div align="right">
          <v-btn icon @click="addressForm = false" class="yground--text">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-layout row wrap align-center pb-3 pl-3 pr-3>
          <v-flex xs12>
            <v-card-title class="headline">Region / Area / Address:</v-card-title>
            <v-card-actions>
              <v-text-field single-line outline class="custom-round"></v-text-field>
            </v-card-actions>
          </v-flex>
          <v-btn color="yground" round @click="addressForm = false">
            Save
          </v-btn>
          <v-btn class="yground black--text" outline round @click="addressForm = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="saveFilter" persistent max-width="500">
      <v-card light style="border: solid 1px #FBBA23;">
        <div align="right">
          <v-btn icon @click="saveFilter = false" class="yground--text">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-layout row wrap align-center pb-3 pl-3 pr-3>
          <v-flex xs12>
            <v-card-title class="headline">Name of Filter:</v-card-title>
            <v-card-actions>
              <v-text-field single-line outline class="custom-round"></v-text-field>
            </v-card-actions>
          </v-flex>
          <v-btn color="yground" round @click="saveFilter = false">
            Save
          </v-btn>
          <v-btn class="yground black--text" outline round @click="saveFilter = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import InputTag from 'vue-input-tag'
export default {
  name: 'ListView',
  components: {
    InputTag
  },
  data() {
    return {
      filter: false,
      sort: false,
      addressForm: false,
      saveFilter: false,
      tags: ["Residential", "Ameen Ramadan", "10-10-2018 - 11-3-2020"],
      no_image: require('@/assets/img/No_image_available.svg'),
      properties: [
        {
          propertyId: 1,
          address: '24 / 1 Ward Avenue Potts Point NSW 2011',
          //image: 'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1',
          image:'',
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
      ],
      filter_list: [
        {
          name: 'Tenant Name:',
          value: 'Ameen Ramadan'
        },
        {
          name: 'Owner Name:',
          value: 'John Kazal'
        },
        {
          name: 'Region / Area / Address:',
          value: 'Ward Avenue'
        }
      ],
      propertyTypes: [
        {
          name: 'None',
          value: 0
        },
        {
          name: 'Residential',
          value: 1
        },
        {
          name: 'Industrial',
          value: 2
        },
        {
          name: 'Commercial',
          value: 3
        }
      ],
      propertySizes: [
        {
          name: 'None',
          value: 0
        },
        {
          name: '100m2 - 200m2',
          value: 1
        },
        {
          name: '200m2 - 500m2',
          value: 2
        },
        {
          name: '500m2 - 1000m2',
          value: 3
        }
      ],
      tenantNames: ['Ameen Ramadan', 'Taras Woronjanski', 'Bart Fart'],
      ownerNames: ['John Kazal', 'Taras Woronjanski', 'Bart Fart']
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
