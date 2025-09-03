import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

import Layout from './components/Layout'; 
import Dashboard from './app/dashboard/page';
import Customers from './app/customers/page';
import Visits from './app/visits/page';
import Orders from './app/orders/page';
import Sales from './app/sales/page';
import Reports from './app/reports/page';
import './App.css';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <Route>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/visits" element={<Visits />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/Sales" element={<Sales />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </Layout>
        </Route>
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;