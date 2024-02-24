// ----------------------------------------------------------------------------
// Definicion de variables ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url, formatearString } from "./TecnicoSet.js";
import { getTecnico } from "./TecnicoGet.js";
// ---------------------------------------------------------------------------------------------------------------------
// Eliminar ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

export async function deleteTecnico(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    await fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getTecnico();
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

const btnEditarTecnico = document.getElementById("btn-EditarTecnico");

export async function editTecnico(editarTecnicoId){
    var nombreEditarTecnico = document.getElementById("nombreEditarTecnico").value;
    var nombreEditarTecnico = formatearString(nombreEditarTecnico);
    var apellidoEditarTecnico = document.getElementById("apellidoEditarTecnico").value;
    var apellidoEditarTecnico = formatearString(apellidoEditarTecnico);
    var dniEditarTecnico = document.getElementById("dniEditarTecnico").value;
    var telefonoEditarTecnico = document.getElementById("telefonoEditarTecnico").value;
    var emailEditarTecnico = document.getElementById("emailEditarTecnico").value;
    var domicilioEditarTecnico = document.getElementById("domicilioEditarTecnico").value
    var domicilioEditarTecnico = formatearString(domicilioEditarTecnico);
    if(nombreEditarTecnico.trim() === "" || apellidoEditarTecnico.trim() === "" || dniEditarTecnico.trim() === null || telefonoEditarTecnico.trim() ===  null || emailEditarTecnico.trim() === null || domicilioEditarTecnico.trim() === ""){
        alert("Ningun campo puede estar vacio");
    }else{
        var editarTecnicoData = {
            nombre: nombreEditarTecnico,
            apellido : apellidoEditarTecnico,
            dni : dniEditarTecnico,
            telefono : telefonoEditarTecnico,
            email : emailEditarTecnico,
            domicilio : domicilioEditarTecnico
        }
        fetch(url+`/update/${editarTecnicoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarTecnicoData)
        })
        .then(function(response) {
            if (response.ok) {
                getTecnico();
            }else if(response.status === 400){
                alert("Ya existe un Tecnico con ese Dni");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
}