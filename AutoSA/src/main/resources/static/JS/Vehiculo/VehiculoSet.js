// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import { getVehiculos } from "./VehiculoGet.js";
export const url = "http://localhost:8080/vehiculo"; 
const btnCargarModalAgrega = document.getElementById("btn-CargarModalAgregaVehiculo");
const btnAgregaVehiculo = document.getElementById("btn-AgregarVehiculo");
const selectMarcaNuevo = document.getElementById("select-AgregarMarcaVehiculo");
const selectModeloNuevo = document.getElementById("select-AgregarModeloVehiculo");
const selectClienteNuevo = document.getElementById("select-AgregarClienteVehiculo");
const inputPatenteNuevo = document.getElementById("input-AgregarPatenteVehiculo");
const inputAñoNuevo = document.getElementById("input-AgregarAñoVehiculo");
const inputKilometrajeNuevo = document.getElementById("input-AgregarkilometrajeVehiculo");
// ----------------------------------------------------------------------------
// formatearTexto -------------------------------------------------------------
// ----------------------------------------------------------------------------

export function formatearString(textoEntrada) {
    const palabras = textoEntrada.split(" ");// Divide el string en palabras
    let resultado = "";// Inicializa una cadena para almacenar el resultado formateado
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toUpperCase();// Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " "; //concatena
      }
    }
    return resultado.trim();// Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

// ----------------------------------------------------------------------------
// Listar Cliente -------------------------------------------------------------
// ----------------------------------------------------------------------------

export async function listarCliente(){
    const response = await fetch("http://localhost:8080/cliente/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataCliente = await response.json(); //Guarda los datos de la peticion en una varible
    return dataCliente;
}

// ----------------------------------------------------------------------------
// Listar Marca ---------------------------------------------------------------
// ----------------------------------------------------------------------------

export async function listarMarca(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    return dataMarcas;
}
// ----------------------------------------------------------------------------
// Listar Modelo --------------------------------------------------------------
// ----------------------------------------------------------------------------

export async function listarModelo(marca){
    const response = await fetch(`http://localhost:8080/modelo/listByMarca/${marca}`); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataModelos = await response.json(); //Guarda los datos de la peticion en una varible
    return dataModelos;
}
// ----------------------------------------------------------------------------
// Evento llenar Select Marca -------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarSelectMarcaAgregar(){
    const dataMarcas = await listarMarca();
    selectMarcaNuevo.innerHTML = ""; 
    try {
        const opcionSeleccionarMarca = document.createElement("option");// crea un elemnto option
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";// Agrega la primera opción "Seleccionar una marca"
        selectMarcaNuevo.appendChild(opcionSeleccionarMarca);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectMarcaNuevo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};


// ----------------------------------------------------------------------------
// Evento llenar Select Modelos -----------------------------------------------
// ----------------------------------------------------------------------------

selectMarcaNuevo.addEventListener("change",async function(){
    selectModeloNuevo.disabled = false;
    try {
        const dataModelos = await listarModelo(selectMarcaNuevo.value)
        selectModeloNuevo.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarModelo = document.createElement("option");
        opcionSeleccionarModelo.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarModelo.textContent = "Seleccionar una marca";
        selectModeloNuevo.appendChild(opcionSeleccionarModelo);

        dataModelos.forEach((modelo) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = modelo.id;
            opcion.textContent = modelo.nombre;
            selectModeloNuevo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los modelos: " + error);
    }
})


// ----------------------------------------------------------------------------
// Evento llenar Select cliente ----------------------------------------------
// ----------------------------------------------------------------------------

async function llenarSelectClienteAgregar(){
    try {
        const dataCliente = await listarCliente();
        selectClienteNuevo.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarCliente = document.createElement("option");
        opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
        selectClienteNuevo.appendChild(opcionSeleccionarCliente);

        dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = cliente.id;
            opcion.textContent = cliente.dni + " "+ cliente.nombre + " " + cliente.apellido;
            selectClienteNuevo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los clientes: " + error);
    }
};



// ---------------------------------------------------------------------------------------------------------------------
// Agregar -------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Abre el modal para agregar -------------------------------------------------
// ----------------------------------------------------------------------------

btnCargarModalAgrega.addEventListener("click",async function(){
    await llenarSelectMarcaAgregar();
    await llenarSelectClienteAgregar();
})

// ----------------------------------------------------------------------------
// Agrega un vehiculo ---------------------------------------------------------
// ----------------------------------------------------------------------------

async function setVehiculo(){
    const patenteNuevo = inputPatenteNuevo.value;
    const añoNuevo = inputAñoNuevo.value;
    const kilometrajeNuevo = inputKilometrajeNuevo.value;
    const clienteNuevo = selectClienteNuevo.value;
    const modeloNuevo = selectModeloNuevo.value;
    const marcaNuevo = selectMarcaNuevo.value;
    const anioActual = new Date().getFullYear();
    if(!patenteNuevo.trim() || !añoNuevo.trim() || !kilometrajeNuevo.trim() || !clienteNuevo || !modeloNuevo || !marcaNuevo){
        alert("No puede tener campos vacios");
    }else if(anioActual < añoNuevo){
        alert("El año ingresado no es valido")
    }else{
        var nuevoVehiculoData = {
            cliente: {
                id: clienteNuevo
            },
            modelo: {
                id: modeloNuevo
            },
            año : añoNuevo,
            kilometraje : kilometrajeNuevo,
            patente: formatearString(patenteNuevo)
        }
        
        await fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoVehiculoData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getVehiculos();
                var modal = new bootstrap.Modal(document.getElementById('modalVehiculo'));
                modal.hide();
    
            }else if(response.status === 4000){ 
                alert("Ya existe un vehiculo con esa patente");
            } else if(response.status === 400){
                alert("Ya existe un vehiculo con esa patente ");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregaVehiculo.addEventListener("click",async function(){
    await setVehiculo();
})
