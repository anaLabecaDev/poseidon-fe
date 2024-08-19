import { ReactNode } from 'react'
// import { CalculatorOutlined, CarOutlined, FormOutlined, TeamOutlined } from '@ant-design/icons'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { Divider, Layout, Spin, Typography } from 'antd'
import { useUsers } from '@/lib/auth/auth'

const { Header, Footer, Content, Sider } = Layout
const { Text } = Typography

// const menuItems = ['calculator', 'employees', 'itineraries', 'proposals'] as const

// type MenuItems = (typeof menuItems)[number]

// const items: Record<MenuItems, { label: string; path: string; icon: JSX.Element }> = {
//   calculator: { label: 'Calculator', path: '/calculator', icon: <CalculatorOutlined /> },
//   employees: { label: 'Employees', path: '/employees', icon: <TeamOutlined /> },
//   itineraries: { label: 'Itineraries', path: '/itineraries', icon: <CarOutlined /> },
//   proposals: { label: 'Proposals', path: '/proposals', icon: <FormOutlined /> },
// }

const DashboardHeader = () => {
  const { data: user, isLoading } = useUsers()

  return (
    <Header>
      <Text strong style={{ color: '#FFFFFF' }}>
        Poseidon
      </Text>
      <Divider type="vertical" style={{ borderColor: '#FFFFFF' }} />
      <AuthenticatedTemplate>
        {isLoading ? (
          <Spin />
        ) : (
          <Text style={{ color: '#FFFFFF' }}>
            {user ? `${user.firstName} ${user.lastName}` : 'n/A'}
          </Text>
        )}
      </AuthenticatedTemplate>
    </Header>
  )
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <DashboardHeader />
      <Layout>
        <Sider style={{ background: '#FFFFFF' }}></Sider>
        <Content style={{ background: '#F0F0F0' }}>{children}</Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Nexus Group ©2024</Footer>
    </Layout>
  )
}
