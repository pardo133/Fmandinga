import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { refreshToken, logout as authLogout, SESSION_MINUTES } from '../service/authService';
import Cookies from 'js-cookie';

export interface UserProfile {
  nombre: string;
  apellido: string;
  correo: string;
  role?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

interface UserContextType {
  user: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
  logout: () => void;
}

const USER_KEY = 'user';
const REFRESH_INTERVAL_MS = 90 * 1000;                       // cada 90 s
const IDLE_TIMEOUT_MS     = SESSION_MINUTES * 60 * 1000;     // 120 minutos

const readFromStorage = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(readFromStorage);

  // Marca cuándo fue la última interacción del usuario
  const lastActivityRef = useRef<number>(Date.now());

  // ── Actualizar lastActivity con cualquier interacción ──────────────────────
  useEffect(() => {
    const updateActivity = () => { lastActivityRef.current = Date.now(); };
    const events = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, updateActivity, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, updateActivity));
  }, []);

  // ── Auto-refresh + detección de inactividad ────────────────────────────────
  useEffect(() => {
    if (!user) return; // solo cuando hay sesión activa

    const doRefresh = async () => {
      const idleSinceMs = Date.now() - lastActivityRef.current;

      if (idleSinceMs >= IDLE_TIMEOUT_MS) {
        // Inactividad superior al timeout → cerrar sesión
        console.log('[Sesión] Timeout por inactividad — cerrando sesión');
        handleLogout();
        return;
      }

      // El usuario estuvo activo → renovar el token
      const ok = await refreshToken();
      if (!ok) {
        // El servidor rechazó la renovación (token ya expirado)
        console.log('[Sesión] Token expirado — cerrando sesión');
        handleLogout();
      }
    };

    const interval = setInterval(doRefresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.correo]); // re-ejecutar solo al iniciar/cerrar sesión

  // ── Helpers ────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    authLogout(); // limpia cookie y redirige a /login
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...(prev ?? ({} as UserProfile)), ...data };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated as UserProfile;
    });
  };

  const logout = () => {
    // Comprobación extra: si no hay cookie, la sesión ya expiró
    if (!Cookies.get('token')) {
      handleLogout();
      return;
    }
    handleLogout();
  };

  return (
    <UserContext.Provider value={{ user, updateProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
};
