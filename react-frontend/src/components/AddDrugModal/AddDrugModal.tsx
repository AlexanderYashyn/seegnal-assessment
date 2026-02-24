import { useState, useEffect, useRef } from 'react';
import type { Drug } from '../../api/drugs';
import styles from './AddDrugModal.module.css';

interface Props {
  allDrugs: Drug[];
  currentMedications: Drug[];
  onSelect: (drug: Drug) => void;
  onClose: () => void;
}

export function AddDrugModal({ allDrugs, currentMedications, onSelect, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const currentIds = new Set(currentMedications.map((m) => m.id));

  const filtered = allDrugs.filter(
    (drug) =>
      !currentIds.has(drug.id) &&
      drug.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search by Generic or Brand name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <ul className={styles.resultList}>
          {filtered.length === 0 && (
            <li className={styles.noResults}>No matching drugs found</li>
          )}
          {filtered.map((drug) => (
            <li key={drug.id}>
              <button className={styles.resultItem} onClick={() => onSelect(drug)}>
                <span>{drug.name}</span>
                <span className={styles.arrow}>›</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}