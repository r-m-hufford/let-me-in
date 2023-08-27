import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// interface PrivateRouteProps {
//   path: string;
//   element: React.ReactNode;
//   fallback: string;
// }

//@ts-ignore
const PrivateRoute = ({ children }) => {
  const isAuthenticated = checkIfUserIsAuthenticated();

  return isAuthenticated ? children : <Navigate to={'/login'} />;
};

const checkIfUserIsAuthenticated = (): boolean => {
  const token = window.localStorage.getItem('accessToken');
  return Boolean(token);
};

export default PrivateRoute;
