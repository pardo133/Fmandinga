import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  nombre: string;
  apellido: string;
  correo: string;
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

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...(prev ?? ({} as UserProfile)), ...data };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated as UserProfile;
    });
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    window.location.href = '/';
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
