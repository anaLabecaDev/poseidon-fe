import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import { acquireAccessToken } from '@/lib/auth/auth-config'

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

async function addAuthHeader(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  try {
    const accessToken = await acquireAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  } catch (error) {
    console.error('Token acquisition failed:', error)
  }

  return config
}

// Handle request errors
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

// Handle responses
const onResponse = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
  return response
}

// Handle response errors
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // You can add more specific error handling here
  return Promise.reject(error)
}

// Set up interceptors
function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(addAuthHeader, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

// Apply interceptors to axiosInstance
const apiClient = setupInterceptorsTo(axiosInstance)

export default apiClient
