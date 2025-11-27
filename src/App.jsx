import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import RegisterGerente from './components/RegisterGerente'; // NUEVO
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Login principal */}
        <Route path="/" element={<Login />} />
        
        {/* Registro de Admin Buffet (Solo accesible por Admin Supremo) */}
        <Route path="/registro" element={<Register />} />
        
        {/* Registro de Gerente (Solo accesible por Admin Buffet) */}
        <Route path="/registro-gerente" element={<RegisterGerente />} />
        
        {/* Dashboard (Redirige según rol) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;