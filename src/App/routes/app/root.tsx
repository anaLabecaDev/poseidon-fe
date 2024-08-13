import { Divider, Layout, Typography } from 'antd'
import { useUsers } from '@/lib/auth/auth'

const { Header, Footer, Content, Sider } = Layout
const { Text } = Typography

const menuItems = ['calculator', 'employees', 'itineraries', 'proposals'] as const

type MenuItems = (typeof menuItems)[number]

const items: Record<MenuItems, { label: string; path: string }> = {
  calculator: { label: 'Calculator', path: '/calculator' },
  employees: { label: 'Employees', path: '/employees' },
  itineraries: { label: 'Itineraries', path: '/itineraries' },
  proposals: { label: 'Proposals', path: '/proposals' },
}

const AppRoot = () => {
  const { data, isLoading } = useUsers()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <Layout>
      <Header>
        <Text strong style={{ color: '#FFFFFF' }}>
          Poseidon
        </Text>
        <Divider type="vertical" style={{ borderColor: '#FFFFFF' }} />
        <Text style={{ color: '#FFFFFF' }}>{`${data?.firstName} ${data?.lastName}`}</Text>
      </Header>
      <Layout>
        <Sider style={{ background: '#FFFFFF' }}></Sider>
        <Content style={{ background: '#F0F0F0' }}>
          <Text>{`User name ${data?.firstName}`}</Text>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Nexus Group ©2024</Footer>
    </Layout>
  )
}

export default AppRoot
