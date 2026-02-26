import { useState, useEffect, useRef } from 'react';
import type { Drug } from '../../api/drugs';
import styles from './AddDrugModal.module.css';

interface Props {
  allDrugs: Drug[];
  currentMedications: Drug[];
  onConfirm: (drugs: Drug[]) => void;
  onClose: () => void;
}

export function AddDrugModal({ allDrugs, currentMedications, onConfirm, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState<Drug[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const excludedIds = new Set([
    ...currentMedications.map((m) => m.id),
    ...pending.map((p) => p.id),
  ]);

  const filtered = query.trim().length >= 3
    ? allDrugs.filter(
        (drug) =>
          !excludedIds.has(drug.id) &&
          drug.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const handlePickDrug = (drug: Drug) => {
    setPending((prev) => [...prev, drug]);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleRemove = (id: number) => {
    setPending((prev) => prev.filter((d) => d.id !== id));
  };

  const handleConfirm = () => {
    onConfirm(pending);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose}>×</button>

        {/* Search header */}
        <div className={styles.searchArea}>
          <label className={styles.searchLabel}>Search by Generic or Brand name</label>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filtered.length > 0 && (
            <ul className={styles.dropdown}>
              {filtered.map((drug) => (
                <li key={drug.id}>
                  <button className={styles.dropdownItem} onClick={() => handlePickDrug(drug)}>
                    <span>{drug.name}</span>
                    <span className={styles.arrow}>›</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>
          {pending.length > 0 && (
            <div className={styles.addedSection}>
              <p className={styles.addedTitle}>Added medication/s</p>
              <ul className={styles.addedList}>
                {pending.map((drug) => (
                  <li key={drug.id} className={styles.addedItem}>
                    <span className={styles.addedName}>{drug.name}</span>
                    <span className={styles.addedActions}>
                      <button className={styles.dosingBtn}>Add dosing parameters</button>
                      <span className={styles.separator}>|</span>
                      <button className={styles.removeBtn} onClick={() => handleRemove(drug.id)}>Remove</button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.footer}>
            <button
              className={styles.confirmBtn}
              onClick={handleConfirm}
              disabled={pending.length === 0}
            >
              Finish and update
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
