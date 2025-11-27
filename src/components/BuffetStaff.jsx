import React, { useState, useEffect } from 'react';
import * as Storage from '../services/storage';

export default function BuffetStaff() {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    cargarStaff();
  }, []);

  const cargarStaff = () => {
    setStaff(Storage.getBuffetStaff());
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarEmpleado = () => {
    if (formData.nombre && formData.apellido && formData.email) {
      Storage.saveBuffetStaff(formData);
      cargarStaff();
      setShowModal(false);
      setFormData({});
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  const editarEmpleado = (empleado) => {
    setFormData(empleado);
    setShowModal(true);
  };

  const borrarEmpleado = (id) => {
    if (window.confirm("¿Eliminar empleado?")) {
      Storage.deleteBuffetStaff(id);
      cargarStaff();
    }
  };

  const toggleTrabajando = (empleado) => {
    // Cambiamos solo el estado de "trabajando" y guardamos
    const actualizado = { ...empleado, trabajando: !empleado.trabajando };
    Storage.saveBuffetStaff(actualizado);
    cargarStaff();
  };

  const abrirNuevo = () => {
    setFormData({});
    setShowModal(true);
  };

  return (
    <div className="box fade-in">
      <div className="box-header">
        <h3>👨‍🍳 Personal del Buffet</h3>
        <button className="action-btn" onClick={abrirNuevo}>+ Agregar Empleado</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((emp) => (
            <tr key={emp.id} style={{ backgroundColor: emp.trabajando ? '#e8f5e9' : 'transparent' }}>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.email}</td>
              <td>
                <label style={{ cursor: 'pointer', fontWeight: 'bold', color: emp.trabajando ? 'green' : '#666', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={emp.trabajando || false}
                    onChange={() => toggleTrabajando(emp)}
                    style={{ marginRight: '8px', width: '18px', height: '18px' }}
                  />
                  {emp.trabajando ? 'TRABAJANDO' : 'NO TRABAJA'}
                </label>
              </td>
              <td>
                <button className="action-btn secondary" style={{ padding: '5px 10px', fontSize: '12px', marginRight: '5px' }} onClick={() => editarEmpleado(emp)}>✏️</button>
                <button className="action-btn" style={{ padding: '5px 10px', fontSize: '12px', background: '#dc3545' }} onClick={() => borrarEmpleado(emp.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL EMPLEADO */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{formData.id ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
            
            <label style={{display:'block', textAlign:'left', marginTop:'10px'}}>Nombre:</label>
            <input name="nombre" value={formData.nombre || ''} onChange={handleInputChange} />
            
            <label style={{display:'block', textAlign:'left', marginTop:'10px'}}>Apellido:</label>
            <input name="apellido" value={formData.apellido || ''} onChange={handleInputChange} />
            
            <label style={{display:'block', textAlign:'left', marginTop:'10px'}}>Email:</label>
            <input name="email" value={formData.email || ''} onChange={handleInputChange} />

            <button className="action-btn full-width" onClick={guardarEmpleado}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}