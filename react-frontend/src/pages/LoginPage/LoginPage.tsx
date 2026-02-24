import React, { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import styles from './LoginPage.module.css';

export function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (value: string) => {
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
    };

    const handleSubmit: NonNullable<React.ComponentProps<'form'>['onSubmit']> = async (e) => {
        e.preventDefault();
        setServerError('');

        const emailErr = validateEmail(email);
        const passErr = !password ? 'Password is required' : '';
        setEmailError(emailErr);
        setPasswordError(passErr);
        if (emailErr || passErr) return;

        setLoading(true);
        try {
            await login(email, password);
        } catch {
            setServerError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <polygon points="22,3 41,35 3,35" fill="#4a90d9" opacity="0.9" />
            <polygon points="22,13 35,35 9,35" fill="#1a2543" />
          </svg>
          <span className={styles.logoText}>KEYCLOAK</span>
        </div>

        <h1 className={styles.title}>Sign in to your account</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              className={emailError ? styles.inputError : ''}
              autoComplete="email"
            />
            {emailError && <span className={styles.errorText}>{emailError}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
              className={passwordError ? styles.inputError : ''}
              autoComplete="current-password"
            />
            {passwordError && <span className={styles.errorText}>{passwordError}</span>}
          </div>

          <a href="#" className={styles.forgotPassword}>Forgot Password?</a>

          {serverError && <div className={styles.serverError}>{serverError}</div>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

