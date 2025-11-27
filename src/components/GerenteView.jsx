import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlanillaTrabajadores } from '../services/storage';

export default function GerenteView({ user }) {
  const navigate = useNavigate();
  const [asistencia, setAsistencia] = useState({});
  const trabajadores = getPlanillaTrabajadores();

  const cerrarSesion = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const toggleAsistencia = (id) => {
    setAsistencia({ ...asistencia, [id]: !asistencia[id] });
  };

  return (
    <div className="dashboard-container">
      <nav className="main-navbar" style={{justifyContent: 'center', backgroundColor: '#333'}}>
        <span className="nav-link active" style={{cursor: 'default'}}>PANEL DE GERENCIA</span>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-banner">
          <div className="user-info">
            <img src="/Socio.png" alt="avatar" className="user-avatar"/>
            <div>
              {/* MUESTRA EL NOMBRE REAL DEL GERENTE */}
              <h2>Hola, <span className="highlight-name">{user.nombre} {user.apellido}</span></h2>
              <p className="user-role">Gerente de Personal</p>
            </div>
          </div>
          <button onClick={cerrarSesion} className="logout-btn">Cerrar Sesión</button>
        </div>

        <div className="box fade-in">
          <h3>📋 Control de Asistencia - Empleados</h3>
          <p style={{marginBottom: '20px', color: '#666'}}>Marque quién está trabajando hoy.</p>
          <table>
            <thead><tr><th>Nombre</th><th>Apellido</th><th>Estado</th></tr></thead>
            <tbody>
              {trabajadores.map((t) => (
                <tr key={t.id} style={{backgroundColor: asistencia[t.id] ? '#e8f5e9' : 'transparent'}}>
                  <td>{t.nombre}</td>
                  <td>{t.apellido}</td>
                  <td>
                    <label style={{cursor: 'pointer', fontWeight: 'bold', color: asistencia[t.id] ? 'green' : '#555'}}>
                      <input type="checkbox" checked={!!asistencia[t.id]} onChange={() => toggleAsistencia(t.id)} style={{marginRight:'10px'}}/>
                      {asistencia[t.id] ? 'PRESENTE' : 'AUSENTE'}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="action-btn full-width" onClick={() => alert("Guardado.")}>Confirmar Asistencia</button>
        </div>
      </div>
    </div>
  );
}