import { useState, useEffect, useCallback } from 'react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { MedicationList } from '../../components/MedicationList/MedicationList';
import { AlertsPanel } from '../../components/AlertsPanel/AlertsPanel';
import { Pagination } from '../../components/Pagination/Pagination';
import { getDrugs } from '../../api/drugs';
import type { Drug } from '../../api/drugs';
import { analyzeInteractions } from '../../api/analyze';
import type { Alert } from '../../api/analyze';
import styles from './DashboardPage.module.css';

const PAGE_SIZE = 10;

export function DashboardPage() {
  const [allDrugs, setAllDrugs] = useState<Drug[]>([]);
  const [medications, setMedications] = useState<Drug[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [page, setPage] = useState(1);
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

  const handleAddDrug = (drugs: Drug[]) => {
    const updated = [...medications, ...drugs];
    setMedications(updated);
    setPage(1);
    runAnalysis(updated);
  };

  const handleRemoveDrug = (drugId: number) => {
    const updated = medications.filter((m) => m.id !== drugId);
    setMedications(updated);
    setPage(1);
    runAnalysis(updated);
  };

  const alertedDrugNames = new Set(alerts.flatMap((a) => [a.drug1, a.drug2]));
  const alertedCount    = alerts.length;
  const nonAlertedCount = medications.filter((m) => !alertedDrugNames.has(m.name)).length;
  const totalPages = Math.max(1, Math.ceil(medications.length / PAGE_SIZE));
  const sortedMedications = [...medications].sort((a, b) => {
    const aAlerted = alertedDrugNames.has(a.name);
    const bAlerted = alertedDrugNames.has(b.name);
    if (aAlerted && !bAlerted) return -1;
    if (!aAlerted && bAlerted) return 1;
    return 0;
  });
  const pagedMedications = sortedMedications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header alertCount={alerts.length} />
      <div className={styles.body}>
        <Sidebar alertCount={alerts.length} />
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>Drug-related problems</h1>

          <div className={styles.filterRow}>
            <FilterRadio label="Alerted"     count={alertedCount}    bgColor="#e53935" knobRight={false} countColor="#e53935" />
            <FilterRadio label="Non-alerted" count={nonAlertedCount} bgColor="#9ba3b8" knobRight={true} />
            <FilterRadio label="Bypassed"    count={0}               bgColor="#9ba3b8" knobRight={true} />
          </div>

          <div className={styles.contentRow}>
            <MedicationList
              medications={pagedMedications}
              allDrugs={allDrugs}
              hasAlerts={alerts.length > 0}
              onAdd={handleAddDrug}
              onRemove={handleRemoveDrug}
            />
          </div>

          {medications.length > 0 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}

          {/* AlertsPanel is positioned absolute relative to .main so it can span full height and be centered */}
          <div className={styles.alertsColumn}>
            <AlertsPanel alerts={alerts} medications={pagedMedications} />
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterRadio({ label, count, bgColor, knobRight, countColor }: { label: string; count: number; bgColor: string; knobRight: boolean; countColor?: string }) {
  return (
    <div className={styles.filterRadio}>
      <label className={styles.filterSwitch}>
        <input type="checkbox" checked={knobRight} disabled onChange={() => {}} />
        <span className={styles.filterSlider} style={{ background: bgColor }} />
      </label>
      <span className={styles.filterRadioLabel}>
        {label} <span className={styles.filterCount} style={countColor ? { color: countColor } : undefined}>({count})</span>
      </span>
    </div>
  );
}
