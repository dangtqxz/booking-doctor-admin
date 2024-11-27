import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import useRouteElement from './useRouteElement';
const App: React.FC = () => {
  const routeElement = useRouteElement();
  return (
    <BrowserRouter>
      <Layout>
        {routeElement}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
