function login() {
      const nombre = document.getElementById('nombre').value;
      if (nombre.trim() === '') {
        alert('Por favor, complete el nombre');
        return;
      }
      document.querySelector('.login').style.display = 'none';
      document.querySelector('.dashboard').style.display = 'flex';
      document.getElementById('username').innerText = nombre;
    }