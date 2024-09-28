import React from 'react';
import { Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.css';

const { Header } = Layout;

const AppHeader = () => {
    return (
        <Header   className="header">
            <div className={"logoText"}>
                Work
                <span className={"logoText2"}>{" Whiz"}</span>
            </div>
            <div className="profile">
                <UserOutlined />
            </div>
        </Header>
    );
};

export default AppHeader;
