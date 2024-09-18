import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  // get token form browser ==========================
  const admin = localStorage.getItem('admin');
  return admin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAdminRoute;
