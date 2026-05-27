import React, { createContext, useContext, useState } from 'react';
import initialData from './data.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [clientes, setClientes] = useState(initialData.clientes);
  const [tecnicos, setTecnicos] = useState(initialData.tecnicos);
  const [servicos, setServicos] = useState(initialData.servicos);
  const [ordens, setOrdens]     = useState(initialData.ordens);

  const [nextId, setNextId] = useState({
    cli: initialData.clientes.length + 1,
    tec: initialData.tecnicos.length + 1,
    svc: initialData.servicos.length + 1,
    os:  initialData.ordens.length + 1,
  });

  function getId(type) {
    const id = nextId[type];
    setNextId(p => ({ ...p, [type]: p[type] + 1 }));
    return id;
  }

  // --- CLIENTES ---
  function addCliente(c)    { setClientes(p => [...p, { ...c, id: getId('cli') }]); }
  function updateCliente(c) { setClientes(p => p.map(x => x.id === c.id ? c : x)); }
  function deleteCliente(id){ setClientes(p => p.filter(x => x.id !== id)); }

  // --- TÉCNICOS ---
  function addTecnico(t)    { setTecnicos(p => [...p, { ...t, id: getId('tec') }]); }
  function updateTecnico(t) { setTecnicos(p => p.map(x => x.id === t.id ? t : x)); }
  function deleteTecnico(id){ setTecnicos(p => p.filter(x => x.id !== id)); }

  // --- SERVIÇOS ---
  function addServico(s)    { setServicos(p => [...p, { ...s, id: getId('svc') }]); }
  function updateServico(s) { setServicos(p => p.map(x => x.id === s.id ? s : x)); }
  function deleteServico(id){ setServicos(p => p.filter(x => x.id !== id)); }

  // --- ORDENS ---
  function addOrdem(o) {
    const id = getId('os');
    setOrdens(p => [...p, { ...o, id, num: `#${id}` }]);
  }
  function updateOrdem(o) { setOrdens(p => p.map(x => x.id === o.id ? o : x)); }
  function deleteOrdem(id){ setOrdens(p => p.filter(x => x.id !== id)); }

  return (
    <AppContext.Provider value={{
      clientes, addCliente, updateCliente, deleteCliente,
      tecnicos, addTecnico, updateTecnico, deleteTecnico,
      servicos, addServico, updateServico, deleteServico,
      ordens,   addOrdem,   updateOrdem,   deleteOrdem,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
