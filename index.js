
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
//Funcion para dezlisar al hacer scroll o presionar las teclas
let currentSection = 0;
const sections = document.querySelectorAll('section');
const scrollThreshold = 10; 
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
    } else if(currentSection != 0){
      scrollToSection(currentSection - 1);
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
document.getElementById('btn-perfil-Login').addEventListener('click', () => {
  noScroll = true;
  header.classList.add('display-none');
  mainPage.classList.add('display-none');
  perfilView.classList.remove('display-none');
  overlay.classList.add('overlay-active');
});
//cambio de posicion de la imagen en el perfil
const imgPerfil = document.querySelector('.selector')
const registerBtn = document.getElementById('btn-perfil-Registrar');
registerBtn.addEventListener('click',()=>{
  imgPerfil.style.transform = 'translate(100%, 0)'
})

document.getElementById('btnBInicioS').addEventListener('click', () => {
  imgPerfil.style.transform = 'translate(0, 0)'
})
closePerfil.addEventListener('click',()=>{
  noScroll = false;
  header.classList.remove('display-none');
  mainPage.classList.remove('display-none');
  perfilView.classList.add('display-none');
  overlay.classList.remove('overlay-active')
})



let btnSignUp=document.getElementById('btn-signups');

btnSignUp.addEventListener('click', () =>{
  document.querySelector('.other-form-register').style.visibility = 'hidden';
  document.querySelector('.register-box').style.visibility = 'visible';

})

document.querySelector('.btn-cancelar-register').addEventListener('click', () => {
  console.log("dd")
  document.querySelector('.other-form-register').style.visibility = 'visible';
  document.querySelector('.register-box').style.visibility = 'hidden';
})

function validateForm() {
  const form = document.getElementById('registerForm');
  const password = form.password.value;
  const confirmPassword = form.confirm_password.value;

  if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
  }
  return true;
}
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
// Evento de teclado para detectar las flechas
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    updateFocus(currentCuento+1);
    openCardInfo(tarjetaHistoria[currentCuento].querySelector('.card-title').innerHTML);
    ReproducirAudio(audioDesc);
  } else if (event.key === 'ArrowLeft') {
    updateFocus(currentCuento-1);
    openCardInfo(tarjetaHistoria[currentCuento].querySelector('.card-title').innerHTML);
    ReproducirAudio(audioDesc);
  }
});


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



// Opcional: Ocultar la sección al hacer clic en ella
/*seccion.addEventListener('click', () => {
  seccion.classList.remove('visible');
  localStorage.setItem('seccionVisible', 'false'); // Actualizar el estado
});*/
