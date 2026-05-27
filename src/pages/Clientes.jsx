import React, { useState } from 'react';
import { useApp } from '../AppContext';
import {
  PageHeader, Button, Modal, ConfirmModal,
  Field, Input, Initials,
} from '../components/UI';
import styles from './Clientes.module.css';

const EMPTY = { nome: '', email: '', tel: '', end: '' };

export default function Clientes() {
  const { clientes, addCliente, updateCliente, deleteCliente } = useApp();

  const [busca,    setBusca]    = useState('');
  const [modal,    setModal]    = useState(false);
  const [confirm,  setConfirm]  = useState(false);
  const [form,     setForm]     = useState(EMPTY);
  const [editId,   setEditId]   = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const lista = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirNovo() {
    setForm(EMPTY); setEditId(null); setModal(true);
  }

  function abrirEditar(c) {
    setForm({ nome: c.nome, email: c.email, tel: c.tel, end: c.end });
    setEditId(c.id);
    setModal(true);
  }

  function salvar() {
    if (!form.nome.trim()) { alert('Preencha o nome.'); return; }
    if (editId) updateCliente({ ...form, id: editId });
    else        addCliente(form);
    setModal(false);
  }

  function confirmarDel() {
    deleteCliente(deleteId);
    setConfirm(false);
  }

  function set(field) {
    return e => setForm(p => ({ ...p, [field]: e.target.value }));
  }

  return (
    <div>
      <PageHeader
        icon="ti-users"
        title="Clientes"
        action={
          <Button variant="primary" onClick={abrirNovo}>
            <i className="ti ti-plus" /> + Novo Cliente
          </Button>
        }
      />

      <div className={styles.filterRow}>
        <Input
          placeholder="Buscar por nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ maxWidth: 280 }}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th style={{ width: 160 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>Nenhum cliente encontrado.</td>
              </tr>
            ) : lista.map(c => (
              <tr key={c.id}>
                <td>
                  <div className={styles.nameCell}>
                    <Initials name={c.nome} />
                    <span className={styles.bold}>{c.nome}</span>
                  </div>
                </td>
                <td className={styles.muted}>{c.email}</td>
                <td className={styles.muted}>{c.tel}</td>
                <td className={styles.muted} style={{ fontSize: 12 }}>{c.end}</td>
                <td>
                  <div className={styles.acts}>
                    <Button variant="edit" onClick={() => abrirEditar(c)}>
                      <i className="ti ti-edit" /> Editar
                    </Button>
                    <Button variant="danger" onClick={() => { setDeleteId(c.id); setConfirm(true); }}>
                      <i className="ti ti-trash" /> Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editId ? 'Editar Cliente' : 'Novo Cliente'}
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
            <Input placeholder="Ex: Carlos Mendes" value={form.nome} onChange={set('nome')} />
          </Field>
          <Field label="E-mail">
            <Input type="email" placeholder="email@exemplo.com" value={form.email} onChange={set('email')} />
          </Field>
          <Field label="Telefone">
            <Input placeholder="(11) 99999-9999" value={form.tel} onChange={set('tel')} />
          </Field>
          <Field label="Endereço" full>
            <Input placeholder="Rua das Flores, 123 – São Paulo, SP" value={form.end} onChange={set('end')} />
          </Field>
        </div>
      </Modal>

      {/* MODAL CONFIRMAR */}
      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={confirmarDel}
        message="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
