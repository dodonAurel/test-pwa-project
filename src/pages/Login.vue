<script setup lang="ts">
import { RULES } from '@/constants/forms'
import { reactive, ref } from 'vue'
import type { SubmitEventPromise } from 'vuetify/lib/index.mjs'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const formData = reactive({
  email: '',
  password: ''
})

const onSubmit = async (event: SubmitEventPromise) => {
  loading.value = true

  const results = await event

  if (!results.valid) {
    loading.value = false
    return
  }

  await auth.signIn(formData)

  loading.value = false
}
</script>

<template>
  <v-form class="form" v-model="valid" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col>
          <h1>Login</h1>
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
          />
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
            required
            @click:appendInner="showPassword = !showPassword"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn :loading="loading" type="submit" block text="Login"></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <p>Don't have an account? | <router-link to="/register">Register now</router-link></p>
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
