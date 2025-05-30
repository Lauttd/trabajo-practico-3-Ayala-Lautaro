const btnBuscar = document.getElementById("btn-buscar");
const contenedorPadre = document.getElementById("contenedor-data");
const urlDragonBall = "https://dragonball-api.com/api/characters";

const cargarDatos = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok){
      throw new error("error en la API");
    }
      const data = await response.json();
      return data;
  } catch (error){
    console.log(error);
  }
};

const verDetalles = async (id) => {
  try{
    const response = await fetch(`${urlDragonBall}/${id}`);

    if (!response.ok){
      throw new Error("error en la API");
    }
    const data = await response.json();

    alert(data.description);
  } catch (error){
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
            <div class="card">
              <img
                class="card-img-top"
                src=${personaje.image}
              />
              <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                <button class="btn btn-success btn-ver-detalles">Ver más</button>
              </div>
            </div>
          </div>
      `;
    });
});

contenedorPadre.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-ver-detalles")){
    const cardPadre = e.target.closest(".col-3");
    const id = cardPadre.dataset.id;
    verDetalles(id);
  }
});


