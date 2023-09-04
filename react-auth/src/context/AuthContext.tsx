import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the user data
interface UserData {
  // Define the properties of your user data here
  // For example:
  id: number;
  username: string;
  // ...
}

// Define the type for the authentication context
interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
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
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    // Perform login logic here
    setUser(userData);
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
