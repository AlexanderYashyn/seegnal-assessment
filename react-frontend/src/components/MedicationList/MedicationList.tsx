import { useState } from 'react';
import type { Drug } from '../../api/drugs';
import { AddDrugModal } from '../AddDrugModal/AddDrugModal';
import styles from './MedicationList.module.css';

interface Props {
  medications: Drug[];
  allDrugs: Drug[];
  onAdd: (drug: Drug) => void;
  onRemove: (drugId: number) => void;
}

export function MedicationList({ medications, allDrugs, onAdd, onRemove }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleAdd = (drug: Drug) => {
    onAdd(drug);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.title}>Medication list</h2>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="28" height="28">
            <path fill="#1c2275" d="M15,2A13,13,0,1,1,2,15,13,13,0,0,1,15,2m0-2A15,15,0,1,0,30,15,15,15,0,0,0,15,0Z"/>
            <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="15" y1="8.46" x2="15" y2="21.54"/>
            <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21.54" y1="15" x2="8.46" y2="15"/>
          </svg>
          Add medication
        </button>
      </div>

      <ol className={styles.list}>
        {medications.map((drug) => (
          <li
            key={drug.id}
            className={styles.item}
            onMouseEnter={() => setHoveredId(drug.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span className={styles.drugName}>{drug.name}</span>
            {hoveredId === drug.id && (
              <div className={styles.actions}>
                <button className={styles.removeBtn} onClick={() => onRemove(drug.id)}>
                  Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ol>

      {isModalOpen && (
        <AddDrugModal
          allDrugs={allDrugs}
          currentMedications={medications}
          onSelect={handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}