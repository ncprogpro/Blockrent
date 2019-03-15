<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <div class="title primary--text mb-5">Application Updates</div>
    <v-data-table :headers="headers" :items="updates" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.date.toDateString() }}</td>
        <td class="text-xs-right">{{ props.item.status }}</td>
        <td class="text-xs-right">
          <v-btn class="secondary--text" color="primary" @click.stop="platform = true">View</v-btn>
        </td>
      </template>
    </v-data-table>
    <dialog v-bind:dialog="dialog" title="Test Title"></dialog>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" dark v-on="on">
            Click Me
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>{{ title }}</v-card-title>

          <v-card-text>Latin Text etc.</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="platform = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ApplicationUpdates',
  props: {
    updates: Array
  },
  data() {
    return {
      headers: [
        {
          text: 'Description',
          align: 'left',
          sortable: false,
          value: 'string'
        },
        { text: 'Date', value: 'date' },
        { text: 'Status', value: 'string' },
        { text: '', value: 'carbs' }
      ],
      platform: false,
      dialog: false,
      title: ''
    }
  },
  methods: {
    viewUpdate() {
      this.dialog = true
    }
  }
}
</script>

<style scoped></style>
