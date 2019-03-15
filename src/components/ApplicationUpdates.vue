<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid>
    <div class="display-1 yground--text mb-5">Application Updates</div>
    <v-data-table :items="updates" class="update-table" hide-actions hide-headers="">
      <template v-slot:items="props">
        <td>{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.date.toDateString() }}</td>
        <td class="text-xs-center">
          <v-btn round class="secondary--text" color="yground" @click.stop="platform = true">View</v-btn>
        </td>
        <td class="text-xs-center">{{ props.item.status }}</td>
      </template>
    </v-data-table>
    <dialog v-bind:dialog="dialog" title="Test Title"></dialog>
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
