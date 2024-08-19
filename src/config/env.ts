import { EnvSchema } from '@/config/env-schema'

const createEnv = () => {
  const isTestEnv = import.meta.env.MODE === 'test'

  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr

    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value
    }

    return acc
  }, {})

  // Provide default/mock values for the test environment
  if (isTestEnv) {
    envVars['API_URL'] = envVars['API_URL'] || 'http://localhost:3000/api'
    envVars['CLIENT_ID'] = envVars['CLIENT_ID'] || 'mock-client-id'
    envVars['TENANT_ID'] = envVars['TENANT_ID'] || 'mock-tenant-id'
    envVars['AUTH_SCOPE'] = envVars['AUTH_SCOPE'] || 'mock-auth-scope'
  }

  const parsedEnv = EnvSchema.safeParse(envVars)

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid: ${Object.entries(
        parsedEnv.error.flatten().fieldErrors,
      )
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}`,
    )
  }

  return parsedEnv.data
}

export const env = createEnv()
