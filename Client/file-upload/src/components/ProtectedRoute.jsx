import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  const user = localStorage.getItem('auth_token')
  return user ? <Outlet/> : <Navigate to='/login' />;
};

export default ProtectedRoute;