export const APIEndpoints = {
  GET_USER: '/users/me',
}

export interface User {
  id: string // UUID
  firstName: string
  lastName: string
  email: string // Email format
  company?: Company
  access?: Access
}

export interface Company {
  id: string // UUID
  name: string
  permissions?: string[]
}

export interface Access {
  globalAccess?: GlobalAccess
  companiesAccess?: CompanyAccess[]
}

export interface GlobalAccess {
  permissions: string[]
}

export interface CompanyAccess {
  id: string // UUID
  name: string
  permissions: string[]
}
