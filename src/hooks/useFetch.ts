import { ref } from 'vue'
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

type CustomConfig = {
  skip?: boolean
  parseResult?: <T>(result: any) => T
}

export const useFetch = <T>(
  url: string,
  { skip, parseResult, ...config }: AxiosRequestConfig & CustomConfig = {}
) => {
  const data = ref<T>()
  const response = ref<AxiosResponse>()
  const error = ref<AxiosError>()
  const loading = ref(false)

  const fetch = async (newConfig: AxiosRequestConfig = {}) => {
    if (!url) {
      return
    }

    loading.value = true

    try {
      const result = await axios.request({
        url,
        baseURL: import.meta.env.VITE_API_BASE_URL,
        ...config,
        ...newConfig
      })

      response.value = result
      const finalData = parseResult ? parseResult<T>(result.data) : result.data

      data.value = finalData

      error.value = undefined

      return finalData
    } catch (err) {
      error.value = err as AxiosError
    } finally {
      loading.value = false
    }
  }

  if (!skip) {
    fetch()
  }

  return { data, response, error, loading, refetch: fetch }
}
