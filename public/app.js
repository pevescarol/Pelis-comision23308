// pasar a axios
// editar el css
// mostrar numero de pagina

//capturar los botones
let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let contenedor =  document.querySelector(".contenedor")
let nav = document.querySelector(".nav")
const form = document.querySelector(".form")
const input = document.querySelector(".form-input")



// funcion para cargar las peliculas
window.addEventListener("load",()=>{
    cargarPeliculas()
})

let pagina = 1; // variable para controla la paginacion


//funcion anterior
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    //pagina = pagina-1
    pagina -= 1;
    cargarPeliculas()
    // llamar a la funcion que cargue las paginas
  }
});

btnSiguiente.addEventListener("click", () => {
  if (pagina < 500) {
    //pagina = pagina-1
    pagina += 1; // ++
    cargarPeliculas()
    // llamar a la funcion que cargue las paginas
  }
});

// funcion que cargue las pelis
const cargarPeliculas = async () => {
  try {
    let respuesta = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c4507c70b9852beb10f67c33aa99a34e&language=es-MX&page=${pagina}`);
    nav.innerHTML = `<div class="pag">Pagina ${pagina}</div>`

    //console.log(respuesta)
    if (respuesta.status == 200) {
      let datos = await respuesta.data;
      //console.log(datos);
      mostrarDatos(datos)

    } else if (respuesta.status === 404) {
      console.log("Error 404 nos vemos en otro lugar");
    }
  } catch (error) {
      console.log("Tenemos un error: ", error);
  }
};

/****************   Search    ****************/

// eventlistener Submit
form.addEventListener("submit", (e) => {
  e.preventDefault()

  // Obtener el usuario del input
  let username = input.value.trim()
  if (!username) return
  obtenerData(username)
  input.value = ""
  nav.innerHTML = `<div class="pag"><a href="#" onClick="window.location.reload();">Volver a inicio</a></div>`
})

async function obtenerData(username) {
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4507c70b9852beb10f67c33aa99a34e&language=es-MX&query=${username}&page=1&include_adult=false`)
      
      if (response.status == 200) {
        const data = await response.data
        //console.log(data)
        mostrarDatos(data)
      } else if (response.status === 404) {
        console.log("Error 404 nos vemos en otro lugar");
      }
  } catch(error) {
      console.error("Error", error)
  }
}

function mostrarDatos(data) {
  let peliculas = "";

  data.results.forEach((pelicula)=>{
    peliculas += `
        <div class="pelicula"> 
          <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" />
          <h3 class="titulo">${pelicula.title}</h3>
        </div>`
  });

  if (Object.keys(data.results).length === 0) {
    console.log("No hay resultado.")
    return contenedor.innerHTML = `<img src="./404.gif" alt="not found" class="not-found">`
    
  }
  

  contenedor.innerHTML = peliculas

}
