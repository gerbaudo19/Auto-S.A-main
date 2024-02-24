// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url, listarCliente, listarMarca, listarModelo, formatearString } from "./VehiculoSet.js";
import { getVehiculos } from "./VehiculoGet.js";
const inputPatenteEditar = document.getElementById("input-EditarPatenteVehiculo");
const inputAñoEditar = document.getElementById("input-EditarAñoVehiculo");
const inputKilometrajeEditar = document.getElementById("input-EditarKilometrasjeVehiculo");
const selectModeloEditar = document.getElementById("select-EditarModeloVehiculo");
const selectClienteEditar = document.getElementById("select-EditarClienteVehiculo");
const selectMarcaEditar = document.getElementById("select-EditarMarcaVehiculo");
// ----------------------------------------------------------------------------
// Funciones ------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Evento llenar Select Marca -------------------------------------------------

export async function llenarSelectMarcaEditar(){
    try {
        const dataMarcas = await listarMarca();
        selectMarcaEditar.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarMarca = document.createElement("option");
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";
        selectMarcaEditar.appendChild(opcionSeleccionarMarca);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectMarcaEditar.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
}

// Evento llenar Select Modelo ------------------------------------------------

selectMarcaEditar.addEventListener("change", async function(){
    selectModeloEditar.disabled = false;
    try {
        const dataModelos = await listarModelo(selectMarcaEditar.value) //Guarda los datos de la peticion en una varible
        selectModeloEditar.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarModelo = document.createElement("option");
        opcionSeleccionarModelo.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarModelo.textContent = "Seleccionar una marca";
        selectModeloEditar.appendChild(opcionSeleccionarModelo);

        dataModelos.forEach((modelo) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = modelo.id;
            opcion.textContent = modelo.nombre;
            selectModeloEditar.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los Modelos: " + error);
    }
});

export async function llenarSelectClienteEditar(){
    try {
        const dataCliente = await listarCliente(); //Guarda los datos de la peticion en una varible
        selectClienteEditar.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarCliente = document.createElement("option");
        opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
        selectClienteEditar.appendChild(opcionSeleccionarCliente);

        dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = cliente.id;
            opcion.textContent = cliente.dni + " " + cliente.nombre + " " + cliente.apellido;
            selectClienteEditar.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Editar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

//Editar un Vehiculo
export async function editVehiculo(editarVehiculoId){
    const patenteEditar = inputPatenteEditar.value;
    const añoEditar = inputAñoEditar.value;
    const kilometrajeEditar = inputKilometrajeEditar.value;
    const modeloEditar = selectModeloEditar.value;
    const clienteEditar = selectClienteEditar.value;
    const marcaEditar =selectMarcaEditar.value;
    const anioActual = new Date().getFullYear();
    if(!patenteEditar.trim() || !añoEditar.trim() || !kilometrajeEditar.trim() || !clienteEditar || !modeloEditar || !marcaEditar){
        alert("No puede contener campos vacios");
    }else if(anioActual < añoEditar){
        alert("El año ingresado no es valido");
    }else{
        var editarVehiculoData = {
            cliente: {
                id: clienteEditar
            },
            modelo: {
                id: modeloEditar
            },
            año : añoEditar,
            kilometraje : kilometrajeEditar,
            patente: formatearString(patenteEditar)
        }
        
        fetch(url+`/update/${editarVehiculoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarVehiculoData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getVehiculos();
                var modal = new bootstrap.Modal(document.getElementById('modalEditarVehiculo'));
                modal.hide();
    
            }else if(response.status === 4000){ 
                alert("Ya existe un vehiculo con esa patente");
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------
// Eliminar ------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

export async function deleteVehiculo(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getVehiculos();
        } else {
            alert("Hubo un error al eliminar la marca");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}