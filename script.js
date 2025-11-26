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



