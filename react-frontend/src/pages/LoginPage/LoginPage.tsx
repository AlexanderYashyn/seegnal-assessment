import React, { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import styles from './LoginPage.module.css';

export function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <header className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <div className={styles.logo} />
                        </div>
                    </header>

                    <main className={styles.card}>
                        <div className={styles.mainHeader}>
                            <h1 className={styles.title}>Sign in to your account</h1>
                        </div>
                        <div className={styles.mainBody}>
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
                                    <div className={styles.passwordWrapper}>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                                            className={passwordError ? styles.inputError : ''}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className={styles.eyeToggle}
                                            onClick={() => setShowPassword((v) => !v)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="rgb(224, 224, 224)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="rgb(224, 224, 224)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                    <circle cx="12" cy="12" r="3"/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {passwordError && <span className={styles.errorText}>{passwordError}</span>}
                                    <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                                </div>

                                {serverError && <div className={styles.serverError}>{serverError}</div>}

                                <button type="submit" className={styles.submitButton} disabled={loading}>
                                    {loading ? 'Signing in…' : 'Sign In'}
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

