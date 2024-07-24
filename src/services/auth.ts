// src/services/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
  setAuthToken('');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
  return null;
};

