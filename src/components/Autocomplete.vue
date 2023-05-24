<script setup lang="ts">
import type { AutocompleteItems } from '@/types'
import { RULES } from '@/constants/forms'
import { computed } from 'vue'
import { ref } from 'vue'
import { useFetch } from '@/hooks/useFetch'
import { watch } from 'vue'

const props = defineProps<{
  modelValue: string | null
  label: string
  fetchUrl?: string
  page?: number
  itemsPerPage?: number
  required?: boolean
  parseResult?: (result: any) => any
}>()
const emit = defineEmits(['update:modelValue'])

const search = ref('')

const defaultParams = {
  page: props.page || 1,
  itemsPerPage: props.itemsPerPage || 10
}

const { data, loading, refetch } = useFetch<AutocompleteItems>(props.fetchUrl || '', {
  skip: !props.fetchUrl,
  params: {
    ...defaultParams,
    name: search.value
  },
  parseResult: props.parseResult
})

watch(search, async (currentValue, oldValue) => {
  if (
    currentValue.length &&
    oldValue !== currentValue &&
    !data.value!.find(({ title }) => title === currentValue)
  ) {
    await refetch({
      params: {
        page: 1,
        itemsPerPage: 10,
        name: currentValue
      }
    })
  }
})

const select = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <v-autocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="data"
    :rules="required ? RULES.required : []"
    :label="label"
    :required="required"
  />
</template>
