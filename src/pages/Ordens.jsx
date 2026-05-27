import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';
import {
  PageHeader, Button, Modal, ConfirmModal, Badge,
  Field, Input, Select, Textarea, Initials,
} from '../components/UI';
import styles from './Ordens.module.css';

const EMPTY = { cliId: '', tecId: '', svcId: '', status: 'Aguardando', aber: '', prev: '', val: '', desc: '' };
const STATUS_TABS = ['Todos', 'Aguardando', 'Em Andamento', 'Concluída', 'Cancelada'];

function fmtR(v)  { return 'R$ ' + Number(v).toFixed(2); }
function fmtDt(d) { if (!d) return '—'; const [y,m,dd] = d.split('-'); return `${dd}/${m}/${y}`; }
function ini(n)   { const p = n.trim().split(' '); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); }

export default function Ordens() {
  const { clientes, tecnicos, servicos, ordens, addOrdem, updateOrdem, deleteOrdem } = useApp();
  const location = useLocation();

  const [tab,      setTab]      = useState('Todos');
  const [modal,    setModal]    = useState(false);
  const [detModal, setDetModal] = useState(false);
  const [confirm,  setConfirm]  = useState(false);
  const [form,     setForm]     = useState(EMPTY);
  const [editId,   setEditId]   = useState(null);
  const [detId,    setDetId]    = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Abrir modal se vier do botão "Nova O.S." da sidebar
  useEffect(() => {
    if (location.state?.openNew) abrirNovo();
  }, [location.state]);

  const lista = tab === 'Todos' ? ordens : ordens.filter(o => o.status === tab);

  function abrirNovo() {
    setForm(EMPTY); setEditId(null); setModal(true);
  }

  function abrirEditar(o) {
    setForm({
      cliId: o.cliId, tecId: o.tecId, svcId: o.svcId,
      status: o.status, aber: o.aber, prev: o.prev,
      val: o.val, desc: o.desc,
    });
    setEditId(o.id);
    setDetModal(false);
    setModal(true);
  }

  function salvar() {
    if (!form.cliId || !form.tecId || !form.svcId) {
      alert('Selecione cliente, técnico e serviço.'); return;
    }
    const obj = {
      ...form,
      cliId: parseInt(form.cliId),
      tecId: parseInt(form.tecId),
      svcId: parseInt(form.svcId),
      val: parseFloat(form.val) || 0,
    };
    if (editId) updateOrdem({ ...obj, id: editId });
    else        addOrdem(obj);
    setModal(false);
  }

  function set(field) { return e => setForm(p => ({ ...p, [field]: e.target.value })); }

  const detOrdem = ordens.find(o => o.id === detId);

  return (
    <div>
      <PageHeader
        icon="ti-file-description"
        title="Ordens de Serviço"
        action={
          <Button variant="primary" onClick={abrirNovo}>
            <i className="ti ti-plus" /> + Nova Ordem
          </Button>
        }
      />

      {/* TABS */}
      <div className={styles.tabs}>
        {STATUS_TABS.map(t => (
          <button
            key={t}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className={styles.grid}>
        {lista.length === 0 ? (
          <div className={styles.empty}>Nenhuma ordem encontrada.</div>
        ) : lista.map(o => {
          const cli = clientes.find(c => c.id === o.cliId);
          const tec = tecnicos.find(t => t.id === o.tecId);
          const svc = servicos.find(s => s.id === o.svcId);
          return (
            <div key={o.id} className={styles.card} onClick={() => { setDetId(o.id); setDetModal(true); }}>
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>OS {o.num}</span>
                <Badge label={o.status} />
              </div>
              <div className={styles.cardSvc}>{svc ? svc.nome : '—'}</div>
              <div className={styles.cardDesc}>{o.desc || '—'}</div>
              <div className={styles.cardCli}><i className="ti ti-user" /> {cli ? cli.nome : '—'}</div>
              <div className={styles.cardFoot}>
                <div className={styles.tecRow}>
                  <Initials name={tec ? tec.nome : 'TF'} green />
                  <span>{tec ? tec.nome : '—'}</span>
                </div>
                <span className={styles.valor}>{fmtR(o.val)}</span>
              </div>
              <div className={styles.cardActs} onClick={e => e.stopPropagation()}>
                <Button variant="edit" onClick={() => abrirEditar(o)}>
                  <i className="ti ti-edit" /> Editar
                </Button>
                <Button variant="danger" onClick={() => { setDeleteId(o.id); setConfirm(true); }}>
                  <i className="ti ti-trash" /> Excluir
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL FORM */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editId ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
        footer={
          <>
            <Button onClick={() => setModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={salvar}>
              <i className="ti ti-device-floppy" /> {editId ? 'Salvar alterações' : 'Criar O.S.'}
            </Button>
          </>
        }
      >
        <Field label="Cliente *">
          <Select value={form.cliId} onChange={set('cliId')}>
            <option value="">Selecione um cliente</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </Select>
        </Field>
        <div style={{ height: 12 }} />
        <Field label="Técnico *">
          <Select value={form.tecId} onChange={set('tecId')}>
            <option value="">Selecione um técnico</option>
            {tecnicos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </Select>
        </Field>
        <div style={{ height: 12 }} />
        <Field label="Serviço *">
          <Select value={form.svcId} onChange={set('svcId')}>
            <option value="">Selecione um serviço</option>
            {servicos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </Select>
        </Field>
        <div style={{ height: 12 }} />
        <Field label="Status">
          <Select value={form.status} onChange={set('status')}>
            <option>Aguardando</option>
            <option>Em Andamento</option>
            <option>Concluída</option>
            <option>Cancelada</option>
          </Select>
        </Field>
        <div style={{ height: 12 }} />
        <div className={styles.formRow}>
          <Field label="Data de abertura">
            <Input type="date" value={form.aber} onChange={set('aber')} />
          </Field>
          <Field label="Data de previsão">
            <Input type="date" value={form.prev} onChange={set('prev')} />
          </Field>
        </div>
        <div style={{ height: 12 }} />
        <Field label="Valor total (R$)">
          <Input type="number" placeholder="0.00" value={form.val} onChange={set('val')} />
        </Field>
        <div style={{ height: 12 }} />
        <Field label="Descrição do problema">
          <Textarea placeholder="Descreva o problema relatado pelo cliente..." value={form.desc} onChange={set('desc')} />
        </Field>
      </Modal>

      {/* MODAL DETALHE */}
      {detOrdem && (
        <Modal
          open={detModal}
          onClose={() => setDetModal(false)}
          title={`Detalhes — OS ${detOrdem.num}`}
          footer={
            <>
              <Button onClick={() => setDetModal(false)}>Fechar</Button>
              <Button variant="edit" onClick={() => abrirEditar(detOrdem)}>
                <i className="ti ti-edit" /> Editar
              </Button>
            </>
          }
        >
          {(() => {
            const cli = clientes.find(c => c.id === detOrdem.cliId);
            const tec = tecnicos.find(t => t.id === detOrdem.tecId);
            const svc = servicos.find(s => s.id === detOrdem.svcId);
            return (
              <div className={styles.detBody}>
                <div className={styles.detBadge}><Badge label={detOrdem.status} /></div>
                <div className={styles.detRow}><span className={styles.detLbl}>Serviço</span><span>{svc ? svc.nome : '—'}</span></div>
                <div className={styles.detRow}><span className={styles.detLbl}>Cliente</span><span>{cli ? cli.nome : '—'}</span></div>
                <div className={styles.detRow}><span className={styles.detLbl}>Técnico</span><span>{tec ? tec.nome : '—'}</span></div>
                <div className={styles.detRow}><span className={styles.detLbl}>Abertura</span><span>{fmtDt(detOrdem.aber)}</span></div>
                <div className={styles.detRow}><span className={styles.detLbl}>Previsão</span><span>{fmtDt(detOrdem.prev)}</span></div>
                <div className={styles.detRow}><span className={styles.detLbl}>Valor total</span><span className={styles.detValor}>{fmtR(detOrdem.val)}</span></div>
                <div className={styles.detDescRow}>
                  <span className={styles.detLbl}>Descrição do problema</span>
                  <p className={styles.detDesc}>{detOrdem.desc || 'Nenhuma descrição informada.'}</p>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => { deleteOrdem(deleteId); setConfirm(false); }}
        message="Tem certeza que deseja excluir esta ordem de serviço?"
      />
    </div>
  );
}
