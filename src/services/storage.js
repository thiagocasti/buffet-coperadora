// === USUARIOS ===
export const registerUser = (user) => {
  const users = get('users');
  if (users.find(u => u.email === user.email)) return { success: false, msg: 'Email ya registrado' };
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

// === MENUS ===
export const getMenus = () => get('menus');
export const addMenu = (item) => {
  const data = get('menus');
  // Agregamos ID único
  data.push({ ...item, id: Date.now(), disponible: true });
  set('menus', data);
};


// === AYUDAS ===
const get = (key) => JSON.parse(localStorage.getItem(key)) || [];
const set = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// ... (El resto de funciones registerUser, loginUser, Menus se quedan igual) ...

// === SOCIOS (MODIFICADO PARA TESTEO) ===
export const getSocios = () => {
  let sociosReales = get('socios');
  let sociosTest = [];

 //Podes ocultarlos comentandolo desde aca
  sociosTest = [
    { id: 1001, numero: '1001', nombre: 'Ana García', dni: '20.123.456', domicilio: 'Av. Libertador 1234', ingreso: '2023-03-01' },
    { id: 1002, numero: '1002', nombre: 'Carlos López', dni: '21.987.654', domicilio: 'Calle Falsa 123', ingreso: '2023-03-05' },
    { id: 1003, numero: '1003', nombre: 'María Rodríguez', dni: '22.456.789', domicilio: 'San Martín 400', ingreso: '2023-03-10' },
    { id: 1004, numero: '1004', nombre: 'Pedro Sánchez', dni: '23.321.654', domicilio: 'Belgrano 800', ingreso: '2023-04-01' },
    { id: 1005, numero: '1005', nombre: 'Lucía Martínez', dni: '24.789.123', domicilio: 'Rivadavia 555', ingreso: '2023-04-15' },
    { id: 1006, numero: '1006', nombre: 'Jorge Fernández', dni: '25.654.987', domicilio: 'Mitre 2020', ingreso: '2023-05-01' },
    { id: 1007, numero: '1007', nombre: 'Sofía Díaz', dni: '26.159.753', domicilio: 'Sarmiento 999', ingreso: '2023-05-12' },
    { id: 1008, numero: '1008', nombre: 'Miguel Romero', dni: '27.357.951', domicilio: 'Colón 321', ingreso: '2023-06-01' },
    { id: 1009, numero: '1009', nombre: 'Elena Torres', dni: '28.852.741', domicilio: 'Paz 777', ingreso: '2023-06-20' },
    { id: 1010, numero: '1010', nombre: 'Diego Ruiz', dni: '29.963.852', domicilio: 'Libertad 100', ingreso: '2023-07-01' }
  ];
  //hasta aca xd

  return [...sociosReales, ...sociosTest];
};

export const addSocio = (item) => {
  const data = get('socios');
  data.push({ ...item, id: Date.now(), ingreso: new Date().toISOString().split('T')[0] });
  set('socios', data);
};

//-------------------------------------------------------------------------------------------------------

// === RESERVAS (ACTUALIZADO) ===
export const getReservas = () => get('reservas');

// Agregar con ID
export const addReserva = (item) => {
  const data = get('reservas');
  // Generamos un ID único usando la fecha actual en milisegundos
  const nuevaReserva = { 
    ...item, 
    id: item.id || Date.now(), // Si ya tiene ID (edición) lo usa, si no crea uno nuevo
    estado: item.estado || 'reservado', 
    pagado: item.pagado || false 
  };
  
  // Si estamos editando (el ID ya existe), lo reemplazamos
  const index = data.findIndex(r => r.id === nuevaReserva.id);
  if (index !== -1) {
    data[index] = nuevaReserva;
  } else {
    data.push(nuevaReserva);
  }
  
  set('reservas', data);
};

// Eliminar Reserva
export const deleteReserva = (id) => {
  let data = get('reservas');
  data = data.filter(r => r.id !== id); // Filtra todas menos la que queremos borrar
  set('reservas', data);
};

// === ASISTENCIAS ===
export const getAsistencias = () => get('asistencias');
export const addAsistencia = (item) => {
  const data = get('asistencias');
  data.push({ ...item, id: Date.now(), fecha_asistencia: new Date().toISOString().split('T')[0] });
  set('asistencias', data);
};

// === PAGOS ===
export const getPagos = () => get('pagos');
export const addPago = (item) => {
  const data = get('pagos');
  data.push({ ...item, id: Date.now(), fecha_pago: new Date().toISOString().split('T')[0] });
  set('pagos', data);
};