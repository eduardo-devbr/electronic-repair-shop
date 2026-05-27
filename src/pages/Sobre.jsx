import React from 'react';
import styles from './Sobre.module.css';

export default function Sobre() {
  return (
    <div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <i className="ti ti-tool" /> TechFix — Assistência Técnica
        </h3>
        <p className={styles.cardText}>
          Sistema de gerenciamento de ordens de serviço para assistência técnica em equipamentos
          eletrônicos. Permite o controle completo de clientes, técnicos, serviços e ordens de
          serviço com funcionalidades de criação, edição e exclusão de registros.
        </p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <i className="ti ti-code" /> Tecnologias utilizadas
        </h3>
        <p className={styles.cardText}>
          React · React Router v6 · JSX · Props · State · Context API · SPA ·
          JSON (fonte de dados) · CSS Modules · Componentização de interface
        </p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <i className="ti ti-users" /> Equipe de desenvolvimento
        </h3>
        <div className={styles.teamGrid}>
          {['Aluno 1', 'Aluno 2', 'Aluno 3'].map((nome, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.teamAv}>{nome[0] + (i + 1)}</div>
              <p className={styles.teamName}>{nome}</p>
              <p className={styles.teamRole}>Desenvolvedor</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <i className="ti ti-calendar" /> Informações do projeto
        </h3>
        <p className={styles.cardText}>
          Disciplina: Desenvolvimento Web 2 &nbsp;|&nbsp; Entrega: 01/06/2026 &nbsp;|&nbsp; Apresentação: 02/06/2026
        </p>
      </div>
    </div>
  );
}
