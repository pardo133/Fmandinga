import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { refreshToken, logout as authLogout, SESSION_MINUTES } from '../service/authService';
import Cookies from 'js-cookie';

export interface UserProfile {
  nombre: string;
  apellido: string;
  correo: string;
  role?: 'user' | 'admin';
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
const REFRESH_INTERVAL_MS = 90 * 1000;
const IDLE_TIMEOUT_MS     = SESSION_MINUTES * 60 * 1000;

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

  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    const updateActivity = () => { lastActivityRef.current = Date.now(); };
    const events = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, updateActivity, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, updateActivity));
  }, []);

  useEffect(() => {
    if (!user) return;

    const doRefresh = async () => {
      const idleSinceMs = Date.now() - lastActivityRef.current;

      if (idleSinceMs >= IDLE_TIMEOUT_MS) {
        console.log('[Sesión] Timeout por inactividad — cerrando sesión');
        handleLogout();
        return;
      }

      const ok = await refreshToken();
      if (!ok) {
        console.log('[Sesión] Token expirado — cerrando sesión');
        handleLogout();
      }
    };

    const interval = setInterval(doRefresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  
  }, [user?.correo]);

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    authLogout();
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...(prev ?? ({} as UserProfile)), ...data };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated as UserProfile;
    });
  };

  const logout = () => {
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
