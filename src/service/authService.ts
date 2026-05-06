import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = (import.meta as any).env.VITE_API_URL;

// --- CONFIGURACIÓN DE AXIOS ---
// Mueve el interceptor aquí arriba para asegurar que se aplique a todas las funciones
axios.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        // Importante: Usar la propiedad correcta de axios para los headers
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- FUNCIONES DEL SERVICIO ---

export const registerUser = async (userData: any) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        return response.data;
    } catch (error: any) {
        // Tip: En el TFM queda muy bien manejar el error para que no sea "any"
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (credentials: any) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        
        // Desestructuramos el token de la respuesta
        const { token } = response.data;

        if (token) {
            // Guardamos la cookie
            // Nota: secure: true solo funciona en HTTPS. 
            // Si en desarrollo usas HTTP, cámbialo a false o quítalo temporalmente.
            Cookies.set('token', token, { 
                expires: 1, 
                secure: false, // Cámbialo a true cuando subas a producción (con HTTPS)
                sameSite: 'strict' 
            });
        }

        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const logout = () => {
    Cookies.remove('token');
    // Tip: Si usas window.location.href = '/login' aquí, limpias la app por completo
};