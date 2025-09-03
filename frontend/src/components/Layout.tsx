import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  BarChartOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Dropdown, Space, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import './Layout.css';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: t('dashboard'),
    },
    {
      key: '2',
      icon: <TeamOutlined />,
      label: t('clients'),
    },
    {
      key: '3',
      icon: <CalendarOutlined />,
      label: t('visits'),
    },
    {
      key: '4',
      icon: <ShoppingCartOutlined />,
      label: t('orders'),
    },
    {
      key: '5',
      icon: <CarOutlined />,
      label: t('Sales'),
    },
    {
      key: '6',
      icon: <BarChartOutlined />,
      label: t('reports'),
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: t('profile'),
    },
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: t('logout'),
    },
  ];

  const languageMenuItems: MenuProps['items'] = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'th',
      label: 'ไทย',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2>{collapsed ? 'CRM' : 'CRM System'}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Space style={{ marginRight: 16 }}>
              <Dropdown
                menu={{
                  items: languageMenuItems,
                  onClick: ({ key }) => changeLanguage(key),
                }}
                placement="bottomRight"
              >
                <Button icon={<GlobalOutlined />} />
              </Dropdown>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;