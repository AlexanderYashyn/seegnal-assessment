import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/auth';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem('userEmail'));
  const navigate = useNavigate();

  const login = async (emailInput: string, password: string) => {
    const result = await apiLogin(emailInput, password);
    localStorage.setItem('token', result.token);
    localStorage.setItem('userEmail', result.user.email);
    setEmail(result.user.email);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setEmail(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ email, isAuthenticated: !!email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
