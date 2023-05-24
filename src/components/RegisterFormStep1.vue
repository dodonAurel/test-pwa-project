<script setup lang="ts">
import { RULES } from '@/constants/forms'
import Autocomplete from '@/components/Autocomplete.vue'
import { reactive, ref } from 'vue'
import type { SubmitEventPromise } from 'vuetify/lib/index.mjs'
import type { RegisterFormDataFirstStep } from '@/types/forms'

const props = defineProps<{
  submit: (formData: RegisterFormDataFirstStep) => void
}>()

const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const passwordConfirmation = ref('')

const formData = reactive({
  firstName: '',
  lastName: '',
  countryCode: null,
  email: '',
  password: ''
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
          <h1>Register</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.firstName"
            :rules="RULES.required"
            label="First name *"
            required
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="formData.lastName"
            :rules="RULES.required"
            label="Last name *"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <autocomplete
            v-model="formData.countryCode"
            :parse-result="(result) => 
              result['hydra:member'].map(({ isoCode2, name }: Record<string, string>) => ({
                title: name,
                value: isoCode2
              }))"
            label="Country *"
            fetch-url="/countries"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.email"
            :rules="RULES.email"
            label="Email *"
            type="email"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="RULES.password"
            label="Password *"
            hint="At least 10 characters"
            counter
            required
            @click:appendInner="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="passwordConfirmation"
            :rules="[
              ...RULES.password,
              (value) => formData.password === value || 'Passwords are not the same!'
            ]"
            label="Confirm passowrd *"
            type="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn :loading="loading" type="submit" block text="Continue"></v-btn>
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
