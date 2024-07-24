import { Button, Layout, Typography } from 'antd'

export const MainErrorFallback = () => {
  return (
    <Layout style={{ minHeight: '100vh' }} role="alert">
      <Layout.Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography.Title> {'Ooops, something went wrong :( '}</Typography.Title>
        <Button size={'large'} onClick={() => window.location.assign(window.location.origin)}>
          Refresh
        </Button>
      </Layout.Content>
    </Layout>
  )
}
