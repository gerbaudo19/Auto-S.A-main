// ----------------------------------------------------------------------------
// Definicion de variables ----------------------------------------------------
// ----------------------------------------------------------------------------
import { getTecnico } from "./TecnicoGet.js"; 
export const url = "http://localhost:8080/tecnico";
const btnAgregarTecnico = document.getElementById("btn-AgregarTecnico");
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
function setTecnico(){
    const nombreNuevoTecnico = document.getElementById("nombreNuevoTecnico").value;
    const apellidoNuevoTecnico = document.getElementById("apellidoNuevoTecnico").value;
    const dniNuevoTecnico = document.getElementById("dniNuevoTecnico").value;
    const telefonoNuevoTecnico = document.getElementById("telefonoNuevoTecnico").value;
    const emailNuevoTecnico = document.getElementById("emailNuevoTecnico").value;
    const domicilioNuevoTecnico = document.getElementById("domicilioNuevoTecnico").value
    if(!nombreNuevoTecnico.trim() || !apellidoNuevoTecnico.trim() || !dniNuevoTecnico.trim() || !telefonoNuevoTecnico.trim() || !emailNuevoTecnico.trim() || !domicilioNuevoTecnico.trim()){
        alert("Ningun campo puede estar vacio");
    }else{
        var nuevoTecnicoData = {
            nombre: formatearString(nombreNuevoTecnico),
            apellido : formatearString(apellidoNuevoTecnico),
            dni : dniNuevoTecnico,
            telefono : telefonoNuevoTecnico,
            email : emailNuevoTecnico,
            domicilio : formatearString(domicilioNuevoTecnico)
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoTecnicoData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getTecnico();
                var modal = new bootstrap.Modal(document.getElementById('modalTecnico'));
                modal.hide();
    
            }else if(response.status === 400){
                alert("Ya existe un Tecnico con ese dni");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregarTecnico.addEventListener("click", function(){
    setTecnico();
})
