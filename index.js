

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
//Funcion para dezlisar al hacer scroll
let currentSection = 1;
const sections = document.querySelectorAll('section');

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSection = index;
  }
}
document.addEventListener('wheel', (event) => {
  if (event.deltaY > 50) {
    scrollToSection(currentSection + 1);
  } else {
    scrollToSection(currentSection - 1);
  }
});

document.addEventListener('keypress', (event) => {
  if (event.key === 'Space') {
    scrollToSection(currentSection + 1);
  }
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
//Abrir otras paginas
document.getElementById('btn-perfil-Login').addEventListener('click', () => {
 /* window.location.href = 'login.html';*/
});
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
  console.log(perfil);
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
const tarjetaHistoria = document.querySelectorAll('.card');
tarjetaHistoria.forEach(card =>{
  card.addEventListener('click', ()=>{
    document.querySelector('.card-container').classList.remove('display-none');
    document.querySelector('.grid-container').classList.add('grid-template-3');
  })
})
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
    default:
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




//Función de los botones, para elegir cuentos
// Selecciona todas las tarjetas de cuentos
document.addEventListener('DOMContentLoaded', () => {
  const tarjetaHistoria = document.querySelectorAll('.card');
  tarjetaHistoria.forEach(card => {
      card.addEventListener('click', () => {
          document.querySelector('.card-container').classList.remove('display-none');
          document.querySelector('.grid-container').classList.add('grid-template-3'); // Asegúrate de que esta clase sea correcta
      });
  });
});

// Función para actualizar el enfoque en la tarjeta seleccionada
function updateFocus() {
    // Remueve la clase de enfoque de todas las tarjetas
    storyCards.forEach(card => card.classList.remove('focused'));
    
    // Añade la clase de enfoque a la tarjeta actual
    storyCards[currentIndex].classList.add('focused');
    
    // Opción adicional: desplazar la tarjeta al centro de la vista si es necesario
    storyCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Evento de teclado para detectar las flechas
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % storyCards.length;
  } else if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + storyCards.length) % storyCards.length;
  } else if (event.key === 'ArrowDown') {
      currentIndex = (currentIndex + 3) < storyCards.length ? currentIndex + 3 : currentIndex;
  } else if (event.key === 'ArrowUp') {
      currentIndex = (currentIndex - 3) >= 0 ? currentIndex - 3 : currentIndex;
  }
  updateFocus();
});


// Asegura que el primer elemento esté enfocado al cargar la página
updateFocus();

function updateFocus() {
  console.log('Current Index:', currentIndex); // Depuración
  storyCards.forEach(card => card.classList.remove('focused'));
  storyCards[currentIndex].classList.add('focused');
  storyCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Opcional: Ocultar la sección al hacer clic en ella
/*seccion.addEventListener('click', () => {
  seccion.classList.remove('visible');
  localStorage.setItem('seccionVisible', 'false'); // Actualizar el estado
});*/
