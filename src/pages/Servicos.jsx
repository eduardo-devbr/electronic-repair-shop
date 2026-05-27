import React, { useState } from 'react';
import { useApp } from '../AppContext';
import {
  PageHeader, Button, Modal, ConfirmModal,
  Field, Input, Select, Textarea,
} from '../components/UI';
import styles from './Servicos.module.css';

const EMPTY = { nome: '', cat: '', dur: '', preco: '', desc: '' };
const CATS  = ['Informática', 'Eletrodomésticos', 'Refrigeração', 'Smartphone', 'Redes'];

function fmtR(v) { return 'R$ ' + Number(v).toFixed(2); }

export default function Servicos() {
  const { servicos, addServico, updateServico, deleteServico } = useApp();

  const [modal,    setModal]    = useState(false);
  const [confirm,  setConfirm]  = useState(false);
  const [form,     setForm]     = useState(EMPTY);
  const [editId,   setEditId]   = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  function abrirNovo() { setForm(EMPTY); setEditId(null); setModal(true); }

  function abrirEditar(s) {
    setForm({ nome: s.nome, cat: s.cat, dur: s.dur, preco: s.preco, desc: s.desc });
    setEditId(s.id);
    setModal(true);
  }

  function salvar() {
    if (!form.nome.trim()) { alert('Preencha o nome do serviço.'); return; }
    const obj = { ...form, preco: parseFloat(form.preco) || 0 };
    if (editId) updateServico({ ...obj, id: editId });
    else        addServico(obj);
    setModal(false);
  }

  function set(field) { return e => setForm(p => ({ ...p, [field]: e.target.value })); }

  return (
    <div>
      <PageHeader
        icon="ti-settings"
        title="Serviços"
        action={
          <Button variant="primary" onClick={abrirNovo}>
            <i className="ti ti-plus" /> + Novo Serviço
          </Button>
        }
      />

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th style={{ width: 120 }}>Categoria</th>
              <th>Descrição</th>
              <th style={{ width: 90 }}>Duração</th>
              <th style={{ width: 100 }}>Preço</th>
              <th style={{ width: 150 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.length === 0 ? (
              <tr><td colSpan={6} className={styles.empty}>Nenhum serviço cadastrado.</td></tr>
            ) : servicos.map(s => (
              <tr key={s.id}>
                <td className={styles.bold}>{s.nome}</td>
                <td><span className={styles.catBadge}>{s.cat}</span></td>
                <td className={styles.muted} style={{ fontSize: 12 }}>{s.desc}</td>
                <td className={styles.muted}>{s.dur}</td>
                <td className={styles.price}>{fmtR(s.preco)}</td>
                <td>
                  <div className={styles.acts}>
                    <Button variant="edit" onClick={() => abrirEditar(s)}>
                      <i className="ti ti-edit" /> Editar
                    </Button>
                    <Button variant="danger" onClick={() => { setDeleteId(s.id); setConfirm(true); }}>
                      <i className="ti ti-trash" /> Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editId ? 'Editar Serviço' : 'Novo Serviço'}
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
          <Field label="Nome do serviço *" full>
            <Input placeholder="Ex: Troca de Tela de Notebook" value={form.nome} onChange={set('nome')} />
          </Field>
          <Field label="Categoria">
            <Select value={form.cat} onChange={set('cat')}>
              <option value="">Selecione...</option>
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Duração estimada">
            <Input placeholder="Ex: 2 horas" value={form.dur} onChange={set('dur')} />
          </Field>
          <Field label="Preço (R$)" full>
            <Input type="number" placeholder="0.00" value={form.preco} onChange={set('preco')} />
          </Field>
          <Field label="Descrição" full>
            <Textarea placeholder="Descreva o serviço..." value={form.desc} onChange={set('desc')} />
          </Field>
        </div>
      </Modal>

      <ConfirmModal
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => { deleteServico(deleteId); setConfirm(false); }}
        message="Tem certeza que deseja excluir este serviço?"
      />
    </div>
  );
}
