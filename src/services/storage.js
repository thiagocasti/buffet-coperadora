// src/services/storage.js

const get = (key) => JSON.parse(localStorage.getItem(key)) || [];
const set = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// === EMPLEADOS DEL BUFFET (Gestión del Admin Buffet) ===
export const getBuffetStaff = () => {
    let staff = get('buffet_staff');
    
    // DATOS DE PRUEBA (Si está vacío, cargamos estos)
    if (staff.length === 0) {
        staff = [
            { id: 1, nombre: 'Ramón', apellido: 'Valdés', email: 'monchito@buffet.com', trabajando: true },
            { id: 2, nombre: 'Florinda', apellido: 'Meza', email: 'flor@buffet.com', trabajando: false },
            { id: 3, nombre: 'Carlos', apellido: 'Villagrán', email: 'kiko@buffet.com', trabajando: true },
            { id: 4, nombre: 'Rubén', apellido: 'Aguirre', email: 'profe@buffet.com', trabajando: false },
            { id: 5, nombre: 'María', apellido: 'Antonieta', email: 'chilindrina@buffet.com', trabajando: true }
        ];
        set('buffet_staff', staff);
    }
    return staff;
};

export const saveBuffetStaff = (empleado) => {
    let staff = get('buffet_staff');
    
    if (empleado.id) {
        // Editar existente
        const index = staff.findIndex(e => e.id === empleado.id);
        if (index !== -1) staff[index] = empleado;
    } else {
        // Crear nuevo
        staff.push({ ...empleado, id: Date.now(), trabajando: false }); // Por defecto no trabaja al crearse
    }
    set('buffet_staff', staff);
};

export const deleteBuffetStaff = (id) => {
    let staff = get('buffet_staff');
    staff = staff.filter(e => e.id !== id);
    set('buffet_staff', staff);
};

// === USUARIOS ===
export const registerUser = (user) => {
  const users = get('users');
  if (users.find(u => u.email === user.email)) return { success: false, msg: 'Email ya registrado' };
  users.push({ ...user, rol: user.rol || 'alumno' });
  set('users', users);
  return { success: true };
};

export const loginUser = (email, password) => {
  if (email === 'Admin@example.com' && password === '123') {
    return { nombre: 'Admin', apellido: 'Supremo', email: 'Admin@example.com', rol: 'admin' };
  }
  const users = get('users');
  return users.find(u => u.email === email && u.password === password);
};

// === EL RESTO DE FUNCIONES (Menús, Socios, etc.) ===
export const getMenus = () => get('menus');
export const addMenu = (item) => { const data = get('menus'); data.push({ ...item, id: Date.now(), disponible: true }); set('menus', data); };

export const getSocios = () => get('socios');
export const addSocio = (item) => {
  const data = get('socios');
  if (item.id) {
      const index = data.findIndex(s => s.id === item.id);
      if (index !== -1) data[index] = item;
  } else {
      data.push({ ...item, id: Date.now(), ingreso: new Date().toISOString().split('T')[0] });
  }
  set('socios', data);
};
export const deleteSocio = (id) => { let data = get('socios'); data = data.filter(s => s.id !== id); set('socios', data); };

export const getReservas = () => get('reservas');
export const addReserva = (item) => { 
    const data = get('reservas'); 
    const nueva = { ...item, id: item.id || Date.now(), estado: item.estado || 'reservado', pagado: item.pagado || false };
    const idx = data.findIndex(r => r.id === nueva.id);
    if (idx !== -1) data[idx] = nueva; else data.push(nueva);
    set('reservas', data);
};
export const deleteReserva = (id) => { let data = get('reservas'); data = data.filter(r => r.id !== id); set('reservas', data); };

export const getAsistencias = () => get('asistencias');
export const getPagos = () => get('pagos');
// === LISTA DE TRABAJADORES (Gerente) ===
export const getPlanillaTrabajadores = () => [ {id:101, nombre:'Juan', apellido:'Pérez'} ]; // Placeholder