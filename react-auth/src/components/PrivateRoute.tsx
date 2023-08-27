import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

//@ts-ignore
const PrivateRoute = ({ children, fallback }) => {
  const isAuthenticated = checkIfUserIsAuthenticated();

  return isAuthenticated ? children : <Navigate to={fallback} />;
};

const checkIfUserIsAuthenticated = (): boolean => {
  const token = window.localStorage.getItem('accessToken');
  return Boolean(token);
};

export default PrivateRoute;
