// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import {getMarcas} from "./MarcaGet.js";

export const url = "http://localhost:8080/marca"; 

const btnAgregarMarca = document.getElementById("btn-CrearMarca"); //Boton Agregar
// ----------------------------------------------------------------------------
// formatearTexto -------------------------------------------------------------
// ----------------------------------------------------------------------------

export function formatearString(textoEntrada) {
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
// ---------------------------------------------------------------------------------------------------------------------
// Agregar -------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

async function setMarca(){
    const nombreNuevaMarca = document.getElementById("nombreNuevaMarca").value;
    if(!nombreNuevaMarca.trim()){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var nuevaMarcaData = {
            nombre: formatearString(nombreNuevaMarca)
        }
        
        await fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaMarcaData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getMarcas();
                var modal = new bootstrap.Modal(document.getElementById('modalMarca'));
                modal.hide();
    
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


btnAgregarMarca.addEventListener("click",async function(){
    await setMarca();
})

