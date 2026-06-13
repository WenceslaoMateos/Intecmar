import axios from 'axios';
import Cookies from 'js-cookie'; 

// Función para determinar la URL base dinámicamente
const getBaseUrl = () => {
  // 1. Si definiste una variable de entorno explícita, tiene prioridad
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 2. Si estamos en el navegador (cliente), usamos la IP actual y apuntamos al puerto 3000 del backend
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:3000`;
  }
  
  // 3. Fallback para cuando Next.js renderiza en el servidor (SSR)
  return 'http://localhost:3000';
};

export const API_BASE_URL = getBaseUrl();

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