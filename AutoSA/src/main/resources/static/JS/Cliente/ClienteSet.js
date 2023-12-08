// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import { getCliente } from "./ClienteGet.js";
export const url = "http://localhost:8080/cliente";
const btnAgregarCliente = document.getElementById("btn-AgregarCliente"); //Boton para agregar cliente
// ----------------------------------------------------------------------------
// Definicion de funciones ----------------------------------------------------
// ----------------------------------------------------------------------------
export function formatearString(textoEntrada) {

    const palabras = textoEntrada.split(" "); // Divide el string en palabras
    let resultado = ""; // Inicializa una cadena para almacenar el resultado formateado
  
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase(); // Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " ";
      }
    }
  
    return resultado.trim(); // Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

// ---------------------------------------------------------------------------------------------------------------------
// Agregar ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------


async function setCliente(nombre, apellido, dni, telefono, email, domicilio){

    if(!nombre.trim() || !apellido.trim() || !dni.trim() || !telefono.trim() || !email.trim() || !domicilio.trim()){
        alert("Ningun campo puede estar vacio");
    }else{
        var nuevoClienteData = {
            nombre: formatearString(nombre),
            apellido : formatearString(apellido),
            dni : dni,
            telefono : telefono,
            email : email,
            domicilio : formatearString(domicilio),
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoClienteData)
        })
        .then(function (response) {
            if (response.ok) {
                getCliente();
                var modal = new bootstrap.Modal(document.getElementById('modalCliente'));
                modal.hide();
    
            }else if(response.status === 400){
                alert("Ya existe un cliente con ese Dni");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregarCliente.addEventListener("click",async function(){
    var nombreNuevoCliente = document.getElementById("nombreNuevoCliente").value;
    var apellidoNuevoCliente = document.getElementById("apellidoNuevoCliente").value;
    var dniNuevoCliente = document.getElementById("dniNuevoCliente").value;
    var telefonoNuevoCliente = document.getElementById("telefonoNuevoCliente").value;
    var emailNuevoCliente = document.getElementById("emailNuevoCliente").value;
    var domicilioNuevoCliente = document.getElementById("domicilioNuevoCliente").value
    await setCliente(
        nombreNuevoCliente,
        apellidoNuevoCliente,
        dniNuevoCliente,
        telefonoNuevoCliente,
        emailNuevoCliente,
        domicilioNuevoCliente);
});