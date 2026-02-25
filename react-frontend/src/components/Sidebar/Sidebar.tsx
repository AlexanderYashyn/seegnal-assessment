import styles from './Sidebar.module.css';

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" role="img">
      <polygon fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" points="20 7.45 6.12 19.75 10.27 19.75 10.27 32.55 17.11 32.55 17.11 23.59 22.89 23.59 22.89 32.55 29.73 32.55 29.73 19.75 33.88 19.75 20 7.45"/>
    </svg>
  );
}

function PatientIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" role="img">
      <circle fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" cx="18.65" cy="11.25" r="5.59"/>
      <path fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" d="M28.12,24.12c0-3.57-2.77-5.3-6.19-5.3H15.36A6.19,6.19,0,0,0,9.17,25v6.22a1,1,0,0,0,1,1H20.78V24.15Z"/>
      <path fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" d="M31.29,24.14H20.78v8.12a1.88,1.88,0,0,0,1.87,1.88h9.86c-1.27-.59-1.22-1.12-1.22-1.8Z"/>
      <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" x1="23.07" y1="29.99" x2="29.25" y2="29.99"/>
      <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" x1="23.07" y1="31.66" x2="29.25" y2="31.66"/>
      <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" x1="23.07" y1="28.24" x2="29.25" y2="28.24"/>
      <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" x1="23.07" y1="26.5" x2="29.25" y2="26.5"/>
    </svg>
  );
}

function DietIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" role="img">
      <path fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" d="M26.28,13.4c-2.41-.18-4.17,1-6.27,1.73h0c-2.1-.74-3.86-1.91-6.27-1.73s-6,1.71-5,8.24,4,9.54,6.1,10.23,3.72-.49,5.18-.49h0c1.46,0,3.13,1.26,5.18.49,2.53-.95,5.07-3.7,6.1-10.23S28.68,13.57,26.28,13.4Z"/>
      <path fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" d="M20,14.28s1-3.65,3.79-4.28"/>
      <path fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" d="M19.88,12.11s1.28-3.62-4.54-4.23C15,12.37,19.88,12.11,19.88,12.11Z"/>
      <line fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" x1="29.97" y1="15.53" x2="10.69" y2="26.96"/>
    </svg>
  );
}

function MoreIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" role="img">
            <circle fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" cx="9.72" cy="20" r="2.24"/>
            <circle fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" cx="20" cy="20" r="2.24"/>
            <circle fill="none" stroke="#1c2275" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.83" cx="30.28" cy="20" r="2.24"/>
        </svg>  
    );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  badge?: number;
  active?: boolean;
}

function SidebarItem({ icon, label, sublabel, badge, active }: SidebarItemProps) {
  return (
    <button className={`${styles.item} ${active ? styles.active : ''}`}>
      <div className={styles.iconWrapper}>
        {icon}
        {badge !== undefined && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.labelBox}>
        <span className={styles.label}>{label}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
    </button>
  );
}

export function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <SidebarItem icon={<HomeIcon />}    label="Home"            active />
      <SidebarItem icon={<PatientIcon />} label="Patient factors" sublabel="Influencing" badge={0} />
      <SidebarItem icon={<DietIcon />}    label="Diet to consider" badge={0} />
      <SidebarItem icon={<MoreIcon /> } label="More" />
    </nav>
  );
}
