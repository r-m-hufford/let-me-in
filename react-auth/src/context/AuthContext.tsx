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

// Define the type for the authentication context
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the authentication context
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
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    // Perform login logic here
    setUser(user);
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
