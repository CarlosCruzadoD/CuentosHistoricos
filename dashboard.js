// Datos de lecturas por historia
const historias = ["Un Cuento de Navidad", "La Ranita Presumida", "Hansel y Gretel", "El Pulgarsito", "Pinocho", "El Mago de Oz", "Bambi","Gato con botas", "Caperucita roja", "Cenicienta"];
const lecturas = [15, 40, 20, 30, 25, 50, 20, 45, 10, 5]; // Ejemplo de datos de lecturas

// Configuración del gráfico
const ctx = document.getElementById('readingChart').getContext('2d');
const readingChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: historias,
        datasets: [{
            label: 'Número de Lecturas',
            data: lecturas,
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
