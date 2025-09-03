import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

import Layout from './components/Layout'; 
import Dashboard from './pages/Dashboard/Dashboard';
import Clients from './pages/Clients/Clients';
import Visits from './pages/Visits/Visits';
import Orders from './pages/Orders/Orders';
import Models from './pages/Models/Models';
import Reports from './pages/Reports/Reports';
import './App.css';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/visits" element={<Visits />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/models" element={<Models />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </Layout>
        </Router>
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;