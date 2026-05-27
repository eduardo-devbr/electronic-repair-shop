import React from 'react';
import styles from './UI.module.css';

/* ── MODAL ── */
export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.mHeader}>
          <h3 className={styles.mTitle}>{title}</h3>
          <button className={styles.xBtn} onClick={onClose}>
            <i className="ti ti-x" />
          </button>
        </div>
        <div className={styles.mBody}>{children}</div>
        {footer && <div className={styles.mFooter}>{footer}</div>}
      </div>
    </div>
  );
}

/* ── CONFIRM MODAL ── */
export function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={`${styles.modal} ${styles.modalSm}`} onClick={e => e.stopPropagation()}>
        <div className={styles.mHeader}>
          <h3 className={styles.mTitle}>Confirmar exclusão</h3>
          <button className={styles.xBtn} onClick={onClose}><i className="ti ti-x" /></button>
        </div>
        <div className={styles.mBody}>
          <p className={styles.confirmMsg}>{message}</p>
        </div>
        <div className={styles.mFooter}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="danger" onClick={onConfirm}>
            <i className="ti ti-trash" /> Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── BUTTON ── */
export function Button({ children, onClick, variant, type = 'button', disabled }) {
  const cls = [
    styles.btn,
    variant === 'primary' ? styles.btnPrimary : '',
    variant === 'danger'  ? styles.btnDanger  : '',
    variant === 'edit'    ? styles.btnEdit    : '',
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

/* ── BADGE ── */
const BADGE_MAP = {
  'Em Andamento': 'blue',
  'Concluída':    'green',
  'Aguardando':   'amber',
  'Cancelada':    'red',
  'Disponível':   'green',
  'Indisponível': 'red',
};

export function Badge({ label }) {
  const color = BADGE_MAP[label] || 'gray';
  return <span className={`${styles.badge} ${styles['badge_' + color]}`}>{label}</span>;
}

/* ── FORM FIELD ── */
export function Field({ label, children, full }) {
  return (
    <div className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

export function Input(props) {
  return <input className={styles.input} {...props} />;
}

export function Select({ children, ...props }) {
  return <select className={styles.input} {...props}>{children}</select>;
}

export function Textarea(props) {
  return <textarea className={`${styles.input} ${styles.textarea}`} {...props} />;
}

/* ── INITIALS AVATAR ── */
export function Initials({ name, green }) {
  const parts = name.trim().split(' ');
  const letters = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  return (
    <div className={`${styles.initials} ${green ? styles.initialsGreen : ''}`}>
      {letters}
    </div>
  );
}

/* ── PAGE HEADER ── */
export function PageHeader({ icon, title, action }) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>
        <i className={`ti ${icon}`} style={{ color: 'var(--blue3)' }} />
        {title}
      </h1>
      {action}
    </div>
  );
}
