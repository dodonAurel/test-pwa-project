<script setup lang="ts">
import { useFetch } from '@/hooks/useFetch'

const id = '{id}'
const email = 'temp'

const { refetch } = useFetch(`/users/${id}/resend_verification_email`, {
  skip: true,
  params: {
    email
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Please confirm your email address</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>
          You should have received an email with a link to confirm your account. Please click the
          link you received to finish your subscription.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>Didn't receive the email? <a @click="() => refetch()">Resend now</a></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
