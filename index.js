import * as user from './data/usuarios.js';
import * as funcU from './funciones.js';

let loginOpen = false;
let cuentoTexto = false;
function reproAudioResp(texto){
  let userLog = JSON.parse(localStorage.getItem('userLog'));
  if(validacionPerfil()){
  if(userLog.discapacidad != 'auditiva'){
      responsiveVoice.speak(texto, "Spanish Latin American Female");
    }
  }else{
    responsiveVoice.speak(texto, "Spanish Latin American Female");
  }
} 
  
function offAudioResp(){
  responsiveVoice.cancel();
}

function cardCuentos(titulo, src){
  return "<div class='card' tabindex='0'> <div class='image-container'> <img src='"+src+"' alt='Título'> </div> <div class='card-title'>" + 
  titulo +"</div></div>"
}
const gridContainer = document.querySelector('.grid-container');



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
    cuentos.forEach((titulos) => {
      gridContainer.innerHTML += cardCuentos(titulos.titulo, titulos.imagen);
    })
    document.querySelectorAll('.card').forEach(card =>{
      card.addEventListener('click', ()=>{    
        openCardInfo(card.querySelector('.card-title').innerHTML);    
        document.querySelectorAll('.card').forEach(card =>{
          card.classList.remove('featured-card');      
        })
        card.classList.add('featured-card');    
        reproAudioResp(textoDesc);
      });
    })
    
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
  if(!noScroll){
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
      currentSection = index;
      reproAudioGuia(currentSection);
    }
  }
}
  
let noScroll= false;

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
      document.querySelectorAll('.card').forEach(card =>{
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
    if (event.key === 'f') {      
      if(cuentoTexto){
        if(validacionPerfil()) addFavorito();
      }     
    }
    if (event.key === 'h') {      
      if(validacionPerfil()) btnHistGuardFunc();    
    }
    if (event.key === 'j') {
      if(cuentoTexto){
        let userLog = JSON.parse(localStorage.getItem('userLog'))
        if(userLog != 'auditiva') silenciarCuento();
      }   
      
    }
  }
  if (event.key === 'ArrowDown') {
    console.log(currentSection);
    scrollToSection(currentSection + 1);
  } else if (event.key === 'ArrowUp') {
    console.log(currentSection);
    scrollToSection(currentSection - 1);    
  }
});
//----------------------------------------------------------------------
//Configuracion de audio guia
  const reproAudioGuia = (seccion) => {
    switch(seccion){
      case 0:
        reproAudioResp("Bienvenidos a Cuentos Magicos");
        break;
      case 1:
        reproAudioResp("Explora nuestros cuentos");
        break;
      case 2:
        reproAudioResp("Ponte en contacto con nosotros");
        break;
    }
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    reproAudioResp("Bienvenidos a Cuentos Magicos");
    activarUser();
    switchConfiguration();
    scrollToSection(0);
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
        reproAudioGuia(i);
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
        otherRegisterClose();
        imgPerfil.style.transform = 'translate(0, 0)';
        document.getElementById("register-nombre").value = "";
        document.getElementById("register-apellidos").value = "";
        document.getElementById("register-email").value = "";
        document.getElementById("register-password").value = "";
        document.getElementById("register-confirm-password").value = "";
        document.getElementById("register-pais").value = "";
        document.getElementById("register-edad").value = "";
        document.getElementById("register-discapacidad").value = "Ninguna";
      }
    }
  }
});

function actualizarDatosUser(){
  const correoUser = localStorage.getItem('correoUser');
  localStorage.setItem('userLog',JSON.stringify(user.buscarUsuario(correoUser)));
}
//CONFIGURACION DEL INICIO DE SESION
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
      console.log('inicio')
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
  scrollToSection(1);
})
//************************************************ */
const activarUser = () =>{
  let userLog = JSON.parse(localStorage.getItem('userLog')) || null;
  if(userLog !=null){
    document.querySelector('.btnPerfilLogin svg').classList.remove('display-none');
    document.querySelector('.btnPerfilLogin span').innerText = userLog.nombre;
  }else{
    document.querySelector('.btnPerfilLogin svg').classList.add('display-none');
    document.querySelector('.btnPerfilLogin span').innerText = 'Perfil';
  }
}
//Funcion para abrir el pagina para el inicio de sesion
const btnPerfilLogin = document.querySelectorAll('.btnPerfilLogin')
btnPerfilLogin.forEach(boton =>{
  loginOpen = !loginOpen
  boton.addEventListener('click', () => {
    scrollToSection(0);
    let userLog = JSON.parse(localStorage.getItem('userLog')) || null;
    noScroll = true;
    header.classList.add('display-none');
    mainPage.classList.add('display-none');
    perfilView.classList.remove('display-none');
    overlay.classList.add('overlay-active');
    
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
  })
})

//Funcion para cerrar Sesion
document.getElementById('btnCloseSesion').addEventListener('click', ()=>{
  console.log(JSON.parse(localStorage.getItem('userLog')));
  localStorage.removeItem('userLog');
  closeWinPerfil();
  activarUser();
  switchConfiguration();
  console.log(JSON.parse(localStorage.getItem('userLog')));
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
    responsiveVoice.cancel();
  }else{
    btnSilencio.querySelector('.icon-silencio').innerHTML = iconSilencioOn;
    responsiveVoice.speak(cuentoFijo.texto, "Spanish Latin American Female");
  }
}
const iconFavoritoOn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"></path></svg> '
const iconFavoritoOff = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"></path></svg>'
let switchFavorito = false;
const btnFavorito = document.getElementById('btnFavorito');
const addFavorito = () =>{
  const correoUser = localStorage.getItem('correoUser');
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


const switchConfiguration = () =>{
  let userLog = JSON.parse(localStorage.getItem('userLog'));
  if(!validacionPerfil()){
    //No esta logeado
    btnFavorito.classList.add('icon-disable');    
    btnSilencio.addEventListener('click', silenciarCuento);
    document.getElementById('btnHistGuard').classList.remove('btn-hitorias-guardadas');
    document.getElementById('btnHistGuard').classList.add('btn-hitorias-disable');

  }else{
    //Estamos dentro de un perfil
    btnFavorito.classList.remove('icon-disable');  
    btnFavorito.addEventListener('click', addFavorito);  
    document.querySelector('.btn-hitorias-guardadas').addEventListener('click', btnHistGuardFunc)
    if(userLog.discapacidad == 'auditiva'){
      btnSilencio.classList.add('icon-disable')
    }else if(userLog.discapacidad == 'visual'){
      btnSilencio.classList.remove('icon-disable')
      btnSilencio.addEventListener('click', silenciarCuento);
    }else{
      btnSilencio.addEventListener('click', silenciarCuento);
    }
  }  
}


//cambio de posicion de la imagen en el perfil
const imgPerfil = document.querySelector('.selector')
const registerBtn = document.getElementById('btn-perfil-Registrar');
registerBtn.addEventListener('click',()=>{
  imgPerfil.style.transform = 'translate(100%, 0)'
})
const btninicioS = document.getElementById('btnBInicioS');
btninicioS.addEventListener('click', () => {
  imgPerfil.style.transform = 'translate(0, 0)'
})
const closeWinPerfil = ()=>{
  noScroll = false;
  header.classList.remove('display-none');
  mainPage.classList.remove('display-none');
  perfilView.classList.add('display-none');
  overlay.classList.remove('overlay-active');
  otherRegisterClose();
  imgPerfil.style.transform = 'translate(0, 0)';
}
closePerfil.addEventListener('click', closeWinPerfil);

function otherRegisterOpen(){
  document.querySelector('.other-form-register').style.visibility = 'hidden';
  document.querySelector('.register-box').style.visibility = 'visible';
}
let btnSignUp=document.getElementById('btn-signups');
btnSignUp.addEventListener('click', otherRegisterOpen);

function otherRegisterClose(){
  document.querySelector('.other-form-register').style.visibility = 'visible';
  document.querySelector('.register-box').style.visibility = 'hidden';
}
document.querySelector('.btn-cancelar-register').addEventListener('click', otherRegisterClose);
//-----------------------------------------------------------------

/*----------------------------------------------------------------------------------------- */
const resetClasses = () => { 
  document.querySelector('.top-left').classList.remove('expand'); 
  document.querySelector('.top-right').classList.remove('expand'); 
  document.querySelector('.bottom-left').classList.remove('expand'); 
  document.querySelector('.bottom-right').classList.remove('expand');
  document.querySelector('.center-square').classList.remove('expand');
}
const swicthNombre = (nombre)=>{
  switch (nombre) {
    case 'José Luis Cerff Aguilar':
      if(document.querySelector('.top-left').classList.value.includes('expand')){
        document.querySelector('.top-left').classList.remove('expand');
      }else{
        resetClasses();
        document.querySelector('.top-left').classList.add('expand');
      }        
      break;  
      case 'David Elías Chávez Tintaya':
      if(document.querySelector('.top-right').classList.value.includes('expand')){
        document.querySelector('.top-right').classList.remove('expand');
      }else{
        resetClasses();
        document.querySelector('.top-right').classList.add('expand');
      }        
      break;  
      case 'Mauro Alberto Contreras San Miguel':
      if(document.querySelector('.bottom-left').classList.value.includes('expand')){
        document.querySelector('.bottom-left').classList.remove('expand');
      }else{
        resetClasses();
        document.querySelector('.bottom-left').classList.add('expand');
      }        
      break;  
      case 'Luz María Crisóstomo Delgado':
      if(document.querySelector('.bottom-right').classList.value.includes('expand')){
        document.querySelector('.bottom-right').classList.remove('expand');
      }else{
        resetClasses();
        document.querySelector('.bottom-right').classList.add('expand');
      }        
      break;  
      case 'Carlos Tadeo Cruzado Díaz':
      if(document.querySelector('.center-square').classList.value.includes('expand')){
        document.querySelector('.center-square').classList.remove('expand');
      }else{
        resetClasses();
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
function openBtnMenu(){
  scrollToSection(0);
  if(btnMenu.className.includes('btnMenuClose')){
    document.querySelector('.menu-options').classList.remove('menu-options-100');
    btnMenu.classList.remove('btnMenuClose');
  }else{
    document.querySelector('.menu-options').classList.add('menu-options-100');
    btnMenu.classList.add('btnMenuClose');
  }  
}

btnMenu.addEventListener('click', openBtnMenu)
//----------------------------------------------------------------
const textoCuento = document.querySelector('.texto');
let cuentoFijo;
let textoDesc;
const openCardInfo = (titulo) =>{
  document.querySelector('.card-container').classList.remove('display-none');
  document.querySelector('.grid-container').classList.add('grid-template-3');  
  cuentos.forEach((cuento)=>{    
    if(titulo == cuento.titulo){
      cuentoFijo = {
        titulo:cuento.titulo,
        autor: cuento.autor,
        imagen: cuento.imagen,
        descripcion: cuento.descripcion,
        texto: cuento.texto
      }
      textoDesc = cuentoFijo.titulo + " de:" + cuentoFijo.autor + "trata de: " + cuentoFijo.descripcion;
      document.querySelector('.info-title').innerHTML = cuento.titulo;
      document.querySelector('.info-autor').innerHTML = cuento.autor;
      document.querySelector('.img-cuento').src = cuento.imagen;
      document.querySelector('.descri-info p').innerHTML = cuento.descripcion;
      textoCuento.querySelector('p').innerHTML = cuento.texto;
      textoCuento.querySelector('h2').innerHTML = cuento.titulo;
    }
  })
}
const closeCardInfo = () => {
  document.querySelector('.card-container').classList.add('display-none');
  document.querySelector('.grid-container').classList.remove('grid-template-3');  
  document.querySelectorAll('.card').forEach(card =>{
    card.classList.remove('featured-card');      
  });
  offAudioResp();
}



let currentCuento = -1  ;

document.addEventListener('keydown', (event) => {
  if(currentSection == 1){
    if (event.key === 'ArrowRight') {
      currentCuento = funcU.updateFocus(currentCuento+1);
      openCardInfo(document.querySelectorAll('.card')[currentCuento].querySelector('.card-title').innerHTML);
      reproAudioResp(textoDesc);
    } else if (event.key === 'ArrowLeft') {
      currentCuento = funcU.updateFocus(currentCuento-1);
      openCardInfo(document.querySelectorAll('.card')[currentCuento].querySelector('.card-title').innerHTML);
      reproAudioResp(textoDesc);
    }
  }  
})

let histGuarView = false;

const btnHistGuardFunc = ()=>{
  gridContainer.innerHTML ="";
  if(histGuarView){
    histGuarView = !histGuarView;
    cuentos.forEach((titulos) => {
      gridContainer.innerHTML += cardCuentos(titulos.titulo, titulos.imagen);
    })
  }else{
    histGuarView = !histGuarView;    
    console.log(JSON.parse(localStorage.getItem('userLog')).cuentos);
    cuentos.forEach((titulos) => {
      JSON.parse(localStorage.getItem('userLog')).cuentos.forEach((save) => {
        if(save == titulos.titulo){
          gridContainer.innerHTML += cardCuentos(titulos.titulo, titulos.imagen);
        }
      })
    })
  }  
}


//-----------------------------------------------
const btnLeerCuento = document.getElementById('btnLeerCuento');

const startCuento = ()=>{  
  let num = parseInt(localStorage.getItem(cuentoFijo.titulo)) +1;
  localStorage.setItem(cuentoFijo.titulo,num)
  document.querySelector('.muestra-historias').classList.add('oculto');  
  document.querySelector('.options') .classList.add('display-none');
  textoCuento.classList.add('active');  
  document.querySelector('.btnCuentoCerrado').classList.add('display-none');
  document.querySelector('.btnCuentoAbierto').classList.remove('display-none');
  offAudioResp();
  reproAudioResp(cuentoFijo.texto);
  cuentoTexto = true;
  if(validacionPerfil()){
    let cuentoUser = JSON.parse(localStorage.getItem('userLog')).cuentos;
    btnFavorito.querySelector('.icon-favorito').innerHTML = iconFavoritoOn;
    cuentoUser.forEach(cuento => {    
      if(document.querySelector('.info-title').innerHTML == cuento){
        switchFavorito = !switchFavorito;
        btnFavorito.querySelector('.icon-favorito').innerHTML = iconFavoritoOff;
      }
    })  
  } 
}
btnLeerCuento.addEventListener('click',startCuento);

const stopCuento = () =>{
  document.querySelector('.muestra-historias').classList.remove('oculto');  
  document.querySelector('.options') .classList.remove('display-none');
  textoCuento.classList.remove('active');  
  document.querySelector('.btnCuentoCerrado').classList.remove('display-none');
  document.querySelector('.btnCuentoAbierto').classList.add('display-none');
  offAudioResp();
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

if (window.innerWidth > 1024) {
  document.getElementById('header').classList.remove('display-none')
  console.log("Estás en una pantalla grande");
  document.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 600);
    if(!noScroll){
      if (event.deltaY > scrollThreshold) {
        scrollToSection(currentSection + 1);
        console.log(currentSection)
        reproAudioGuia(currentSection);
      } else if(currentSection != 0){
        scrollToSection(currentSection - 1);
        console.log(currentSection)
        reproAudioGuia(currentSection);
      }
    }  
  });
} else if (window.innerWidth > 768) {
  console.log("Estás en una pantalla mediana");
} else {
  document.querySelector('body').style.overflow = 'auto'
  btninicioS.addEventListener('click', ()=>{
    document.querySelector('.login-user').style.display = 'block'
    document.querySelector('.register').style.display = 'none'
  })
  registerBtn.addEventListener('click',()=>{
    document.querySelector('.login-user').style.display = 'none'
    document.querySelector('.register').style.display = 'block'
  })
  btnLeerCuento.addEventListener('click', ()=>{
    document.querySelector('.imagen-info').style.display = 'none';
    cuentos.forEach((cuento)=>{    
      if(document.querySelector('.info-title').innerHTML  == cuento.titulo){
        document.querySelector('.descri-info p').innerHTML = cuento.texto;
        audioDesc.src = cuento.audioDesc;
        audioText.src = cuento.audioTexto;
      }
    })
    document.querySelector('.descri-info p').classList.add('show-text');
  })
  btnCuentoCerrar.addEventListener('click',()=>{
    cuentos.forEach((cuento)=>{    
      if(document.querySelector('.info-title').innerHTML  == cuento.titulo){
        document.querySelector('.descri-info p').innerHTML = cuento.descripcion;
      }
    })
    document.querySelector('.descri-info p').classList.remove('show-text');
    document.querySelector('.imagen-info').style.display = 'block';
    offAudioResp();
  });
  btnPerfilLogin.forEach(boton =>{
    boton.addEventListener('click', openBtnMenu)
  })
}

document.querySelector('.btn-dash').addEventListener('click', () => {
  window.location.href = "./dashboard.html";
})