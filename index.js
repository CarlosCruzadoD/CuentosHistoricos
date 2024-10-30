
const imgPerfil = document.querySelector('.selector')
const registerBtn = document.getElementById('btn-perfil-Registrar');
registerBtn.addEventListener('click',()=>{
  imgPerfil.style.transform = 'translate(100%, 0)'
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
//Funcion para dezlisar al hacer scroll
let currentSection = 1;
const sections = document.querySelectorAll('secstion');

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSection = index;
  }
}

document.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    scrollToSection(currentSection + 1);
  } else {
    scrollToSection(currentSection - 1);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
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
localStorage.setItem('seccionVisible', 'false');
if (localStorage.getItem('seccionVisible') === 'true') {
  perfilView.classList.remove('display-none');
}
document.getElementById('btn-perfil-Login').addEventListener('click', () => {
  console.log(perfil);
  titulo.style.display = 'none';
  header.style.display = 'none';
  downOptions.style.display = 'none';
  mainPage.style.display = 'none';
  perfilView.classList.remove('display-none');
  
});
let btnSignUp=document.getElementById('btn-signups');

btnSignUp.addEventListener('click', () =>{
  document.querySelector('.other-form-register').style.visibility = 'hidden';
  document.querySelector('.register-box').style.visibility = 'visible';

})
// Opcional: Ocultar la sección al hacer clic en ella
seccion.addEventListener('click', () => {
  seccion.classList.remove('visible');
  localStorage.setItem('seccionVisible', 'false'); // Actualizar el estado
});


