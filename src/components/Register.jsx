import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/storage';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', pass2: '', rol: 'alumno' });
  const [error, setError] = useState('');
  
  // Estado para saber quién está creando a quién
  const [creatorRole, setCreatorRole] = useState(null); // 'admin' o 'user_buffet'
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        if (currentUser.rol === 'admin') {
            setCreatorRole('admin');
            setForm(f => ({ ...f, rol: 'user_buffet' })); // Admin crea Buffet
        } else if (currentUser.rol === 'user_buffet') {
            setCreatorRole('user_buffet');
            setForm(f => ({ ...f, rol: 'user_employee' })); // Buffet crea Empleado
        }
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    if (form.password !== form.pass2) {
      setError('Las contraseñas no coinciden');
      return;
    }
    const result = registerUser(form);
    
    if (result.success) {
      alert('Usuario creado exitosamente');
      // Si alguien estaba logueado creando usuarios, vuelve al dashboard
      if (creatorRole) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.msg);
    }
  };

  // Título dinámico
  let title = 'Registro';
  if (creatorRole === 'admin') title = 'Crear Usuario Buffet';
  if (creatorRole === 'user_buffet') title = 'Crear Empleado (Sin Accesos)';

  return (
    <div className="container">
      <div className="form-box">
        <h2>{title}</h2>
        <div className="error">{error}</div>
        
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <input name="pass2" type="password" placeholder="Repetir Contraseña" onChange={handleChange} />

        <button onClick={handleRegister}>
            {creatorRole ? 'Crear Usuario' : 'Registrarse'}
        </button>
        
        {creatorRole && (
             <button onClick={() => navigate('/dashboard')} style={{backgroundColor: '#6c757d', marginTop: '10px'}}>
                Cancelar y Volver
             </button>
        )}

        {!creatorRole && (
             <p>¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link></p>
        )}
      </div>
    </div>
  );
} 