// Libs
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Badge, Layout, Menu, theme, Typography } from "antd";

import "./admin-layout.scss";

// Assets
import {
  DesktopOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  CalendarOutlined,
  ContactsOutlined,
  LineChartOutlined,
  ShopOutlined,
  BellOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";

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
  getItem("Statistika", "statistika", <LineChartOutlined />),
  getItem("Recepti", "recepti", <FileTextOutlined />),
  getItem("Zaposleni", "zaposleni", <TeamOutlined />),
  getItem("Kontakti", "kontakti", <ContactsOutlined />),
  getItem("Profil", "podesavanja", <SettingOutlined />),
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
        className="sider"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        // style= {{background: colorBgContainer}}
      >
        <img
          className="logo"
          src={logo}
          alt="logo"
          style={{ paddingInline: collapsed ? "10px" : "30px" }}
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
            <Badge dot={true}>
              <BellOutlined />
            </Badge>
            <div>
              <Avatar
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <Text>Ime Prezime</Text>
            </div>
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
