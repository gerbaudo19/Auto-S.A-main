//----------------------------------------------------------------------------------------------------------------------
// Variables ------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
const urlOrden = "http://localhost:8080/ordenDeTrabajo";
const urlDetalle = "http://localhost:8080/detalleOrdenTrabajo"; 
const urlPersonal = "http://localhost:8080/personalDeTrabajo";
import { verificarCliente } from "./OrdenCliente.js";
import { verificarVehiculo } from "./OrdenVehiculo.js";
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora");
const btnSetOrden = document.getElementById("btn-SetOrdenDeTrabajo");
//----------------------------------------------------------------------------------------------------------------------
// Set fecha y hora ----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const fechaActual = new Date();
    // Formatea la fecha actual en el formato YYYY-MM-DD para el elemento input tipo date
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses en JavaScript se indexan desde 0
    const anio = fechaActual.getFullYear();
    const fechaFormatted = `${anio}-${mes}-${dia}`;
    inputFecha.value = fechaFormatted;// Establece el valor del input con la fecha actual

    // Obtiene la hora actual en formato HH:MM
    const horas = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    inputHora.value = horaActual; // Establece el valor del input con la hora actual
})

//----------------------------------------------------------------------------------------------------------------------
// Formatear texto -----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

function formatearString(textoEntrada) {
    const palabras = textoEntrada.split(" ");// Divide el string en palabras
    let resultado = "";// Inicializa una cadena para almacenar el resultado formateado
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();// Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " "; //concatena
      }
    }
    return resultado.trim();// Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

//----------------------------------------------------------------------------------------------------------------------
// boton Confirmar -----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

btnSetOrden.addEventListener("click", async function(){
  const clienteCargar = await verificarCliente();
  console.log("el cliente a cargar es " + clienteCargar.id);
  const vehiculoCargar = await verificarVehiculo(clienteCargar.id);
  console.log("El vehiculo a cargar es " + vehiculoCargar.patente);
  setOrdenTrabajo(vehiculoCargar);
});

//----------------------------------------------------------------------------------------------------------------------
// Set Orden de Trabajo ------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
async function setOrdenTrabajo(vehiculoCargar){

}