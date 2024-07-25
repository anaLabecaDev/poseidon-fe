import { useMsal } from '@azure/msal-react'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'

const apiInstance = axios.create({
  baseURL: env.API_URL,
})

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.withCredentials = true
  return config
}

apiInstance.interceptors.request.use(async (config) => {
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  if (account) {
    const response = await instance.acquireTokenSilent({
      scopes: ['a6c49e8c-e5ef-44e3-a9b3-f9e9a70a9146/.default'],
      account,
    })
    config.headers.Authorization = `Bearer ${response.accessToken}`
  }

  return config
})

apiInstance.interceptors.request.use(authRequestInterceptor)
apiInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { apiInstance }
