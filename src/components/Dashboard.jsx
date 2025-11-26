import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Storage from '../services/storage';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // null = inicio, 'string' = sección activa

  // Datos
  const [menus, setMenus] = useState([]);
  const [socios, setSocios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);

  // Modales
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [showModalSocio, setShowModalSocio] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);
    recargarDatos();
  }, [navigate]);

  const recargarDatos = () => {
    setMenus(Storage.getMenus());
    setSocios(Storage.getSocios());
    setReservas(Storage.getReservas());
    setPagos(Storage.getPagos());
    setAsistencias(Storage.getAsistencias());
  };

  const cerrarSesion = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  // --- GUARDAR DATOS ---
  const guardarMenu = () => {
    if(formData.fecha && formData.principal && formData.precio) {
      Storage.addMenu(formData);
      recargarDatos();
      setShowModalMenu(false);
      setFormData({});
    } else { alert("Faltan datos"); }
  };

  const guardarSocio = () => {
    if(formData.numero && formData.nombre) {
      Storage.addSocio(formData);
      recargarDatos();
      setShowModalSocio(false);
      setFormData({});
    } else { alert("Faltan datos"); }
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      
      {/* === NUEVA BARRA DE NAVEGACIÓN "NEGRO ROJIZO" === */}
      {/* Esta barra ahora está siempre visible debajo del Header */}
      <nav className="main-navbar">
        <button className={`nav-link ${activeSection === null ? 'active' : ''}`} onClick={() => setActiveSection(null)}>🏠 Inicio</button>
        <button className={`nav-link ${activeSection === 'menus' ? 'active' : ''}`} onClick={() => setActiveSection('menus')}>Menús</button>
        <button className={`nav-link ${activeSection === 'reservas' ? 'active' : ''}`} onClick={() => setActiveSection('reservas')}>Reservas</button>
        <button className={`nav-link ${activeSection === 'asistencias' ? 'active' : ''}`} onClick={() => setActiveSection('asistencias')}>Asistencias</button>
        <button className={`nav-link ${activeSection === 'pagos' ? 'active' : ''}`} onClick={() => setActiveSection('pagos')}>Pagos</button>
        <button className={`nav-link ${activeSection === 'socios' ? 'active' : ''}`} onClick={() => setActiveSection('socios')}>Socios</button>
        {user.rol === 'admin' && (
          <>
            <button className={`nav-link ${activeSection === 'control' ? 'active' : ''}`} onClick={() => setActiveSection('control')}>Control</button>
            <button className={`nav-link ${activeSection === 'padron' ? 'active' : ''}`} onClick={() => setActiveSection('padron')}>Padrón</button>
          </>
        )}
      </nav>

      <div className="dashboard-content">
        {/* HEADER DE BIENVENIDA MEJORADO */}
        <div className="welcome-banner">
          <div className="user-info">
            <img src="/Socio.png" alt="avatar" className="user-avatar"/>
            <div>
              <h2>Hola, <span className="highlight-name">{user.nombre} {user.apellido}</span></h2>
              <p className="user-role">{user.rol === 'admin' ? 'Administrador' : 'Alumno/Socio'}</p>
            </div>
          </div>
          <button onClick={cerrarSesion} className="logout-btn">Cerrar Sesión</button>
        </div>

        {/* === SECCIONES INDIVIDUALES === */}
        
        {activeSection === null && (
          <div className="welcome-placeholder">
            <h3>Bienvenido al sistema de gestión.</h3>
            <p>Selecciona una opción de la barra de navegación superior para comenzar.</p>
          </div>
        )}

        {/* 1. SECCIÓN MENÚS */}
        {activeSection === 'menus' && (
          <div className="box fade-in">
            <div className="box-header">
              <h3>🍽️ MENÚS DISPONIBLES</h3>
              {user.rol === 'admin' && <button className="action-btn" onClick={() => setShowModalMenu(true)}>+ Nuevo Menú</button>}
            </div>
            <table>
              <thead><tr><th>Fecha</th><th>Principal</th><th>Guarnición</th><th>Postre</th><th>Precio</th></tr></thead>
              <tbody>
                {menus.map((m, i) => (
                  <tr key={i}>
                    <td>{m.fecha}</td><td>{m.principal}</td><td>{m.guarnicion}</td><td>{m.postre}</td><td><strong>${m.precio}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. SECCIÓN RESERVAS */}
        {activeSection === 'reservas' && (
          <div className="box fade-in">
             <div className="box-header">
              <h3>📅 MIS RESERVAS</h3>
              <button className="action-btn" onClick={() => alert("Función: Crear reserva")}>+ Nueva Reserva</button>
            </div>
            <table>
              <thead><tr><th>Socio</th><th>Fecha Menú</th><th>Estado</th><th>Pagado</th></tr></thead>
              <tbody>
                {reservas.map((r, i) => (
                  <tr key={i}><td>{r.socio_numero}</td><td>{r.menu_fecha}</td><td><span className={`tag ${r.estado}`}>{r.estado}</span></td><td>{r.pagado ? 'Sí' : 'No'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. SECCIÓN SOCIOS */}
        {activeSection === 'socios' && (
          <div className="box fade-in">
             <div className="box-header">
              <h3>👥 PADRÓN DE SOCIOS</h3>
              <div style={{display: 'flex', gap: '10px'}}>
                <input type="text" placeholder="Buscar socio..." className="search-input" />
                {user.rol === 'admin' && <button className="action-btn" onClick={() => setShowModalSocio(true)}>+ Nuevo Socio</button>}
              </div>
            </div>
            <table>
              <thead><tr><th>Número</th><th>Nombre</th><th>DNI</th><th>Domicilio</th></tr></thead>
              <tbody>
                {socios.map((s, i) => (
                  <tr key={i}><td><strong>{s.numero}</strong></td><td>{s.nombre}</td><td>{s.dni}</td><td>{s.domicilio}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

         {/* 4. SECCIÓN ASISTENCIAS */}
         {activeSection === 'asistencias' && (
          <div className="box fade-in">
            <h3>✅ REGISTRO DE ASISTENCIAS</h3>
            <table>
              <thead><tr><th>Socio</th><th>Fecha Menú</th><th>Fecha Asistencia</th></tr></thead>
              <tbody>
                {asistencias.map((a, i) => (
                  <tr key={i}><td>{a.socio_numero}</td><td>{a.menu_fecha}</td><td>{a.fecha_asistencia}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. SECCIÓN PAGOS */}
        {activeSection === 'pagos' && (
          <div className="box fade-in">
            <h3>💰 HISTORIAL DE PAGOS</h3>
            <table>
              <thead><tr><th>Socio</th><th>Fecha Menú</th><th>Monto</th><th>Método</th></tr></thead>
              <tbody>
                {pagos.map((p, i) => (
                  <tr key={i}><td>{p.socio_numero}</td><td>{p.menu_fecha}</td><td><strong>${p.monto}</strong></td><td>{p.metodo}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SECCIÓN CONTROL Y OTRAS */}
        {(activeSection === 'control' || activeSection === 'padron') && (
           <div className="box fade-in">
              <h3>{activeSection.toUpperCase()} (Simulación)</h3>
              <p>Esta sección está en construcción.</p>
              <div style={{marginTop: '20px'}}>
                <button className="action-btn secondary" onClick={() => window.print()}>🖨️ Imprimir Reporte</button>
                <button className="action-btn secondary" style={{marginLeft: '10px'}} onClick={() => alert("Resumen...")}>📊 Ver Resumen</button>
              </div>
           </div>
        )}
      </div>

      {/* === MODALES === */}
      {showModalMenu && (
        <div className="modal fade-in">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalMenu(false)}>&times;</span>
            <h2>Nuevo Menú</h2>
            <input type="date" name="fecha" onChange={handleInputChange} />
            <input type="text" name="principal" placeholder="Plato Principal" onChange={handleInputChange} />
            <input type="text" name="guarnicion" placeholder="Guarnición" onChange={handleInputChange} />
            <input type="text" name="postre" placeholder="Postre" onChange={handleInputChange} />
            <input type="number" name="precio" placeholder="Precio" onChange={handleInputChange} />
            <button className="action-btn full-width" onClick={guardarMenu}>Guardar Menú</button>
          </div>
        </div>
      )}

      {showModalSocio && (
        <div className="modal fade-in">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalSocio(false)}>&times;</span>
            <h2>Nuevo Socio</h2>
            <input type="text" name="numero" placeholder="Número de Socio" onChange={handleInputChange} />
            <input type="text" name="nombre" placeholder="Nombre Completo" onChange={handleInputChange} />
            <input type="text" name="dni" placeholder="DNI" onChange={handleInputChange} />
            <input type="text" name="domicilio" placeholder="Domicilio" onChange={handleInputChange} />
            <button className="action-btn full-width" onClick={guardarSocio}>Guardar Socio</button>
          </div>
        </div>
      )}

    </div>
  );
}