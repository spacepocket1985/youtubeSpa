import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';
import { isToken } from '../utils/localStorageActions';
import { Header } from '../components/layout/Header';

type PrivateRouteProps = {
  element: React.ComponentType;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  if (!isToken()) {
    return <Navigate to={RoutePaths.SignInPage} replace />;
  }

  return (
    <>
      <Header />
      <Element />
    </>
  );
};

export default PrivateRoute;
