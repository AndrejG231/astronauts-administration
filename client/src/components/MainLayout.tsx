import { Layout, Typography } from "antd"
import { FC, PropsWithChildren } from "react"

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
