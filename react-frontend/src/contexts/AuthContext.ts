import { createContext } from 'react';

export interface AuthContextValue {
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
