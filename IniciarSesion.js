function mostrarRegistro() {
  document.querySelector('.login').style.display = 'none';
  document.querySelector('.register').style.display = 'block';
}

function mostrarLogin() {
  document.querySelector('.register').style.display = 'none';
  document.querySelector('.login').style.display = 'block';
}

function registrar() {
  const nombre = document.getElementById('reg-nombre').value;
  const apellido = document.getElementById('reg-apellido').value;
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-contraseña').value;
  const pass2 = document.getElementById('reg-contraseña2').value;

  if (nombre.trim() === '' || apellido.trim() === '' || email.trim() === '' || pass.trim() === '') {
    alert('Complete todos los campos');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Ingrese un email válido');
    return;
  }

  if (pass !== pass2) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const user = { nombre, apellido, email, pass };
  localStorage.setItem('usuario', JSON.stringify(user));

  alert('¡Registro exitoso! Ahora puedes iniciar sesión');
  mostrarLogin();
}

function login() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('contraseña').value;

  const storedUser = JSON.parse(localStorage.getItem('usuario'));

  if (!storedUser) {
    alert('No hay usuarios registrados. Regístrate primero.');
    return;
  }

  if (email === storedUser.email && pass === storedUser.pass) {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'flex';
    document.getElementById('username').innerText = storedUser.nombre;
  } else {
    alert('Email o contraseña incorrectos');
  }
}
