import { useState, useEffect, useCallback } from 'react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { MedicationList } from '../../components/MedicationList/MedicationList';
import { AlertsPanel } from '../../components/AlertsPanel/AlertsPanel';
import { getDrugs } from '../../api/drugs';
import type { Drug } from '../../api/drugs';
import { analyzeInteractions } from '../../api/analyze';
import type { Alert } from '../../api/analyze';
import styles from './DashboardPage.module.css';

type FilterMode = 'alerted' | 'non-alerted' | 'bypassed';

export function DashboardPage() {
  const [allDrugs, setAllDrugs] = useState<Drug[]>([]);
  const [medications, setMedications] = useState<Drug[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<FilterMode>('alerted');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDrugs()
      .then(setAllDrugs)
      .finally(() => setLoading(false));
  }, []);

  const runAnalysis = useCallback(async (meds: Drug[]) => {
    const result = await analyzeInteractions(meds.map((m) => m.id));
    setAlerts(result);
  }, []);

  const handleAddDrug = (drug: Drug) => {
    const updated = [...medications, drug];
    setMedications(updated);
    runAnalysis(updated);
  };

  const handleRemoveDrug = (drugId: number) => {
    const updated = medications.filter((m) => m.id !== drugId);
    setMedications(updated);
    runAnalysis(updated);
  };

  const alertedDrugNames = new Set(alerts.flatMap((a) => [a.drug1, a.drug2]));
  const alertedCount    = alerts.length;
  const nonAlertedCount = medications.filter((m) => !alertedDrugNames.has(m.name)).length;

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>Drug-related problems</h1>

          <div className={styles.filterRow}>
            <FilterToggle label="Alerted"     count={alertedCount}    color="#e53935" active={filter === 'alerted'}     onClick={() => setFilter('alerted')} />
            <FilterToggle label="Non-alerted" count={nonAlertedCount} color="#4caf50" active={filter === 'non-alerted'} onClick={() => setFilter('non-alerted')} />
            <FilterToggle label="Bypassed"    count={0}               color="#9ba3b8" active={filter === 'bypassed'}    onClick={() => setFilter('bypassed')} />
          </div>

          <div className={styles.contentRow}>
            <MedicationList
              medications={medications}
              allDrugs={allDrugs}
              onAdd={handleAddDrug}
              onRemove={handleRemoveDrug}
            />
            <div className={styles.alertsColumn}>
              <AlertsPanel alerts={alerts} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface FilterToggleProps {
  label: string; count: number; active: boolean; color: string; onClick: () => void;
}

function FilterToggle({ label, count, active, color, onClick }: FilterToggleProps) {
  return (
    <button
      className={`${styles.filterBtn} ${active ? styles.filterBtnActive : ''}`}
      onClick={onClick}
    >
      <span className={styles.filterDot} style={{ background: color }} />
      <span>{label}</span>
      <span className={styles.filterCount}>({count})</span>
    </button>
  );
}