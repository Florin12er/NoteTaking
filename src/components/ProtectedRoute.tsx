// hooks/useAuth.ts
import { useState, useEffect } from "react";
import axios from "axios";
// hooks/useAuth.ts
const UseAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const ApiUrl = import.meta.env.VITE_USER_AUTH_API;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/check-auth`, {
                    withCredentials: true,
                });
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [ApiUrl]);

    return { isAuthenticated, isLoading };
};


// components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = UseAuth();

    if (isAuthenticated === null) {
        return null; // or a loading spinner
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export { ProtectedRoute, UseAuth };
