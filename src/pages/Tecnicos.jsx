import React, { useState } from 'react';
import { useApp } from '../AppContext';
import {
  PageHeader, Button, Modal, ConfirmModal,
  Field, Input, Select, Badge,
} from '../components/UI';
import styles from './Tecnicos.module.css';

const EMPTY = { nome: '', email: '', tel: '', esp: '', status: 'Disponível' };
const ESPS  = ['Eletrônicos e Informática', 'Smartphone / Tablet', 'Eletrodomésticos', 'Ar-Condicionado e Refrigeração', 'Rede / Infraestrutura'];

function ini(n) {
  const p = n.trim().split(' ');
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
}

export default function Tecnicos() {
  const { tecnicos, addTecnico, updateTecnico, deleteTecnico } = useApp();

  const [modal,    setModal]    = useState(false);
  const [confirm,  setConfirm]  = useState(false);
  const [form,     setForm]     = useState(EMPTY);
  const [editId,   setEditId]   = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  function abrirNovo() { setForm(EMPTY); setEditId(null); setModal(true); }

  function abrirEditar(t) {
    setForm({ nome: t.nome, email: t.email, tel: t.tel, esp: t.esp, status: t.status });
    setEditId(t.id);
    setModal(true);
  }

  function salvar() {
    if (!form.nome.trim() || !form.esp) { alert('Preencha nome e especialidade.'); return; }
    if (editId) updateTecnico({ ...form, id: editId });
    else        addTecnico(form);
    setModal(false);
  }

  function set(field) { return e => setForm(p => ({ ...p, [field]: e.target.value })); }

  return (
    <div>
      <PageHeader
        icon="ti-user-check"
        title="Técnicos"
        action={
          <Button variant="primary" onClick={abrirNovo}>
            <i className="ti ti-plus" /> + Novo Técnico
          </Button>
        }
      />

      <div className={styles.grid}>
        {tecnicos.map(t => (
          <div key={t.id} className={styles.card}>
            <div className={styles.avatar}>{ini(t.nome)}</div>
            <div className={styles.name}>{t.nome}</div>
            <div className={styles.info}><i className="ti ti-mail" />{t.email}</div>
            <div className={styles.info}><i className="ti ti-phone" />{t.tel}</div>
            <div className={styles.info}><i className="ti ti-settings" />{t.esp}</div>
            <div className={`${styles.status} ${t.status === 'Disponível' ? styles.disp : styles.indisp}`}>
              ● {t.status}
            </div>
            <div className={styles.acts}>
              <Button variant="edit" onClick={() => abrirEditar(t)}>
                <i className="ti ti-edit" /> Editar
              </Button>
              <Button variant="danger" onClick={() => { setDeleteId(t.id); setConfirm(true); }}>
                <i className="ti ti-trash" /> Excluir
              </Button>
            </div>
          </div>
        ))}
        {tecnicos.length === 0 && (
          <p style={{ color: 'var(--text2)', fontSize: 13 }}>Nenhum técnico cadastrado.</p>
        )}
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editId ? 'Editar Técnico' : 'Novo Técnico'}
        footer={
          <>
            <Button onClick={() => setModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={salvar}>
              <i className="ti ti-device-floppy" /> {editId ? 'Salvar alterações' : 'Cadastrar'}
            </Button>
          </>
        }
      >
        <div className={styles.formGrid}>
          <Field label="Nome completo *" full>
            <Input placeholder="Ex: Marcos Oliveira" value={form.nome} onChange={set('nome')} />
          </Field>
          <Field label="E-mail">
            <Input type="email" placeholder="tecnico@assistencia.com" value={form.email} onChange={set('email')} />
          </Field>
          <Field label="Telefone">
            <Input placeholder="(11) 99999-9999" value={form.tel} onChange={set('tel')} />
          </Field>
          <Field label="Especialidade *">
            <Select value={form.esp} onChange={set('esp')}>
              <option value="">Selecione...</option>
              {ESPS.map(e => <option key={e} value={e}>{e}</option>)}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={set('status')}>
              <option>Disponível</option>
              <option>Indisponível</option>
            </Select>
          </Field>
        </div>
      </Modal>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => { deleteTecnico(deleteId); setConfirm(false); }}
        message="Tem certeza que deseja excluir este técnico?"
      />
    </div>
  );
}
