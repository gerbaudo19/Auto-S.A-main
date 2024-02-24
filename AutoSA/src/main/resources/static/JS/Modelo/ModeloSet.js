// ----------------------------------------------------------------------------
// Definicion de variables -------------------------------------------------------------
// ----------------------------------------------------------------------------
import { getModelos } from "./ModeloGet.js";
export const url = "http://localhost:8080/modelo"; 
const btnAgregarModelo = document.getElementById("btn-AgregarModelo"); //Boton para agregar un modelo
const btnModalAgregarModelo = document.getElementById("btn-ModalAgregarModelo"); //Boton que activa modal para agregar modelo
const selectAgregarMarca = document.getElementById("select-AgregarMarca"); // Select de marca para agregar modelo

// ----------------------------------------------------------------------------
// Lista las marcas -------------------------------------------------------------
// ----------------------------------------------------------------------------
export async function listarMarcas(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    return dataMarcas;
}

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
btnModalAgregarModelo.addEventListener("click", async function(){
    await llenarSelectAgregarModelo();
})

//Llena el select con Marcas
async function llenarSelectAgregarModelo(){
    try {
        const dataMarcas = await listarMarcas();
        selectAgregarMarca.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionar = document.createElement("option");
        opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionar.textContent = "Seleccionar una marca";
        selectAgregarMarca.appendChild(opcionSeleccionar);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectAgregarMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};


//Crea un nuevo modelo
async function setModelo(){
    var nombreNuevoModelo = document.getElementById("nombreNuevoModelo").value;
    const nuevoModeloMarcaId = selectAgregarMarca.value;
    if(!nombreNuevoModelo.trim() || !nuevoModeloMarcaId){
        alert("No puede tener un campo vacio");
    }else{
        var nuevoModeloaData = {
            nombre: formatearString(nombreNuevoModelo),
            marca: {
                id: nuevoModeloMarcaId
            }
        }
        
        await fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoModeloaData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getModelos();
                var modal = new bootstrap.Modal(document.getElementById('modalModelo'));
                modal.hide();
    
            }else if(response.status === 400){
                alert("Ya existe un modelo con ese nombre");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregarModelo.addEventListener("click",async function(){
    await setModelo();
})
