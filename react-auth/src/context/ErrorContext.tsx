import React , { ReactNode, createContext, useContext, useState } from 'react';
import { useErrors } from '../hooks/useErrors';

interface AuthContextType {
  setErrors: (error: string) => void;
  errors: string[];
}

interface ErrorProviderProps {
  children: ReactNode;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}