import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { APIEndpoints, User } from '@/types/api-types'

const getUser = async (): Promise<User> => {
  const response = await apiClient.get(APIEndpoints.GET_USER)

  return response.data
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
  })
}
