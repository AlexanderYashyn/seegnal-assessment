import { useState } from 'react';
import type { Alert } from '../../api/analyze';
import type { Drug } from '../../api/drugs';
import { NoAlerts } from './NoAlerts';
import styles from './AlertsPanel.module.css';

// Distance from the top of .main's box to the first medication list item.
// Accounts for: main padding-top (64) + pageTitle+margin (~40) + filterRow+margin (~47) + medListHeader (~40)
const CHIP_TOP_BASE = 197;
const ITEM_HEIGHT = 42; // .item min-height in MedicationList

interface Props {
  alerts: Alert[];
  medications: Drug[];
}

export function AlertsPanel({ alerts, medications }: Props) {
  const [bypassed, setBypassed] = useState(false);

  if (alerts.length === 0) {
    return (
      <div className={styles.column}>
        <NoAlerts />
      </div>
    );
  }

  const alertedNames = new Set(alerts.flatMap((a) => [a.drug1, a.drug2]));
  const isMajor = alerts.some((a) => a.severity === 'MAJOR');

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={`${styles.pill} ${isMajor ? styles.pillMajor : styles.pillModerate}`} />
        <span className={styles.severityLabel}>
          {isMajor ? 'Contra-\nindication' : 'Moderate\ninteraction'}
        </span>
        <span className={styles.infoIcon}>ⓘ</span>
        <span className={styles.bypassLabel}>Bypass the Alert</span>
        <label className={styles.toggle}>
          <input type="checkbox" checked={bypassed} onChange={() => setBypassed((v) => !v)} />
          <span className={styles.slider} />
        </label>
      </div>

      {medications.map((drug, idx) => {
        if (!alertedNames.has(drug.name)) return null;
        const chipTop = CHIP_TOP_BASE + idx * ITEM_HEIGHT + Math.round((ITEM_HEIGHT - 30) / 2);
        return <div key={drug.id} className={styles.chip} style={{ top: chipTop }} />;
      })}
    </div>
  );
}
