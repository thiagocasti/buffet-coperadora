// src/services/storage.js

// === AYUDAS ===
const get = (key) => JSON.parse(localStorage.getItem(key)) || [];
const set = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// === USUARIOS ===
export const registerUser = (user) => {
  const users = get('users');
  if (users.find(u => u.email === user.email)) return { success: false, msg: 'Email ya registrado' };
  // Por defecto es alumno, si es el admin hardcodeado es admin
  users.push({ ...user, rol: 'alumno' });
  set('users', users);
  return { success: true };
};

export const loginUser = (email, password) => {
  if (email === 'admin@example.com' && password === '123') {
    return { nombre: 'Admin', apellido: 'Sistema', rol: 'admin' };
  }
  const users = get('users');
  return users.find(u => u.email === email && u.password === password);
};

// === GESTIÓN DE DATOS ===

// Menús
export const getMenus = () => get('menus');
export const addMenu = (item) => {
  const data = get('menus');
  data.push({ ...item, disponible: true });
  set('menus', data);
};

// Socios
export const getSocios = () => get('socios');
export const addSocio = (item) => {
  const data = get('socios');
  data.push({ ...item, ingreso: new Date().toISOString().split('T')[0] });
  set('socios', data);
};

// Reservas
export const getReservas = () => get('reservas');
export const addReserva = (item) => {
  const data = get('reservas');
  data.push({ ...item, estado: 'reservado', pagado: false });
  set('reservas', data);
};

// Asistencias
export const getAsistencias = () => get('asistencias');
export const addAsistencia = (item) => {
  const data = get('asistencias');
  data.push({ ...item, fecha_asistencia: new Date().toISOString().split('T')[0] });
  set('asistencias', data);
};

// Pagos
export const getPagos = () => get('pagos');
export const addPago = (item) => {
  const data = get('pagos');
  data.push({ ...item, fecha_pago: new Date().toISOString().split('T')[0] });
  set('pagos', data);
};