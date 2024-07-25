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
  // Clear localStorage
localStorage.removeItem('user');
    localStorage.removeItem("token")
    localStorage.removeItem("userId")

  // Clear any in-memory token
  setAuthToken('');

  // Clear specific cookies
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  // If you're using a specific domain, you might need to add it:
  // document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=yourdomain.com;';
  // document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=yourdomain.com;';
  // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=yourdomain.com;';
}

export const getCurrentUser = () => {
  // First, check if the user data is in localStorage
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }

  // If not in localStorage, check for a userdata cookie
  const cookies = document.cookie.split(';');
  const userDataCookie = cookies.find(cookie => cookie.trim().startsWith('user='));

  if (userDataCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
      // Store the user data in localStorage for future use
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.token) {
        setAuthToken(userData.token);
      }
      return userData;
    } catch (error) {
      console.error('Error parsing user data from cookie:', error);
    }
  }

  return null;
};

