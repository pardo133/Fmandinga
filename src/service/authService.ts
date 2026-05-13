import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_API_URL;

export const SESSION_MINUTES = 120;

const cookieOptions = (): Cookies.CookieAttributes => ({
  expires: new Date(Date.now() + SESSION_MINUTES * 60 * 1000),
  secure: window.location.protocol === 'https:',
  sameSite: 'strict',
});

const TOKEN_KEY = 'authToken';

const saveToken = (token: string) => {
  Cookies.set('token', token, cookieOptions());
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = (): string | undefined =>
  Cookies.get('token') ?? localStorage.getItem(TOKEN_KEY) ?? undefined;

const clearToken = () => {
  Cookies.remove('token');
  localStorage.removeItem(TOKEN_KEY);
};

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials: { correo: string; password: string }) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  const { token } = response.data;

  if (token) {
    saveToken(token);
  }

  return response.data;
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/users/refresh`);
    const { token } = response.data;
    if (token) {
      saveToken(token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const logout = () => {
  clearToken();
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const forgotPassword = async (correo: string) => {
  const response = await axios.post(`${API_URL}/users/forgot-password`, { correo });
  return response.data;
};

export const registerUser = async (userData: {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};
