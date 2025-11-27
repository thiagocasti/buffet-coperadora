import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlanillaTrabajadores } from '../services/storage';

export default function EmployeeView({ user }) {
  const navigate = useNavigate();
  // Estado para guardar quién vino hoy (ID del trabajador : true/false)
  const [asistencia, setAsistencia] = useState({});
  const trabajadores = getPlanillaTrabajadores();

  const cerrarSesion = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const toggleAsistencia = (id) => {
    setAsistencia({
      ...asistencia,
      [id]: !asistencia[id]
    });
  };

  return (
    <div className="dashboard-container">
      {/* Barra superior simple */}
      <nav className="main-navbar" style={{justifyContent: 'center', backgroundColor: '#444'}}>
        <span className="nav-link active" style={{cursor: 'default', borderBottom: 'none'}}>
           PLANILLA DE CONTROL
        </span>
      </nav>

      <div className="dashboard-content">
        {/* Banner de Bienvenida */}
        <div className="welcome-banner">
          <div className="user-info">
            <img src="/Socio.png" alt="avatar" className="user-avatar"/>
            <div>
              <h2>Hola, <span className="highlight-name">{user.nombre} {user.apellido}</span></h2>
              <p className="user-role">Control de Personal</p>
            </div>
          </div>
          <button onClick={cerrarSesion} className="logout-btn">Cerrar Sesión</button>
        </div>

        {/* Caja con la lista de tildes */}
        <div className="box fade-in">
          <h3>📋 Asistencia Diaria</h3>
          <p style={{marginBottom: '20px', color: '#666'}}>
            Marque la casilla de los empleados que se encuentran trabajando en el turno actual.
          </p>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>¿Presente?</th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((t) => (
                <tr key={t.id} style={{backgroundColor: asistencia[t.id] ? '#e8f5e9' : 'transparent'}}>
                  <td>{t.nombre}</td>
                  <td>{t.apellido}</td>
                  <td>
                    <label style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: asistencia[t.id] ? 'green' : '#555'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={!!asistencia[t.id]} 
                        onChange={() => toggleAsistencia(t.id)}
                        style={{width: '20px', height: '20px', marginRight: '10px'}}
                      />
                      {asistencia[t.id] ? 'SÍ' : 'NO'}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button 
            className="action-btn full-width" 
            onClick={() => alert("Asistencia guardada correctamente en el sistema.")}
          >
            Guardar Asistencia
          </button>
        </div>
      </div>
    </div>
  );
}