function validarCorreo(correo) {
    // Expresión regular para validar el correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Comprobar si el correo coincide con la expresión regular
    if (regex.test(correo)) {
      console.log('Correo válido');
      return true;
    } else {
      console.log('Correo no válido');
      return false;
    }
  }
const limpiar = () =>{
    localStorage.clear();
}

const registrarUser = (newUser) => {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(usuario => usuario.correo === correo)) {
        console.log("El usuario ya está registrado.");
        return;
    }
    usuarios.push(newUser);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log("Registrado exitosamente");
    console.log(JSON.parse(localStorage.getItem('usuarios')));
}

function autenticarUsuario(email, password) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  
  const usuario = usuarios.find(usuario => usuario.correo === email && usuario.contrasena === password);

  if (usuario) {
    console.log("Inicio de sesión exitoso:", usuario);
    return true; 
  } else {
    console.log("Credenciales incorrectas.");
    return false;
  }
}

function buscarUsuario(correo){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  
  const usuario = usuarios.find(usuario => usuario.correo === correo);
  if (usuario) {
    return usuario;
  } else {
    return null;
  }
}

function addCuento(correo, cuento){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  
  usuarios.forEach(user => {
    if(user.correo== correo){
      user.cuentos.push(cuento);
    }
  });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function deleteCuento(correo, cuento){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  
  usuarios.forEach(user => {
    if(user.correo== correo){
      for (let i = 0; i < usuarios.length; i++) {
        if(user.cuentos[i] == cuento){
          user.cuentos.splice(i,1);
        }
      }
    }
  });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

export {registrarUser, 
  validarCorreo, autenticarUsuario, 
  limpiar, buscarUsuario, addCuento, deleteCuento}

