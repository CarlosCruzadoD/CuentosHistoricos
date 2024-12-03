// Datos de lecturas por historia
const historias = ["Un Cuento de Navidad", "La Ranita Presumida", "Hansel y Gretel", "El Pulgarsito", "Pinocho", "El Mago de Oz", "Bambi","Gato con botas", "Caperucita roja", "Cenicienta"];
let lecturaCuento = [];
let historiaCuento = [];
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
        lecturaCuento.push(localStorage.getItem(titulos.titulo));
        historiaCuento.push(titulos.titulo)
        console.log(lecturaCuento)
    })
    // Configuración del gráfico
const ctx = document.getElementById('readingChart').getContext('2d');
const readingChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: historiaCuento,
        datasets: [{
            label: 'Número de Lecturas',
            data: lecturaCuento,
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud fetch:', error);
  });
  
const lecturas = [15, 40, 20, 30, 25, 50, 20, 45, 10, 5]; // Ejemplo de datos de lecturas


