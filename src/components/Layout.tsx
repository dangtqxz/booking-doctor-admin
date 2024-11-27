import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className='min-h-screen flex flex-col'>
      <Header />
      <Content className="p-4 md:p-0 flex-grow">{children}</Content>
      <Footer />
    </AntLayout>
  );
};

export default Layout;
