const urlDragonBall = "https://dragonball-api.com/api/characters";
fetch("https://dragonball-api.com/api/characters")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error', error);
    });
        
    const cargarDatos = async () => {

}