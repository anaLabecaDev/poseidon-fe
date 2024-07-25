import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { Button, Spin } from 'antd'
import { useAuth } from '@/hooks/use-auth'

export const LoginRoute = () => {
  const { accounts } = useMsal()
  const { login } = useAuth()

  const handleLogin = () => login()

  return (
    <div className="login-form">
      <AuthenticatedTemplate>
        <div>
          <Spin size="large" />
        </div>
        <span className="spin-message">{accounts[0]?.username ?? 'No username found'}</span>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>{'Welcome please login'}</h1>
        <Button type="primary" onClick={handleLogin}>
          {'Login'}
        </Button>
      </UnauthenticatedTemplate>
    </div>
  )
}
