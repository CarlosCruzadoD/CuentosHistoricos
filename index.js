let titulo1 = document.getElementById("titulo1").innerHTML;
let desc;
let cat;
let cuento;

// Usamos fetch para obtener el contenido del archivo JSON
fetch('prueba.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json(); // Convertimos la respuesta a JSON
  })
  .then(data => {
    //console.log(data);
    data.forEach(element => {       
        console.log(element.Cuento); 
        if(element.titulo == titulo1){
            desc = element.Descripcio;
            cat = element.Categoras;
            cuento = element.Cuento;
        }
    });
  })
  .catch(error => {
    console.error('Hubo un problema:', error);
  });

  console.log(desc);
  console.log(cat);
  console.log(cuento);
