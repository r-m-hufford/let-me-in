import { User } from '../interfaces/user';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { login as loginReq, whoami, invalidateToken, updateUser } from '../api/auth';

interface AuthContextType {
  user: User | null;
  login: (form: any) => any;
  logout: () => void;
  update: (form: any) => void;
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
  initialUser: User;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);

  const update = async (form: any) => {
    const response = await updateUser(form);
    setUser(response);
  }
  const login = async (form: any) => {
    try {
      const response = await loginReq(form);
      
      if (response.success) {
        window.localStorage.setItem('accessToken', response.token.accessToken);
        const me = await whoami();
        setUser(me);
        window.localStorage.setItem('user', JSON.stringify(me));
      }
      
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.error('username or password does not match');
      } else {
        console.error('An error occurred: ', error);
      }
    }
  };

  const logout = async () => {
    await invalidateToken();
    window.localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
}
