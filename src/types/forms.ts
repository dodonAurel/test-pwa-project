export type RegisterFormDataFirstStep = {
  firstName: string
  lastName: string
  countryCode: string | null
  email: string
  password: string
}

export type RegisterFormDataSecondStep = {
  jobRole: string | null
  memberships: {
    company: {
      name: string | null
      size: string | null
    }
  }
}

export type RegisterFormData = RegisterFormDataFirstStep & RegisterFormDataSecondStep

export type LoginData = {
  email: string
  password: string
}
