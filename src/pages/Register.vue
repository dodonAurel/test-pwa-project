<script setup lang="ts">
import RegisterFormStep1 from '@/components/RegisterFormStep1.vue'
import RegisterFormStep2 from '@/components/RegisterFormStep2.vue'
import type { RegisterFormData } from '@/types/forms'
import { ref } from 'vue'
import { useFetch } from '@/hooks/useFetch'

const registerFormData = ref<Partial<RegisterFormData>>({})
const step = ref(0)

const { data, loading, refetch } = useFetch('/users/register', {
  skip: true,
  data: registerFormData,
  method: 'post'
})

const steps = [
  {
    component: RegisterFormStep1,
    submit: (formData: Partial<RegisterFormData>) => {
      registerFormData.value = formData
      step.value++
    }
  },
  {
    component: RegisterFormStep2,
    submit: async (formData: Partial<RegisterFormData>) => {
      registerFormData.value = { ...registerFormData.value, ...formData }

      await refetch()

      alert(JSON.stringify(data.value, null, 2))
    }
  }
]
</script>

<template>
  <component :is="loading || steps[step].component" :submit="steps[step].submit" />
</template>

<style scoped>
.form {
  width: 560px;
}
</style>
