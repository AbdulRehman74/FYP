import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { PieChartOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const items = [
    { label: <Link to="/">Dashboard</Link>, key: '1', icon: <PieChartOutlined /> },
    { label: <Link to="/charts">Charts</Link>, key: '2', icon: <FileOutlined /> },
    { label: <Link to="/service-providers">Service Providers</Link>, key: '3', icon: <UserOutlined /> },
    { label: <Link to="/customers">Customers</Link>, key: '4', icon: <TeamOutlined /> },
];

const Sidebar = () => {
    return (
        // <></>
        <Sider theme={"light"} collapsible >

            <Menu theme={ "light"}  mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;
