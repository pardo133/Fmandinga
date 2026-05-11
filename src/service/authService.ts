import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_API_URL;

// Duración de la sesión en minutos — debe coincidir con expiresIn del JWT en el backend
export const SESSION_MINUTES = 120;

const cookieOptions = (): Cookies.CookieAttributes => ({
  // Date absoluta: ahora + SESSION_MINUTES
  expires: new Date(Date.now() + SESSION_MINUTES * 60 * 1000),
  secure: false,       // false para localhost (HTTP); true en producción (HTTPS)
  sameSite: 'strict',
});

// ── Interceptor de REQUEST — añade el token a todas las peticiones ────────────
axios.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

// ── Interceptor de RESPONSE — logout automático si el token expiró ────────────
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido → limpiar sesión y redirigir
      Cookies.remove('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth functions ────────────────────────────────────────────────────────────

export const loginUser = async (credentials: { correo: string; password: string }) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  const { token } = response.data;

  if (token) {
    Cookies.set('token', token, cookieOptions());
  }

  return response.data;
};

/**
 * Pide al backend un nuevo JWT de 2 minutos.
 * Llama a esto periódicamente mientras el usuario esté activo.
 * Devuelve true si la renovación fue exitosa, false si el token ya expiró.
 */
export const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/users/refresh`);
    const { token } = response.data;
    if (token) {
      Cookies.set('token', token, cookieOptions());
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const logout = () => {
  Cookies.remove('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
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
