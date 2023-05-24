import { ref, type UnwrapRef } from 'vue'

type LocalStorageOptions<Value> = {
  key: string
  defaultValue?: Value | null
  serializer?: (value: Value | null) => string
  deserializer?: (serialized: string) => Value | null
}

export const useLocalStorage = <Value>({
  key,
  defaultValue,
  serializer,
  deserializer
}: LocalStorageOptions<Value>) => {
  const item = ref<Value | null>(defaultValue ?? null)

  const storedItem = localStorage.getItem(key)

  if (storedItem) {
    item.value = deserializer ? deserializer(storedItem) : JSON.parse(storedItem)
  }

  const store = (value: Value) => {
    const serialized = serializer ? serializer(value) : JSON.stringify(value)

    localStorage.setItem(key, serialized)

    item.value = value as UnwrapRef<NonNullable<Value>>
  }

  const clear = () => {
    item.value = null
    localStorage.removeItem(key)
  }

  return { item, store, clear }
}
