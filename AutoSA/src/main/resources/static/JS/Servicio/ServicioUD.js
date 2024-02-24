// ----------------------------------------------------------------------------
// Definicion de variables ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url, formatearString } from "./ServicioSet.js";
import { getServicios } from "./ServicioGet.js";
// ---------------------------------------------------------------------------------------------------------------------
// Eliminar ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export function deleteServicio(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(async function(response) {
        if (response.ok) {
           await getServicios();
        } else {
            alert("Hubo un error al eliminar la marca");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

// ---------------------------------------------------------------------------------------------------------------------
// Editar ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
export async function editServicio(editarServicioId){
    const nombreEditarServicio = document.getElementById("input-NombreEditarServicio").value;
    const descripcionEditarServicio = document.getElementById("input-DescripcionEditarServicio").value;
    const precioEditarServicio = document.getElementById("input-precioEditarServicio").value;
    if(!nombreEditarServicio.trim() || !descripcionEditarServicio.trim() || !precioEditarServicio.trim()){
        alert("Revise que los campós no esten vacio");
    }else{
        var editarServicioData = {
           nombre: formatearString(nombreEditarServicio),
           precio: precioEditarServicio,
        descripcion : descripcionEditarServicio
        }
        await fetch(url+`/update/${editarServicioId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarServicioData)
        })
        .then(async function(response) {
            if (response.ok) {
                await getServicios();
            }else if(response.status === 400){
                alert("Ya existe un servicio con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
}