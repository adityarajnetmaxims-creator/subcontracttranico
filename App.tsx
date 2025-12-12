import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';
import History from './pages/History';
import Profile from './pages/Profile';
import MyCustomers from './pages/MyCustomers';
import CustomerHistory from './pages/CustomerHistory';
import Notifications from './pages/Notifications';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/my-customers" element={<MyCustomers />} />
          <Route path="/customer-history/:customerId" element={<CustomerHistory />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;