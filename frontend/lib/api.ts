import axios from 'axios';
import Cookies from 'js-cookie'; 

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// INTERCEPTOR: Se ejecuta ANTES de cada petición
api.interceptors.request.use((config) => {
  // 1. Buscamos el token en las cookies
  const token = Cookies.get('auth_token');

  // 2. Si existe, lo pegamos en el Header de Autorización
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

