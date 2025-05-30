
const urlDragonBall = "https://dragonball-api.com/api/characters";

let personajesGlobal = [];

// Cargar datos desde la API
const cargarDatos = async () => {
  try {
    const response = await fetch(urlDragonBall);
    if (!response.ok) throw new Error("Error al cargar datos");

    const data = await response.json();
    personajesGlobal = data.items;

    limpiarMensaje();
    mostrarPersonajes(personajesGlobal);
  } catch (error) {
    mostrarMensaje(
      "Ocurrió un error al consultar los datos. Intentalo más tarde."
    );
    console.error("Error al buscar:", error);
  }
};

// Mostrar personajes en tarjetas
function mostrarPersonajes(lista) {
  const contenedor = document.getElementById("contenedorPersonajes");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    mostrarMensaje("No se encontraron personajes que coincidan con la búsqueda.");
    return;
  } else {
    limpiarMensaje();
  }

  lista.forEach((personaje) => {
    contenedor.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 pb-3 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${personaje.image}" alt="${personaje.name}" />
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">
              <strong>Raza:</strong> ${personaje.race}<br>
              <strong>Género:</strong> ${personaje.gender}
            </p>
          </div>
        </div>
      </div>
    `;
  });
}

// Mostrar mensaje de error o aviso
function mostrarMensaje(texto) {
  const divMensaje = document.getElementById("mensaje");
  divMensaje.textContent = texto;
}

// Limpiar mensaje
function limpiarMensaje() {
  const divMensaje = document.getElementById("mensaje");
  divMensaje.textContent = "";
}

// Manejar clic en botón buscar
document.getElementById("btnBuscar").addEventListener("click", () => {
  const input = document.getElementById("inputBusqueda");
  const termino = input.value.trim().toLowerCase();

  if (termino === "") {
    mostrarMensaje("Por favor, escribí un nombre para buscar.");
    return;
  }

  const filtrados = personajesGlobal.filter((p) =>
    p.name.toLowerCase().includes(termino)
  );

  mostrarPersonajes(filtrados);
});

// Cargar datos al iniciar la página
cargarDatos();
