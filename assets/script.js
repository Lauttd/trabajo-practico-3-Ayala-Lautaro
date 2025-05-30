const btnBuscar = document.getElementById("btn-buscar");
const contenedorPadre = document.getElementById("contenedor-data");
const urlDragonBall = "https://dragonball-api.com/api/characters?limit=50";

const cargarDatos = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new error("error en la API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

btnBuscar.addEventListener("click", async () => {
  const data = await cargarDatos(urlDragonBall);
  const dataPersonajes = data.items;
  console.log(dataPersonajes);

  dataPersonajes.forEach((personaje) => {
    contenedorPadre.innerHTML += `
            <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
            <div class="card p-2 mx-2 my-2 bg-dark text-white bg-opacity-10" style="width: 500px;">
              <img
                class="card-img-top img-hover" 
                style="widht: 100%; height:400px; object-fit: contain;"
                src="${personaje.image}"
              />
              <div class="card-body bg-dark bg-opacity-75">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                <button class="btn btn-success btn-ver-detalles" id="btn-detalles">Ver más</button>
              </div>
            </div>
          </div>
      `;
  });
});

// modal
function mostrarModal(personaje) {
  const modalExistente = document.getElementById("modal-personaje");
  if (modalExistente) modalExistente.remove();
  const modalHtml = `
<div class="modal fade" id="modal-personaje" tabindex="-1" aria-labelledby="modalPersonajeLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fs-5" id="modalPersonajeLabel">${
          personaje.name
        }</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body text-center">
        <img src="${personaje.image}" alt="${
    personaje.name
  }" class="img-fluid rounded mb-3" style="max-height: 200px;">
        <p><strong> raza: </strong> ${personaje.race}</p>
        <p><strong> genero: </strong> ${personaje.gender}</p>
        <p><strong> poder: </strong> ${
          personaje.ki || "No hay poder disponible."
        }</p>
        <p><strong> descripcion: </strong> ${
          personaje.description || "No hay descripción disponible."
        }</p>
      </div>
    </div>
  </div>
</div> 
    `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modal = new bootstrap.Modal(document.getElementById("modal-personaje"));
  modal.show();
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-ver-detalles")) {
    const cardPadre = e.target.closest("[data-id]");
    const card = cardPadre ? cardPadre : e.target.closest(".card");
    const id = card ? card.getAttribute("data-id") : null;
    if (!id) return;

    try {
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del personaje");
      }
      const personaje = await response.json();
      mostrarModal(personaje);
    } catch (error) {
      console.error("Error al cargar los detalles del personaje:", error);
    }
  }
});
