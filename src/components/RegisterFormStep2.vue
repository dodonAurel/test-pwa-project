<script setup lang="ts">
import { COMPANY_SIZE } from '@/constants/forms'
import type { RegisterFormDataSecondStep } from '@/types/forms'
import { reactive, ref } from 'vue'
import type { SubmitEventPromise } from 'vuetify/lib/index.mjs'
import Autocomplete from './Autocomplete.vue'

const props = defineProps<{
  submit: (formData: RegisterFormDataSecondStep) => void
}>()

const valid = ref(false)
const loading = ref(false)

const formData = reactive({
  jobRole: null,
  memberships: {
    company: {
      name: null,
      size: null
    }
  }
})

const onSubmit = async (event: SubmitEventPromise) => {
  loading.value = true

  const results = await event

  loading.value = false

  if (!results.valid) {
    return
  }

  props.submit(formData)
}
</script>

<template>
  <v-form class="form" v-model="valid" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col>
          <h1>Information about you</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <autocomplete
            v-model="formData.jobRole"
            :parse-result="(result) => 
              result['hydra:member'].map((job: Record<string, string>) => ({
                title: job.name,
                value: job['@id']
              }))"
            label="Role *"
            fetch-url="/job_roles"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <autocomplete
            v-model="formData.memberships.company.name"
            :parse-result="(result) => 
              result['hydra:member'].map(({ name }: Record<string, string>) => ({
                title: name,
                value: name
              }))"
            label="Company name *"
            fetch-url="/companies"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="formData.memberships.company.size"
            :items="COMPANY_SIZE"
            label="Company size *"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn :loading="loading" type="submit" block text="Register"></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <p>Already have an account? | <router-link to="/login">Login now</router-link></p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped>
.form {
  width: 560px;
}
</style>
