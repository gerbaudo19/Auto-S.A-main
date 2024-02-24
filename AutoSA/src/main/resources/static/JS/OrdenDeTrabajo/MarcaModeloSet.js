import { formatearString } from "./OrdenCliente.js";
import { llenarSelectMarca} from "./OrdenVehiculo.js";
const urlMarca = 'http://localhost:8080/marca';
const urlModelo = 'http://localhost:8080/modelo';
const btnSetMarca = document.getElementById("btn-setMarca");
const btnSetModelo = document.getElementById("btn-AgregarModelo");
const selectMarca = document.getElementById("select-AgregarMarca");
const btnModalAgregarModelo = document.getElementById("btn-modalAgregarModelo");

// ---------------------------------------------------------------------------------------------------------------------
// Set marca -------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

async function setMarca(){
    const nombreNuevaMarca = document.getElementById("nombreMarca").value;
    const impuestoNuevaMarca = document.getElementById("impuestoMarca").value;
    if(!nombreNuevaMarca.trim() || !impuestoNuevaMarca.trim()){
        alert("No puede existir campos vacios");
    }else{
        var nuevaMarcaData = {
            nombre: formatearString(nombreNuevaMarca),
            impuesto: impuestoNuevaMarca
        }
        
        await fetch(urlMarca + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaMarcaData)
        })
        .then(async function (response) {
            if (response.ok) {
                console.log("se creo la marca correctamente");
                await llenarSelectMarca();
    
            } else if(response.status === 400){
                alert("Ya existe una marca con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

btnSetMarca.addEventListener("click", async function(){
    await setMarca();
})

// ---------------------------------------------------------------------------------------------------------------------
// llenar select marca ----------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
btnModalAgregarModelo.addEventListener("click", async function(){
    const response = await fetch(urlMarca + "/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    try {
        selectMarca.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionar = document.createElement("option");
        opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionar.textContent = "Seleccionar una marca";
        selectMarca.appendChild(opcionSeleccionar);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
})

// ---------------------------------------------------------------------------------------------------------------------
// Set modelo ----------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
async function setModelo(){
    const nombreNuevoModelo = document.getElementById("nombreNuevoModelo").value;
    const nuevoModeloMarcaId = selectMarca.value;
    if(!nombreNuevoModelo.trim() || !nuevoModeloMarcaId){
        alert("No puede tener un campo vacio");
    }else{
        var nuevoModeloaData = {
            nombre: formatearString(nombreNuevoModelo),
            marca: {
                id: nuevoModeloMarcaId
            }
        }
        
        await fetch(urlModelo + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoModeloaData)
        })
        .then(async function (response) {
            if (response.ok) {

                console.log("Se creo el modelo correctamente");
                await llenarSelectMarca();
    
            }else if(response.status === 400){
                alert("Ya existe un modelo con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

btnSetModelo.addEventListener("click", async function(){
    await setModelo();
})