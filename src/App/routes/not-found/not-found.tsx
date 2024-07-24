import { Typography } from 'antd'

const { Title } = Typography

export const NotFoundRoute = () => {
  return (
    <>
      <div className="site-layout-background" id="content">
        <Title level={1} className="not-found-title">
          Not Found
        </Title>
      </div>
    </>
  )
}
