import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';

const NAV = [
  { to: '/dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard',         group: 'Geral' },
  { to: '/clientes',  icon: 'ti-users',             label: 'Clientes',          group: 'Cadastros' },
  { to: '/tecnicos',  icon: 'ti-user-check',        label: 'Técnicos',          group: 'Cadastros' },
  { to: '/servicos',  icon: 'ti-settings',          label: 'Serviços',          group: 'Cadastros' },
  { to: '/ordens',    icon: 'ti-file-description',  label: 'Ordens de Serviço', group: 'Cadastros' },
  { to: '/sobre',     icon: 'ti-info-circle',       label: 'Sobre',             group: 'Info' },
];

function groupItems(items) {
  const groups = {};
  items.forEach(item => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });
  return groups;
}

export default function Layout() {
  const navigate = useNavigate();
  const groups = groupItems(NAV);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.app}>
      {/* OVERLAY (mobile) */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayOpen : ''}`}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <i className="ti ti-tool" />
          </div>
          <div>
            <span className={styles.logoName}>TechFix</span>
            <small className={styles.logoSub}>Assistência Técnica</small>
          </div>
        </div>

        <button className={styles.newOsBtn} onClick={() => { navigate('/ordens', { state: { openNew: true } }); closeSidebar(); }}>
          <i className="ti ti-plus" /> Nova O.S.
        </button>

        <nav className={styles.nav}>
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <span className={styles.navLabel}>{group}</span>
              {items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                  }
                >
                  <i className={`ti ${item.icon}`} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.hamburger} onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
              <i className={`ti ${sidebarOpen ? 'ti-x' : 'ti-menu-2'}`} />
            </button>
            <span className={styles.topbarTitle}>TechFix</span>
          </div>
          <div className={styles.avatar}>AD</div>
        </header>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
