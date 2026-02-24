import { useState } from 'react';
import type { Alert } from '../../api/analyze';
import styles from './AlertsPanel.module.css';

export function AlertCard({ alert }: { alert: Alert }) {
  const [bypassed, setBypassed] = useState(false);
  const isMajor = alert.severity === 'MAJOR';

  return (
    <div className={`${styles.card} ${isMajor ? styles.cardMajor : styles.cardModerate}`}>
      <div className={`${styles.cardHeader} ${isMajor ? styles.headerMajor : styles.headerModerate}`}>
        <span className={styles.severityLabel}>
          {isMajor ? 'Contra-indication' : 'Moderate interaction'}
        </span>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.drugPair}>{alert.drug1} + {alert.drug2}</p>
        <p className={styles.message}>{alert.message}</p>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.bypassLabel}>Bypass the Alert</span>
        <label className={styles.toggleSwitch}>
          <input type="checkbox" checked={bypassed} onChange={() => setBypassed((v) => !v)} />
          <span className={styles.slider} />
        </label>
      </div>
    </div>
  );
}