// ----------------------------------------------------------------------------
// Definicion de variables ----------------------------------------------------
// ----------------------------------------------------------------------------
import { getServicios } from "./ServicioGet.js";
export const url = "http://localhost:8080/servicio";
const btnAgregarServicio = document.getElementById("btn-CrearServicio");
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
// Agregar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

async function setServicio(){
    const nombreNuevoServicio = document.getElementById("nombreNuevoServicio").value;
    const precioNuevoServicio = document.getElementById("precioNuevoServicio").value;
    const descripcionNuevoServicio = document.getElementById("descripcionNuevoServicio").value;
    if(!nombreNuevoServicio.trim() || !descripcionNuevoServicio.trim()){
        alert("Revise que los campós no esten vacio");
    }else{
        var nuevoServicioData = {
            nombre: formatearString(nombreNuevoServicio),
            precio : precioNuevoServicio,
            descripcion : descripcionNuevoServicio
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoServicioData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getServicios();
                var modal = new bootstrap.Modal(document.getElementById('modalAgregarServicio'));
                modal.hide();
    
            }else if(response.status === 400){
                alert("Ya existe un servicio con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

btnAgregarServicio.addEventListener("click", function(){
    setServicio();
})
