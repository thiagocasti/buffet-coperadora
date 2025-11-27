import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GerenteView from './GerenteView';
import AdminView from './AdminView';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  if (!user) return null;

  // === ROL: GERENTE (Vista Limitada) ===
  if (user.rol === 'gerente') {
    return <GerenteView user={user} />;
  }

  // === ROL: ADMIN O ADMIN BUFFET (Vista Completa) ===
  // AdminView maneja internamente qué botón de "Crear" mostrar
  return <AdminView user={user} />;
}