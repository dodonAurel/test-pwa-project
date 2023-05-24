<script setup lang="ts">
import { useFetch } from '@/hooks/useFetch'

const { data } = useFetch('/users/me')
</script>

<template>
  <h1>Dashboard</h1>
  <p>{{ JSON.stringify(data, null, 2) }}</p>
</template>
