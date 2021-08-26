import React, { useState } from "react";
import { Layout, Menu, Input } from "antd";
import {
  PoweroffOutlined,
  DashboardFilled,
  SearchOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { Link } from "react-router-dom";
import MainHeader from "components/MainHeader";
import Logo from "assets/images/logo.png";
import Me from "assets/images/avatar.png";
import store from "store";
import { decoder as tokenDecoder } from "utils/tokenDecoder";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    store.remove("pp-token");
    window.location.replace("/login");
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="vh-100 sider"
      >
        <div className="logo-container">
          <img className="logo-img" alt="pesaspace_logo" src={Logo} />
          <span>Pesa Space</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="mt-5 site-layout-background"
        >
          <Menu.Item key={"1"} className="nav-menu" icon={<DashboardFilled />}>
            <Link to={"/"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key={"2"} className="nav-menu" icon={<PoweroffOutlined />}>
            <Link onClick={handleLogout}>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, backgroundColor: "#fff" }}>
          <div className="d-flex flex-row justify-content-between mx-3">
            <div className=" d-flex flex-row">
              <span className=" ml-4 text-dark default-text-title-props">
              <Input style={{width: "400px"}} size="smail" placeholder="Search loan items" prefix={<SearchOutlined />} />
              </span>
            </div>
            <div className="text-dark user-info d-flex flex-row">
              <img
                alt=""
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100px",
                  marginTop: "10px",
                }}
                src={Me}
              />
              <span className="mx-2 text-capitalize">
                <strong>{tokenDecoder()?.first_name || ""} {tokenDecoder()?.last_name || ""}</strong>
              </span>
            </div>
          </div>
        </Header>
        <Content
          className="overflow-auto"
          style={{
            // padding: 24,
            // minHeight: 280,
            height: "83vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
