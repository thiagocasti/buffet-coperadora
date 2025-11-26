import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/storage';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', pass2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    if (form.password !== form.pass2) {
      setError('Las contraseñas no coinciden');
      return;
    }
    const result = registerUser(form);
    if (result.success) {
      alert('Registro exitoso');
      navigate('/');
    } else {
      setError(result.msg);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Registro</h2>
        <div className="error">{error}</div>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <input name="pass2" type="password" placeholder="Repetir Contraseña" onChange={handleChange} />
        <button onClick={handleRegister}>Registrarse</button>
        <p>¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link></p>
      </div>
    </div>
  );
}