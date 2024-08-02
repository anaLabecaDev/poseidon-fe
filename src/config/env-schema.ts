import { z } from 'zod'

export const EnvSchema = z.object({
  API_URL: z.string(),
  ENABLE_API_MOCKING: z
    .string()
    .refine((s) => s === 'true' || s === 'false')
    .transform((s) => s === 'true')
    .optional(),
  APP_URL: z.string().optional().default('http://localhost:3000'),
  APP_MOCK_API_PORT: z.string().optional().default('8080'),
  CLIENT_ID: z.string(),
  TENANT_ID: z.string(),
  AUTH_SCOPE: z.string(),
})

export type EnvSchemaType = z.infer<typeof EnvSchema>
