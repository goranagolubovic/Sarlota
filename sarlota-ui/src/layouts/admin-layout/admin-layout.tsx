// Libs
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Layout, Menu, theme, Typography } from "antd";

import "./admin-layout.scss";

// Assets
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  CalendarOutlined,
  ContactsOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Pregled", "pregled", <DesktopOutlined />),
  getItem("Narudžbe", "narudzbe", <ShopOutlined />),
  getItem("Kalendar", "kalendar", <CalendarOutlined />),
  getItem("Statistika", "statistika", <PieChartOutlined />),
  getItem("Zaposleni", "zaposleni", <TeamOutlined />),
  getItem("Recepti", "recepti", <FileTextOutlined />),
  getItem("Kontakti", "kontakti", <ContactsOutlined />),
  getItem("Podešavanja", "podesavanja", <SettingOutlined />),
];

export const AdminLayout: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onNavigate = (item: MenuItem) => {
    navigate(`./${item?.key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["pregled"]}
          mode="inline"
          items={items}
          onClick={onNavigate}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="admin-header"
          style={{ paddingBlock: "10px", background: colorBgContainer }}
        >
          <div>
            <strong>Welcome,</strong> User
          </div>

          <div className="admin-header__avatar">
            <Text>Ime Prezime</Text>
            <Avatar
              size="large"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>Šarlota ©2023</Footer>
      </Layout>
    </Layout>
  );
};
