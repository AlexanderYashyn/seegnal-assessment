import styles from './AlertsPanel.module.css';

export function NoAlerts() {
  return (
    <div className={styles.noAlerts}>
      <svg width="150" height="150" viewBox="0 0 90 90" fill="none">
        <circle cx="45" cy="45" r="42" stroke="#00d4ad" strokeWidth="3" fill="none" />
        <polyline
          points="26,45 39,58 64,33"
          stroke="#00d4ad"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <p className={styles.noAlertsText}>NO ALERTS</p>
    </div>
  );
}
