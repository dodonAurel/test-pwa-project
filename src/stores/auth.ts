import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFetch } from '@/hooks/useFetch'
import type { LoginData } from '@/types/forms'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const router = useRouter()

  const {
    item: token,
    store: setToken,
    clear: clearToken
  } = useLocalStorage<string | null>({
    key: 'authToken',
    serializer: (value) => value ?? '',
    deserializer: (value) => value
  })

  const {
    item: refreshToken,
    store: setRefreshToken,
    clear: clearRefreshToken
  } = useLocalStorage<string | null>({
    key: 'refreshToken',
    serializer: (value) => value ?? '',
    deserializer: (value) => value
  })

  const { refetch: authRequest } = useFetch('/authentication_token', {
    skip: true,
    method: 'post'
  })

  const signIn = async (data: LoginData) => {
    const { token, refresh_token } = await authRequest({ data })

    setToken(token)
    setRefreshToken(refresh_token)
  }

  const signOut = () => {
    clearToken()
    clearRefreshToken()
    user.value = null
    router.replace('/login')
  }

  return { token, isLoggedIn: !!token.value, signIn, signOut }
})
