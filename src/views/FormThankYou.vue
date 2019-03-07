<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6>
        <h1 class="primary--text my-5">Awesome!</h1>
        <div>
          <p>
            Thanks for submitting your application. We've just sent a confirmation email to both the Tenant & Landlord /
            Property owner.
          </p>
          <p>Once your application is confirmed, you can manage your application & security deposits.</p>
          <div class="text-xs-right mt-4">
            <v-btn align-center class="secondary--text" color="primary" to="/">Ok</v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <v-responsive>
          <v-img :aspect-ratio="16 / 9" :src="require('@/images/confirmation.png')"></v-img>
        </v-responsive>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'FormThankYou'
}
</script>

<style scoped>
p {
  font-size: 2rem;
}
</style>
