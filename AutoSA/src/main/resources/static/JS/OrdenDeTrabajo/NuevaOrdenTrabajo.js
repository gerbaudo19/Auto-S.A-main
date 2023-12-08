//----------------------------------------------------------------------------------------------------------------------
// Variables ------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
const urlOrden = "http://localhost:8080/ordenDeTrabajo";
import { verificarCliente } from "./OrdenCliente.js";
import { verificarVehiculo } from "./OrdenVehiculo.js";
import { setPersonalTrabajo } from "./OrdenTecnico.js";
import { setDetalleOrden } from "./OrdenServicio.js";
const inputFecha = document.getElementById("fecha");
let fechaActual = "";
const inputHora = document.getElementById("hora");
const texTareaObservacion = document.getElementById("textarea-observacion");
const btnSetOrden = document.getElementById("btn-SetOrdenDeTrabajo");

//----------------------------------------------------------------------------------------------------------------------
// Set fecha y hora ----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    const CargarFecha = new Date();
    // Formatea la fecha actual en el formato YYYY-MM-DD para el elemento input tipo date
    const dia = CargarFecha.getDate().toString().padStart(2, '0');
    const mes = (CargarFecha.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses en JavaScript se indexan desde 0
    const anio = CargarFecha.getFullYear();
    const fechaFormatted = `${anio}-${mes}-${dia}`;
    fechaActual = fechaFormatted;
    inputFecha.value = fechaFormatted;// Establece el valor del input con la fecha actual
    
    // Obtiene la hora actual en formato HH:MM
    const horas = CargarFecha.getHours().toString().padStart(2, '0');
    const minutos = CargarFecha.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    inputHora.value = horaActual; // Establece el valor del input con la hora actual
});

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
        resultado += palabraFormateada + " "; //concatenar
        }
    }
    return resultado.trim();// Elimina el espacio en blanco adicional al final y retorna el resultado formateado
    }

//----------------------------------------------------------------------------------------------------------------------
// boton Confirmar -----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

btnSetOrden.addEventListener("click", async function(){
    console.log(fechaActual, inputFecha.value, texTareaObservacion.value );
   const clienteCargar = await verificarCliente();
    console.log("el cliente a cargar es " + clienteCargar.id);
    const vehiculoCargar = await verificarVehiculo(clienteCargar.id);
    console.log("El vehiculo a cargar es " + vehiculoCargar.patente);
    await setOrdenTrabajo(vehiculoCargar);
    const ultimaordenId = await consultaUltimaOrden();
    console.log("La ultima orden tiene id " + ultimaordenId);
    setPersonalTrabajo(ultimaordenId);
    setDetalleOrden(ultimaordenId);
});

//----------------------------------------------------------------------------------------------------------------------
// Set Orden de Trabajo ------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

async function setOrdenTrabajo(vehiculoCargar){
    if(inputFecha.value > fechaActual){
        alert("La fecha ingresada no es valida")
    }else if(!inputFecha.value || !inputHora.value || !texTareaObservacion.value){
        alert("Hay campos vacios");
    }else{
        var nuevaOrdenDeTrabajo = {
            vehiculo: {
                id: vehiculoCargar.id
            },
            estado: {
                id: 1
            },
            fechaCreacion : inputFecha.value,
            horaCreacion : inputHora.value,
            observacion: texTareaObservacion.value
        }
        
        await fetch(urlOrden + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaOrdenDeTrabajo)
        })
        //.then maneja la resolución exitosa de la promesa
        .then(function (response) {
            if (response.ok) {
                console.log("Orden de trabjo creado con exito");
            } else if(response.status === 400){
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        //.catch maneja cualquier error que pueda surgir durante la solicitud
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Consulta ultima Orden de Trabajo ------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

async function consultaUltimaOrden(){
    const response = await fetch(urlOrden+"/listUltimo");
    if(!response.ok){
        console.log("Hubo problema con la consulta de la ultima orden");
    }else{
        const ultimaOrden = await response.json();
        return ultimaOrden.id;
    }
}