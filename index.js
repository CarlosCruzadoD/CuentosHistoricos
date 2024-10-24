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
let currentSection = 0;
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
    header.classList.add('fixed'); // Agrega la clase cuando se desplaza
  } else {
    header.classList.remove('fixed'); // Remueve la clase si vuelve arriba
  }
});
