// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', function() {
  cargarSocios();
  cargarMenus();
  cargarReservas();
  cargarAsistencias();
  cargarPagos();
});

// Función para mostrar registro
function mostrarRegistro() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'flex';
  document.getElementById('login-error').textContent = '';
}

// Función para mostrar login
function mostrarLogin() {
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('register-error').textContent = '';
}

// Función de registro (simulado con localStorage)
function registrar() {
  const nombre = document.getElementById('reg-nombre').value.trim();
  const apellido = document.getElementById('reg-apellido').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-contraseña').value;
  const pass2 = document.getElementById('reg-contraseña2').value;
  const errorDiv = document.getElementById('register-error');

  if (!nombre || !apellido || !email || !pass) {
    errorDiv.textContent = 'Todos los campos son obligatorios.';
    return;
  }
  if (pass !== pass2) {
    errorDiv.textContent = 'Las contraseñas no coinciden.';
    return;
  }

  // Simular registro (guardar en localStorage)
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    errorDiv.textContent = 'El email ya está registrado.';
    return;
  }
  users.push({ nombre, apellido, email, password: pass, rol: 'alumno' }); // Agregado rol por defecto
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registro exitoso. Ahora inicia sesión.');
  mostrarLogin();
}

// Función de login (simulado)
function login() {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('contraseña').value;
  const errorDiv = document.getElementById('login-error');

  if (!email || !pass) {
    errorDiv.textContent = 'Email y contraseña son obligatorios.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === pass);

  if (user || (email === 'admin@example.com' && pass === '123')) {
    const currentUser = user || { nombre: 'Admin', apellido: '', rol: 'admin' };
    document.getElementById('username').textContent = `${currentUser.nombre} ${currentUser.apellido}`;
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Guardar usuario actual
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    // Mostrar/ocultar secciones según rol
    if (currentUser.rol === 'admin') {
      document.getElementById('admin-sections').style.display = 'block';
    } else {
      document.getElementById('admin-sections').style.display = 'none';
    }
  } else {
    errorDiv.textContent = 'Credenciales incorrectas.';
  }
}

// Funciones del dashboard
function mostrarModalNuevoSocio() {
  document.getElementById('modal-nuevo-socio').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal-nuevo-socio').style.display = 'none';
  document.getElementById('socio-error').textContent = '';
  // Limpiar campos
  document.getElementById('socio-numero').value = '';
  document.getElementById('socio-nombre').value = '';
  document.getElementById('socio-dni').value = '';
  document.getElementById('socio-domicilio').value = '';
}

function agregarSocio() {
  const numero = document.getElementById('socio-numero').value.trim();
  const nombre = document.getElementById('socio-nombre').value.trim();
  const dni = document.getElementById('socio-dni').value.trim();
  const domicilio = document.getElementById('socio-domicilio').value.trim();
  const errorDiv = document.getElementById('socio-error');

  if (!numero || !nombre || !dni || !domicilio) {
    errorDiv.textContent = 'Todos los campos son obligatorios.';
    return;
  }

  // Crear objeto socio (ahora como alumno/asociado)
  const socio = {
    numero,
    nombre,
    dni,
    domicilio,
    ingreso: new Date().toISOString().split('T')[0] // Fecha actual
  };

  // Guardar en localStorage
  const socios = JSON.parse(localStorage.getItem('socios')) || [];
  socios.push(socio);
  localStorage.setItem('socios', JSON.stringify(socios));

  // Actualizar tablas
  cargarSocios();

  alert('Alumno agregado exitosamente.');
  cerrarModal();
}

function cargarSocios() {
  const socios = JSON.parse(localStorage.getItem('socios')) || [];

  // Limpiar tablas
  document.getElementById('socios-table').innerHTML = '<tr><th>Número</th><th>Nombre</th><th>DNI</th><th>Domicilio</th></tr>';
  document.getElementById('libro-table').innerHTML = '<tr><th>Número</th><th>Nombre</th><th>DNI</th><th>Ingreso</th><th>Egreso</th></tr>';
  document.getElementById('padron-table').innerHTML = '<tr><th>Nombre</th><th>DNI</th><th>Número</th></tr>';

  // Poblar tablas
  socios.forEach(socio => {
    // SOCIOS (ahora Alumnos)
    const rowSocios = document.getElementById('socios-table').insertRow();
    rowSocios.insertCell(0).textContent = socio.numero;
    rowSocios.insertCell(1).textContent = socio.nombre;
    rowSocios.insertCell(2).textContent = socio.dni;
    rowSocios.insertCell(3).textContent = socio.domicilio;

    // LIBRO DE SOCIOS
    const rowLibro = document.getElementById('libro-table').insertRow();
    rowLibro.insertCell(0).textContent = socio.numero;
    rowLibro.insertCell(1).textContent = socio.nombre;
    rowLibro.insertCell(2).textContent = socio.dni;
    rowLibro.insertCell(3).textContent = socio.ingreso;
    rowLibro.insertCell(4).textContent = '-'; // Egreso vacío

    // PADRÓN DE SOCIOS
    const rowPadron = document.getElementById('padron-table').insertRow();
    rowPadron.insertCell(0).textContent = socio.nombre;
    rowPadron.insertCell(1).textContent = socio.dni;
    rowPadron.insertCell(2).textContent = socio.numero;
  });
}

function aplicarFiltros() {
  alert('Filtros aplicados. (Simulación)');
}

// NUEVAS FUNCIONES PARA MENÚS
function mostrarModalNuevoMenu() {
  document.getElementById('modal-nuevo-menu').style.display = 'flex';
}

function cerrarModalMenu() {
  document.getElementById('modal-nuevo-menu').style.display = 'none';
  document.getElementById('menu-error').textContent = '';
  // Limpiar campos
  document.getElementById('menu-fecha').value = '';
  document.getElementById('menu-principal').value = '';
  document.getElementById('menu-guarnicion').value = '';
  document.getElementById('menu-postre').value = '';
  document.getElementById('menu-precio').value = '';
}

function agregarMenu() {
  const fecha = document.getElementById('menu-fecha').value;
  const principal = document.getElementById('menu-principal').value.trim();
  const guarnicion = document.getElementById('menu-guarnicion').value.trim();
  const postre = document.getElementById('menu-postre').value.trim();
  const precio = parseFloat(document.getElementById('menu-precio').value);
  const errorDiv = document.getElementById('menu-error');

  if (!fecha || !principal || !guarnicion || !postre || isNaN(precio)) {
    errorDiv.textContent = 'Todos los campos son obligatorios y precio debe ser numérico.';
    return;
  }

  const menu = { fecha, principal, guarnicion, postre, precio, disponible: true };
  const menus = JSON.parse(localStorage.getItem('menus')) || [];
  menus.push(menu);
  localStorage.setItem('menus', JSON.stringify(menus));

  cargarMenus();
  alert('Menú agregado exitosamente.');
  cerrarModalMenu();
}

function cargarMenus() {
  const menus = JSON.parse(localStorage.getItem('menus')) || [];
  const table = document.getElementById('menus-table');
  table.innerHTML = '<tr><th>Fecha</th><th>Plato Principal</th><th>Guarnición</th><th>Postre</th><th>Precio</th><th>Disponible</th></tr>';

  menus.forEach(menu => {
    const row = table.insertRow();
    row.insertCell(0).textContent = menu.fecha;
    row.insertCell(1).textContent = menu.principal;
    row.insertCell(2).textContent = menu.guarnicion;
    row.insertCell(3).textContent = menu.postre;
    row.insertCell(4).textContent = `$${menu.precio}`;
    row.insertCell(5).textContent = menu.disponible ? 'Sí' : 'No';
  });
}

// NUEVAS FUNCIONES PARA RESERVAS
function mostrarModalNuevaReserva() {
  document.getElementById('modal-nueva-reserva').style.display = 'flex';
  cargarOpcionesMenus(); // Cargar menús disponibles
}

function cerrarModalReserva() {
  document.getElementById('modal-nueva-reserva').style.display = 'none';
  document.getElementById('reserva-error').textContent = '';
  document.getElementById('reserva-menu').innerHTML = '';
}

function cargarOpcionesMenus() {
  const menus = JSON.parse(localStorage.getItem('menus')) || [];
  const select = document.getElementById('reserva-menu');
  select.innerHTML = '<option value="">Selecciona un menú</option>';
  menus.filter(m => m.disponible).forEach(menu => {
    const option = document.createElement('option');
    option.value = menu.fecha; // Usar fecha como ID único
    option.textContent = `${menu.fecha} - ${menu.principal} ($${menu.precio})`;
    select.appendChild(option);
  });
}

function agregarReserva() {
  const menuFecha = document.getElementById('reserva-menu').value;
  const errorDiv = document.getElementById('reserva-error');

  if (!menuFecha) {
    errorDiv.textContent = 'Selecciona un menú.';
    return;
  }

  // Simular socio logueado (en producción, usa sesión)
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { numero: '001' }; // Placeholder
  const reserva = { socio_numero: currentUser.numero, menu_fecha: menuFecha, estado: 'reservado', pagado: false };
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  cargarReservas();
  alert('Reserva agregada exitosamente.');
  cerrarModalReserva();
}

function cargarReservas() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const table = document.getElementById('reservas-table');
  table.innerHTML = '<tr><th>Socio</th><th>Menú Fecha</th><th>Estado</th><th>Pagado</th></tr>';

  reservas.forEach(reserva => {
    const row = table.insertRow();
    row.insertCell(0).textContent = reserva.socio_numero;
    row.insertCell(1).textContent = reserva.menu_fecha;
    row.insertCell(2).textContent = reserva.estado;
    row.insertCell(3).textContent = reserva.pagado ? 'Sí' : 'No';
  });
}

// NUEVAS FUNCIONES PARA ASISTENCIAS
function mostrarModalNuevaAsistencia() {
  document.getElementById('modal-nueva-asistencia').style.display = 'flex';
  cargarOpcionesReservas(); // Cargar reservas pendientes
}

function cerrarModalAsistencia() {
  document.getElementById('modal-nueva-asistencia').style.display = 'none';
  document.getElementById('asistencia-error').textContent = '';
  document.getElementById('asistencia-reserva').innerHTML = '';
}

function cargarOpcionesReservas() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const select = document.getElementById('asistencia-reserva');
  select.innerHTML = '<option value="">Selecciona una reserva</option>';
  reservas.filter(r => r.estado === 'reservado').forEach(reserva => {
    const option = document.createElement('option');
    option.value = `${reserva.socio_numero}-${reserva.menu_fecha}`;
    option.textContent = `Socio ${reserva.socio_numero} - ${reserva.menu_fecha}`;
    select.appendChild(option);
  });
}

function agregarAsistencia() {
  const reservaId = document.getElementById('asistencia-reserva').value;
  const errorDiv = document.getElementById('asistencia-error');

  if (!reservaId) {
    errorDiv.textContent = 'Selecciona una reserva.';
    return;
  }

  const [socio_numero, menu_fecha] = reservaId.split('-');
  const asistencia = { socio_numero, menu_fecha, fecha_asistencia: new Date().toISOString().split('T')[0] };
  const asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
  asistencias.push(asistencia);
  localStorage.setItem('asistencias', JSON.stringify(asistencias));

  // Actualizar reserva a 'confirmado'
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const reserva = reservas.find(r => r.socio_numero === socio_numero && r.menu_fecha === menu_fecha);
  if (reserva) reserva.estado = 'confirmado';
  localStorage.setItem('reservas', JSON.stringify(reservas));

  cargarAsistencias();
  cargarReservas(); // Recargar para reflejar cambios
  alert('Asistencia registrada.');
  cerrarModalAsistencia();
}

function cargarAsistencias() {
  const asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
  const table = document.getElementById('asistencias-table');
  table.innerHTML = '<tr><th>Socio</th><th>Menú Fecha</th><th>Fecha Asistencia</th></tr>';

  asistencias.forEach(asistencia => {
    const row = table.insertRow();
    row.insertCell(0).textContent = asistencia.socio_numero;
    row.insertCell(1).textContent = asistencia.menu_fecha;
    row.insertCell(2).textContent = asistencia.fecha_asistencia;
  });
}

// NUEVAS FUNCIONES PARA PAGOS
function mostrarModalNuevoPago() {
  document.getElementById('modal-nuevo-pago').style.display = 'flex';
  cargarOpcionesReservasPago(); // Cargar reservas no pagadas
}

function cerrarModalPago() {
  document.getElementById('modal-nuevo-pago').style.display = 'none';
  document.getElementById('pago-error').textContent = '';
  document.getElementById('pago-reserva').innerHTML = '';
  document.getElementById('pago-monto').value = '';
  document.getElementById('pago-metodo').value = '';
}

function cargarOpcionesReservasPago() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const select = document.getElementById('pago-reserva');
  select.innerHTML = '<option value="">Selecciona una reserva</option>';
  reservas.filter(r => !r.pagado).forEach(reserva => {
    const option = document.createElement('option');
    option.value = `${reserva.socio_numero}-${reserva.menu_fecha}`;
    option.textContent = `Socio ${reserva.socio_numero} - ${reserva.menu_fecha}`;
    select.appendChild(option);
  });
}

// NUEVAS FUNCIONES PARA PAGOS (completando lo cortado)
function agregarPago() {
  const reservaId = document.getElementById('pago-reserva').value;
  const monto = parseFloat(document.getElementById('pago-monto').value);
  const metodo = document.getElementById('pago-metodo').value;
  const errorDiv = document.getElementById('pago-error');

  if (!reservaId || isNaN(monto) || !metodo) {
    errorDiv.textContent = 'Todos los campos son obligatorios y monto debe ser numérico.';
    return;
  }

  const [socio_numero, menu_fecha] = reservaId.split('-');
  const pago = { socio_numero, menu_fecha, monto, metodo, fecha_pago: new Date().toISOString().split('T')[0] };
  const pagos = JSON.parse(localStorage.getItem('pagos')) || [];
  pagos.push(pago);
  localStorage.setItem('pagos', JSON.stringify(pagos));

  // Actualizar reserva a 'pagado'
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const reserva = reservas.find(r => r.socio_numero === socio_numero && r.menu_fecha === menu_fecha);
  if (reserva) reserva.pagado = true;
  localStorage.setItem('reservas', JSON.stringify(reservas));

  cargarPagos();
  cargarReservas(); // Recargar para reflejar cambios
  alert('Pago registrado exitosamente.');
  cerrarModalPago();
}

function cargarPagos() {
  const pagos = JSON.parse(localStorage.getItem('pagos')) || [];
  const table = document.getElementById('pagos-table');
  table.innerHTML = '<tr><th>Socio</th><th>Menú Fecha</th><th>Monto</th><th>Método</th><th>Fecha Pago</th></tr>';

  pagos.forEach(pago => {
    const row = table.insertRow();
    row.insertCell(0).textContent = pago.socio_numero;
    row.insertCell(1).textContent = pago.menu_fecha;
    row.insertCell(2).textContent = `$${pago.monto}`;
    row.insertCell(3).textContent = pago.metodo;
    row.insertCell(4).textContent = pago.fecha_pago;
  });
}

// FUNCIONES GENERALES (originales/modificadas)
function imprimirPadron() {
  window.print(); // Simula impresión
}

function mostrarResumen() {
  const socios = JSON.parse(localStorage.getItem('socios')) || [];
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const pagos = JSON.parse(localStorage.getItem('pagos')) || [];
  const totalIngresos = pagos.reduce((sum, p) => sum + p.monto, 0);
  alert(`Resumen: Total de alumnos: ${socios.length}. Reservas activas: ${reservas.filter(r => r.estado === 'reservado').length}. Ingresos totales: $${totalIngresos}. (Simulación)`);
}

function aplicarFiltros() {
  alert('Filtros aplicados. (Simulación)');
}



