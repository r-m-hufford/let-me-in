import React , { ReactNode, createContext, useContext, useState } from 'react';

interface ErrorContextType {
  setErrors: (error: string[]) => void;
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

  /**
   * I can create error some logic here to account
   * for all the different types of errors
   * arrays.
   * strings.
   * errors from the server. {response.error}
   * errors on larger axios objects. {error.response}
   */
  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}