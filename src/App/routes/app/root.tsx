import { InteractionType } from '@azure/msal-browser'
import { MsalAuthenticationResult, MsalAuthenticationTemplate } from '@azure/msal-react'
import { Flex, Typography } from 'antd'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { loginRequest } from '@/lib/auth/auth-config'

const { Text, Title } = Typography

const ErrorComponent = ({ error }: MsalAuthenticationResult) => {
  return <Text type="danger">An Error Occurred: {error ? error.errorCode : 'unknown error'}</Text>
}

const Loading = () => {
  return <Text>Authentication in progress...</Text>
}

const AppRoot = () => {
  const authRequest = {
    ...loginRequest,
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <DashboardLayout>
        <Flex vertical align="center" justify="center">
          <Title level={1}>{'Olá'}</Title>
        </Flex>
      </DashboardLayout>
    </MsalAuthenticationTemplate>
  )
}

export default AppRoot
