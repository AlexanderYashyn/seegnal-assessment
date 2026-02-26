import styles from './Pagination.module.css';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className={styles.root}>
      <button className={`${styles.btn} ${styles.btnDouble}`} onClick={() => onChange(1)} disabled={page === 1}>«</button>
      <button className={styles.btn} onClick={() => onChange(page - 1)} disabled={page === 1}>‹</button>
      <span className={styles.info}>{page} – {page} out of {totalPages}</span>
      <button className={styles.btn} onClick={() => onChange(page + 1)} disabled={page === totalPages}>›</button>
      <button className={`${styles.btn} ${styles.btnDouble}`} onClick={() => onChange(totalPages)} disabled={page === totalPages}>»</button>
    </div>
  );
}
