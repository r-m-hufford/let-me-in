import { User } from '../interfaces/user';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as loginReq, invalidateToken } from '../api/auth';
import { whoami } from '../api/user';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LoginRequest } from '../interfaces/requests';

interface AuthContextType {
  setUser: (user: User) => void;
  user: User | null | undefined;
  login: (form: LoginRequest) => any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>();
  const { setItem, getItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) setUser(JSON.parse(user));
  }, []);

  const login = async (form: LoginRequest) => {
    try {
      const response = await loginReq(form);

      if (response.success) {
        setItem('accessToken', response.token.accessToken);
        const me = await whoami();
        setUser(me);
        setItem('user', JSON.stringify(me));
      }
      return response;
    } catch (error: any) {
      console.error(error);
    }
  };

  const logout = async () => {
    await invalidateToken();
    removeItem('user');
    removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
