// AuthComponents.tsx

import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

// Loading Spinner Component
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// UseAuth Hook
const UseAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ApiUrl = import.meta.env.VITE_USER_AUTH_API;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/check-auth`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.authenticated);
        setError(null);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setError("Failed to check authentication status");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [ApiUrl]);

  const logout = async () => {
    try {
      await axios.post(`${ApiUrl}/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed");
    }
  };

  return useMemo(
    () => ({ isAuthenticated, isLoading, error, logout }),
    [isAuthenticated, isLoading, error],
  );
};

// ProtectedRoute Component
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, error } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
};

export { UseAuth, ProtectedRoute };
