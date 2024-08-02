import { Button, Divider, Layout, Typography } from 'antd'
import { apiInstance } from '@/lib/api-client'

const { Header, Footer, Content, Sider } = Layout
const { Text } = Typography

const getMe = () => {
  console.log(apiInstance.interceptors)

  apiInstance
    .get('/users/me')
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

const AppRoot = () => {
  return (
    <Layout>
      <Header>
        <Text strong>Poseidon</Text>
        <Divider type="vertical" />
        <Text>User name</Text>
      </Header>
      <Layout>
        <Sider style={{ background: '#FFFFFF' }}></Sider>
        <Content style={{ background: '#F0F0F0' }}>
          <Button onClick={() => getMe()}>Test me</Button>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Nexus Group ©2024</Footer>
    </Layout>
  )
}

export default AppRoot
