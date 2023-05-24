<script setup lang="ts">
import { useFetch } from '@/hooks/useFetch'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(true)

const router = useRoute()

console.log(router)

const id = 'temp'

const { refetch } = useFetch(`/users/${id}/verify`, {
  params: {
    emailVerificationToken: 'temp'
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-if="loading">
        <v-progress-circular indeterminate color="green" />
      </v-col>
      <v-col v-else>
        <v-icon icon="mdi-checkbox-marked-circle" />

        <h1>Your email has been verified!</h1>

        <router-link to="/login">Login now</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
