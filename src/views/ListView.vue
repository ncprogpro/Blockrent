<template>
  <v-app>
    <loading :active.sync="isLoading" :is-full-page="true" loader="bars" color="orange"> </loading>
    <v-toolbar flat color="grey" class="search-toolbar">
      <v-text-field
        xs12
        sm5
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
            <v-card class="multi-step-menu" light>
              <v-list class="filter-list">
                <v-menu offset-x light>
                  <v-list-tile slot="activator">
                    <v-layout row wrap style="display: block;">
                      <div>Custom Filter:</div>
                      <div>{{ filterSet.custom_filter }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile @click="clearFilter">
                      <v-list-tile-title>None</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile v-for="(fil_set, idx) in filterSetList" :key="idx" @click="selectCustomFilter(idx)">
                      <v-list-tile-title>{{ fil_set.filter_name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-x light>
                  <v-list-tile slot="activator">
                    <v-layout style="display: block;">
                      <div>Property Type:</div>
                      <div>{{ filterSet.property_type }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile
                      v-for="(property, idx) in propertyTypes"
                      :key="idx"
                      @click="filterSet.property_type = property.name"
                    >
                      <v-list-tile-title>{{ property.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-x light>
                  <v-list-tile slot="activator">
                    <v-layout style="display: block;">
                      <div>Property Size:</div>
                      <div>{{ filterSet.property_size.name }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile
                      v-for="(property, idx) in propertySizes"
                      :key="idx"
                      @click="filterSet.property_size = property"
                    >
                      <v-list-tile-title>{{ property.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-x light>
                  <v-list-tile slot="activator">
                    <v-layout style="display: block;">
                      <div>Tenant Name:</div>
                      <div>{{ filterSet.tenant_name }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile
                      v-for="(property, idx) in tenantNames"
                      :key="idx"
                      @click="filterSet.tenant_name = property"
                    >
                      <v-list-tile-title>{{ property }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-x light>
                  <v-list-tile slot="activator">
                    <v-layout style="display: block;">
                      <div>Owner Name:</div>
                      <div>{{ filterSet.owner_name }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-list dense>
                    <v-list-tile
                      v-for="(property, idx) in ownerNames"
                      :key="idx"
                      @click="filterSet.owner_name = property"
                    >
                      <v-list-tile-title>{{ property }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-x max-width="290px" min-width="290px" light>
                  <v-list-tile slot="activator">
                    <v-layout style="display: block;">
                      <div>Contact Start Date:</div>
                      <div>{{ filterSet.start_date }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-date-picker scrollable no-title light v-model="filterSet.start_date" :max="filterSet.end_date"></v-date-picker>
                </v-menu>
                <v-menu offset-x max-width="290px" min-width="290px" light>
                  <v-list-tile slot="activator">
                    <v-layout style="display: block;">
                      <div>Contact End Date:</div>
                      <div>{{ filterSet.end_date }}</div>
                    </v-layout>
                  </v-list-tile>
                  <v-date-picker scrollable no-title light v-model="filterSet.end_date" :min="filterSet.start_date"></v-date-picker>
                </v-menu>
                <v-list-tile @click="addressForm = true">
                  <v-layout style="display: block;">
                    <div>Region / Area / Address:</div>
                    <div>{{ filterSet.address }}</div>
                  </v-layout>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn round color="yground" @click="saveFilter = true">Save Filter</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn round color="yground">Apply Filter</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-menu v-model="sort" offset-y light>
            <v-btn slot="activator" flat>
              Sort
              <v-icon right dark>mdi-menu-down</v-icon>
            </v-btn>
            <v-card class="sort-card-border" light>
              <v-list class="sort-list">
                <v-list-tile v-for="(sort_set, idx) in sortList" :key="idx" @click="selectSortBy(idx)">
                  <v-list-tile-title>
                    <template v-if="sortSet.type === sort_set.type">
                      <v-icon v-if="sortSet.sort_way">mdi-arrow-up</v-icon>
                      <v-icon v-else>mdi-arrow-down</v-icon>
                    </template>
                    <v-icon v-else>mdi-dots-horizontal</v-icon>
                    {{ sort_set.text }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-menu>
          <div style="display: inline-block;">
            <input-tag v-model="tags" class="filter-tagging"></input-tag>
          </div>
        </div>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12 v-for="(property, idx) in filteredList" :key="idx">
          <v-card tile flat class="card-border">
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 sm4 md3 lg2>
                  <v-card-text max-height="150px">
                    <img :src="no_image" alt="" width="100%" />
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
                          <v-btn flat @click="viewProperty(property)" class="primary--text flat-remove-padding">
                            View Application&nbsp;<i class="fa fa-chevron-circle-right"></i>
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md3>
                        <v-container>
                          <v-layout column align-end justify-end>
                            <div class="font-weight-bold text-right" align="right">Ejari Contract/Certificate No.:</div>
                            <div align="right">{{ property.ejari_no }}</div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-container text-align="right">
                          <v-layout column align-end justify-end>
                            <div class="font-weight-bold" align="right">Tenant name:</div>
                            <div align="right">{{ property.tenant_name }}</div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-container>
                          <v-layout column align-end justify-end>
                            <div class="font-weight-bold" align="right">Contract Period:</div>
                            <div align="right">{{ property.start_date }} to {{ property.end_date }}</div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                      <v-flex xs12 sm6 md3 class="deposit-status">
                        <v-container>
                          <v-layout column align-end justify-end>
                            <span class="font-weight-bold">Security Deposit Held: </span>
                            <span class="text-capitalize">{{ property.total_contract_value }}</span>
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
                  <v-card-text>{{ new Date(property.updated_at).toDateString() }} &nbsp;Last Modified</v-card-text>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-card-text>
                    <v-layout row wrap justify-end align-end>
                      <v-flex xs12 sm6 md3>
                        <v-layout align-center justify-end>
                          <v-icon class="mx-1" v-if="property.deposit_holding === 'Deposit Paid'" color="blue"
                            >mdi-check</v-icon
                          >
                          <v-icon class="mr-1" v-else color="red">mdi-alert-circle</v-icon>
                          <span class="subheading">{{ property.deposit_holding }}</span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-layout align-center justify-end>
                          <v-icon class="mx-1" v-if="property.status === 'Active'" color="blue">mdi-check</v-icon>
                          <v-icon class="mr-1" v-else color="red">mdi-alert-circle</v-icon>
                          <span class="subheading">{{ property.status }}</span>
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
          <v-btn icon @click="setAddressFilter(false)" class="yground--text">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-layout row wrap align-center pb-3 pl-3 pr-3>
          <v-flex xs12>
            <v-card-title class="headline">Region / Area / Address:</v-card-title>
            <v-card-actions>
              <v-text-field single-line outline class="custom-round" v-model="addressFilterValue"></v-text-field>
            </v-card-actions>
          </v-flex>
          <v-btn color="yground" round @click="setAddressFilter(true)">
            Save
          </v-btn>
          <v-btn class="yground black--text" outline round @click="setAddressFilter(false)">
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
              <v-text-field single-line outline class="custom-round" v-model="filterName"></v-text-field>
            </v-card-actions>
          </v-flex>
          <v-btn color="yground" round @click="storeFilters">
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'ListView',
  components: {
    InputTag,
    Loading
  },
  data() {
    return {
      filter: false,
      sort: false,
      addressForm: false,
      saveFilter: false,
      addressFilterValue: '',
      filterName: '',
      tags: [],
      no_image: require('@/assets/img/No_image_available.svg'),
      applications: [],
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
          value: 0,
          from: 0,
          to: 0
        },
        {
          name: '100m2 - 200m2',
          value: 1,
          from: 100,
          to: 200
        },
        {
          name: '200m2 - 500m2',
          value: 2,
          from: 200,
          to: 500
        },
        {
          name: '500m2 - 1000m2',
          value: 3,
          from: 500,
          to: 1000
        }
      ],
      tenantNames: [],
      ownerNames: [],
      isLoading: true,
      filterSet: {
        custom_filter: 'None',
        property_type: 'None',
        property_size: {
          name: 'None',
          value: 0,
          from: 0,
          to: 0
        },
        tenant_name: 'None',
        owner_name: 'None',
        start_date: '',
        end_date: '',
        address: 'None'
      },
      filterSetList: [],
      sortSet: {
        type: 0,
        text: '',
        sort_way: 0
      },
      sortList: [
        {
          type: 1,
          text: 'Alphabetic order of Address',
          sort_way: 0
        },
        {
          type: 2,
          text: 'Alphabetic order of Tenant name',
          sort_way: 0
        },
        {
          type: 3,
          text: 'Alphabetic order of Owner name',
          sort_way: 0
        },
        {
          type: 4,
          text: 'Security Deposit Funds value',
          sort_way: 0
        },
        {
          type: 5,
          text: 'Contract Termination Date',
          sort_way: 0
        },
        {
          type: 6,
          text: 'Contract Start Date',
          sort_way: 0
        }
      ]
    }
  },
  beforeCreate() {
    this.$store
      .dispatch('getApplicationList')
      .then(resp => {
        this.isLoading = false
        this.setApplicationList(resp.data.objects)
      })
      .catch(err => {
        this.isLoading = false
      })

    this.$store
      .dispatch('getFilterList')
      .then(resp => {
        this.filterSetList = resp.data.objects
      })
      .catch(err => {
        this.isLoading = false
      })
  },
  methods: {
    viewProperty(property) {
      const propertyId = property.id
      const path = `/dashboard/detail/${propertyId}`
      this.$router.push(path)
    },
    setApplicationList(payload) {
      this.applications = payload
      this.applications.forEach(app => {
        this.tenantNames.push(app.tenant_name)
        this.ownerNames.push(app.owner_name)
      })
      const arrayUnique = function(arr) {
        return arr.filter(function(item, index) {
          return arr.indexOf(item) >= index
        })
      }
      this.tenantNames = arrayUnique(this.tenantNames)
      this.ownerNames = arrayUnique(this.ownerNames)
    },
    setAddressFilter(value) {
      this.addressForm = false
      if (value) {
        this.filterSet.address = this.addressFilterValue
      }
    },
    storeFilters() {
      this.saveFilter = false
      this.$store
        .dispatch('storeFilterSet', { filter_set: this.filterSet, filter_name: this.filterName })
        .then(resp => {
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
        })
    },
    selectCustomFilter(idx) {
      this.filterSet.custom_filter = this.filterSetList[idx].filter_name
      this.filterSet.property_type = this.filterSetList[idx].property_type
      this.filterSet.property_size.name = this.filterSetList[idx].property_size_name
      this.filterSet.property_size.value = this.filterSetList[idx].property_size_level
      this.filterSet.property_size.from = this.filterSetList[idx].property_size_from
      this.filterSet.property_size.to = this.filterSetList[idx].property_size_to
      this.filterSet.tenant_name = this.filterSetList[idx].tenant_name
      this.filterSet.owner_name = this.filterSetList[idx].owner_name
      this.filterSet.start_date = this.filterSetList[idx].start_date
      this.filterSet.end_date = this.filterSetList[idx].end_date
      this.filterSet.address = this.filterSetList[idx].address
    },
    clearFilter() {
      this.filterSet.custom_filter = 'None'
      this.filterSet.property_type = 'None'
      this.filterSet.property_size.name = 'None'
      this.filterSet.property_size.value = 0
      this.filterSet.property_size.from = 0
      this.filterSet.property_size.to = 0
      this.filterSet.tenant_name = 'None'
      this.filterSet.owner_name = 'None'
      this.filterSet.start_date = ''
      this.filterSet.end_date = ''
      this.filterSet.address = 'None'
    },
    selectSortBy(idx) {
      this.sortSet = this.sortList[idx]
      if (this.sortSet.type === 1) this.applications.sort(this.sortByAddress)
      else if (this.sortSet.type === 2) this.applications.sort(this.sortByTenantName)
      else if (this.sortSet.type === 3) this.applications.sort(this.sortByOwnerName)
      else if (this.sortSet.type === 4) this.applications.sort(this.sortByDepositFund)
      else if (this.sortSet.type === 5) this.applications.sort(this.sortByContractTerminationDate)
      else if (this.sortSet.type === 6) this.applications.sort(this.sortByContractStartDate)
      this.sortList[idx].sort_way = !this.sortSet.sort_way
    },
    sortByAddress(a, b) {
      if (this.sortSet.sort_way) {
        if (a.address < b.address) return -1
        if (a.address > b.address) return 1
      } else {
        if (a.address > b.address) return -1
        if (a.address < b.address) return 1
      }
      return 0
    },
    sortByTenantName(a, b) {
      if (this.sortSet.sort_way) {
        if (a.tenant_name < b.tenant_name) return -1
        if (a.tenant_name > b.tenant_name) return 1
      } else {
        if (a.tenant_name > b.tenant_name) return -1
        if (a.tenant_name < b.tenant_name) return 1
      }
      return 0
    },
    sortByOwnerName(a, b) {
      if (this.sortSet.sort_way) {
        if (a.owner_name < b.owner_name) return -1
        if (a.owner_name > b.owner_name) return 1
      } else {
        if (a.owner_name > b.owner_name) return -1
        if (a.owner_name < b.owner_name) return 1
      }
      return 0
    },
    sortByDepositFund(a, b) {
      if (this.sortSet.sort_way) {
        if (a.total_contract_value < b.total_contract_value) return -1
        if (a.total_contract_value > b.total_contract_value) return 1
      } else {
        if (a.total_contract_value > b.total_contract_value) return -1
        if (a.total_contract_value < b.total_contract_value) return 1
      }
      return 0
    },
    sortByContractTerminationDate(a, b) {
      if (this.sortSet.sort_way) {
        if (a.end_date < b.end_date) return -1
        if (a.end_date > b.end_date) return 1
      } else {
        if (a.end_date > b.end_date) return -1
        if (a.end_date < b.end_date) return 1
      }
      return 0
    },
    sortByContractStartDate(a, b) {
      if (this.sortSet.sort_way) {
        if (a.start_date < b.start_date) return -1
        if (a.start_date > b.start_date) return 1
      } else {
        if (a.start_date > b.start_date) return -1
        if (a.start_date < b.start_date) return 1
      }
      return 0
    }
  },
  computed: {
    filteredList() {
      return this.applications.filter(application => {
        if (
          this.filterSet.property_type &&
          this.filterSet.property_type !== 'None' &&
          application.property_usage !== this.filterSet.property_type
        )
          return false
        if (
          this.filterSet.property_size.value &&
          (application.property_size > this.filterSet.property_size.to ||
            application.property_size < this.filterSet.property_size.from)
        )
          return false
        if (this.filterSet.start_date && this.filterSet.start_date !== 'None') {
          const start_filter = new Date(this.filterSet.start_date)
          const start_value = new Date(application.start_date)
          if (start_filter > start_value) return false
        }
        if (this.filterSet.end_date && this.filterSet.end_date !== 'None') {
          const end_filter = new Date(this.filterSet.end_date)
          const end_value = new Date(application.end_date)
          if (end_filter < end_value) return false
        }
        if (
          this.filterSet.address &&
          this.filterSet.address !== 'None' &&
          application.address.search(this.filterSet.address) === -1
        )
          return false
        if (
          this.filterSet.tenant_name &&
          this.filterSet.tenant_name !== 'None' &&
          this.filterSet.tenant_name !== application.tenant_name
        )
          return false
        if (
          this.filterSet.owner_name &&
          this.filterSet.owner_name !== 'None' &&
          this.filterSet.owner_name !== application.owner_name
        )
          return false

        return true
      })
    },
  },
  watch: {
    filterSet: {
      handler(val) {
        const tempTag = []
        if (val.address && val.address !== 'None') tempTag.push(val.address)
        if (val.owner_name && val.owner_name !== 'None') tempTag.push(val.owner_name)
        if (val.tenant_name && val.tenant_name !== 'None') tempTag.push(val.tenant_name)
        if (val.property_type && val.property_type !== 'None') tempTag.push(val.property_type)
        if (val.start_date && val.start_date !== 'None') tempTag.push(val.start_date)
        if (val.end_date && val.end_date !== 'None') tempTag.push(val.end_date)
        if (val.property_size.value) tempTag.push(val.property_size.name)
        this.tags = tempTag
      },
      deep: true
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
