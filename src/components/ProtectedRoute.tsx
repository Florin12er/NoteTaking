// api/axiosConfig.ts
import axios from 'axios';

const ApiUrl = import.meta.env.VITE_USER_AUTH_API;

const axiosInstance = axios.create({
    baseURL: ApiUrl,
    withCredentials: true,
});


// hooks/useAuth.ts
import { useState, useEffect } from "react";

interface AuthState {
    isAuthenticated: boolean | null;
    userId: number | null;
    error: string | null;
}

const UseAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: null,
        userId: null,
        error: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/check-auth');
                setAuthState({
                    isAuthenticated: response.data.authenticated,
                    userId: response.data.user_id,
                    error: null,
                });
            } catch (error) {
                setAuthState({
                    isAuthenticated: false,
                    userId: null,
                    error: "Authentication failed",
                });
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { ...authState, isLoading };
};

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isLoading } = UseAuth();

    if (isLoading) {
        return <div>Loading...</div>; // or a loading spinner component
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export { ProtectedRoute, UseAuth };

