import styles from './Sidebar.module.css';

interface SidebarItemProps {
  icon: string;
  label: string;
  sublabel?: string;
  badge?: number;
  active?: boolean;
}

function SidebarItem({ icon, label, sublabel, badge, active }: SidebarItemProps) {
  return (
    <button className={`${styles.item} ${active ? styles.active : ''}`}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
        {badge !== undefined && <span className={styles.badge}>{badge}</span>}
      </div>
      <span className={styles.label}>{label}</span>
      {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
    </button>
  );
}

export function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <SidebarItem icon="🏠" label="Home" active />
      <SidebarItem icon="👤" label="Patient factors" sublabel="Influencing" badge={4} />
      <SidebarItem icon="🍎" label="Diet to consider" badge={1} />
      <div className={styles.more}>
        <span className={styles.dots}>• • •</span>
        <span className={styles.moreLabel}>More</span>
      </div>
    </nav>
  );
}