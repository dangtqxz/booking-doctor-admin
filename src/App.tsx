import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useRouteElement from './useRouteElement';
const App: React.FC = () => {
  const routeElement = useRouteElement();
  return (
    <BrowserRouter>
        {routeElement}
    </BrowserRouter>
  );
};

export default App;
