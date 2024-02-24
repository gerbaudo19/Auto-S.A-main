// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import {getMarcas} from "./MarcaGet.js";
import { url, formatearString } from "./MarcaSet.js";
// ---------------------------------------------------------------------------------------------------------------------
// Editar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
export async function editMarca(editarMarcaId){
    const nombreEditarMarca = document.getElementById("nombreEditarMarca").value;
    const impuestoEditarMarca = document.getElementById("impuestoEditarMarca").value;
    if(!nombreEditarMarca.trim()){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var editarMarcaData = {
            nombre: formatearString(nombreEditarMarca),
            impuesto: impuestoEditarMarca
        }
        await fetch(url+`/update/${editarMarcaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarMarcaData)
        })
        .then(function(response) {
            if (response.ok) {
                getMarcas();
            }else if(response.status === 400){
                alert("Ya existe una marca con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Eliminar ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export async function deleteMarca(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    await fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getMarcas();
        } else {
            alert("Hubo un error al eliminar la marca");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}
