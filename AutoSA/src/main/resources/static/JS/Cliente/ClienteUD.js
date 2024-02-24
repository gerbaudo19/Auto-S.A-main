// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import {url, formatearString } from "./ClienteSet.js";
import { getCliente } from "./ClienteGet.js";
// ---------------------------------------------------------------------------------------------------------------------
// Eliminar ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export async function deleteCliente(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getCliente();
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

export async function editCliente(editarClienteId){
    var nombreEditarCliente = document.getElementById("nombreEditarCliente").value;
    var apellidoEditarCliente = document.getElementById("apellidoEditarCliente").value;
    var dniEditarCliente = document.getElementById("dniEditarCliente").value;
    var telefonoEditarCliente = document.getElementById("telefonoEditarCliente").value;
    var emailEditarCliente = document.getElementById("emailEditarCliente").value;
    var domicilioEditarCliente = document.getElementById("domicilioEditarCliente").value

    if(!nombreEditarCliente.trim() || !apellidoEditarCliente.trim() || !dniEditarCliente.trim() || !telefonoEditarCliente.trim() || !emailEditarCliente.trim() || !domicilioEditarCliente.trim()){
        alert("Ningun campo puede estar vacio");
    }else{
        var editarClienteData = {
            nombre: formatearString(nombreEditarCliente),
            apellido : formatearString(apellidoEditarCliente),
            dni : dniEditarCliente,
            telefono : telefonoEditarCliente,
            email : emailEditarCliente,
            domicilio : formatearString(domicilioEditarCliente)
        }
        fetch(url+`/update/${editarClienteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarClienteData)
        })
        .then(function(response) {
            if (response.ok) {
                getCliente();
            } else if(response.status === 400){
                alert("Ya existe un cliente con ese Dni");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
}