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
let currentSection = 1;
const sections = document.querySelectorAll('section');

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
const header = document.getElementById('header');
const stickyOffset = header.offsetTop; // Obtiene la posición del header

window.addEventListener('scroll', () => {
  if (window.scrollY > 120) {
    header.classList.add('fixded'); // Agrega la clase cuando se desplaza
  } else {
    header.classList.remove('fdixed'); // Remueve la clase si vuelve arriba
  }
});


//---------------------------------------------------------------------------
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
  window.location.href = 'login.html';
});
