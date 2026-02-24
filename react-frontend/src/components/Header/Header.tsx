import { useAuth } from '../../contexts/useAuth';
import styles from './Header.module.css';

export function Header() {
  const { email, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <polygon points="13,2 24,21 2,21" fill="#4a90d9" opacity="0.85" />
            <polygon points="13,8 20,21 6,21" fill="#1d2b4f" />
          </svg>
          <span className={styles.logoText}>$eegnal</span>
        </div>
      </div>

      <div className={styles.center}>
        <span className={styles.expertLabel}>Expert view</span>
        <label className={styles.toggleSwitch}>
          <input type="checkbox" defaultChecked readOnly />
          <span className={styles.slider} />
        </label>
        <span className={styles.onLabel}>On</span>
      </div>

      <div className={styles.right}>
        <a href="#" className={styles.feedback}>Feedback ↗</a>
        <span className={styles.userEmail}>{email}</span>
        <button onClick={logout} className={styles.logoutBtn}>[Logout]</button>
        <button className={styles.menuBtn}>☰</button>
        <div className={styles.bellWrapper}>
          <span>🔔</span>
          <span className={styles.badge}>1</span>
        </div>
      </div>
    </header>
  );
}