// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', function() {
  cargarSocios();
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
  users.push({ nombre, apellido, email, password: pass });
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
    document.getElementById('username').textContent = user ? `${user.nombre} ${user.apellido}` : 'Admin';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
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

  // Crear objeto socio
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

  alert('Socio agregado exitosamente.');
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
    // SOCIOS
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

function imprimirPadron() {
  window.print(); // Simula impresión
}

function mostrarResumen() {
  const socios = JSON.parse(localStorage.getItem('socios')) || [];
  alert(`Resumen: Total de socios: ${socios.length}. (Simulación)`);
}

function aplicarFiltros() {
  alert('Filtros aplicados. (Simulación)');
}
