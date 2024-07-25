// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UseAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
};
// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = UseAuth();

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export {ProtectedRoute, UseAuth};

