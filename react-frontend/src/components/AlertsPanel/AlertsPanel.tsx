import type { Alert } from '../../api/analyze';
import { AlertCard } from './AlertCard';
import { NoAlerts } from './NoAlerts';
import styles from './AlertsPanel.module.css';

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) return <NoAlerts />;

  return (
    <div className={styles.panel}>
      {alerts.map((alert, idx) => (
        <AlertCard key={idx} alert={alert} />
      ))}
    </div>
  );
}