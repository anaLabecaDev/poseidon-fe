import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { APIEndpoints, User } from '@/types/api-types'

const getUser = (): Promise<User> => {
  const response = api.get(APIEndpoints.GET_USER)

  return response
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}
