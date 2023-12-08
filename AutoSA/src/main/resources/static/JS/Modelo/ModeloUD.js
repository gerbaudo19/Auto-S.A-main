//Definicion de variables
import { url, formatearString, listarMarcas} from "./ModeloSet.js";
import { getModelos } from "./ModeloGet.js";
const selectEditarMarca = document.getElementById("select-EditarMarca");
// ---------------------------------------------------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export async function deleteModelo(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    await fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getModelos();
        } else {
            alert("Hubo un error al eliminar la marca");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

// ---------------------------------------------------------------------------------------------------------------------
// Editar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

//Llena el select con Marcas
export async function llenarSelectEditarModelo(){
    try {
        const dataMarcas = await listarMarcas();
        selectEditarMarca.innerHTML = "";

        const opcionSeleccionar = document.createElement("option"); // Agrega la primera opción "Seleccionar una marca"
        opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionar.textContent = "Seleccionar una marca";
        selectEditarMarca.appendChild(opcionSeleccionar);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectEditarMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};

export async function editModelo(editarModeloId){
    var nombreEditarModelo = document.getElementById("nombreEditarModelo").value;
    var nombreEditarModelo = formatearString(nombreEditarModelo);
    if(nombreEditarModelo.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var editarmodeloData = {
            nombre: nombreEditarModelo,
            marca: {
                id : selectEditarMarca.value
            }
        }
        await fetch(url+`/update/${editarModeloId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarmodeloData)
        })
        .then(async function(response) {
            if (response.ok) {
                await getModelos();
            } else if(response.status === 400){
                alert("Ya existe un modelo con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
}