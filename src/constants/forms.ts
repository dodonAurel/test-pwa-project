import type { AutocompleteItems } from '@/types'

const FIELD_REQUIRED = (value: string) => !!value || 'Field is required!'
export const RULES = {
  required: [FIELD_REQUIRED],
  email: [FIELD_REQUIRED, (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.'],
  password: [FIELD_REQUIRED, (value: string) => value.length >= 10 || 'Min 10 characters.']
}

export const COMPANY_SIZE: AutocompleteItems = [
  {
    title: '0-10 employees',
    value: '0-10'
  },
  {
    title: '11-50 employees',
    value: '11-50'
  }
]
