import axios from 'axios';
import { Platform } from 'react-native';


const API_BASE_URL = __DEV__ 
  ? 'http://3.133.146.147' 
  : 'https:/3.133.146.147'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const register = async (name: string, email: string, password: string, role: string) => {
  try {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
      role
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getMe = async (token: string) => {
  try {
    const response = await api.get('/api/auth/me', { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get me error:', error);
    throw error;
  }
};
