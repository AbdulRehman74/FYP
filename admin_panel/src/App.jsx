// import './App.css'
//
// function App() {
//
//   return (
//     <>
//
//     </>
//   )
// }
//
// export default App
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AppRouter from './AppRouter';
import './App.css';

const { Content } = Layout;

const App = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ padding: '20px' }}>
                    <AppRouter />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
