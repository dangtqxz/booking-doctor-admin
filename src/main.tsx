import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from 'antd';
import 'swiper/css';
import { HelmetProvider } from 'react-helmet-async';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#FFC419',
          colorPrimaryText: '#000',
        },
      }}>
        <App />
      </ConfigProvider>
    </HelmetProvider>
  </React.StrictMode>
);
