import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import ServiceProviders from './pages/ServiceProviders';
import Customers from './pages/Customers';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/service-providers" element={<ServiceProviders />} />
            <Route path="/customers" element={<Customers />} />
        </Routes>
    );
};

export default AppRouter;

