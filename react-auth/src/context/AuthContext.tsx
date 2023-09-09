//! Simple implementation to get the context working
// import { createContext } from "react";
// import { User } from "../interfaces/user";

// interface AuthContext {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const AuthContext = createContext<AuthContext>({
//   user: null,
//   setUser: () => {}
// })

/**
 * all-in-one version: this can be broken out
 * into an hooks and a context
 */
import { User } from '../interfaces/user';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { login as loginReq, whoami, invalidateToken, updateUser } from '../api/auth';

// Define the type for the authentication context
interface AuthContextType {
  user: User | null;
  login: (form: any) => any;
  logout: () => void;
  update: (form: any) => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// this is a hook
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
    // send the form
    const response = await updateUser(form);
    // form should return an up-to-date user
    // setUser with updated user
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
    // will need to interact with localStorage here
    await invalidateToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
}
