import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/storage';

export default function RegisterGerente() {
  // Este formulario fuerza el rol 'gerente' automáticamente
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', rol: 'gerente' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    if (!form.nombre || !form.email || !form.password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    const result = registerUser(form);
    
    if (result.success) {
      alert('Gerente creado exitosamente.');
      navigate('/dashboard'); // Vuelve al dashboard del Admin Buffet
    } else {
      setError(result.msg);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Crear Nuevo Gerente</h2>
        <p style={{marginBottom: '15px'}}>Este usuario tendrá acceso limitado al control de personal.</p>
        <div className="error">{error}</div>
        
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        
        <button onClick={handleRegister}>Crear Gerente</button>
        
        <button onClick={() => navigate('/dashboard')} style={{backgroundColor: '#6c757d', marginTop: '10px'}}>
            Cancelar
        </button>
      </div>
    </div>
  );
}