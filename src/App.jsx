import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes  from './pages/Clientes';
import Tecnicos  from './pages/Tecnicos';
import Servicos  from './pages/Servicos';
import Ordens    from './pages/Ordens';
import Sobre     from './pages/Sobre';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clientes"  element={<Clientes />} />
            <Route path="tecnicos"  element={<Tecnicos />} />
            <Route path="servicos"  element={<Servicos />} />
            <Route path="ordens"    element={<Ordens />} />
            <Route path="sobre"     element={<Sobre />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
