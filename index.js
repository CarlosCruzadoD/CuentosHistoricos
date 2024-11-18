import * as user from './data/usuarios.js';


let cuentoInfo = false;
let cuentoTexto = false;
//-----------------------------------------------------------------------------
//Obtener Todos los cuentos
let cuentos = [];
// Usando fetch para leer el archivo JSON
fetch('./data/cuentos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Convierte la respuesta a un objeto JSON
  })
  .then(data => {
    cuentos = data.cuentos;
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud fetch:', error);
  });
//-----------------------------------------------------------------------------
//Funcion para dezlisar al hacer scroll o presionar las tecla
let currentSection = 0;
const sections = document.querySelectorAll('section'); 
const scrollThreshold =10; 
let isScrolling = false; 

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSection = index;
  }
}
let noScroll= false;
document.addEventListener('wheel', (event) => {
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => { isScrolling = false; }, 600);
  if(!noScroll){
    if (event.deltaY > scrollThreshold) {
      scrollToSection(currentSection + 1);
      reproAudioGuia();
    } else if(currentSection != 0){
      scrollToSection(currentSection - 1);
      reproAudioGuia(currentSection);
    }
  }  
});
document.querySelector('.grid-container').addEventListener('mouseenter', ()=>{
  noScroll = true;
})
document.querySelector('.grid-container').addEventListener('mouseleave', ()=>{
  noScroll = false;
})

document.addEventListener('keydown', (event) => {
  if (isScrolling) return; 
  if(currentSection == 0){
    if (event.key === 'Enter') {
      console.log(currentSection);
      scrollToSection(currentSection + 1);
      reproAudioGuia(currentSection);
    }
  }
  if(currentSection==1){
    if (event.key === 'Enter') {
      let key = false;
      tarjetaHistoria.forEach(card =>{
          if(card.classList.contains("featured-card")){
            key = true;
          }
        });
        if(key)startCuento();   
    }
    if (event.key === 'Escape') {
      if(cuentoTexto){
        stopCuento();
        cuentoTexto = false;
      }else{
        closeCardInfo();
        reproAudioGuia(currentSection);
      }
    }
  }
  if (event.key === 'ArrowDown') {
    console.log(currentSection);
    scrollToSection(currentSection + 1);
    reproAudioGuia(currentSection);
  } else if (event.key === 'ArrowUp') {
    console.log(currentSection);
    scrollToSection(currentSection - 1);
    reproAudioGuia(currentSection);
  }
});
//----------------------------------------------------------------------
//Configuracion de audio guia
  const audioGuia = document.querySelector('.audio-guia');
  const reproAudioGuia = (seccion) => {
    switch(seccion){
      case 0:
        audioGuia.src = './cuentos/Sections/Audio-Bienvenida.mp3';
        break;
      case 1:
        audioGuia.src = './cuentos/Sections/Audio-Historias.mp3';
        break;
      case 2:
        audioGuia.src = './cuentos/Sections/Audio-Contactenos.mp3';
        break;
    }
    ReproducirAudio(audioGuia);
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    //reproAudioGuia(currentCuento);
    activarUser();
    switchConfiguration();
  })

//----------------------------------------------------------------------
//Funcion para Login
let perfil = false;
if(perfil){
  const iconPerfil = document.querySelector('.icon-perfil');
  iconPerfil.style.display = 'block'
}
//----------------------------------------------------------------------
//Funcion de las Letras de Bienvenida
const spans = document.querySelectorAll('.word span');

spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});
//----------------------------------------------------------------------
//Animacion para cambiar el orden del Header
const sectionsHeader = document.querySelectorAll('section');
const btnHeader = document.getElementById('btn_act');
const btnSecHeader = document.querySelectorAll('.link-sec');
const listaPrimero = document.querySelectorAll('.lista-actual')

let marcarSeccionActiva = () => {
  let indexSeccionActiva = sections.length;
  sectionsHeader.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 50 && rect.bottom >= 50) {
      indexSeccionActiva = index;
      btnSecHeader.forEach((boton) => {
        if(boton.innerHTML == sectionsHeader[indexSeccionActiva].id){
          boton.innerHTML = btnHeader.innerHTML
        }
      })
      btnHeader.innerHTML = sectionsHeader[indexSeccionActiva].id;      
      listaPrimero[0].classList.remove('lista-actual-animacion')
      void listaPrimero[0].offsetWidth;
      listaPrimero[0].classList.add('lista-actual-animacion')
    }
  })
}
window.addEventListener('scroll', marcarSeccionActiva);

//---------------------------------------------------------
//Funcion de Botones del Header
btnSecHeader.forEach((boton)=>{
  boton.addEventListener('click', ()=>{
    console.log(boton.innerHTML);
    for(let i = 0; i < sections.length ; i++){
      if(sections[i].id == boton.innerHTML){
        sections[i].scrollIntoView({ behavior: 'smooth' });
      }  
    }
  })
})

//---------------------------------------------------------
//Boton Perfil
let mainPage = document.querySelector('.main-page');
let titulo = document.querySelector('.word');
const header = document.getElementById('header');
const downOptions = document.querySelector('.next-page');
const perfilView = document.querySelector('.perfil');
const overlay = document.querySelector('.overlay');
const closePerfil = document.getElementById("close-perfil");

localStorage.setItem('seccionVisible', 'false');
if (localStorage.getItem('seccionVisible') === 'true') {
  perfilView.classList.remove('display-none');
}

document.getElementById('btn-submit-registrar').addEventListener('click', () => {
  header.classList.add('display-none');
  mainPage.classList.add('display-none');
  perfilView.classList.remove('display-none');
  overlay.classList.add('overlay-active');
  const  nombre = document.getElementById("register-nombre").value;
  const apellido = document.getElementById("register-apellidos").value;
  const correo = document.getElementById("register-email").value;
  const contra = document.getElementById("register-password").value;
  const contraConf = document.getElementById("register-confirm-password").value;
  const pais = document.getElementById("register-pais").value;
  const edad = parseInt(document.getElementById("register-edad").value, 10);
  const discapacidad = document.getElementById("register-discapacidad").value;
  const inputRegister = document.querySelectorAll("#registerForm input");
  let emptyInput = false;
  inputRegister.forEach((input) => {
    if(input.value == "" || input.value == null ) emptyInput = true;
  })
  if(emptyInput){
    console.log("vacio");
  }else {
    if(contra == contraConf){
      if(user.validarCorreo(correo)){
        const registerData = {
          nombre: nombre,
          apellidos: apellido,
          correo: correo,
          contrasena: contra,
          pais: pais,
          edad: edad,
          discapacidad: discapacidad,
          cuentos: []
        };
        user.registrarUser(registerData);
      }
    }
  }  
});
const correoUser = localStorage.getItem('correoUser');
function actualizarDatosUser(){
  localStorage.setItem('userLog',JSON.stringify(user.buscarUsuario(correoUser)));
}
document.getElementById('btn-submit-login').addEventListener('click', () => {
  console.log(perfil);
  header.classList.add('display-none');
  mainPage.classList.add('display-none');
  perfilView.classList.remove('display-none');
  overlay.classList.add('overlay-active');
  const correo = document.getElementById("correo").value;
  const contra = document.getElementById("password").value;
  if(user.validarCorreo(correo)){
    if(user.autenticarUsuario(correo, contra)){
      localStorage.setItem('correoUser', correo);
      closeWinPerfil();
      actualizarDatosUser();
      activarUser();
      switchConfiguration();
    }    
  }
});
//************************************************ */
document.getElementById('btnNextPage').addEventListener('click', () => {
  console.log(JSON.parse(localStorage.getItem('userLog')));
})
//************************************************ */
const activarUser = () =>{
  let userLog = JSON.parse(localStorage.getItem('userLog')) || null;
  if(userLog !=null){
    document.querySelector('#btn-perfil-Login svg').classList.remove('display-none');
    document.querySelector('#btn-perfil-Login span').innerText = 'nombre';
  }else{
    document.querySelector('#btn-perfil-Login svg').classList.add('display-none');
    document.querySelector('#btn-perfil-Login span').innerText = 'Perfil';
  }
}
//Funcion para abrir el inicio de sesion
document.getElementById('btn-perfil-Login').addEventListener('click', () => {
  let userLog = JSON.parse(localStorage.getItem('userLog')) || null;
  noScroll = true;
  header.classList.add('display-none');
  mainPage.classList.add('display-none');
  perfilView.classList.remove('display-none');
  overlay.classList.add('overlay-active');
  scrollToSection(0);
  if(userLog !=null){
    document.querySelector('.login').classList.add('display-none');
    document.querySelector('.info-cuenta').classList.remove('display-none');
    document.querySelector('.campo-nombre .data').innerText = userLog.nombre;
    document.querySelector('.campo-apellido .data').innerText = userLog.apellidos;
    document.querySelector('.campo-correo .data').innerText = userLog.correo;
    document.querySelector('.campo-pais .data').innerText = userLog.pais;
    document.querySelector('.campo-edad .data').innerText = userLog.edad;
    document.querySelector('.campo-discapacidad .data').innerText = userLog.discapacidad;
  }else{
    document.querySelector('.login').classList.remove('display-none');
    document.querySelector('.info-cuenta').classList.add('display-none');
  }  
});

//Funcion para cerrar Sesion
document.getElementById('btnCloseSesion').addEventListener('click', ()=>{
  localStorage.removeItem('userLog');
  closeWinPerfil();
  activarUser();
  switchConfiguration();
})
//Validar Si estamos en un perfil
const validacionPerfil = () => {
  let userLog = JSON.parse(localStorage.getItem('userLog')) || null;
  if(userLog != null) return true;
  else return false;
}


//Configuracio de Boton de Silencio
const iconSilencioOff = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></path></svg>'
const iconSilencioOn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></path><path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"></path></svg>'
let switchSilencio = false;
const btnSilencio = document.getElementById('btnSilencio');
const silenciarCuento = () => {  
  switchSilencio = !switchSilencio;
  if(switchSilencio){
    btnSilencio.querySelector('.icon-silencio').innerHTML = iconSilencioOff;
    DetenerAudio(audioText);
  }else{
    btnSilencio.querySelector('.icon-silencio').innerHTML = iconSilencioOn;
    ReproducirAudio(audioText);
  }
}
btnSilencio.addEventListener('click', silenciarCuento);
const iconFavoritoOn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"></path></svg> '
const iconFavoritoOff = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"></path></svg>'
let switchFavorito = false;
const btnFavorito = document.getElementById('btnFavorito');
const addFavorito = () =>{
  if(!btnFavorito.classList.contains('icon-disable')){
    switchFavorito = !switchFavorito;
    if(switchFavorito){
      btnFavorito.querySelector('.icon-favorito').innerHTML = iconFavoritoOff;
      user.addCuento(correoUser, document.querySelector('.info-title').innerHTML)
      actualizarDatosUser();
    }else{
      btnFavorito.querySelector('.icon-favorito').innerHTML = iconFavoritoOn;
      user.deleteCuento(correoUser, document.querySelector('.info-title').innerHTML);
      actualizarDatosUser();
    }
  }
}
btnFavorito.addEventListener('click', addFavorito);

const switchConfiguration = () =>{
  if(!validacionPerfil()){
    btnFavorito.classList.add('icon-disable');    
  }else{
    btnFavorito.classList.remove('icon-disable');    
  }  
}


//cambio de posicion de la imagen en el perfil
const imgPerfil = document.querySelector('.selector')
const registerBtn = document.getElementById('btn-perfil-Registrar');
registerBtn.addEventListener('click',()=>{
  imgPerfil.style.transform = 'translate(100%, 0)'
})

document.getElementById('btnBInicioS').addEventListener('click', () => {
  imgPerfil.style.transform = 'translate(0, 0)'
})
const closeWinPerfil = ()=>{
  noScroll = false;
  header.classList.remove('display-none');
  mainPage.classList.remove('display-none');
  perfilView.classList.add('display-none');
  overlay.classList.remove('overlay-active')
}
closePerfil.addEventListener('click', closeWinPerfil)



let btnSignUp=document.getElementById('btn-signups');

btnSignUp.addEventListener('click', () =>{
  document.querySelector('.other-form-register').style.visibility = 'hidden';
  document.querySelector('.register-box').style.visibility = 'visible';

})

document.querySelector('.btn-cancelar-register').addEventListener('click', () => {
  document.querySelector('.other-form-register').style.visibility = 'visible';
  document.querySelector('.register-box').style.visibility = 'hidden';
})
//-----------------------------------------------------------------

/*----------------------------------------------------------------------------------------- */
const swicthNombre = (nombre)=>{
  switch (nombre) {
    case 'José Luis Cerff Aguilar':
      if(document.querySelector('.top-left').classList.value.includes('expand')){
        document.querySelector('.top-left').classList.remove('expand');
      }else{
        document.querySelector('.top-left').classList.add('expand');
      }        
      break;  
      case 'David Elías Chávez Tintaya':
      if(document.querySelector('.top-right').classList.value.includes('expand')){
        document.querySelector('.top-right').classList.remove('expand');
      }else{
        document.querySelector('.top-right').classList.add('expand');
      }        
      break;  
      case 'Mauro Alberto Contreras San Miguel':
      if(document.querySelector('.bottom-left').classList.value.includes('expand')){
        document.querySelector('.bottom-left').classList.remove('expand');
      }else{
        document.querySelector('.bottom-left').classList.add('expand');
      }        
      break;  
      case 'Luz María Crisóstomo Delgado':
      if(document.querySelector('.bottom-right').classList.value.includes('expand')){
        document.querySelector('.bottom-right').classList.remove('expand');
      }else{
        document.querySelector('.bottom-right').classList.add('expand');
      }        
      break;  
      case 'Carlos Tadeo Cruzado Díaz':
      if(document.querySelector('.center-square').classList.value.includes('expand')){
        document.querySelector('.center-square').classList.remove('expand');
      }else{
        document.querySelector('.center-square').classList.add('expand');
      }        
      break;  
  }
}
const btnContactenos = document.querySelectorAll('.btnAlumnos');
btnContactenos.forEach(btn =>{
  btn.addEventListener('click', nom=>{
    swicthNombre(nom.target.innerText);
  })
})
//--------------------------------------------------
const btnMenu = document.querySelector('.btnMenu');

btnMenu.addEventListener('click', ()=>{
  if(btnMenu.className.includes('btnMenuClose')){
    document.querySelector('.menu-options').classList.remove('menu-options-100');
    btnMenu.classList.remove('btnMenuClose');
  }else{
    document.querySelector('.menu-options').classList.add('menu-options-100');
    btnMenu.classList.add('btnMenuClose');
  }  
})
//----------------------------------------------------------------
const audioDesc = document.querySelector('.audioDesc');
const audioText = document.querySelector('.audioText');
const textoCuento = document.querySelector('.texto');
const openCardInfo = (titulo) =>{
  document.querySelector('.card-container').classList.remove('display-none');
  document.querySelector('.grid-container').classList.add('grid-template-3');  
  cuentos.forEach((cuento)=>{    
    if(titulo == cuento.titulo){
      console.log(cuento.titulo);
      document.querySelector('.info-title').innerHTML = cuento.titulo;
      document.querySelector('.info-autor').innerHTML = cuento.autor;
      document.querySelector('.img-cuento').src = cuento.imagen;
      document.querySelector('.descri-info p').innerHTML = cuento.descripcion;
      textoCuento.querySelector('p').innerHTML = cuento.texto;
      textoCuento.querySelector('h2').innerHTML = cuento.titulo;
      audioDesc.src = cuento.audioDesc;
      audioText.src = cuento.audioTexto;
    }
  })
}
const closeCardInfo = () => {
  document.querySelector('.card-container').classList.add('display-none');
  document.querySelector('.grid-container').classList.remove('grid-template-3');  
  tarjetaHistoria.forEach(card =>{
    card.classList.remove('featured-card');      
  });
  DetenerAudio(audioDesc); 
  DetenerAudio(audioText); 
}
const DetenerAudio = (audio) =>{
  audio.pause();
  audio.currentTime = 0;
}
const ReproducirAudio = (audio) =>{
  audio.currentTime = 0;
  audio.play();
}
const tarjetaHistoria = document.querySelectorAll('.card');
tarjetaHistoria.forEach(card =>{
  card.addEventListener('click', ()=>{
    openCardInfo(card.querySelector('.card-title').innerHTML);    
    tarjetaHistoria.forEach(card =>{
      card.classList.remove('featured-card');      
    })
    card.classList.add('featured-card');
    ReproducirAudio(audioDesc);
  });
})
let currentCuento = -1  ;
function updateFocus(indexCuento) {
    tarjetaHistoria.forEach(card => card.classList.remove('featured-card'));
    tarjetaHistoria[indexCuento].classList.add('featured-card');
    currentCuento = indexCuento;
}
document.addEventListener('keydown', (event) => {
  if(currentSection == 1){
    if (event.key === 'ArrowRight') {
      updateFocus(currentCuento+1);
      openCardInfo(tarjetaHistoria[currentCuento].querySelector('.card-title').innerHTML);
      ReproducirAudio(audioDesc);
    } else if (event.key === 'ArrowLeft') {
      updateFocus(currentCuento-1);
      openCardInfo(tarjetaHistoria[currentCuento].querySelector('.card-title').innerHTML);
      ReproducirAudio(audioDesc);
    }
  }  
})
// Evento de teclado para detectar las flechas




//-----------------------------------------------
const btnLeerCuento = document.getElementById('btnLeerCuento');


const startCuento = ()=>{
  document.querySelector('.muestra-historias').classList.add('oculto');  
  document.querySelector('.options') .classList.add('display-none');
  textoCuento.classList.add('active');  
  document.querySelector('.btnCuentoCerrado').classList.add('display-none');
  document.querySelector('.btnCuentoAbierto').classList.remove('display-none');
  DetenerAudio(audioDesc);
  ReproducirAudio(audioText);
  cuentoTexto = true;
}

btnLeerCuento.addEventListener('click',startCuento);

const stopCuento = () =>{
  document.querySelector('.muestra-historias').classList.remove('oculto');  
  document.querySelector('.options') .classList.remove('display-none');
  textoCuento.classList.remove('active');  
  document.querySelector('.btnCuentoCerrado').classList.remove('display-none');
  document.querySelector('.btnCuentoAbierto').classList.add('display-none');
  DetenerAudio(audioDesc); 
  DetenerAudio(audioText); 
}

const btnCuentoCerrar = document.getElementById('btnCuentoCerrar');

btnCuentoCerrar.addEventListener('click',()=>{
  if(cuentoTexto){
    stopCuento();
    cuentoTexto = false;
  }else{
    closeCardInfo();
  }
});

