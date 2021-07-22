import React from "react";
import Link from "next/link";
import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export const CustomLayout = (props) => {
  const usuario = false;
  return (
    <>
      <Layout>
        <Header className="header">
          <Menu theme="dark" mode="horizontal">
            {usuario ? (
              <>
                <Menu.Item key="1">Cerrar sesion</Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <div>
                    <Avatar size="small" icon={<UserOutlined />} />
                  </div>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="1">
                  {" "}
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <Link href="/crear-cuenta">
                    <a>Crear Cuenta</a>
                  </Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="usuarios">
                  <Menu.Item key="1">
                    <Link href="/admin">
                      <a>Administrador</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">vendedor</Menu.Item>

                  <Menu.Item key="3">
                    <Link href="/productos">
                      <a>comprador</a>
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Crear productos"
                >
                  <Menu.Item key="5">
                    <Link href="/newProduct">
                      <a>Crear nuevo productos</a>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Yaydoo test front ©2021 Created by Jose Antonio Serrano
        </Footer>
      </Layout>
    </>
  );
};
