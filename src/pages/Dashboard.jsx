import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Initials, Button } from '../components/UI';
import styles from './Dashboard.module.css';

function fmtR(v) { return 'R$ ' + Number(v).toFixed(2); }

function ini(n) {
  const p = n.trim().split(' ');
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
}

const STATUS_CLASS = {
  'Em Andamento': 'blue',
  'Concluída':    'green',
  'Aguardando':   'amber',
  'Cancelada':    'red',
};

function Badge({ label }) {
  const c = STATUS_CLASS[label] || 'gray';
  return <span className={`${styles.badge} ${styles['b_' + c]}`}>{label}</span>;
}

export default function Dashboard() {
  const { clientes, tecnicos, ordens, servicos } = useApp();
  const navigate = useNavigate();

  const total   = ordens.length;
  const aguard  = ordens.filter(o => o.status === 'Aguardando').length;
  const andando = ordens.filter(o => o.status === 'Em Andamento').length;
  const conc    = ordens.filter(o => o.status === 'Concluída').length;

  const recentes = [...ordens].reverse().slice(0, 6);

  return (
    <div>
      {/* STATS */}
      <div className={styles.statGrid}>
        <div className={styles.sc}>
          <div className={styles.scLbl}>Total de O.S.</div>
          <div className={`${styles.scVal} ${styles.valBlue}`}>{total}</div>
          <div className={styles.scSub}>Neste mês</div>
        </div>
        <div className={styles.sc}>
          <div className={styles.scLbl}>Aguardando</div>
          <div className={`${styles.scVal} ${styles.valAmber}`}>{aguard}</div>
          <div className={styles.scSub}>Pendentes</div>
        </div>
        <div className={styles.sc}>
          <div className={styles.scLbl}>Em manutenção</div>
          <div className={`${styles.scVal} ${styles.valBlue}`}>{andando}</div>
          <div className={styles.scSub}>Em andamento</div>
        </div>
        <div className={styles.sc}>
          <div className={styles.scLbl}>Finalizadas</div>
          <div className={`${styles.scVal} ${styles.valGreen}`}>{conc}</div>
          <div className={styles.scSub}>Concluídas</div>
        </div>
      </div>

      {/* OS RECENTES */}
      <div className={styles.sh}>
        <span className={styles.shTitle}>Ordens de serviço recentes</span>
      </div>
      <div className={styles.osGrid}>
        {recentes.map(o => {
          const cli = clientes.find(c => c.id === o.cliId);
          const tec = tecnicos.find(t => t.id === o.tecId);
          const svc = servicos.find(s => s.id === o.svcId);
          return (
            <div key={o.id} className={styles.osc} onClick={() => navigate('/ordens')}>
              <div className={styles.oscTop}>
                <span className={styles.oscNum}>OS {o.num}</span>
                <Badge label={o.status} />
              </div>
              <div className={styles.oscEquip}>{svc ? svc.nome : '—'}</div>
              <div className={styles.oscDesc}>{o.desc || '—'}</div>
              <div className={styles.oscCli}>
                <i className="ti ti-user" /> {cli ? cli.nome : '—'}
              </div>
              <div className={styles.oscFoot}>
                <div className={styles.tecRow}>
                  <Initials name={tec ? tec.nome : 'TF'} green />
                  <span>{tec ? tec.nome : '—'}</span>
                </div>
                <span className={styles.valor}>{fmtR(o.val)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.verTodasWrap}>
        <Button variant="primary" onClick={() => navigate('/ordens')}>
          <i className="ti ti-list" /> Ver todas as ordens
        </Button>
      </div>

      {/* CLIENTES */}
      <div className={styles.sh} style={{ marginTop: 24 }}>
        <span className={styles.shTitle}>Clientes cadastrados</span>
        <Button onClick={() => navigate('/clientes')}>
          <i className="ti ti-arrow-right" /> Ver todos
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 38 }}></th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {clientes.slice(0, 5).map(c => (
              <tr key={c.id}>
                <td><Initials name={c.nome} /></td>
                <td className={styles.tdBold}>{c.nome}</td>
                <td className={styles.tdMuted}>{c.email}</td>
                <td className={styles.tdMuted}>{c.tel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
