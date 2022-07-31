import { FC, PropsWithChildren } from "react"
import { Layout, Typography } from "antd"

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout className="main">
      <Layout.Header>
        <Typography.Title>Astronauts Administration</Typography.Title>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}

export { MainLayout }
